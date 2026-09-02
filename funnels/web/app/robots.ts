import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Si el destino es un entorno de proves (staging), es bloqueja el rastreig
// sencer: una copia indexada de la web competiria amb la de produccio.
// En produccio no fa res. Aixi el mateix fitxer val per als dos entorns
// i no cal recordar-se de canviar-lo el dia de publicar.
const IS_STAGING = SITE_URL.includes("staging");

export default function robots(): MetadataRoute.Robots {
  if (IS_STAGING) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}