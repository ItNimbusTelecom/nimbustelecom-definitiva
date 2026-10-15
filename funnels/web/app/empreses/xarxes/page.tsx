import type { Metadata } from "next";
import { BusinessServiceContent } from "@/components/BusinessServiceContent";
import { NIMBUS_NETWORKS_IMAGE } from "@/lib/brand";
import { NETWORKS_CONTENT } from "@/lib/networks";
import { alternatesFor } from "@/lib/routes";
import { openGraphFor } from "@/lib/seo";

// Una URL, un idioma. El mapa de rutas esta en lib/routes.ts.
const LOCALE = "ca" as const;
const { title, description } = NETWORKS_CONTENT[LOCALE].meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("xarxes", LOCALE),
  openGraph: openGraphFor(title, description, LOCALE),
};

export default function Page() {
  return (
    <BusinessServiceContent
      page="xarxes"
      content={NETWORKS_CONTENT}
      image={{ src: NIMBUS_NETWORKS_IMAGE, alt: "Rack de comunicacions amb cablejat de xarxa instal·lat per Nimbus Telecom", width: 900, height: 1200 }}
      locale={LOCALE}
    />
  );
}
