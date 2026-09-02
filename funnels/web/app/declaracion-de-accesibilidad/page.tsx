import type { Metadata } from "next";
import { LegalPageContent } from "@/components/LegalPageContent";
import { declaracionAccesibilidad } from "@/lib/legal";

export const metadata: Metadata = {
  title: `${declaracionAccesibilidad.title} | Nimbus Telecom`,
  description: declaracionAccesibilidad.metaDescription,
  alternates: { canonical: "/declaracion-de-accesibilidad/" },
};

export default function DeclaracionDeAccesibilidadPage() {
  return <LegalPageContent document={declaracionAccesibilidad} />;
}
