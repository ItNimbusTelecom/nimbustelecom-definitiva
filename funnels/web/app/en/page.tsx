import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { StructuredData } from "@/components/StructuredData";
import { alternatesFor } from "@/lib/routes";
import { HOME_SEO, openGraphFor } from "@/lib/seo";

// Una URL, un idioma. El mapa de rutas esta en lib/routes.ts.
const LOCALE = "en" as const;
const { title, description } = HOME_SEO[LOCALE];

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("home", LOCALE),
  openGraph: openGraphFor(title, description, LOCALE),
};

export default function Page() {
  return (
    <>
      {/* Ficha de negocio (LocalBusiness): solo en la home, ver lib/structuredData.ts. */}
      <StructuredData />
      <HomePageContent locale={LOCALE} />
    </>
  );
}
