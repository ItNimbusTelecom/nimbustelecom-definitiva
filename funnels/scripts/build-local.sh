#!/usr/bin/env bash
# Compila la web en modo export (igual que publicar-web.sh) pero SIN publicar.
# Uso: ./funnels/scripts/build-local.sh   (desde la raiz del repo)
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../web"
export NEXT_PUBLIC_STATIC_EXPORT=true
export NEXT_PUBLIC_GITHUB_PAGES=true
export NEXT_PUBLIC_BASE_PATH=""
rm -rf out
npx next build

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

echo ""
echo ">> Build en funnels/web/out — para probarlo:  cd funnels/web && npx serve out"
