#!/usr/bin/env bash
#
# Publica la web (home + funnels) en la RAIZ del repo.
#
#   Uso:  ./funnels/scripts/publicar-web.sh
#
# Este script compila y copia el resultado a la raiz del repo, que es lo que
# sirve GitHub Pages. El export de WordPress se elimino el 17/08: las URLs
# antiguas se cubren con stubs de redireccion en funnels/web/public/.
#
# Ejecutar desde Git Bash, en la raiz del repo.

set -euo pipefail

API_BASE_URL="${API_BASE_URL:-https://qzgkq7ipcg.execute-api.eu-west-1.amazonaws.com}"
SITE_URL="${SITE_URL:-https://nimbustelecom.cat}"
APP="${APP:-funnels/web}"

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# --- Comprobaciones de seguridad ---
if [ ! -f "$RAIZ/CNAME" ]; then
  echo "ERROR: no encuentro CNAME en la raiz. Estas en el repo correcto?"
  exit 1
fi
if [ ! -d "$RAIZ/$APP" ]; then
  echo "ERROR: no existe $RAIZ/$APP"
  exit 1
fi

echo ">> Compilando la web ..."
cd "$RAIZ/$APP"

export NEXT_PUBLIC_STATIC_EXPORT=true
export NEXT_PUBLIC_GITHUB_PAGES=true
export NEXT_PUBLIC_BASE_PATH=""
export NEXT_PUBLIC_API_BASE_URL="$API_BASE_URL"
export NEXT_PUBLIC_SITE_URL="$SITE_URL"

npx next build

# Un funnel nunca debe publicar su propio CNAME: sobreescribiria el dominio
rm -f out/CNAME

# --- Apano para Next 16.2.5 ---
# El export genera los payloads de prefetch en out/<ruta>/__next.<ruta>/__PAGE__.txt
# pero el router los pide como out/<ruta>/__next.<ruta>.__PAGE__.txt (fichero plano).
# El desajuste solo provoca 404 en la consola: la navegacion cae de vuelta al HTML
# y no se rompe nada. Duplicamos el fichero a la ruta que espera el router.
# REVISAR al actualizar Next: si lo corrigen, este bloque sobra.
find out -name "__PAGE__.txt" | while read -r f; do
  dir=$(dirname "$f")
  cp "$f" "${dir}.__PAGE__.txt"
done

if [ ! -f out/index.html ]; then
  echo "ERROR: el build no ha generado out/index.html. Abortando."
  exit 1
fi

echo ""
echo ">> Se van a SOBREESCRIBIR en la raiz del repo:"
echo "     index.html      (la home)"
echo "     404.html"
echo "     _next/          (assets compilados)"
echo "     movil/ , y el resto de rutas de la app"
echo ""
echo "   Tambien: internet/, seguridad/, chat/, las paginas legales y las redirecciones."
echo ""
read -r -p "   Continuar? (s/N) " RESPUESTA
if [ "$RESPUESTA" != "s" ] && [ "$RESPUESTA" != "S" ]; then
  echo "Cancelado."
  exit 0
fi

# _next se regenera entero para no dejar chunks viejos
rm -rf "$RAIZ/_next"

# Copiar el build a la raiz (sin borrar el resto)
cp -r out/. "$RAIZ/"

echo ""
echo "OK. Web publicada en la raiz del repo."
echo ""
echo "Para verlo en local:"
echo "  cd $RAIZ && npx serve ."
echo "  -> http://localhost:3000/            (home)"
echo "  -> http://localhost:3000/movil/      (funnel cobertura movil)"
echo "  -> http://localhost:3000/internet/   (funnel internet)"
echo "  -> http://localhost:3000/seguridad/  (funnel seguridad)"
echo "  -> http://localhost:3000/chat/       (chat)"
echo "  -> http://localhost:3000/aviso-legal/  (paginas legales)"
echo "  -> http://localhost:3000/telefonia/    (comprobar redireccion a /movil/)"
