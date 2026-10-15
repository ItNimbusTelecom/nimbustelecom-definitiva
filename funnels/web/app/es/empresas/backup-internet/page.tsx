import type { Metadata } from "next";
import { BusinessServiceContent } from "@/components/BusinessServiceContent";
import { NIMBUS_WIMAX_IMAGE } from "@/lib/brand";
import { INTERNET_BACKUP_CONTENT } from "@/lib/internetBackup";
import { alternatesFor } from "@/lib/routes";
import { openGraphFor } from "@/lib/seo";

// Una URL, un idioma. El mapa de rutas esta en lib/routes.ts.
const LOCALE = "es" as const;
const { title, description } = INTERNET_BACKUP_CONTENT[LOCALE].meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("backupInternet", LOCALE),
  openGraph: openGraphFor(title, description, LOCALE),
};

export default function Page() {
  return (
    <BusinessServiceContent
      page="backupInternet"
      content={INTERNET_BACKUP_CONTENT}
      image={{ src: NIMBUS_WIMAX_IMAGE, alt: "Antena WiMAX de Nimbus Telecom para la conexión de backup", width: 724, height: 840 }}
      locale={LOCALE}
    />
  );
}
