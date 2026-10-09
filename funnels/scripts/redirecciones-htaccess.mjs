// Genera las redirecciones 301 de Apache a partir de las paginas de
// redireccion (stubs) que hay en el export de Next (out/).
//
//   node funnels/scripts/redirecciones-htaccess.mjs <carpeta out>
//
// Un stub es un index.html con <meta http-equiv="refresh" content="0; url=...">.
// En GitHub Pages esa meta es la unica forma de redirigir; en Apache se puede
// hacer un 301 de verdad, que el buscador entiende mejor.
//
// Ademas de generar las reglas, comprueba lo que en el .htaccess antiguo se
// rompio sin que nadie lo viera:
//   - cadenas: un stub que apunta a otro stub (se resuelven al destino final)
//   - bucles: A -> B -> A
//   - destinos que no existen en el export
//
// Escribe las reglas por la salida estandar. Si encuentra un problema, lo
// escribe por la salida de error y termina con codigo 1.

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const out = process.argv[2];
if (!out || !existsSync(out)) {
  console.error("Uso: node redirecciones-htaccess.mjs <carpeta out>");
  process.exit(2);
}

function* indices(dir) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) {
      if (nombre === "_next") continue;
      yield* indices(ruta);
    } else if (nombre === "index.html") {
      yield ruta;
    }
  }
}

const REFRESH = /<meta\s+http-equiv=["']refresh["']\s+content=["']\s*\d+\s*;\s*url=([^"']+)["']/i;

// ruta publica ("/movil/") -> destino tal cual lo pone el stub ("/mobil/")
const stubs = new Map();
// rutas que son paginas reales (no stubs)
const reales = new Set();

for (const fichero of indices(out)) {
  const dir = relative(out, fichero).split(sep).slice(0, -1).join("/");
  const ruta = dir ? `/${dir}/` : "/";
  const m = readFileSync(fichero, "utf8").match(REFRESH);
  if (m) stubs.set(ruta, m[1].trim());
  else reales.add(ruta);
}

const problemas = [];

function separar(destino) {
  const i = destino.indexOf("#");
  return i === -1 ? [destino, ""] : [destino.slice(0, i), destino.slice(i)];
}

function resolver(origen) {
  const vistos = [origen];
  let destino = stubs.get(origen);
  for (;;) {
    if (/^https?:\/\//.test(destino)) return destino;
    const [ruta, ancla] = separar(destino);
    if (!stubs.has(ruta)) {
      if (!reales.has(ruta)) problemas.push(`${origen} -> ${destino}: el destino no existe en el export`);
      return destino;
    }
    if (vistos.includes(ruta)) {
      problemas.push(`bucle: ${[...vistos, ruta].join(" -> ")}`);
      return destino;
    }
    vistos.push(ruta);
    const [siguiente, anclaSiguiente] = separar(stubs.get(ruta));
    // el ancla del primer salto manda; si no tenia, se hereda la del siguiente
    destino = siguiente + (ancla || anclaSiguiente);
  }
}

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const reglas = [...stubs.keys()]
  .sort()
  .map((origen) => {
    const destino = resolver(origen);
    const patron = escapar(origen.replace(/^\/|\/$/g, ""));
    // Destino absoluto y en https: si no, Apache arma la URL con el esquema
    // de la peticion y algunas acabarian en un salto extra por http.
    const absoluto = destino.startsWith("/") ? `https://%{HTTP_HOST}${destino}` : destino;
    return `RewriteRule ^${patron}/?$ ${absoluto} [R=301,L,NE]`;
  });

if (problemas.length) {
  for (const p of problemas) console.error(p);
  process.exit(1);
}

console.log("<IfModule mod_rewrite.c>");
console.log("  RewriteEngine On");
for (const r of reglas) console.log(`  ${r}`);
console.log("</IfModule>");
console.error(`${reglas.length} redirecciones generadas desde los stubs`);
