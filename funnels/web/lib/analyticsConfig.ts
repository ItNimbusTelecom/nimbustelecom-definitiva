/**
 * Propiedad de GA4 heredada de la web de WordPress (G-2XPZFZDCPG). Se reutiliza
 * a proposito: si se creara una propiedad nueva, el historico de la web vieja
 * quedaria en otro sitio y no se podrian comparar los periodos.
 */
export const GA_MEASUREMENT_ID = "G-2XPZFZDCPG";

/**
 * La misma clave que usa el banner de cookies. Vive aqui, y no dentro del
 * banner, porque el script de analitica de <head> tiene que leerla antes de
 * que React monte nada.
 */
export const COOKIE_CONSENT_KEY = "nimbus-cookie-consent";

/**
 * Eleccion de las cookies de medicion publicitaria (Google Ads). Va en otra
 * clave porque es una finalidad que se anadio despues: quien ya habia
 * aceptado la analitica no habia dicho nada sobre esto y se le vuelve a
 * preguntar.
 */
export const ADS_CONSENT_KEY = "nimbus-cookie-consent-ads";

/** Valores que guarda el banner. Sin valor: todavia no ha elegido. */
export type CookieChoice = "accepted" | "rejected";

export type CookieConsentState = { analytics: boolean; ads: boolean };

/**
 * Funcion global que inyecta gtag.js. La define el script de <head>
 * (components/GoogleAnalytics.tsx) y la llama el banner al aceptar.
 */
export const GA_LOADER_FN = "nimbusLoadGa";

/** Evento con el que el enlace "Configurar cookies" reabre el banner. */
export const COOKIE_SETTINGS_EVENT = "nimbus:cookie-settings";
