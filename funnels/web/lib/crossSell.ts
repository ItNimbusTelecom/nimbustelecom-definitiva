import type { Locale } from "@/lib/i18n";
import { linkTo } from "@/lib/routes";

export type CrossSellTarget = "mobile" | "internet" | "business" | "security";

/**
 * A donde manda cada funnel cuando ofrece el servicio de al lado. Antes eran
 * URLs escritas a mano, y apuntaban a /movil/ y /seguridad/, que desde el
 * cambio de slugs son redirecciones: cada clic pasaba por un salto de mas.
 */
export function crossSellHref(target: CrossSellTarget, locale: Locale): string {
  switch (target) {
    case "mobile":
      return linkTo("mobil", locale, "#tarifes");
    case "internet":
      return linkTo("internet", locale, "#opcions");
    case "business":
      return linkTo("empreses", locale);
    case "security":
      return linkTo("seguretat", locale);
  }
}
