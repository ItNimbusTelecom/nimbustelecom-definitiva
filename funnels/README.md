# Funnels — código fuente

Esta carpeta contiene el **código fuente** de la web. No es lo que se sirve.

## Regla mental

- `main` → **código fuente**. GitHub Pages no lo mira.
- `gh-pages` → **el build publicado**. Esto es lo que ve el cliente en
  https://nimbustelecom.cat.

No hay un build copiado a la raíz de `main`: la rama `gh-pages` se regenera
entera a partir de `funnels/web/out/`.

## Estructura

```
funnels/
├── web/                 la web entera: home + los cuatro funnels
└── scripts/
    └── publicar.sh      build + publicación en gh-pages
```

Cada página de servicio (`/movil/`, `/internet/`, `/seguridad/`, `/empreses/`)
es un funnel dentro de la misma app Next.js, no un proyecto aparte. El backend
(API en Lambda + infra CDK) vive en `backend/`, en la raíz del repo, y es común
a todos.

## Publicar

Desde la raíz del repo, con la rama `main` limpia:

```bash
./funnels/scripts/publicar.sh --dry-run   # compila y verifica, no publica
./funnels/scripts/publicar.sh             # publica de verdad
```

El script comprueba el CNAME y el `robots.txt` antes de tocar nada, compila con
las variables de producción, espeja el resultado sobre un worktree de
`gh-pages` y pide confirmación antes del push.

**No publiques con `npm run deploy`.** Ese script compila sin
`NEXT_PUBLIC_API_BASE_URL`, y sin esa variable `lib/submitLead.ts` se cree que
está en modo maqueta: da los envíos por buenos sin llamar a la API. Los
formularios parecerían funcionar y no entraría ni un lead.

## Trabajar en local (sin publicar)

```bash
cd funnels/web
npm install
npm run dev
```

Se abre en `http://localhost:3000` con recarga en caliente.

Para ver el export estático tal cual quedaría publicado:

```bash
cd funnels/web && npx next build && (cd out && python3 -m http.server 8124)
```

## Reglas importantes

1. **El dominio lo fija `funnels/web/public/CNAME`.** Next copia `public/` tal
   cual al export, así que ese fichero acaba en la raíz de `gh-pages` y es el
   que decide en qué dominio se sirve la web. Si se borra, el sitio se queda
   sin dominio; si aparece un segundo `CNAME` en otra carpeta, el resultado es
   impredecible. El script aborta en los dos casos.

2. **Nada de secretos aquí.** El repo es público y GitHub Pages sirve todo el
   contenido tal cual (hay un `.nojekyll`), así que cualquier archivo de
   `public/` es accesible desde internet.

3. **Un solo backend para todos los funnels.** No se despliega un stack por
   funnel: se reutiliza `NimbusFunnelBackend-prod` y cada funnel envía su
   `serviceType` (`mobile`, `internet`, `security`, `business`).
