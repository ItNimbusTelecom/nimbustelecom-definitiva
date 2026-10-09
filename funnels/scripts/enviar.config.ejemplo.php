<?php
// Configuración de web/api/enviar.php para ESTE servidor.
// Copiar a: <raiz del hosting>/data/enviar.config.php   (al lado de web/, no dentro)
// Solo hace falta poner lo que cambie respecto a los valores por defecto de enviar.php.
return [
  'modo_prueba' => false,            // true = no manda correo, lo guarda en data/nimbus-web/correos/

  // --- Opción A: relay de Google Workspace (remitente @nimbustelecom.cat, sin contraseña) ---
  'de'   => 'noreply@nimbustelecom.cat',
  'smtp' => ['host' => 'smtp-relay.gmail.com', 'puerto' => 587, 'seguro' => 'tls', 'usuario' => '', 'clave' => ''],

  // --- Opción C: SMTP de SWHosting con el buzón noreply@nimbustelecom.com ---
  // 'de'   => 'noreply@nimbustelecom.com',
  // 'smtp' => ['host' => 'mail.nimbustelecom.com', 'puerto' => 465, 'seguro' => 'ssl',
  //            'usuario' => 'noreply@nimbustelecom.com', 'clave' => 'LA_CONTRASENA_DEL_BUZON'],
];
