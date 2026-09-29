import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nimbustelecom.cat";

export const OG_IMAGE_URL = "/og-nimbus.jpg";

export const DEFAULT_TITLE = "Internet i mòbil a la Selva i el Gironès | Nimbus Telecom";
export const DEFAULT_DESCRIPTION =
  "Operador local amb botiga a Sils. Internet, mòbil i fibra amb tècnics propis i atenció de proximitat.";

export const OG_DESCRIPTION =
  "Operador local de la Selva i el Gironès. Internet, mòbil i fibra amb tècnics de casa i botiga física a Sils.";
export const TWITTER_DESCRIPTION =
  "Internet, mòbil i fibra amb atenció propera. Operador local amb botiga a Sils.";

export const HOME_TITLE = "Internet i mòbil a la Selva i el Gironès | Nimbus Telecom";
export const HOME_DESCRIPTION =
  "Operador local amb botiga a Sils. Internet, mòbil i fibra amb tècnics propis i atenció de proximitat. Mirem el teu cas sense compromís.";

export const MOBILE_TITLE = "Problemes de cobertura mòbil | Nimbus Telecom";
export const MOBILE_DESCRIPTION =
  "Línies mòbils amb triple cobertura i atenció propera des de Sils. Revisem el teu cas per ajudar-te a trobar una opció amb més possibilitats reals de cobertura.";


/**
 * Titulo y descripcion por idioma de la home y del funnel de movil. Los otros
 * tres funnels ya los tenian en su propio fichero de contenido
 * (INTERNET_CONTENT, SECURITY_CONTENT, BUSINESS_CONTENT), cada uno con su
 * bloque `meta` por idioma; estos dos eran los que se habian quedado con una
 * sola version.
 *
 * No son traducciones literales: cada idioma lleva los terminos por los que
 * se busca en ese idioma.
 */
export const HOME_SEO: Record<Locale, { title: string; description: string }> = {
  ca: { title: HOME_TITLE, description: HOME_DESCRIPTION },
  es: {
    title: "Internet y móvil en la Selva y el Gironès | Nimbus Telecom",
    description:
      "Operador local con tienda en Sils. Internet, móvil y fibra con técnicos propios y atención cercana. Miramos tu caso sin compromiso.",
  },
  en: {
    title: "Internet and mobile in la Selva and el Gironès | Nimbus Telecom",
    description:
      "Local operator with a shop in Sils. Internet, mobile and fibre with our own technicians and close support. We review your case with no strings attached.",
  },
};

export const MOBILE_SEO: Record<Locale, { title: string; description: string }> = {
  ca: { title: MOBILE_TITLE, description: MOBILE_DESCRIPTION },
  es: {
    title: "Problemas de cobertura móvil | Nimbus Telecom",
    description:
      "Líneas móviles con triple cobertura y atención cercana desde Sils. Revisamos tu caso para ayudarte a encontrar una opción con más posibilidades reales de cobertura.",
  },
  en: {
    title: "Mobile coverage problems | Nimbus Telecom",
    description:
      "Mobile lines with triple coverage and close support from Sils. We review your case to help you find an option with a real chance of better coverage.",
  },
};

/** og:locale por idioma. Sin esto las tres versiones se anunciarian como catalan. */
const OG_LOCALE: Record<Locale, string> = { ca: "ca_ES", es: "es_ES", en: "en_GB" };

  // Next SUSTITUYE el objeto openGraph entero cuando una pagina lo declara:
// no hereda del layout. Este helper devuelve el bloque completo para que
// ninguna ruta pierda la imagen, el locale ni el siteName.
export function openGraphFor(title: string, description: string, locale: Locale = "ca"): Metadata["openGraph"] {
  return {
    title,
    description,
    siteName: "Nimbus Telecom",
    type: "website",
    locale: OG_LOCALE[locale],
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Nimbus Telecom - Operador local de la Selva i el Gironès",
      },
    ],
  };
}