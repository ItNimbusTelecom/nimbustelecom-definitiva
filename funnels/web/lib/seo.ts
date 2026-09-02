import type { Metadata } from "next";

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

  // Next SUSTITUYE el objeto openGraph entero cuando una pagina lo declara:
// no hereda del layout. Este helper devuelve el bloque completo para que
// ninguna ruta pierda la imagen, el locale ni el siteName.
export function openGraphFor(title: string, description: string): Metadata["openGraph"] {
  return {
    title,
    description,
    siteName: "Nimbus Telecom",
    type: "website",
    locale: "ca_ES",
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