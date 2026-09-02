"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export function LandingTracker() {
  const viewedTarifas = useRef(false);

  useEffect(() => {
    trackEvent("landing_cobertura_viewed", { funnel: "cobertura-movil" });

    const tarifas = document.getElementById("tarifas");
    if (!tarifas) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewedTarifas.current) {
          viewedTarifas.current = true;
          trackEvent("tarifas_section_viewed", { funnel: "cobertura-movil" });
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(tarifas);
    return () => observer.disconnect();
  }, []);

  return null;
}
