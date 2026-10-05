import type { Metadata } from "next";
import { OffersContent } from "@/components/OffersContent";
import { OFFERS_CONTENT } from "@/lib/offers";
import { alternatesFor, pathFor } from "@/lib/routes";
import { OG_IMAGE_URL, openGraphFor } from "@/lib/seo";

// Una URL, un idioma. El mapa de rutas esta en lib/routes.ts.
const LOCALE = "en" as const;
const { title, description } = OFFERS_CONTENT[LOCALE].meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("ofertes", LOCALE),
  // Amb url i twitter propis: si no, el que es comparteix per WhatsApp o
  // xarxes hereta el titol i la URL de la home.
  openGraph: { ...openGraphFor(title, description, LOCALE), url: pathFor("ofertes", LOCALE) },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE_URL] },
  // Fora de Google a proposit: les visites d'aqui son la mesura dels flyers.
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <OffersContent locale={LOCALE} />;
}
