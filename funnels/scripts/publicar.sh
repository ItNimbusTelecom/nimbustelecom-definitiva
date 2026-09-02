#!/usr/bin/env bash
#
# Publica la web de Nimbus en produccion. De principio a fin.
#
#   Uso:
#     ./funnels/scripts/publicar.sh --dry-run   <- hace TODO menos commit y push
#     ./funnels/scripts/publicar.sh             <- publica de verdad
#
# Que hace, en orden:
#   1. Comprobaciones previas (aborta si algo no cuadra)
#   2. Build limpia de funnels/web
#   3. Verifica el export
#   4. Copia el resultado a la raiz del repo
#   5. Verifica los stubs de redireccion
#   6. Commit y push  (solo si NO es --dry-run)
#
# Ejecutar desde Git Bash. Si algo falla, el script para: no deja
# la web a medias en produccion.
#
set -euo pipefail

# ---------------------------------------------------------------- parametros
API_BASE_URL="${API_BASE_URL:-https://qzgkq7ipcg.execute-api.eu-west-1.amazonaws.com}"
SITE_URL="${SITE_URL:-https://nimbustelecom.cat}"
APP="${APP:-funnels/web}"
DOMINIO_ESPERADO="nimbustelecom.cat"
REMOTO_ESPERADO="ItNimbusTelecom/nimbus-telecom-home"
RAMA="main"
TAG_BACKUP="wordpress-produccion"

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

DRY_RUN=0
if [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN=1
fi

FALLOS=0
AVISOS=0

titulo() { echo ""; echo "=============================================================="; echo "  $1"; echo "=============================================================="; }
ok()     { echo "  [OK]    $1"; }
aviso()  { echo "  [AVISO] $1"; AVISOS=$((AVISOS+1)); }
fallo()  { echo "  [FALLO] $1"; FALLOS=$((FALLOS+1)); }

# ============================================================ 1. PREFLIGHT
titulo "1. COMPROBACIONES PREVIAS"

# --- estamos en el repo correcto
if [ -f "$RAIZ/CNAME" ]; then
  CNAME_CONTENIDO="$(tr -d '\r\n' < "$RAIZ/CNAME")"
  if [ "$CNAME_CONTENIDO" = "$DOMINIO_ESPERADO" ]; then
    ok "CNAME en la raiz: $CNAME_CONTENIDO"
  else
    fallo "CNAME contiene '$CNAME_CONTENIDO', se esperaba '$DOMINIO_ESPERADO'"
  fi
else
  fallo "no hay CNAME en la raiz. Estas en el repo correcto?"
fi

# --- regla critica: ningun CNAME fuera de la raiz
CNAMES_EXTRA="$(find "$RAIZ" -name CNAME -not -path "*/node_modules/*" -not -path "$RAIZ/CNAME" 2>/dev/null || true)"
if [ -z "$CNAMES_EXTRA" ]; then
  ok "ningun CNAME en subcarpetas (regla critica)"
else
  fallo "hay CNAME fuera de la raiz, sobreescribiria el dominio:"
  echo "$CNAMES_EXTRA" | sed 's/^/          /'
fi

# --- .nojekyll: sin el, Jekyll se come _next/
if [ -f "$RAIZ/.nojekyll" ]; then
  ok ".nojekyll presente (necesario para servir _next/)"
else
  fallo "falta .nojekyll en la raiz: la web se publicaria sin CSS ni JS"
fi

# --- la app existe
if [ -d "$RAIZ/$APP" ]; then
  ok "la app esta en $APP"
else
  fallo "no existe $RAIZ/$APP"
fi

# --- rama y arbol limpio
cd "$RAIZ"
RAMA_ACTUAL="$(git rev-parse --abbrev-ref HEAD)"
if [ "$RAMA_ACTUAL" = "$RAMA" ]; then
  ok "rama actual: $RAMA_ACTUAL"
else
  fallo "estas en la rama '$RAMA_ACTUAL', se esperaba '$RAMA'"
fi

if [ -z "$(git status --porcelain)" ]; then
  ok "arbol de trabajo limpio"
else
  aviso "hay cambios sin comitear (se incluiran en el commit de publicacion):"
  git status --porcelain | sed 's/^/          /'
fi

# --- copia de seguridad del sitio actual
if git rev-parse -q --verify "refs/tags/$TAG_BACKUP" >/dev/null; then
  ok "tag de vuelta atras presente: $TAG_BACKUP"
else
  fallo "no existe el tag '$TAG_BACKUP'. Sin el, no hay vuelta atras marcada."
fi

# --- remoto
if git remote get-url origin >/dev/null 2>&1; then
  URL_REMOTO="$(git remote get-url origin)"
  if echo "$URL_REMOTO" | grep -qi "$REMOTO_ESPERADO"; then
    ok "remoto correcto: $URL_REMOTO"
    echo "          comprobando que el push seria fast-forward ..."
    if git fetch origin "$RAMA" --quiet 2>/dev/null; then
      if git merge-base --is-ancestor "origin/$RAMA" HEAD 2>/dev/null; then
        PENDIENTES="$(git rev-list --count "origin/$RAMA..HEAD")"
        ok "fast-forward limpio ($PENDIENTES commits por subir)"
      else
        fallo "historiales divergentes: el push NO seria fast-forward. Parar y revisar."
      fi
    else
      aviso "no se ha podido contactar con el remoto (sin red o sin credenciales)"
    fi
  else
    fallo "el remoto apunta a '$URL_REMOTO', se esperaba '$REMOTO_ESPERADO'"
  fi
else
  if [ "$DRY_RUN" = "1" ]; then
    aviso "no hay remoto configurado (normal mientras no se publique)"
  else
    fallo "no hay remoto configurado. Anadelo antes de publicar:"
    echo "          git remote add origin https://github.com/$REMOTO_ESPERADO.git"
  fi
fi

if [ "$FALLOS" -gt 0 ]; then
  echo ""
  echo "  >> $FALLOS comprobacion(es) fallida(s). No se publica nada."
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

# Un funnel nunca debe publicar su propio CNAME
rm -f out/CNAME

# --- Apano para Next 16.2.5 (prefetch) ---
# El export escribe out/<ruta>/__next.<ruta>/__PAGE__.txt pero el router
# lo pide como out/<ruta>/__next.<ruta>.__PAGE__.txt. Solo provoca 404 en
# consola, pero se duplica para dejarlo limpio.
# REVISAR al actualizar Next: si lo corrigen, este bloque sobra.
find out -name "__PAGE__.txt" | while read -r f; do
  dir="$(dirname "$f")"
  cp "$f" "${dir}.__PAGE__.txt"
done

# ============================================================ 3. VERIFICAR EXPORT
titulo "3. VERIFICACION DEL EXPORT"

PAGINAS="index.html movil/index.html internet/index.html seguridad/index.html empreses/index.html 404.html sitemap.xml robots.txt"
for p in $PAGINAS; do
  if [ -f "out/$p" ]; then
    ok "$p"
  else
    fallo "falta out/$p"
  fi
done

if [ -d "out/_next" ]; then
  ok "_next/ generado"
else
  fallo "falta out/_next/"
fi

if [ "$FALLOS" -gt 0 ]; then
  echo ""
  echo "  >> El build esta incompleto. No se toca la raiz del repo."
  exit 1
fi

# ============================================================ 4. COPIA A LA RAIZ
titulo "4. COPIA A LA RAIZ DEL REPO"

echo "  Se van a sobreescribir en $RAIZ :"
echo "    index.html, 404.html, sitemap.xml, robots.txt"
echo "    _next/  (se regenera entero)"
echo "    movil/ internet/ seguridad/ empreses/ y las paginas legales"
echo "    los 82 stubs de redireccion"
echo ""
if [ "$DRY_RUN" = "1" ]; then
  echo "  MODO --dry-run: se copia igualmente para poder verificar y verlo en local,"
  echo "  pero NO se hara commit ni push. La raiz queda modificada en tu disco;"
  echo "  para deshacerlo:  git checkout -- . && git clean -fd"
  echo ""
fi
read -r -p "  Continuar? (s/N) " RESPUESTA
if [ "$RESPUESTA" != "s" ] && [ "$RESPUESTA" != "S" ]; then
  echo "  Cancelado. No se ha tocado nada."
  exit 0
fi

rm -rf "$RAIZ/_next"
cp -r out/. "$RAIZ/"
ok "build copiado a la raiz"

# ============================================================ 5. STUBS
titulo "5. VERIFICACION DE LOS STUBS DE REDIRECCION"

cd "$RAIZ"
TOTAL_STUBS=0
STUBS_ROTOS=0
STUBS_EXTERNOS=0

while IFS= read -r f; do
  grep -qi 'http-equiv="refresh"' "$f" 2>/dev/null || continue
  TOTAL_STUBS=$((TOTAL_STUBS+1))
  RUTA="$(dirname "$f" | sed 's|^\./||')"
  DESTINO="$(grep -o 'url=[^"]*' "$f" | head -1 | cut -d= -f2-)"
  DESTINO="${DESTINO%%#*}"
  [ -z "$DESTINO" ] && DESTINO="/"

  # Destinos externos (p.ej. documentacio.nimbustelecom.cat): no se pueden
  # comprobar en disco. Se listan para revisarlos a ojo.
  case "$DESTINO" in
    http://*|https://*|//*)
      STUBS_EXTERNOS=$((STUBS_EXTERNOS+1))
      echo "  [EXT]   $RUTA -> $DESTINO"
      continue
      ;;
  esac

  OBJETIVO="$RAIZ$DESTINO"
  if [ -f "$OBJETIVO" ] || { [ -d "$OBJETIVO" ] && [ -f "$OBJETIVO/index.html" ]; }; then
    :
  else
    fallo "stub '$RUTA' apunta a '$DESTINO', que no existe"
    STUBS_ROTOS=$((STUBS_ROTOS+1))
  fi
done < <(find . -name "index.html" -not -path "./node_modules/*" -not -path "./funnels/*" -not -path "./_next/*")

echo "  Stubs encontrados: $TOTAL_STUBS  (internos: $((TOTAL_STUBS-STUBS_EXTERNOS)), externos: $STUBS_EXTERNOS)"
if [ "$STUBS_ROTOS" -eq 0 ]; then
  ok "todos los stubs internos apuntan a una ruta que existe"
else
  echo ""
  echo "  >> $STUBS_ROTOS stub(s) rotos. Corrigelos antes de publicar."
  echo "     La raiz ya esta modificada; para deshacer:  git checkout -- . && git clean -fd"
  exit 1
fi

# ============================================================ 6. PUBLICAR
if [ "$DRY_RUN" = "1" ]; then
  titulo "ENSAYO COMPLETADO"
  echo "  Todo correcto. No se ha comiteado ni subido nada."
  echo ""
  echo "  Para verlo tal cual quedaria publicado:"
  echo "    cd \"$RAIZ\" && npx serve ."
  echo ""
  echo "  Para dejar el repo como estaba:"
  echo "    cd \"$RAIZ\" && git checkout -- . && git clean -fd"
  echo ""
  [ "$AVISOS" -gt 0 ] && echo "  ($AVISOS aviso(s) mas arriba, revisalos)"
  exit 0
fi

titulo "6. PUBLICACION"

echo "  Ultima parada. A partir de aqui la web nueva sustituye a la actual"
echo "  en https://$DOMINIO_ESPERADO (unos minutos hasta que GitHub la sirva)."
echo ""
echo "  Vuelta atras si algo sale mal:"
echo "    git revert --no-commit HEAD && git commit -m 'revert publicacion' && git push"
echo "    (el estado del WordPress viejo sigue en el tag '$TAG_BACKUP')"
echo ""
read -r -p "  Publicar de verdad? (escribe PUBLICAR) " CONFIRMA
if [ "$CONFIRMA" != "PUBLICAR" ]; then
  echo "  Cancelado. La raiz queda modificada pero sin comitear."
  echo "  Para deshacer:  git checkout -- . && git clean -fd"
  exit 0
fi

git add -A
git commit -m "publicacion: web nueva (home + funnels) sustituye al export de WordPress"
git push origin "$RAMA"

titulo "PUBLICADO"
echo "  Comprobar en unos minutos:"
echo "    https://$DOMINIO_ESPERADO/"
echo "    https://$DOMINIO_ESPERADO/movil/"
echo "    https://$DOMINIO_ESPERADO/internet/"
echo "    https://$DOMINIO_ESPERADO/seguridad/"
echo "    https://$DOMINIO_ESPERADO/empreses/"
echo "    https://$DOMINIO_ESPERADO/servicios/   (debe redirigir)"
echo ""
echo "  Y despues: enviar el sitemap nuevo en Search Console."
echo ""
