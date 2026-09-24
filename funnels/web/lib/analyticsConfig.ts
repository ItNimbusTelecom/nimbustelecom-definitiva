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
