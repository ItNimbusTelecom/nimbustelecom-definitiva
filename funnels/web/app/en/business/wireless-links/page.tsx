import type { Metadata } from "next";
import { BusinessServiceContent } from "@/components/BusinessServiceContent";
import { NIMBUS_RADIOLINKS_IMAGE } from "@/lib/brand";
import { RADIOLINKS_CONTENT } from "@/lib/radiolinks";
import { alternatesFor } from "@/lib/routes";
import { openGraphFor } from "@/lib/seo";

// Una URL, un idioma. El mapa de rutas esta en lib/routes.ts.
const LOCALE = "en" as const;
const { title, description } = RADIOLINKS_CONTENT[LOCALE].meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("radioenllacos", LOCALE),
  openGraph: openGraphFor(title, description, LOCALE),
};

export default function Page() {
  return (
    <BusinessServiceContent
      page="radioenllacos"
      content={RADIOLINKS_CONTENT}
      image={{ src: NIMBUS_RADIOLINKS_IMAGE, alt: "Point-to-point wireless link antennas installed by Nimbus Telecom on a rooftop", width: 900, height: 1200 }}
      locale={LOCALE}
    />
  );
}
