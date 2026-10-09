#!/usr/bin/env bash
#
# Prepara la web de Nimbus para subirla a SWHosting (https://nimbustelecom.cat).
#
#   Uso (desde la raiz del repo, en la rama que se quiere publicar):
#     ./funnels/scripts/preparar-swhosting.sh
#
# Que hace:
#   1. Comprobaciones previas (rama, arbol limpio).
#   2. Build limpia del export estatico de Next.
#   3. Genera out/.htaccess: la base de public/.htaccess + las redirecciones
#      301 sacadas de los stubs (con cadenas y bucles resueltos o detectados).
#   4. Quita lo que solo sirve a GitHub Pages (CNAME, .nojekyll).
#   5. Verifica el export.
#   6. Empaqueta out/ en un .zip listo para subir por el gestor de archivos
#      de SWPanel (o se sube la carpeta out/ tal cual por FTP).
#
# No sube nada: la subida a SWHosting es manual.
#
set -euo pipefail

# Git Bash (MSYS) convierte cualquier valor que empiece por "/" en una ruta de
# Windows al pasarselo a node: "/api/enviar.php" llegaria al build como
# "C:/Program Files/Git/api/enviar.php". Se desactiva esa conversion.
export MSYS_NO_PATHCONV=1
export MSYS2_ENV_CONV_EXCL='*'

API_BASE_URL="${API_BASE_URL:-/api/enviar.php}"
SITE_URL="${SITE_URL:-https://nimbustelecom.cat}"
APP="funnels/web"

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SCRIPTS="$RAIZ/funnels/scripts"

FALLOS=0
titulo() { echo ""; echo "=============================================================="; echo "  $1"; echo "=============================================================="; }
ok()     { echo "  [OK]    $1"; }
aviso()  { echo "  [AVISO] $1"; }
fallo()  { echo "  [FALLO] $1"; FALLOS=$((FALLOS+1)); }
parar()  { if [ "$FALLOS" -gt 0 ]; then echo ""; echo "  >> $FALLOS comprobacion(es) fallida(s). $1"; exit 1; fi; }

# ============================================================ 1. PREFLIGHT
titulo "1. COMPROBACIONES PREVIAS"
cd "$RAIZ"

command -v node >/dev/null && ok "node $(node --version)" || fallo "no se encuentra node"
[ -d "$RAIZ/$APP/node_modules" ] && ok "dependencias instaladas" \
  || fallo "faltan las dependencias: cd $APP && npm ci"

RAMA="$(git rev-parse --abbrev-ref HEAD)"
COMMIT="$(git rev-parse --short HEAD)"
[ "$RAMA" = "main" ] && ok "rama: main ($COMMIT)" || aviso "estas en '$RAMA', no en main ($COMMIT)"

if [ -z "$(git status --porcelain -- "$APP")" ]; then
  ok "arbol de trabajo limpio"
else
  aviso "hay cambios sin comitear: el paquete incluira codigo que no esta en git"
  git status --porcelain -- "$APP" | sed 's/^/          /'
fi
parar "No se prepara nada."

# ============================================================ 2. BUILD
titulo "2. BUILD LIMPIA"
cd "$RAIZ/$APP"
rm -rf out .next

# NEXT_PUBLIC_GITHUB_PAGES activa el export estatico en next.config.ts; el
# nombre es historico, sirve igual para SWHosting.
export NEXT_PUBLIC_STATIC_EXPORT=true
export NEXT_PUBLIC_GITHUB_PAGES=true
export NEXT_PUBLIC_BASE_PATH=""
export NEXT_PUBLIC_API_BASE_URL="$API_BASE_URL"
export NEXT_PUBLIC_SITE_URL="$SITE_URL"
echo "  API : $API_BASE_URL"
echo "  SITE: $SITE_URL"
echo ""
npx --no-install next build

# Apano para el prefetch de Next 16 (mismo que en publicar.sh): el export
# escribe <ruta>/__next.<ruta>/__PAGE__.txt y el router lo pide como
# <ruta>/__next.<ruta>.__PAGE__.txt. Solo da 404 en consola; se duplica.
find out -name "__PAGE__.txt" | while read -r f; do
  cp "$f" "$(dirname "$f").__PAGE__.txt"
done

# ============================================================ 3. .htaccess
titulo "3. .htaccess PARA APACHE"
# (con la conversion de rutas desactivada, la ruta del .mjs hay que pasarsela
#  a node ya en formato Windows)
MJS="$SCRIPTS/redirecciones-htaccess.mjs"
command -v cygpath >/dev/null && MJS="$(cygpath -w "$MJS")"
if node "$MJS" out > out/.redirecciones.tmp; then
  cat public/.htaccess out/.redirecciones.tmp > out/.htaccess
  ok "out/.htaccess = base + $(grep -c '^  RewriteRule' out/.redirecciones.tmp) redirecciones"
  rm out/.redirecciones.tmp
else
  rm -f out/.redirecciones.tmp
  fallo "las redirecciones tienen problemas (ver arriba)"
fi
grep -v "^ *#" out/.htaccess | grep -q "<Location" && fallo "out/.htaccess contiene <Location...>: en .htaccess da error 500" \
                                  || ok "sin directivas prohibidas en .htaccess"
parar "No se empaqueta nada."

# ============================================================ 4. LIMPIEZA
titulo "4. QUITAR LO DE GITHUB PAGES"
rm -f out/CNAME out/.nojekyll
ok "CNAME y .nojekyll fuera"

# ============================================================ 5. VERIFICAR
titulo "5. VERIFICACION DEL EXPORT"
for p in index.html 404.html mobil/index.html internet/index.html seguretat/index.html \
         empreses/index.html es/index.html en/index.html sitemap.xml robots.txt llms.txt .htaccess; do
  [ -e "out/$p" ] && ok "$p" || fallo "falta out/$p"
done
[ -d out/_next/static ] && ok "_next/static/ generado" || fallo "falta out/_next/static/"
grep -qi "^Disallow: /$" out/robots.txt && fallo "robots.txt bloquea el rastreo (SITE_URL de staging?)" \
                                         || ok "robots.txt permite el rastreo"
grep -q "nimbustelecom.cat" out/sitemap.xml && ok "sitemap con el dominio de produccion" \
                                            || fallo "el sitemap no apunta a nimbustelecom.cat"
parar "El export no esta bien. No se empaqueta."

# ============================================================ 6. PAQUETE
titulo "6. PAQUETE PARA SWHOSTING"
ZIP="nimbus-web-$COMMIT.zip"
rm -f "$ZIP"
if command -v cygpath >/dev/null && [ -x /c/Windows/System32/tar.exe ]; then
  # Windows: el tar del sistema sabe hacer zip (el de Git Bash no)
  /c/Windows/System32/tar.exe -a -c -f "$(cygpath -w "$PWD/$ZIP")" -C "$(cygpath -w "$PWD/out")" .
elif command -v zip >/dev/null; then
  (cd out && zip -qr "../$ZIP" .)
else
  ZIP=""
fi

if [ -n "$ZIP" ] && [ -f "$ZIP" ]; then
  ok "$APP/$ZIP ($(du -h "$ZIP" | cut -f1))"
else
  aviso "no se ha podido crear el .zip: sube el CONTENIDO de $APP/out/ por FTP"
fi

titulo "LISTO PARA SUBIR"
cat <<EOF
  En SWPanel -> Gestor de archivos -> carpeta de la web (public_html o la
  que tenga asignada el dominio):

    1. Sube $ZIP y descomprimelo ahi mismo. Tiene que quedar
       index.html y .htaccess en la raiz de la carpeta, no dentro de
       una subcarpeta "out".
    2. Borra el .zip del servidor.

  Comprobar despues (en incognito):
    https://$( echo "$SITE_URL" | sed 's#https\?://##' )/
    https://$( echo "$SITE_URL" | sed 's#https\?://##' )/llms.txt
    https://$( echo "$SITE_URL" | sed 's#https\?://##' )/movil/   -> tiene que redirigir a /mobil/
EOF
