import { COOKIE_CONSENT_KEY, GA_LOADER_FN, GA_MEASUREMENT_ID } from "@/lib/analyticsConfig";

// gtag.js NO se carga hasta que la persona acepta las cookies de analisis.
// Antes se cargaba siempre con Consent Mode en 'denied', que manda pings sin
// cookie aun sin consentimiento: es una zona gris para la AEPD y se decidio
// no pisarla. El coste es que de quien no acepta no se sabe nada.
//
// Lo que si se prepara siempre es la cola (dataLayer y gtag): asi los
// trackEvent() de la pagina no fallan, y si la persona acepta a mitad de
// visita, gtag.js procesa al cargar lo que habia en cola. Si no acepta, la
// cola se queda en memoria y no sale del navegador.
//
// El orden importa: 'consent default' tiene que estar en la cola antes de que
// gtag.js la procese, y se lee localStorage aqui y no en un efecto de React,
// para que quien ya acepto no pierda la primera pagina vista.
const BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.${GA_LOADER_FN} = function () {
  if (document.getElementById('nimbus-gtag')) return;
  var s = document.createElement('script');
  s.id = 'nimbus-gtag';
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
  document.head.appendChild(s);
};
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
if (granted) window.${GA_LOADER_FN}();
`.trim();

export function GoogleAnalytics() {
  return <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />;
}
