import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
export const dynamic = "force-static";

// Rutas publicas de la web. Las de /public (redirecciones del WordPress
// viejo) NO van aqui: son stubs de redireccion, no contenido indexable.
const RUTAS = [
  { path: "/", priority: 1 },
  { path: "/movil/", priority: 0.9 },
  { path: "/internet/", priority: 0.9 },
  { path: "/aviso-legal/", priority: 0.2 },
  { path: "/politica-de-privacidad/", priority: 0.2 },
  { path: "/politica-de-cookies/", priority: 0.2 },
  { path: "/declaracion-de-accesibilidad/", priority: 0.2 },
  { path: "/seguridad/", priority: 0.9 },
  { path: "/empreses/", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return RUTAS.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: ahora,
    changeFrequency: priority >= 0.9 ? "monthly" : "yearly",
    priority,
  }));
}