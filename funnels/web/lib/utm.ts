"use client";

/**
 * Origen de la visita (utm y gclid del anuncio) guardado en sessionStorage.
 *
 * Antes se leia de la URL en el momento del envio, y bastaba con que la
 * persona entrara por /internet/?utm_... y luego pasara por otra pagina de la
 * web para que el alta llegara a ISP como "landing". Ahora se guarda al
 * entrar y se reutiliza hasta que se cierre la pestana: recargar, volver
 * atras o cambiar de pagina no lo pierde.
 *
 * Una pagina sin parametros nunca pisa lo guardado. Una con parametros si:
 * si en la misma pestana se vuelve a entrar por otro anuncio, cuenta el
 * ultimo, que es el que ha traido a la persona esta vez.
 */
const ATTRIBUTION_STORAGE_KEY = "nimbus-lead-attribution";

const CAMPAIGN_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"] as const;

type CampaignParam = (typeof CAMPAIGN_PARAMS)[number];

export type Attribution = Record<CampaignParam, string | null> & {
  /** Web externa de la que venia al entrar. Vacio si entro directo. */
  referrer: string;
  /** Primera pagina de la visita, sin parametros. */
  landingPath: string;
};

export type LeadSource = Attribution & {
  /** Pagina desde la que se envia (no la de entrada). */
  path: string;
  search: string;
  hash: string;
};

const EMPTY_ATTRIBUTION: Attribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_content: null,
  utm_term: null,
  gclid: null,
  referrer: "",
  landingPath: "",
};

/**
 * Guarda el origen si la URL trae parametros de campana o si todavia no habia
 * nada guardado, y devuelve el vigente. Se llama al cargar cualquier pagina
 * (components/AttributionTracker.tsx) y otra vez al enviar, por si acaso.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") {
    return EMPTY_ATTRIBUTION;
  }

  const fromUrl = readAttributionFromUrl();
  const stored = readStoredAttribution();
  const urlHasCampaign = CAMPAIGN_PARAMS.some((param) => fromUrl[param]);

  if (stored && !urlHasCampaign) {
    return stored;
  }

  try {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(fromUrl));
  } catch {
    // Sin sessionStorage (modo privado estricto) se usa la URL actual, que
    // es lo que se hacia antes.
  }

  return fromUrl;
}

/**
 * Se considera que la visita viene de un anuncio si trae gclid o un medio de
 * pago. Sirve para el texto precargado de WhatsApp.
 */
export function isPaidAttribution(attribution: Attribution) {
  const medium = (attribution.utm_medium ?? "").toLowerCase();
  return Boolean(attribution.gclid) || ["cpc", "ppc", "paid", "paidsearch", "display"].includes(medium);
}

/** Solo los parametros que tienen valor, para adjuntarlos a eventos de GA4. */
export function getCampaignParams(attribution: Attribution = captureAttribution()) {
  const params: Partial<Record<CampaignParam, string>> = {};
  for (const param of CAMPAIGN_PARAMS) {
    const value = attribution[param];
    if (value) params[param] = value;
  }
  return params;
}

export function getLeadSource(): LeadSource {
  if (typeof window === "undefined") {
    return { ...EMPTY_ATTRIBUTION, path: "", search: "", hash: "" };
  }

  return {
    ...captureAttribution(),
    path: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

function readAttributionFromUrl(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const attribution = { ...EMPTY_ATTRIBUTION };

  for (const param of CAMPAIGN_PARAMS) {
    const value = params.get(param)?.trim();
    attribution[param] = value ? value : null;
  }

  attribution.referrer = getExternalReferrer();
  attribution.landingPath = window.location.pathname;
  return attribution;
}

/**
 * La web es estatica y muchos enlaces internos recargan la pagina, asi que
 * document.referrer suele ser la propia web. Eso no es un origen.
 */
function getExternalReferrer() {
  const referrer = document.referrer;
  if (!referrer) return "";

  try {
    return new URL(referrer).origin === window.location.origin ? "" : referrer;
  } catch {
    return "";
  }
}

function readStoredAttribution(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<Attribution>;
    const attribution = { ...EMPTY_ATTRIBUTION };
    for (const param of CAMPAIGN_PARAMS) {
      attribution[param] = typeof parsed[param] === "string" ? parsed[param] : null;
    }
    attribution.referrer = typeof parsed.referrer === "string" ? parsed.referrer : "";
    attribution.landingPath = typeof parsed.landingPath === "string" ? parsed.landingPath : "";
    return attribution;
  } catch {
    return null;
  }
}
