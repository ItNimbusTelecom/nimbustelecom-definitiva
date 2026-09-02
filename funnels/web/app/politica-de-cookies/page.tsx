import type { Metadata } from "next";
import { LegalPageContent } from "@/components/LegalPageContent";
import { politicaCookies } from "@/lib/legal";

export const metadata: Metadata = {
  title: `${politicaCookies.title} | Nimbus Telecom`,
  description: politicaCookies.metaDescription,
  alternates: { canonical: "/politica-de-cookies/" },
};

export default function PoliticaDeCookiesPage() {
  return <LegalPageContent document={politicaCookies} />;
}
