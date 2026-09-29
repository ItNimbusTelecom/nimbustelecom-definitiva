import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import {
  NIMBUS_APPLE_TOUCH_ICON,
  NIMBUS_FAVICON_32,
  NIMBUS_FAVICON_192,
  NIMBUS_MS_TILE_IMAGE,
} from "@/lib/brand";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_DESCRIPTION,
  OG_IMAGE_URL,
  SITE_URL,
  TWITTER_DESCRIPTION,
} from "@/lib/seo";
import "./globals.css";
// En staging es bloqueja la indexacio: una copia de la web al index de
// Google competiria amb la de produccio. En produccio no fa res.
const IS_STAGING = SITE_URL.includes("staging");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  applicationName: "Nimbus Telecom",
  authors: [{ name: "Nimbus Telecom" }],
  creator: "Nimbus Telecom",
  publisher: "Nimbus Telecom",
  robots: IS_STAGING
    ? { index: false, follow: false }
    : { index: true, follow: true },
  openGraph: {
    title: DEFAULT_TITLE,
    description: OG_DESCRIPTION,
    siteName: "Nimbus Telecom",
    type: "website",
    locale: "ca_ES",
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Nimbus Telecom - Operador local de la Selva i el Gironès",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: TWITTER_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  icons: {
    icon: [
      { url: NIMBUS_FAVICON_32, sizes: "32x32", type: "image/png" },
      { url: NIMBUS_FAVICON_192, sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: NIMBUS_APPLE_TOUCH_ICON, sizes: "180x180", type: "image/png" }],
  },
  other: {
    "msapplication-TileImage": NIMBUS_MS_TILE_IMAGE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // El lang se queda en "ca" en el HTML estatico y lo corrige I18nProvider
    // al hidratar. No es por gusto: en el App Router solo el layout raiz puede
    // pintar <html>, y con output: export no hay servidor que lo varie por
    // ruta. La solucion limpia son varios layouts raiz con grupos de rutas,
    // pero eso deja sin layout al not-found global y romperia la 404 propia.
    // Google no usa este atributo para detectar el idioma —usa el contenido y
    // los hreflang, que si son correctos—, asi que el coste real es para los
    // lectores de pantalla durante el primer instante.
    <html lang="ca">
      <head>
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
