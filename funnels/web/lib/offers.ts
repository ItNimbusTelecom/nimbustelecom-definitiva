import type { Locale } from "./i18n";

/**
 * Landing de ofertes: el desti del QR dels flyers. No s'indexa ni s'enllaca
 * des de cap altre canal, perque les visites que rep son la mesura neta dels
 * flyers. Per aixo les versions /es/ i /en/ tambe porten noindex: hi ha una
 * URL per idioma (amb el seu canonical i hreflang, com la resta del web) per
 * a qui escaneja el QR i no llegeix catala, no per sortir a Google.
 *
 * Els preus i les condicions son els mateixos als tres idiomes i viuen aqui
 * dalt; el que canvia per idioma va a OFFERS_CONTENT.
 */

export const RURAL_PLANS = [
  { speed: "10 Mb", price: "29,95€" },
  { speed: "15 Mb", price: "39,95€" },
  { speed: "30 Mb", price: "49,95€" },
];

export const MOBILE_PLANS = [
  { data: "50GB", price: "6,95€" },
  { data: "80GB", price: "7,95€" },
  { data: "150GB", price: "10,95€" },
  { data: "400GB", price: "14,95€" },
];

export const SHARED_DATA_PLANS = [
  { data: "120GB", price: "21,90€" },
  { data: "160GB", price: "26,90€" },
  { data: "300GB", price: "36,90€" },
];

export const FIBER_PLANS = [
  { speed: "600Mb", price: "32€" },
  { speed: "1000Mb", price: "38€" },
];

export const AJAX_PRICE = "499€";
export const EXPRESS_TV_PRICE = "75€";

export const LINKTREE_URL = "https://linktr.ee/nimbustelecom";

export type OffersContent = {
  meta: { title: string; description: string };
  hero: { title: string; badges: string[] };
  perMonth: string;
  fiber: { eyebrow: string; title: string; discountTitle: string; discountText: string };
  mobile: {
    eyebrow: string;
    title: string;
    // Sense data de caducitat a proposito: la que hi havia (30/09/2026) va
    // vencer, i una oferta que anuncia una data passada es pitjor que una
    // sense data. Si la promo torna a tenir data de fi, va aqui i tambe al
    // promoBadge del diccionari, que es el que es pinta a les tarifes de /mobil/.
    promoTerms: string;
  };
  referral: { eyebrow: string; text: string; cta: string };
  rural: { eyebrow: string; title: string };
  sharedData: { eyebrow: string; title: string; text: string; badge: string };
  ajax: { badge: string; title: string; subtitle: string; features: string[] };
  expressTv: { eyebrow: string; title: string };
  closing: { title: string; links: string };
  contact: { whatsapp: string; call: string };
  legal: { legalNotice: string; privacy: string; cookies: string };
};

export const OFFERS_CONTENT: Record<Locale, OffersContent> = {
  ca: {
    meta: {
      title: "Ofertes reals en fibra, mòbil i internet | Nimbus Telecom",
      description:
        "Promoció Nimbus Telecom amb ofertes de fibra òptica, mòbil, internet rural, alarma Ajax i Servei Express TV.",
    },
    hero: {
      title: "Ofertes reals en fibra, mòbil i internet",
      badges: ["Sense sorpreses", "Sense complicacions", "Atenció propera"],
    },
    perMonth: "/mes",
    fiber: {
      eyebrow: "Fibra òptica",
      title: "Fibra per a casa o negoci",
      discountTitle: "10% de descompte",
      discountText: "A totes les línies mòbils en contractar la fibra.",
    },
    mobile: {
      eyebrow: "Mòbil",
      title: "Tarifes mòbils sense sorpreses",
      promoTerms: "Promo JUNTS ESTIU de per vida mentre es mantingui la tarifa. No acumulable amb altres promocions.",
    },
    referral: {
      eyebrow: "Amics de la fibra",
      text: "Ja ets client? Per cada amic que contracti la fibra dient el teu nom, tens 1 mes gratis.",
      cta: "Com funciona",
    },
    rural: { eyebrow: "Internet rural", title: "Connexió per zones on la fibra no arriba" },
    sharedData: {
      eyebrow: "Dades compartides",
      title: "Comparteix dades entre línies mòbils",
      text: "Si tens diverses línies mòbils, pots compartir dades entre elles.",
      badge: "Màx. 3 línies",
    },
    ajax: {
      badge: "Sense quotes mensuals",
      title: "Alarma Ajax",
      subtitle: "Protegeix casa teva",
      features: ["Control total des del mòbil", "Avisos immediats", "Instal·lació inclosa"],
    },
    expressTv: {
      eyebrow: "Servei Express TV",
      title: "Deixa la teva senyal funcionant en una sola visita",
    },
    closing: {
      title: "T'ajudem a escollir la millor opció per a casa teva.",
      links: "Tots els enllaços Nimbus",
    },
    contact: { whatsapp: "WhatsApp", call: "Trucar" },
    legal: { legalNotice: "Avís legal", privacy: "Privacitat", cookies: "Cookies" },
  },
  es: {
    meta: {
      title: "Ofertas reales en fibra, móvil e internet | Nimbus Telecom",
      description:
        "Promoción Nimbus Telecom con ofertas de fibra óptica, móvil, internet rural, alarma Ajax y Servicio Express TV.",
    },
    hero: {
      title: "Ofertas reales en fibra, móvil e internet",
      badges: ["Sin sorpresas", "Sin complicaciones", "Atención cercana"],
    },
    perMonth: "/mes",
    fiber: {
      eyebrow: "Fibra óptica",
      title: "Fibra para casa o negocio",
      discountTitle: "10% de descuento",
      discountText: "En todas las líneas móviles al contratar la fibra.",
    },
    mobile: {
      eyebrow: "Móvil",
      title: "Tarifas móviles sin sorpresas",
      promoTerms: "Promo JUNTS ESTIU de por vida mientras se mantenga la tarifa. No acumulable con otras promociones.",
    },
    referral: {
      eyebrow: "Amics de la fibra",
      text: "¿Ya eres cliente? Por cada amigo que contrate la fibra diciendo tu nombre, tienes 1 mes gratis.",
      cta: "Cómo funciona (en catalán)",
    },
    rural: { eyebrow: "Internet rural", title: "Conexión para zonas donde la fibra no llega" },
    sharedData: {
      eyebrow: "Datos compartidos",
      title: "Comparte datos entre líneas móviles",
      text: "Si tienes varias líneas móviles, puedes compartir datos entre ellas.",
      badge: "Máx. 3 líneas",
    },
    ajax: {
      badge: "Sin cuotas mensuales",
      title: "Alarma Ajax",
      subtitle: "Protege tu casa",
      features: ["Control total desde el móvil", "Avisos inmediatos", "Instalación incluida"],
    },
    expressTv: {
      eyebrow: "Servicio Express TV",
      title: "Deja tu señal funcionando en una sola visita",
    },
    closing: {
      title: "Te ayudamos a escoger la mejor opción para tu casa.",
      links: "Todos los enlaces Nimbus",
    },
    contact: { whatsapp: "WhatsApp", call: "Llamar" },
    legal: { legalNotice: "Aviso legal", privacy: "Privacidad", cookies: "Cookies" },
  },
  en: {
    meta: {
      title: "Real offers on fibre, mobile and internet | Nimbus Telecom",
      description:
        "Nimbus Telecom offers on fibre, mobile, rural internet, Ajax alarms and the Express TV service.",
    },
    hero: {
      title: "Real offers on fibre, mobile and internet",
      badges: ["No surprises", "No hassle", "Local support"],
    },
    perMonth: "/month",
    fiber: {
      eyebrow: "Fibre",
      title: "Fibre for your home or business",
      discountTitle: "10% off",
      discountText: "On every mobile line when you sign up for fibre.",
    },
    mobile: {
      eyebrow: "Mobile",
      title: "Mobile plans with no surprises",
      promoTerms: "JUNTS ESTIU lifetime promo while you keep the same plan. Not combinable with other promotions.",
    },
    referral: {
      eyebrow: "Amics de la fibra",
      text: "Already a customer? For every friend who signs up for fibre giving your name, you get 1 month free.",
      cta: "How it works (in Catalan)",
    },
    rural: { eyebrow: "Rural internet", title: "Connection for areas fibre doesn't reach" },
    sharedData: {
      eyebrow: "Shared data",
      title: "Share data between mobile lines",
      text: "If you have several mobile lines, they can share their data.",
      badge: "Up to 3 lines",
    },
    ajax: {
      badge: "No monthly fees",
      title: "Ajax alarm",
      subtitle: "Protect your home",
      features: ["Full control from your phone", "Instant alerts", "Installation included"],
    },
    expressTv: {
      eyebrow: "Express TV service",
      title: "Get your TV signal working in a single visit",
    },
    closing: {
      title: "We'll help you choose the best option for your home.",
      links: "All Nimbus links",
    },
    contact: { whatsapp: "WhatsApp", call: "Call" },
    legal: { legalNotice: "Legal notice", privacy: "Privacy", cookies: "Cookies" },
  },
};
