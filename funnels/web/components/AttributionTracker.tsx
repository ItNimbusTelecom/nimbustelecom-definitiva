"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";
import { captureAttribution } from "@/lib/utm";

/**
 * Va en el layout raiz, asi que corre en todas las paginas:
 *
 * 1. Guarda el origen de la visita (utm, gclid) en cuanto se carga la pagina,
 *    antes de que la persona pueda irse a otra y perder los parametros.
 * 2. Registra como conversion cualquier clic en un enlace de WhatsApp o de
 *    telefono. Se escucha en el documento y no en cada enlace porque hay
 *    muchos (cabecera, flotante, ofertas, amics...) y uno nuevo quedaria fuera.
 */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();

    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackConversion("conversion_telefono", { link_url: href });
      } else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
        trackConversion("conversion_whatsapp", { link_url: href.split("?")[0] });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
