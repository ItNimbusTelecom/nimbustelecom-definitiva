"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Vista de la landing, con el funnel de la pagina. El nombre del evento es el
 * del primer funnel (movil) y se mantiene para no partir el historico de GA4;
 * lo que distingue una pagina de otra es `funnel`, que antes iba fijo a
 * "cobertura-movil" en todas y ensuciaba ese embudo.
 */
export function LandingTracker({ funnel }: { funnel: string }) {
  const viewedTarifas = useRef(false);

  useEffect(() => {
    trackEvent("landing_cobertura_viewed", { funnel });

    const tarifas = document.getElementById("tarifas");
    if (!tarifas) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewedTarifas.current) {
          viewedTarifas.current = true;
          trackEvent("tarifas_section_viewed", { funnel });
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(tarifas);
    return () => observer.disconnect();
  }, [funnel]);

  return null;
}
