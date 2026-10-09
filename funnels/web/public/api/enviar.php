<?php
/**
 * enviar.php — recibe los formularios de nimbustelecom.cat y manda el correo.
 *
 * Sustituye a la cadena AWS (API Gateway + Lambda + DynamoDB) + Make:
 *
 *   web  --POST JSON-->  /api/enviar.php?tipus=leads            (contacto / contratación)
 *   web  --POST JSON-->  /api/enviar.php?tipus=coverage-study   (estudio de cobertura)
 *
 * Hace lo mismo que hacía la Lambda, en el mismo orden:
 *   1. antispam: campo trampa (honeypot) y tiempo mínimo rellenando
 *   2. validación de campos (mismas reglas que backend/api/src/schemas)
 *   3. reCAPTCHA, si está activado (en producción estaba desactivado)
 *   4. guarda una copia del lead en un CSV (lo que hacía DynamoDB)
 *   5. manda el correo (lo que hacía Make)
 *
 * Responde el mismo JSON que esperaba la web:
 *   { "ok": true,  "data": { "id": "...", "status": "new" } }
 *   { "ok": false, "error": { "code": "...", "message": "..." } }
 *
 * No necesita nada más que PHP 8 con mail() o SMTP (ver config). Sin librerías.
 */

declare(strict_types=1);
date_default_timezone_set('Europe/Madrid');

// =============================================================== CONFIGURACIÓN
// Valores por defecto. En el servidor, lo que cambie (sobre todo la contraseña
// SMTP) va en un fichero FUERA de la carpeta pública, que sobreescribe estos:
//   <raiz del hosting>/data/enviar.config.php   (ver plantilla enviar.config.ejemplo.php)
// Así este fichero no lleva secretos y se puede guardar en el repositorio.
$CONFIG_BASE = [
  // A quién llega el lead.
  'para'            => 'soporte@nimbustelecom.cat',
  // Remitente. Tiene que ser una dirección que el servidor SMTP de abajo tenga
  // permitido usar: con el relay de Google, cualquier @nimbustelecom.cat.
  'de'              => 'noreply@nimbustelecom.cat',
  'de_nombre'       => 'Web Nimbus Telecom',

  // Cómo sale el correo: 'smtp' (recomendado) o 'mail' (función mail() del hosting).
  'envio'           => 'smtp',
  //
  // Opción A (recomendada): relay SMTP de Google Workspace. Hay que dar de alta la IP
  // del hosting en la consola de Workspace: Gmail > Enrutamiento > Servicio de
  // retransmisión SMTP (remitentes permitidos: solo direcciones de mis dominios;
  // autenticación: solo por IP; cifrado TLS obligatorio). Usuario y clave vacíos.
  //
  // Opción B: SMTP de Google con un usuario de Workspace y contraseña de aplicación:
  //   host smtp.gmail.com, puerto 465, seguro 'ssl', usuario y clave de esa cuenta,
  //   y 'de' igual a ese usuario.
  //
  // Opción C: SMTP de SWHosting con el buzón noreply@nimbustelecom.com:
  //   host el que diga SWPanel, puerto 465, seguro 'ssl', usuario/clave del buzón,
  //   y 'de' => 'noreply@nimbustelecom.com'.
  'smtp'            => [
    'host'   => 'smtp-relay.gmail.com',
    'puerto' => 587,
    'seguro' => 'tls',                    // 'ssl' | 'tls' | 'none'
    'usuario'=> '',                       // vacío = sin AUTH (relay por IP)
    'clave'  => '',
  ],

  // modo_prueba = true: NO manda correo; lo escribe en carpeta_datos/correos/ para verlo.
  'modo_prueba'     => true,

  // Carpeta de datos (CSV de leads y correos de prueba). Vacío = automático, por
  // este orden: <raiz>/data/nimbus-web (la carpeta "data" de SWHosting, fuera de
  // la web), <raiz>/nimbus_datos, y si nada es escribible, api/_datos.
  'carpeta_datos'   => '',

  // Segundos mínimos rellenando el formulario (igual que la Lambda).
  'antispam_min_s'  => 3,

  // reCAPTCHA v3. En producción estaba desactivado (RECAPTCHA_ENABLED=false).
  'recaptcha'       => false,
  'recaptcha_secret'=> '',
  'recaptcha_min'   => 0.5,

  // Orígenes permitidos para peticiones desde otro dominio (CORS).
  // Vacío = solo el propio dominio. Para probar en local se añade el puerto del web.
  'cors_origenes'   => ['http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:8080'],
];

$RAIZ_HOSTING = dirname($_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__));
$configExterno = "$RAIZ_HOSTING/data/enviar.config.php";
$CONFIG_EXTRA = is_file($configExterno) ? (require $configExterno) : [];
define('CONFIG', array_replace_recursive($CONFIG_BASE, is_array($CONFIG_EXTRA) ? $CONFIG_EXTRA : []));

// ============================================================ CARPETA DE DATOS
function carpeta_datos(): string {
  static $dir = null;
  if ($dir !== null) return $dir;
  if (CONFIG['carpeta_datos'] !== '') return $dir = CONFIG['carpeta_datos'];
  global $RAIZ_HOSTING;
  if (is_dir("$RAIZ_HOSTING/data") && is_writable("$RAIZ_HOSTING/data")) return $dir = "$RAIZ_HOSTING/data/nimbus-web";
  if (is_dir($RAIZ_HOSTING) && is_writable($RAIZ_HOSTING)) return $dir = "$RAIZ_HOSTING/nimbus_datos";
  return $dir = __DIR__ . '/_datos';
}

// ======================================================================= CORS
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origen !== '' && in_array($origen, CONFIG['cors_origenes'], true)) {
  header("Access-Control-Allow-Origin: $origen");
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
}
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  http_response_code(204);
  exit;
}

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  responder(405, ['ok' => false, 'error' => ['code' => 'METHOD_NOT_ALLOWED', 'message' => 'Solo POST']]);
}

// ================================================================== ENTRADA
$tipus = $_GET['tipus'] ?? trim($_SERVER['PATH_INFO'] ?? '', '/');
if (!in_array($tipus, ['leads', 'coverage-study'], true)) {
  responder(404, ['ok' => false, 'error' => ['code' => 'NOT_FOUND', 'message' => 'Ruta desconocida']]);
}

$cuerpo = file_get_contents('php://input') ?: '';
$datos = json_decode($cuerpo, true);
if (!is_array($datos)) {
  responder(400, ['ok' => false, 'error' => ['code' => 'VALIDATION_ERROR', 'message' => 'El cuerpo no es JSON']]);
}

// ================================================================= ANTISPAM
// Igual que AntiSpamService: honeypot relleno o formulario enviado en menos
// de N segundos = bot. Se responde 200 como si fuera bien, para no dar pistas.
$antiSpam = is_array($datos['antiSpam'] ?? null) ? $datos['antiSpam'] : [];
$honeypot = texto($antiSpam['honeypot'] ?? '');
$segundos = $antiSpam['elapsedSeconds'] ?? null;
if ($honeypot !== '' || (is_numeric($segundos) && (float)$segundos < CONFIG['antispam_min_s'])) {
  registrar('spam', $tipus, $datos);
  responder(200, ['ok' => true, 'data' => ['id' => uuid(), 'status' => 'ignored']]);
}

// =============================================================== VALIDACIÓN
// Mismas reglas que backend/api/src/schemas/*.ts
$errores = [];
$nombre   = texto($datos['name'] ?? '');
$telefono = texto($datos['phone'] ?? '');
$email    = texto($datos['email'] ?? '');
$metodo   = texto($datos['preferredContactMethod'] ?? 'phone');
$idioma   = texto($datos['language'] ?? 'es');

if (!nombre_valido($nombre))                        $errores[] = 'El nombre tiene que tener al menos 2 letras, solo letras y espacios';
if (!preg_match('/^\d{9}$/', $telefono))            $errores[] = 'El teléfono tiene que tener 9 cifras';
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = 'El email no es válido';
if (!in_array($metodo, ['phone', 'whatsapp', 'email', 'office'], true)) $errores[] = 'Método de contacto desconocido';
if (!in_array($idioma, ['es', 'ca', 'en'], true))   $idioma = 'es';
if (($datos['consentAccepted'] ?? false) !== true)   $errores[] = 'Hay que aceptar la política de privacidad';

if ($tipus === 'coverage-study') {
  $problema  = texto($datos['currentProblem'] ?? '');
  $ubicTexto = texto($datos['problemLocationText'] ?? '');
  $ubicTipo  = texto($datos['problemLocationType'] ?? '');
  $servicio  = texto($datos['serviceType'] ?? 'unknown');
  if ($problema === '')                               $errores[] = 'Falta el problema';
  if ($ubicTexto === '' && $ubicTipo === '')          $errores[] = 'Falta la ubicación';
  if ($metodo === 'email' && $email === '')           $errores[] = 'Si el contacto es por email, hace falta el email';
  if (!in_array($servicio, ['mobile', 'fiber', 'internet', 'business', 'unknown', 'security'], true)) $servicio = 'unknown';
}

if ($errores) {
  responder(400, ['ok' => false, 'error' => ['code' => 'VALIDATION_ERROR', 'message' => implode('. ', $errores)]]);
}

// ================================================================ reCAPTCHA
if (CONFIG['recaptcha']) {
  $token = texto($datos['recaptchaToken'] ?? '');
  if (!recaptcha_ok($token)) {
    responder(400, ['ok' => false, 'error' => ['code' => 'RECAPTCHA_FAILED', 'message' => 'No hemos podido verificar que no eres un robot']]);
  }
}

// ================================================================== LEAD
$id = uuid();
$creado = date('c');
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$ip = trim(explode(',', $ip)[0]);

$campos = [ // orden y nombres como en la plantilla de Make, más el origen
  'nombre'             => $nombre,
  'telefono'           => $telefono,
  'email'              => $email ?: '-',
  'metodo de contacto' => $metodo,
  'idioma'             => $idioma,
  'url'                => texto($datos['pageUrl'] ?? ''),
  'origen'             => texto($datos['source'] ?? 'landing') ?: 'landing',
  'consentimiento'     => 'sí',
];

if ($tipus === 'coverage-study') {
  $asunto = 'Nou estudi de cobertura — ' . $nombre;
  $campos = array_merge(array_slice($campos, 0, 3), [
    'ubicacion'        => $ubicTexto ?: $ubicTipo,
    'tipo de problema' => $ubicTipo,
  ], array_slice($campos, 3, 1), [
    'problema'         => $problema,
    'operador'         => texto($datos['currentOperator'] ?? '') ?: '-',
    'tipo de servicio' => $servicio,
  ], array_slice($campos, 4));
} else {
  $asunto = 'Nou lead web — ' . $nombre;
  $campos = array_merge(array_slice($campos, 0, 4), [
    'mensaje'          => texto($datos['message'] ?? '') ?: '-',
  ], array_slice($campos, 4));
}

$texto = "Nou lead des de la web ($tipus)\n\n";
foreach ($campos as $k => $v) {
  $texto .= sprintf("%-18s %s\n", $k . ':', str_replace("\n", "\n" . str_repeat(' ', 19), $v));
}
$texto .= "\n--\nid: $id\ndata: $creado\nip: $ip\n";

// ======================================================= GUARDAR (como DynamoDB)
registrar('lead', $tipus, $datos, $id, $creado, $ip);

// ========================================================== CORREO (como Make)
if (!enviar_correo($asunto, $texto, $email, $nombre, $id)) {
  // El lead ya está guardado en el CSV: no se pierde. Se avisa pero se da por bueno,
  // igual que hacía la Lambda cuando fallaba el webhook de Make.
  error_log("enviar.php: fallo al enviar el correo del lead $id");
}

responder(200, ['ok' => true, 'data' => ['id' => $id, 'status' => 'new']]);

// ================================================================ FUNCIONES
function responder(int $codigo, array $json): never {
  http_response_code($codigo);
  echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function texto(mixed $v): string {
  return is_string($v) ? trim($v) : (is_numeric($v) ? (string)$v : '');
}

function nombre_valido(string $n): bool {
  // Sin mbstring (el PHP de Windows no la trae activada): se cuentan letras con preg.
  return preg_match_all('/\p{L}/u', $n) >= 2
    && preg_match('/^[\p{L}\s]+$/u', $n) === 1;
}

function uuid(): string {
  $b = random_bytes(16);
  $b[6] = chr((ord($b[6]) & 0x0f) | 0x40);
  $b[8] = chr((ord($b[8]) & 0x3f) | 0x80);
  return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($b), 4));
}

function recaptcha_ok(string $token): bool {
  if ($token === '') return false;
  $ctx = stream_context_create(['http' => [
    'method' => 'POST',
    'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
    'content' => http_build_query(['secret' => CONFIG['recaptcha_secret'], 'response' => $token]),
    'timeout' => 5,
  ]]);
  $r = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $ctx);
  $j = $r ? json_decode($r, true) : null;
  return is_array($j) && ($j['success'] ?? false) === true && (float)($j['score'] ?? 0) >= CONFIG['recaptcha_min'];
}

/** Una línea por lead en _datos/leads.csv (lo que antes guardaba DynamoDB). */
function registrar(string $estado, string $tipus, array $datos, string $id = '', string $creado = '', string $ip = ''): void {
  $dir = carpeta_datos();
  if (!is_dir($dir)) @mkdir($dir, 0750, true);
  $ruta = "$dir/leads.csv";
  $nuevo = !is_file($ruta) || filesize($ruta) === 0;
  $f = @fopen($ruta, 'a');
  if (!$f) return;
  if ($nuevo) fputcsv($f, ['id', 'fecha', 'estado', 'tipo', 'ip', 'nombre', 'telefono', 'email', 'idioma', 'origen', 'url', 'datos_json'], ';');
  fputcsv($f, [
    $id ?: uuid(), $creado ?: date('c'), $estado, $tipus, $ip,
    texto($datos['name'] ?? ''), texto($datos['phone'] ?? ''), texto($datos['email'] ?? ''),
    texto($datos['language'] ?? ''), texto($datos['source'] ?? ''), texto($datos['pageUrl'] ?? ''),
    json_encode($datos, JSON_UNESCAPED_UNICODE),
  ], ';');
  fclose($f);
}

/** Manda el correo por SMTP o mail(). En modo prueba lo deja en carpeta_datos/correos/<id>.txt */
function enviar_correo(string $asunto, string $texto, string $replyTo, string $replyNombre, string $id): bool {
  $cab = [
    'From: ' . codificar(CONFIG['de_nombre']) . ' <' . CONFIG['de'] . '>',
    'To: ' . CONFIG['para'],
    'Subject: ' . codificar($asunto),
    'Date: ' . date('r'),
    'Message-ID: <' . $id . '@' . (explode('@', CONFIG['de'])[1] ?? 'nimbustelecom.cat') . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Nimbus-Lead: ' . $id,
  ];
  if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
    $cab[] = 'Reply-To: ' . codificar($replyNombre) . " <$replyTo>";
  }

  if (CONFIG['modo_prueba']) {
    $dir = carpeta_datos() . '/correos';
    if (!is_dir($dir)) @mkdir($dir, 0750, true);
    return (bool) @file_put_contents("$dir/$id.txt", implode("\n", $cab) . "\n\n$texto");
  }

  if (CONFIG['envio'] === 'smtp') {
    return smtp_enviar(CONFIG['smtp'], CONFIG['de'], CONFIG['para'], implode("\r\n", $cab) . "\r\n\r\n" . str_replace("\n", "\r\n", $texto));
  }

  // mail(): To y Subject van aparte, el resto como cabeceras
  $extra = array_filter($cab, fn($l) => !str_starts_with($l, 'To: ') && !str_starts_with($l, 'Subject: '));
  return mail(CONFIG['para'], codificar($asunto), $texto, implode("\r\n", $extra));
}

/**
 * Cliente SMTP mínimo (AUTH LOGIN, SSL directo o STARTTLS). Sin librerías.
 * Devuelve false y deja el motivo en error_log si algo falla.
 */
function smtp_enviar(array $c, string $de, string $para, string $mensaje): bool {
  $host = ($c['seguro'] === 'ssl' ? 'ssl://' : '') . $c['host'];
  $s = @stream_socket_client("$host:{$c['puerto']}", $errno, $errstr, 10);
  if (!$s) { error_log("SMTP: no conecta con {$c['host']}:{$c['puerto']} ($errstr)"); return false; }
  stream_set_timeout($s, 10);

  $leer = function () use ($s): string {
    $out = '';
    while (($l = fgets($s, 512)) !== false) { $out .= $l; if (!isset($l[3]) || $l[3] !== '-') break; }
    return $out;
  };
  $mandar = function (string $cmd, string $esperado) use ($s, $leer): bool {
    fwrite($s, $cmd . "\r\n");
    $r = $leer();
    if (!str_starts_with($r, $esperado)) { error_log("SMTP: '$cmd' -> " . trim($r)); return false; }
    return true;
  };

  $ok = str_starts_with($leer(), '220')
    && $mandar('EHLO nimbustelecom.cat', '250');
  if ($ok && $c['seguro'] === 'tls') {
    $ok = $mandar('STARTTLS', '220')
      && stream_socket_enable_crypto($s, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
      && $mandar('EHLO nimbustelecom.cat', '250');
  }
  if ($ok && $c['usuario'] !== '') {
    $ok = $mandar('AUTH LOGIN', '334')
      && $mandar(base64_encode($c['usuario']), '334')
      && $mandar(base64_encode($c['clave']), '235');
  }
  $ok = $ok
    && $mandar("MAIL FROM:<$de>", '250')
    && $mandar("RCPT TO:<$para>", '250')
    && $mandar('DATA', '354')
    && $mandar(preg_replace('/^\./m', '..', $mensaje) . "\r\n.", '250');
  fwrite($s, "QUIT\r\n");
  fclose($s);
  return $ok;
}

function codificar(string $s): string {
  return preg_match('/[^\x20-\x7e]/', $s) ? '=?UTF-8?B?' . base64_encode($s) . '?=' : $s;
}
