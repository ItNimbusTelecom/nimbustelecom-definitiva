import type { Metadata } from "next";
import { InternetContent } from "@/components/InternetContent";
import { INTERNET_CONTENT } from "@/lib/internet";
import { alternatesFor } from "@/lib/routes";
import { openGraphFor } from "@/lib/seo";

// Una URL, un idioma. El mapa de rutas esta en lib/routes.ts.
const LOCALE = "en" as const;
const { title, description } = INTERNET_CONTENT[LOCALE].meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("internet", LOCALE),
  openGraph: openGraphFor(title, description, LOCALE),
};

export default function Page() {
  return <InternetContent locale={LOCALE} />;
}
