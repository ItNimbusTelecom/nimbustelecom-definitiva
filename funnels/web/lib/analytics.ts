"use client";

import { COOKIE_SETTINGS_EVENT, GA_MEASUREMENT_ID, type CookieConsentState } from "@/lib/analyticsConfig";
import { getCampaignParams } from "@/lib/utm";

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
 * Conversiones para Google Ads. No hay etiqueta AW propia: se marcan como
 * eventos clave en GA4 y se importan desde Google Ads, que ya tiene la
 * propiedad vinculada. Llevan los utm guardados al entrar, porque GA4 solo los
 * ve en la primera pagina y la conversion puede pasar en otra.
 *
 * - conversion_formulario: solo cuando la API responde OK, no al pulsar.
 * - conversion_whatsapp / conversion_telefono: clic en cualquier enlace
 *   wa.me o tel: de la web (components/AttributionTracker.tsx).
 */
export type ConversionEvent = "conversion_formulario" | "conversion_whatsapp" | "conversion_telefono";

export function trackConversion(name: ConversionEvent, params?: Record<string, unknown>) {
  trackEvent(name, { ...getCampaignParams(), page_path: window.location.pathname, ...params });
}

/**
 * Aplica lo elegido en el banner. Hasta que se acepta algo gtag.js no esta
 * cargado (ver components/GoogleAnalytics.tsx): aqui se actualiza el
 * consentimiento y, si hace falta, se carga.
 *
 * Al retirar un consentimiento, gtag.js, si ya estaba cargado, sigue en la
 * pagina hasta que se navegue a otra, pero deja de escribir cookies; y las que
 * ya habia escrito se borran, que es lo que pide retirar el consentimiento.
 *
 * ad_personalization queda siempre denegado: las cookies de publicidad solo
 * sirven para saber que anuncio acaba en una solicitud, no para remarketing.
 */
export function applyCookieConsent({ analytics, ads }: CookieConsentState) {
  if (typeof window === "undefined") {
    return;
  }

  const adsConsent = ads ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: adsConsent,
    ad_user_data: adsConsent,
  });

  if (analytics || ads) {
    window.nimbusLoadGa?.();
  }

  if (!analytics) {
    // GA4 escribe _ga y _ga_<id sin "G-">.
    deleteCookies(["_ga", `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, "")}`]);
  }
  if (!ads) {
    // Las de Google Ads que escribe gtag.js con ad_storage concedido.
    deleteCookies(["_gcl_au", "_gcl_aw", "_gcl_dc", "_gcl_gb"]);
  }
}

/** Se borran en el dominio raiz (.nimbustelecom.cat) y en el host, por si acaso. */
function deleteCookies(names: string[]) {
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
