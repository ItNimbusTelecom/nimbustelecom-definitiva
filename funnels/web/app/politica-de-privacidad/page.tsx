import type { Metadata } from "next";
import { LegalPageContent } from "@/components/LegalPageContent";
import { politicaPrivacidad } from "@/lib/legal";

export const metadata: Metadata = {
  title: `${politicaPrivacidad.title} | Nimbus Telecom`,
  description: politicaPrivacidad.metaDescription,
  alternates: { canonical: "/politica-de-privacidad/" },
};

export default function PoliticaDePrivacidadPage() {
  return <LegalPageContent document={politicaPrivacidad} />;
}
