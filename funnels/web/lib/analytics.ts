"use client";

type GtagCommand = "event" | "config" | "consent" | "js";

declare global {
  interface Window {
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", name, params);
}

/**
 * Se llama al aceptar el banner de cookies. Hasta ese momento GA corre con
 * analytics_storage denegado (ver components/GoogleAnalytics.tsx), asi que
 * sin esta llamada no se escribe ninguna cookie de medicion.
 */
export function grantAnalyticsConsent() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", { analytics_storage: "granted" });
}
