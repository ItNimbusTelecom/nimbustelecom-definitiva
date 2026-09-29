import type { MetadataRoute } from "next";
import type { Locale } from "@/lib/i18n";
import { ROUTES, localesFor, type PageKey } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Las rutas con traduccion salen del mapa de lib/routes.ts: una entrada por
// idioma, cada una declarando sus alternativas. Asi el buscador sabe que
// /mobil/, /es/movil/ y /en/mobile/ son la misma pagina en tres idiomas y no
// tres paginas que compiten.
const PAGINAS_TRADUCIDAS: PageKey[] = ["home", "mobil", "internet", "seguretat", "empreses"];

// Las legales existen en un solo idioma, asi que van sueltas. Las
// redirecciones de /public (stubs del WordPress viejo, y los de /movil/ y
// /seguridad/) NO van aqui: no son contenido indexable.
const PAGINAS_SUELTAS = [
  "/aviso-legal/",
  "/politica-de-privacidad/",
  "/politica-de-cookies/",
  "/declaracion-de-accesibilidad/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const entradas: MetadataRoute.Sitemap = [];

  for (const page of PAGINAS_TRADUCIDAS) {
    const idiomas = localesFor(page);
    const alternativas = Object.fromEntries(
      idiomas.map((locale) => [locale, `${SITE_URL}${ROUTES[page][locale]}`]),
    ) as Record<Locale, string>;

    for (const locale of idiomas) {
      entradas.push({
        url: `${SITE_URL}${ROUTES[page][locale]}`,
        lastModified: ahora,
        changeFrequency: "monthly",
        // La home por delante; el catalan por delante de sus traducciones,
        // que es el idioma por defecto del sitio.
        priority: (page === "home" ? 1 : 0.9) - (locale === "ca" ? 0 : 0.1),
        alternates: { languages: alternativas },
      });
    }
  }

  for (const path of PAGINAS_SUELTAS) {
    entradas.push({
      url: `${SITE_URL}${path}`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.2,
    });
  }

  return entradas;
}
