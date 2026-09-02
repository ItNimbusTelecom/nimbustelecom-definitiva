# Funnels — código fuente

Esta carpeta contiene el **código fuente** de los funnels por producto.
No es lo que se publica: lo publicado son las carpetas de la raíz del repo.

## Regla mental

- `funnels/` → **código fuente** (no lo mira nadie de fuera)
- `/movil/`, `/fibra/`, … en la raíz → **build publicado** (esto es lo que ve el cliente)

## Estructura

```
funnels/
├── shared/            componentes y lib comunes a todos los funnels
├── web/   funnel de cobertura móvil  → se publica en /movil/
├── fibra/             funnel de fibra (futuro)   → se publica en /fibra/
├── backend/           API (Express/Lambda) + infra CDK, común a todos
└── scripts/
    ├── publicar-funnel.sh   build + publicación
    └── next.config.ts       config con soporte de basePath
```

## Publicar un funnel

Desde Git Bash, en la raíz del repo:

```bash
./funnels/scripts/publicar-funnel.sh web movil
```

Compila `funnels/web` y deja el resultado en `/movil/`.
No hace commit: revisa antes de subir.

## Trabajar en local (sin publicar)

```bash
cd funnels/web
npm install
npm run dev
```

Se abre en `http://localhost:3000` con recarga en caliente. Es la forma
de iterar el diseño sin tocar producción.

## Reglas importantes

1. **Ningún funnel debe tener `public/CNAME`.** El dominio lo define el
   `CNAME` de la raíz del repo. Si un funnel publica el suyo, sobreescribe
   el de la web principal y la tumba. El script lo borra por si acaso,
   pero lo correcto es que no exista en el código fuente.

2. **Nada de secretos en esta carpeta.** El repo es público y GitHub Pages
   sirve todo el contenido tal cual (hay un `.nojekyll`), así que cualquier
   archivo aquí es accesible desde internet.

3. **Un solo backend para todos los funnels.** No se despliega un stack por
   funnel: se reutiliza `NimbusFunnelBackend-prod` y cada funnel envía su
   `serviceType` (`mobile`, `fiber`, `internet`, `business`).

4. **Lo común va en `shared/`.** Si un cambio (footer, cookies, i18n…) hay
   que repetirlo en dos funnels, es que ese componente debería estar en
   `shared/`.
