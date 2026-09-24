import type { Locale } from "@/lib/i18n";

/**
 * MAPA DE URLs POR IDIOMA — unica fuente de verdad.
 *
 * De aqui salen los enlaces del selector de idioma, el canonical de cada
 * pagina, las etiquetas hreflang y el sitemap. Si una URL se cambia, se cambia
 * aqui y el resto se entera solo.
 *
 * El catalan va SIN PREFIJO por ser el idioma por defecto del sitio; el resto
 * cuelgan de /es/ y /en/. Cada idioma tiene su propia URL y su propio HTML: la
 * traduccion no se hace en el navegador, porque lo que no es una URL no lo
 * indexa nadie.
 *
 * Los slugs no son traducciones automaticas: son los terminos por los que se
 * busca en cada idioma. Por eso /en/business/ y no /en/companies/.
 */
export type PageKey = "home" | "mobil" | "internet" | "seguretat" | "empreses";

export const ROUTES: Record<PageKey, Partial<Record<Locale, string>>> = {
  home: { ca: "/", es: "/es/", en: "/en/" },
  mobil: { ca: "/mobil/", es: "/es/movil/", en: "/en/mobile/" },
  internet: { ca: "/internet/", es: "/es/internet/", en: "/en/internet/" },
  seguretat: { ca: "/seguretat/", es: "/es/seguridad/", en: "/en/security/" },
  empreses: { ca: "/empreses/", es: "/es/empresas/", en: "/en/business/" },
};

/**
 * URLs que existian antes de separar por idioma y que ahora redirigen. Estan
 * indexadas y el sitemap se envio a Search Console el 24/09, asi que no se
 * pueden dejar caer: cada una tiene su stub en public/.
 */
export const REDIRECCIONES: Record<string, string> = {
  "/movil/": "/mobil/",
  "/seguridad/": "/seguretat/",
};

export function pathFor(page: PageKey, locale: Locale): string | undefined {
  return ROUTES[page][locale];
}

/** Idiomas en los que existe esa pagina, en el orden del selector. */
export function localesFor(page: PageKey): Locale[] {
  return (["ca", "es", "en"] as const).filter((locale) => Boolean(ROUTES[page][locale]));
}

/**
 * Bloque `alternates` para el metadata de Next: canonical del idioma que se
 * sirve y un hreflang por cada traduccion. El x-default apunta al catalan,
 * que es lo que ve quien llega sin preferencia declarada.
 */
export function alternatesFor(page: PageKey, locale: Locale) {
  const languages: Record<string, string> = {};

  for (const otro of localesFor(page)) {
    languages[otro] = ROUTES[page][otro] as string;
  }
  languages["x-default"] = ROUTES[page].ca as string;

  return {
    canonical: pathFor(page, locale) as string,
    languages,
  };
}

/**
 * Enlace a una pagina en el idioma que se esta sirviendo. Si esa pagina no
 * existe en ese idioma se cae al catalan, que siempre esta: mas vale un
 * enlace en otro idioma que un enlace roto.
 */
export function linkTo(page: PageKey, locale: Locale, hash = ""): string {
  return `${pathFor(page, locale) ?? (ROUTES[page].ca as string)}${hash}`;
}

/**
 * Los servicios de la home (lib/hub.ts) se identifican por un id estable en
 * los tres idiomas. El destino de cada uno se deriva de aqui en vez de ir
 * escrito en el contenido: asi cada idioma enlaza a su propia version y no
 * hay doce URLs repartidas por el diccionario que actualizar a mano.
 */
const PAGINA_POR_SERVICIO: Record<string, PageKey> = {
  movil: "mobil",
  internet: "internet",
  seguridad: "seguretat",
  empresas: "empreses",
};

export function linkToService(serviceId: string, locale: Locale): string | undefined {
  const page = PAGINA_POR_SERVICIO[serviceId];
  return page ? linkTo(page, locale) : undefined;
}
