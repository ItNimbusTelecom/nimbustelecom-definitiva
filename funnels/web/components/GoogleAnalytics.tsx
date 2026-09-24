import { COOKIE_CONSENT_KEY, GA_MEASUREMENT_ID } from "@/lib/analyticsConfig";

// Consent Mode v2. El tag se carga siempre, pero arranca con el almacenamiento
// denegado: sin cookies hasta que la persona acepta el banner. Mientras tanto
// GA recibe pings sin identificador, asi que los eventos de una visita que no
// acepta no se pierden del todo. Al aceptar, CookieConsent llama a
// grantAnalyticsConsent() y a partir de ahi si hay cookie.
//
// El orden importa: 'consent default' tiene que estar en la cola antes de que
// gtag.js la procese, por eso el bloque en linea va antes del script async y
// por eso se lee localStorage aqui y no en un efecto de React (un visitante que
// ya acepto no debe pasar por un instante en 'denied').
const BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var granted = false;
try { granted = localStorage.getItem(${JSON.stringify(COOKIE_CONSENT_KEY)}) === 'accepted'; } catch (e) {}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: granted ? 'granted' : 'denied'
});
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});
`.trim();

export function GoogleAnalytics() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
    </>
  );
}
