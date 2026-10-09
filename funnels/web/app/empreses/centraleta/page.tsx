import type { Metadata } from "next";
import { BusinessServiceContent } from "@/components/BusinessServiceContent";
import { NIMBUS_PBX_IMAGE } from "@/lib/brand";
import { PBX_CONTENT } from "@/lib/pbx";
import { alternatesFor } from "@/lib/routes";
import { openGraphFor } from "@/lib/seo";

// Una URL, un idioma. El mapa de rutas esta en lib/routes.ts.
const LOCALE = "ca" as const;
const { title, description } = PBX_CONTENT[LOCALE].meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("centraleta", LOCALE),
  openGraph: openGraphFor(title, description, LOCALE),
};

export default function Page() {
  return (
    <BusinessServiceContent
      page="centraleta"
      content={PBX_CONTENT}
      image={{ src: NIMBUS_PBX_IMAGE, alt: "Telèfon IP de centraleta VoIP en una oficina", width: 1200, height: 800 }}
      locale={LOCALE}
    />
  );
}
