import type { Metadata } from "next";
import { MobilePageContent } from "@/components/MobilePageContent";
import { alternatesFor } from "@/lib/routes";
import { MOBILE_SEO, openGraphFor } from "@/lib/seo";

// Una URL, un idioma. El mapa de rutas esta en lib/routes.ts.
const LOCALE = "ca" as const;
const { title, description } = MOBILE_SEO[LOCALE];

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("mobil", LOCALE),
  openGraph: openGraphFor(title, description, LOCALE),
};

export default function Page() {
  return <MobilePageContent locale={LOCALE} />;
}
