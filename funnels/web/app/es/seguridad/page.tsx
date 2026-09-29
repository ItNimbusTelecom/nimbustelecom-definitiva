import type { Metadata } from "next";
import { SecurityContent } from "@/components/SecurityContent";
import { SECURITY_CONTENT } from "@/lib/security";
import { alternatesFor } from "@/lib/routes";
import { openGraphFor } from "@/lib/seo";

// Una URL, un idioma. El mapa de rutas esta en lib/routes.ts.
const LOCALE = "es" as const;
const { title, description } = SECURITY_CONTENT[LOCALE].meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("seguretat", LOCALE),
  openGraph: openGraphFor(title, description, LOCALE),
};

export default function Page() {
  return <SecurityContent locale={LOCALE} />;
}
