import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Si el destino es un entorno de proves (staging), es bloqueja el rastreig
// sencer: una copia indexada de la web competiria amb la de produccio.
// En produccio no fa res. Aixi el mateix fitxer val per als dos entorns
// i no cal recordar-se de canviar-lo el dia de publicar.
const IS_STAGING = SITE_URL.includes("staging");

// Rastreadores de los asistentes de IA. Que una respuesta de ChatGPT o de
// Claude cite a Nimbus depende de que puedan leer la web.
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended", "Applebot-Extended"];

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
    // Los bots de IA ya entrarian por la regla de "*", pero se listan aparte
    // a proposito: deja por escrito que se les deja entrar. Si algun dia se
    // quiere cerrar la puerta a uno, se cambia su linea y no la de todos.
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}