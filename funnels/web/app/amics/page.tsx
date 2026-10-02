import type { Metadata } from "next";
import { AmicsContent } from "@/components/AmicsContent";
import { AMICS_META } from "@/lib/amics";
import { alternatesFor, pathFor } from "@/lib/routes";
import { OG_IMAGE_URL, openGraphFor } from "@/lib/seo";

const { title, description } = AMICS_META;

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("amics", "ca"),
  // Es la URL que va al SMS i al email: si es reenvia per WhatsApp, que la
  // previsualitzacio sigui la de la promocio i no la de la home.
  openGraph: { ...openGraphFor(title, description, "ca"), url: pathFor("amics", "ca") },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE_URL] },
  // Promocio amb data de fi: no s'indexa ni va al sitemap. A /amics s'hi
  // arriba pel SMS i el email de referits (amb utm) i pels enllacos de
  // /ofertas-qr/ i /internet/.
  robots: {
    index: false,
    follow: true,
  },
};

export default function AmicsPage() {
  return <AmicsContent />;
}
