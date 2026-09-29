import type { Metadata } from "next";
import { BusinessContent } from "@/components/BusinessContent";
import { BUSINESS_CONTENT } from "@/lib/business";
import { alternatesFor } from "@/lib/routes";
import { openGraphFor } from "@/lib/seo";

// Una URL, un idioma. El mapa de rutas esta en lib/routes.ts.
const LOCALE = "ca" as const;
const { title, description } = BUSINESS_CONTENT[LOCALE].meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("empreses", LOCALE),
  openGraph: openGraphFor(title, description, LOCALE),
};

export default function Page() {
  return <BusinessContent locale={LOCALE} />;
}
