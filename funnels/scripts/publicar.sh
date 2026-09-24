#!/usr/bin/env bash
#
# Publica la web de Nimbus en produccion (https://nimbustelecom.cat).
#
#   Uso:
#     ./funnels/scripts/publicar.sh --dry-run   <- compila y verifica, no publica
#     ./funnels/scripts/publicar.sh             <- publica de verdad
#
# Como funciona esto, que no es obvio:
#
#   main      -> codigo fuente. NO se sirve.
#   gh-pages  -> lo que GitHub Pages sirve en el dominio. Es el build.
#
# Por eso el script no copia nada a la raiz de main: compila funnels/web y
# espeja el resultado sobre un worktree de gh-pages. Si algo falla, para:
# no deja la web a medias en produccion.
#
set -euo pipefail

# ---------------------------------------------------------------- parametros
# El build hornea estas dos variables. Si falta la del API, submitLead se cree
# que esta en modo maqueta y da los envios por buenos sin llamar a nadie: los
# formularios pareceran funcionar y no entrara ni un lead. Por eso van aqui y
# no en un `npm run deploy` pelado.
API_BASE_URL="${API_BASE_URL:-https://qzgkq7ipcg.execute-api.eu-west-1.amazonaws.com}"
SITE_URL="${SITE_URL:-https://nimbustelecom.cat}"
DOMINIO_ESPERADO="nimbustelecom.cat"
# Se puede sobreescribir para ensayar el script desde una rama de trabajo:
#   RAMA_FUENTE=mi-rama ./funnels/scripts/publicar.sh --dry-run
RAMA_FUENTE="${RAMA_FUENTE:-main}"
RAMA_PUBLICACION="gh-pages"
APP="funnels/web"

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORKTREE="${TMPDIR:-/tmp}/nimbus-gh-pages"

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

FALLOS=0
titulo() { echo ""; echo "=============================================================="; echo "  $1"; echo "=============================================================="; }
ok()     { echo "  [OK]    $1"; }
aviso()  { echo "  [AVISO] $1"; }
fallo()  { echo "  [FALLO] $1"; FALLOS=$((FALLOS+1)); }

limpiar() { git -C "$RAIZ" worktree remove --force "$WORKTREE" >/dev/null 2>&1 || true; }
trap limpiar EXIT

# ============================================================ 1. PREFLIGHT
titulo "1. COMPROBACIONES PREVIAS"
cd "$RAIZ"

# --- el CNAME que se publicara sale de aqui, no de la raiz del repo
CNAME_FUENTE="$RAIZ/$APP/public/CNAME"
if [ -f "$CNAME_FUENTE" ]; then
  CNAME_CONTENIDO="$(tr -d '\r\n' < "$CNAME_FUENTE")"
  if [ "$CNAME_CONTENIDO" = "$DOMINIO_ESPERADO" ]; then
    ok "public/CNAME: $CNAME_CONTENIDO"
  else
    fallo "public/CNAME dice '$CNAME_CONTENIDO'; al publicar cambiaria el dominio a ese"
  fi
else
  fallo "falta $APP/public/CNAME: la publicacion dejaria el sitio sin dominio"
fi

# --- ningun CNAME suelto que pueda colarse en el build
CNAMES_EXTRA="$(find "$RAIZ/funnels" -name CNAME -not -path "*/node_modules/*" -not -path "*/out/*" -not -path "$CNAME_FUENTE" 2>/dev/null || true)"
if [ -z "$CNAMES_EXTRA" ]; then
  ok "ningun CNAME duplicado en funnels/"
else
  fallo "hay mas de un CNAME, el dominio publicado seria impredecible:"
  echo "$CNAMES_EXTRA" | sed 's/^/          /'
fi

[ -f "$RAIZ/$APP/public/.nojekyll" ] && ok ".nojekyll presente (sin el, Jekyll se come _next/)" \
                                     || fallo "falta $APP/public/.nojekyll: la web saldria sin CSS ni JS"

RAMA_ACTUAL="$(git rev-parse --abbrev-ref HEAD)"
[ "$RAMA_ACTUAL" = "$RAMA_FUENTE" ] && ok "rama actual: $RAMA_ACTUAL" \
                                    || fallo "estas en '$RAMA_ACTUAL'; se publica desde '$RAMA_FUENTE'"

if [ -z "$(git status --porcelain -- "$APP" backend)" ]; then
  ok "arbol de trabajo limpio"
else
  aviso "hay cambios sin comitear: se publicaria codigo que no esta en $RAMA_FUENTE"
  git status --porcelain -- "$APP" backend | sed 's/^/          /'
fi

if git fetch origin "$RAMA_PUBLICACION" --quiet 2>/dev/null; then
  ok "contacto con el remoto"
else
  fallo "no se ha podido contactar con el remoto (sin red o sin credenciales)"
fi

if [ "$FALLOS" -gt 0 ]; then
  echo ""; echo "  >> $FALLOS comprobacion(es) fallida(s). No se publica nada."
  exit 1
fi

# ============================================================ 2. BUILD
titulo "2. BUILD LIMPIA"
cd "$RAIZ/$APP"
echo "  Borrando out/ y .next/ (la cache de Turbopack ya ha dado builds a medias)..."
rm -rf out .next

export NEXT_PUBLIC_STATIC_EXPORT=true
export NEXT_PUBLIC_GITHUB_PAGES=true
export NEXT_PUBLIC_BASE_PATH=""
export NEXT_PUBLIC_API_BASE_URL="$API_BASE_URL"
export NEXT_PUBLIC_SITE_URL="$SITE_URL"

echo "  API : $API_BASE_URL"
echo "  SITE: $SITE_URL"
echo ""
npx next build

# --- Apano para Next 16.2.5 (prefetch) ---
# El export escribe out/<ruta>/__next.<ruta>/__PAGE__.txt pero el router lo pide
# como out/<ruta>/__next.<ruta>.__PAGE__.txt. Solo provoca 404 en consola, pero
# se duplica para dejarlo limpio.
# REVISAR al actualizar Next: si lo corrigen, este bloque sobra.
find out -name "__PAGE__.txt" | while read -r f; do
  cp "$f" "$(dirname "$f").__PAGE__.txt"
done

# ============================================================ 3. VERIFICAR
titulo "3. VERIFICACION DEL EXPORT"
for p in index.html movil/index.html internet/index.html seguridad/index.html \
         empreses/index.html 404.html sitemap.xml robots.txt CNAME .nojekyll; do
  [ -e "out/$p" ] && ok "$p" || fallo "falta out/$p"
done
[ -d "out/_next" ] && ok "_next/ generado" || fallo "falta out/_next/"

# El robots del export depende de SITE_URL: si lleva "staging" se bloquea el
# rastreo entero. Publicar eso en produccion saca la web de Google.
if grep -qi "^Disallow: /" out/robots.txt 2>/dev/null; then
  fallo "robots.txt bloquea el rastreo (SITE_URL apunta a staging?)"
else
  ok "robots.txt permite el rastreo"
fi

if [ "$FALLOS" -gt 0 ]; then
  echo ""; echo "  >> El build esta incompleto. No se toca $RAMA_PUBLICACION."
  exit 1
fi

# ============================================================ 4. ESPEJO
titulo "4. ESPEJO SOBRE $RAMA_PUBLICACION"
cd "$RAIZ"
limpiar
git worktree add --quiet "$WORKTREE" "$RAMA_PUBLICACION"
git -C "$WORKTREE" reset --hard --quiet "origin/$RAMA_PUBLICACION"

rsync -a --delete --exclude '.git' "$RAIZ/$APP/out/" "$WORKTREE/"
git -C "$WORKTREE" add -A

if git -C "$WORKTREE" diff --cached --quiet; then
  echo "  No hay cambios: lo publicado ya es identico a este build."
  exit 0
fi

echo "  Cambios que se publicarian:"
git -C "$WORKTREE" diff --cached --stat | tail -15
echo ""
git -C "$WORKTREE" diff --cached --name-status | awk '{print $1}' | sort | uniq -c | sed 's/^/     /'

if [ "$DRY_RUN" = "1" ]; then
  titulo "ENSAYO COMPLETADO"
  echo "  No se ha comiteado ni subido nada."
  echo ""
  echo "  Para verlo tal cual quedaria publicado:"
  echo "    cd \"$RAIZ/$APP/out\" && python3 -m http.server 8124"
  echo ""
  exit 0
fi

# ============================================================ 5. PUBLICAR
titulo "5. PUBLICACION"
echo "  A partir de aqui la web nueva sustituye a la actual en"
echo "  https://$DOMINIO_ESPERADO (unos minutos hasta que GitHub la sirva)."
echo ""
echo "  Vuelta atras:"
echo "    git push origin $(git -C "$WORKTREE" rev-parse --short HEAD):$RAMA_PUBLICACION --force"
echo "    (ese es el commit que hay publicado ahora mismo, antes de este cambio)"
echo ""
read -r -p "  Publicar de verdad? (escribe PUBLICAR) " CONFIRMA
if [ "$CONFIRMA" != "PUBLICAR" ]; then
  echo "  Cancelado. No se ha subido nada."
  exit 0
fi

git -C "$WORKTREE" commit -q -m "publicacio: $(git -C "$RAIZ" rev-parse --short HEAD)"
git -C "$WORKTREE" push origin "$RAMA_PUBLICACION"

titulo "PUBLICADO"
echo "  Comprobar en unos minutos:"
for p in "" movil/ internet/ seguridad/ empreses/ ofertas-qr/ servicios/; do
  echo "    https://$DOMINIO_ESPERADO/$p"
done
echo ""
echo "  Y despues: reenviar el sitemap en Search Console si han cambiado rutas."
echo ""
