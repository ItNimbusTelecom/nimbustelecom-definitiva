#!/usr/bin/env bash
#
# Construye un funnel y lo publica como subruta del dominio principal.
#
#   Uso:  ./funnels/scripts/publicar-funnel.sh <carpeta-origen> <ruta-publica>
#   Ej.:  ./funnels/scripts/publicar-funnel.sh web movil
#         -> compila funnels/web  y lo deja en /movil/
#         -> queda publicado en https://nimbustelecom.cat/movil/
#
# Ejecutar SIEMPRE desde Git Bash y desde la raiz del repo.
# No hace commit ni push: revisa el resultado antes de subir nada.

set -euo pipefail

FUNNEL="${1:-}"
RUTA="${2:-}"

if [ -z "$FUNNEL" ] || [ -z "$RUTA" ]; then
  echo "Uso: $0 <carpeta-en-funnels> <ruta-publica>"
  echo "Ej.: $0 web movil"
  exit 1
fi

# --- Configuracion (se puede sobreescribir por variable de entorno) ---
API_BASE_URL="${API_BASE_URL:-https://qzgkq7ipcg.execute-api.eu-west-1.amazonaws.com}"
SITE_URL="${SITE_URL:-https://nimbustelecom.cat}"

# --- Rutas ---
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ORIGEN="$RAIZ/funnels/$FUNNEL"
DESTINO="$RAIZ/$RUTA"

# --- Comprobaciones de seguridad ---
if [ ! -d "$ORIGEN" ]; then
  echo "ERROR: no existe la carpeta $ORIGEN"
  exit 1
fi

case "$RUTA" in
  ""|"."|"/"|*..*|*/*)
    echo "ERROR: la ruta publica debe ser un nombre simple (ej. 'movil', 'fibra')."
    exit 1
    ;;
esac

if [ ! -f "$RAIZ/CNAME" ]; then
  echo "ERROR: no encuentro el CNAME en la raiz. Estas en el repo correcto?"
  exit 1
fi

echo ">> Compilando '$FUNNEL' para publicarse en /$RUTA/ ..."

cd "$ORIGEN"

export NEXT_PUBLIC_STATIC_EXPORT=true
export NEXT_PUBLIC_GITHUB_PAGES=true
export NEXT_PUBLIC_BASE_PATH="/$RUTA"
export NEXT_PUBLIC_API_BASE_URL="$API_BASE_URL"
export NEXT_PUBLIC_SITE_URL="$SITE_URL/$RUTA"

npx next build

# --- CRITICO: un funnel nunca debe publicar su propio CNAME ---
# Si se colara, sobreescribiria el dominio de la web principal.
if [ -f out/CNAME ]; then
  echo ">> Eliminando out/CNAME (protege el dominio de la home)"
  rm -f out/CNAME
fi

if [ ! -f out/index.html ]; then
  echo "ERROR: el build no ha generado out/index.html. Abortando."
  exit 1
fi

echo ">> Publicando en $DESTINO ..."
rm -rf "$DESTINO"
cp -r out "$DESTINO"

echo ""
echo "OK. Funnel publicado en /$RUTA/"
echo ""
echo "Siguientes pasos:"
echo "  1. Revisa el resultado en local"
echo "  2. git add -A && git commit -m \"Funnel $FUNNEL\" && git push"
echo "  3. Comprueba $SITE_URL/$RUTA/ tras el despliegue"
