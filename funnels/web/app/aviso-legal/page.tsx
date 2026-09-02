import type { Metadata } from "next";
import { LegalPageContent } from "@/components/LegalPageContent";
import { avisoLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: `${avisoLegal.title} | Nimbus Telecom`,
  description: avisoLegal.metaDescription,
  alternates: { canonical: "/aviso-legal/" },
};

export default function AvisoLegalPage() {
  return <LegalPageContent document={avisoLegal} />;
}
