"use client";

import { COOKIE_SETTINGS_EVENT, GA_MEASUREMENT_ID } from "@/lib/analyticsConfig";

type GtagCommand = "event" | "config" | "consent" | "js";

declare global {
  interface Window {
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
    /** Lo define el script de <head>: ver GA_LOADER_FN. */
    nimbusLoadGa?: () => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", name, params);
}

/**
 * Se llama al aceptar las cookies de analisis. Hasta ese momento gtag.js no
 * esta cargado (ver components/GoogleAnalytics.tsx): aqui se levanta el
 * consentimiento y se carga.
 */
export function grantAnalyticsConsent() {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("consent", "update", { analytics_storage: "granted" });
  window.nimbusLoadGa?.();
}

/**
 * Se llama al rechazar, tambien cuando alguien que habia aceptado cambia de
 * opinion desde "Configurar cookies". gtag.js, si ya estaba cargado, sigue en
 * la pagina hasta que se navegue a otra, pero deja de escribir cookies; y las
 * que ya habia escrito se borran, que es lo que pide retirar el consentimiento.
 */
export function denyAnalyticsConsent() {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("consent", "update", { analytics_storage: "denied" });

  // GA4 escribe _ga y _ga_<id sin "G-"> en el dominio raiz (.nimbustelecom.cat).
  // Se borran en el dominio raiz y en el host, por si acaso.
  const names = ["_ga", `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, "")}`];
  const host = window.location.hostname;
  const rootDomain = host.split(".").slice(-2).join(".");
  for (const name of names) {
    for (const domain of ["", `; domain=${host}`, `; domain=.${rootDomain}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

/** Reabre el banner de cookies, con la eleccion actual marcada. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}
