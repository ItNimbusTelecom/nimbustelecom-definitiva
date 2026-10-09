#!/usr/bin/env bash
#
# IndexNow: avisa a Bing de las paginas que han cambiado al publicar.
#
#   Lo llama publicar.sh despues de subir gh-pages. Tambien se puede usar a
#   mano para avisar de URLs concretas:
#     bash funnels/scripts/indexnow.sh https://nimbustelecom.cat/empreses/xarxes/ ...
#
# Que es y por que esta aqui:
#
#   IndexNow es un aviso que se manda a Bing (y a Yandex, Seznam, Naver...,
#   que comparten los avisos entre ellos) con la lista de URLs nuevas o
#   cambiadas. Google NO lo usa: para Google sigue valiendo el sitemap y la
#   Inspeccion de URLs de Search Console. Copilot se alimenta de Bing.
#
#   Bing comprueba que el aviso viene del dueno de la web pidiendo el fichero
#   de la clave: https://nimbustelecom.cat/<CLAVE>.txt, que contiene la propia
#   clave. Vive en funnels/web/public/. La clave NO es secreta (es publica por
#   diseno); solo demuestra que controlamos el dominio. Si algun dia se cambia,
#   hay que cambiar a la vez el fichero y la variable de abajo.
#
#   Solo se avisa de las paginas del sitemap cuyo contenido ha cambiado de
#   verdad. Cada build de Next cambia los nombres con hash de /_next/static en
#   TODAS las paginas, asi que comparar el HTML tal cual daria "todo cambiado"
#   siempre. Por eso se comparan sin scripts, sin <link> y sin esos hashes
#   (ver indexnow_normaliza). Bing pide no avisar de URLs que no cambian.
#
#   Si el aviso falla, la publicacion NO se deshace: la web ya esta subida y
#   Bing la acabara encontrando por el sitemap. Solo se informa.
#
# Respuestas de api.indexnow.org: 200 recibido; 202 recibido, clave pendiente
# de validar (normal la primera vez); 400 peticion mal formada; 403 clave no
# valida (el fichero no se encuentra o no coincide); 422 URLs que no son del
# dominio; 429 demasiados avisos.

INDEXNOW_CLAVE="90c82ebf97568ff6e0ae3ac0f5907cef"
INDEXNOW_HOST="nimbustelecom.cat"
INDEXNOW_ENDPOINT="https://api.indexnow.org/indexnow"

# HTML -> HTML sin lo que cambia en cada build aunque la pagina sea igual.
# Se conservan los JSON-LD, que si son contenido.
indexnow_normaliza() {
  perl -0777 -pe '
    s{<script\b(?![^>]*application/ld\+json)[^>]*>.*?</script>}{}gs;
    s{<link\b[^>]*>}{}g;
    s{/_next/static/[^"\x27\s)]+}{X}g;
  '
}

# Lista (una por linea) las URLs del sitemap cuya pagina ha cambiado entre lo
# publicado (HEAD del worktree de gh-pages) y lo que hay ahora en el worktree.
#   $1 = worktree de gh-pages, ya con el build nuevo copiado encima
#   $2 = URL base del sitio (https://nimbustelecom.cat)
indexnow_cambiadas() {
  local worktree="$1" base="${2%/}" loc ruta fichero antes despues
  [ -f "$worktree/sitemap.xml" ] || return 0
  grep -o '<loc>[^<]*</loc>' "$worktree/sitemap.xml" | sed 's/<[^>]*>//g' | while read -r loc; do
    ruta="${loc#"$base"}"; ruta="${ruta#/}"
    fichero="${ruta}index.html"
    [ -f "$worktree/$fichero" ] || continue
    despues="$(indexnow_normaliza < "$worktree/$fichero" | md5sum)"
    antes="$(git -C "$worktree" show "HEAD:$fichero" 2>/dev/null | indexnow_normaliza | md5sum)"
    [ "$antes" != "$despues" ] && echo "$loc"
  done
  return 0
}

# Envia las URLs recibidas como argumentos. Devuelve siempre 0.
indexnow_enviar() {
  [ "$#" -gt 0 ] || { echo "  IndexNow: ninguna pagina con cambios, no se avisa."; return 0; }

  local fichero_clave="https://$INDEXNOW_HOST/$INDEXNOW_CLAVE.txt" intento lista="" url codigo
  # La primera vez el fichero de la clave sube con la propia publicacion y
  # GitHub Pages tarda un minuto o dos en servirlo. Se espera a que este.
  for intento in $(seq 1 18); do
    [ "$(curl -s --max-time 10 "$fichero_clave" 2>/dev/null)" = "$INDEXNOW_CLAVE" ] && break
    [ "$intento" -eq 1 ] && echo "  IndexNow: esperando a que GitHub Pages sirva el fichero de la clave..."
    sleep 10
  done

  for url in "$@"; do lista="$lista${lista:+,}\"$url\""; done
  codigo="$(printf '{"host":"%s","key":"%s","keyLocation":"%s","urlList":[%s]}' \
              "$INDEXNOW_HOST" "$INDEXNOW_CLAVE" "$fichero_clave" "$lista" \
            | curl -s -o /dev/null -w '%{http_code}' --max-time 30 \
                   -H 'Content-Type: application/json; charset=utf-8' \
                   --data-binary @- "$INDEXNOW_ENDPOINT" 2>/dev/null || true)"

  case "$codigo" in
    200|202) echo "  IndexNow: Bing avisado de $# pagina(s) (respuesta $codigo)." ;;
    403)     echo "  [AVISO] IndexNow 403: Bing no acepta la clave. Comprobar que $fichero_clave se ve en el navegador." ;;
    *)       echo "  [AVISO] IndexNow no ha ido bien (respuesta '${codigo:-sin conexion}'). La web esta publicada igual;" \
                  "se puede repetir a mano: bash funnels/scripts/indexnow.sh <URLs>" ;;
  esac
  return 0
}

# Uso directo: bash funnels/scripts/indexnow.sh URL [URL...]
if [ "${BASH_SOURCE[0]}" = "$0" ]; then
  [ "$#" -gt 0 ] || { echo "Uso: bash $0 https://$INDEXNOW_HOST/ruta/ [...]"; exit 1; }
  indexnow_enviar "$@"
fi
