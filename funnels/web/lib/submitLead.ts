"use client";

type LegacyLeadPayload = {
  leadType?: unknown;
  serviceType?: unknown;
  selectedPlan?: {
    id?: unknown;
    name?: unknown;
    price?: unknown;
    data?: unknown;
    description?: unknown;
  };
  source?: {
    path?: unknown;
    search?: unknown;
    referrer?: unknown;
    utm_source?: unknown;
    utm_medium?: unknown;
    utm_campaign?: unknown;
    utm_content?: unknown;
    utm_term?: unknown;
  };
  answers?: {
    coverageProblem?: unknown;
    problemLocationType?: unknown;
    problemLocationText?: unknown;
    mobileUsage?: unknown;
    currentOperator?: unknown;
    additionalComment?: unknown;
  };
  contact?: {
    name?: unknown;
    phone?: unknown;
    email?: unknown;
    preferredContact?: unknown;
    consent?: unknown;
  };
  antiSpam?: {
    formStartedAt?: unknown;
    elapsedSeconds?: unknown;
    honeypot?: unknown;
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Un Lambda que lleva un rato sin tráfico arranca en frío en la siguiente
// petición. Si tarda demasiado, el navegador puede cortar la conexión con
// "Failed to fetch" (o API Gateway responder 502/503/504) antes de que el
// contenedor termine de arrancar. Reintentamos una sola vez tras una breve
// espera: para entonces el contenedor ya suele estar caliente.
const SUBMIT_RETRY_DELAY_MS = 1500;
const RETRYABLE_STATUS_CODES = new Set([502, 503, 504]);

export async function submitLead(payload: unknown) {
  if (API_BASE_URL) {
    return submitToServerlessApi(payload);
  }

  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
    console.log("[static export mock lead]", payload);
    return { ok: true, mock: true };
  }

  throw new Error("NEXT_PUBLIC_API_BASE_URL no está configurado.");
}

async function submitToServerlessApi(payload: unknown) {
  const legacyPayload = payload as LegacyLeadPayload;
  const endpoint = legacyPayload.leadType === "estudio-cobertura" ? "/coverage-study" : "/leads";
  const apiPayload =
    legacyPayload.leadType === "estudio-cobertura"
      ? toCoverageStudyPayload(legacyPayload)
      : toLeadPayload(legacyPayload);

  const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(apiPayload),
  });
  const data = await parseJsonSafely(response);

  if (!response.ok || !data.ok) {
    throw new Error(data.error?.message || "No hemos podido enviar la solicitud.");
  }

  return data;
}

async function fetchWithRetry(url: string, options: RequestInit, retriesLeft = 1): Promise<Response> {
  try {
    const response = await fetch(url, options);

    if (!response.ok && RETRYABLE_STATUS_CODES.has(response.status) && retriesLeft > 0) {
      console.warn(`[submitLead] respuesta ${response.status}, reintentando…`);
      await wait(SUBMIT_RETRY_DELAY_MS);
      return fetchWithRetry(url, options, retriesLeft - 1);
    }

    return response;
  } catch (error) {
    if (retriesLeft > 0) {
      console.warn("[submitLead] fetch falló (probable cold start), reintentando…", error);
      await wait(SUBMIT_RETRY_DELAY_MS);
      return fetchWithRetry(url, options, retriesLeft - 1);
    }

    throw error;
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function parseJsonSafely(response: Response) {
  try {
    return await response.json();
  } catch {
    return { ok: false, error: { message: "Respuesta inesperada del servidor." } };
  }
}

function toLeadPayload(payload: LegacyLeadPayload) {
  const contact = payload.contact ?? {};
  const selectedPlan = payload.selectedPlan;
  const preferredContact = toPreferredContactMethod(contact.preferredContact);
  const planSummary = selectedPlan
    ? [
        `Plan solicitado: ${toText(selectedPlan.name)}`,
        `Precio: ${toText(selectedPlan.price)}`,
        `Datos: ${toText(selectedPlan.data)}`,
        `Descripción: ${toText(selectedPlan.description)}`,
      ].join("\n")
    : undefined;

  return {
    name: toText(contact.name) || "Solicitud desde funnel Nimbus",
    phone: toText(contact.phone),
    email: toText(contact.email),
    preferredContactMethod: preferredContact,
    message: planSummary,
    source: getSourceLabel(payload),
    language: getCurrentLocale(),
    pageUrl: getPageUrl(payload),
    antiSpam: toAntiSpamPayload(payload),
    consentAccepted: contact.consent === true,
  };
}

function toCoverageStudyPayload(payload: LegacyLeadPayload) {
  const contact = payload.contact ?? {};
  const answers = payload.answers ?? {};
  const locationText = toText(answers.problemLocationText);
  const locationFallback = toText(answers.problemLocationType) || "Zona no indicada";
  const usage = Array.isArray(answers.mobileUsage) ? answers.mobileUsage.map(toText).filter(Boolean).join(", ") : "";
  const currentProblem = [
    `Problema: ${toText(answers.coverageProblem)}`,
    `Dónde pasa: ${toText(answers.problemLocationType)}`,
    locationText ? `Zona indicada: ${locationText}` : "",
    usage ? `Uso móvil: ${usage}` : "",
    toText(answers.additionalComment) ? `Comentario: ${toText(answers.additionalComment)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    name: toText(contact.name),
    phone: toText(contact.phone),
    email: toText(contact.email),
    problemLocationText: locationText,
    problemLocationType: locationFallback,
    preferredContactMethod: toPreferredContactMethod(contact.preferredContact),
    currentProblem,
    currentOperator: toText(answers.currentOperator),
    serviceType:
      payload.serviceType === "internet" ||
      payload.serviceType === "fiber" ||
      payload.serviceType === "security" ||
      payload.serviceType === "business"
        ? payload.serviceType
        : "mobile",
    language: getCurrentLocale(),
    pageUrl: getPageUrl(payload),
    antiSpam: toAntiSpamPayload(payload),
    consentAccepted: contact.consent === true,
  };
}

function toAntiSpamPayload(payload: LegacyLeadPayload) {
  const antiSpam = payload.antiSpam ?? {};

  return {
    formStartedAt:
      typeof antiSpam.formStartedAt === "string" || typeof antiSpam.formStartedAt === "number"
        ? antiSpam.formStartedAt
        : undefined,
    elapsedSeconds: typeof antiSpam.elapsedSeconds === "number" ? antiSpam.elapsedSeconds : undefined,
    honeypot: toText(antiSpam.honeypot),
  };
}

function toPreferredContactMethod(value: unknown) {
  if (value === "whatsapp" || value === "email" || value === "office") {
    return value;
  }

  return "phone";
}

function getCurrentLocale() {
  const locale = window.localStorage.getItem("nimbus-locale");
  return locale === "ca" || locale === "en" ? locale : "es";
}

function getPageUrl(payload: LegacyLeadPayload) {
  const path = toText(payload.source?.path) || window.location.pathname;
  const search = toText(payload.source?.search) || window.location.search;
  return `${window.location.origin}${path}${search}`;
}

function getSourceLabel(payload: LegacyLeadPayload) {
  const source = payload.source;
  if (!source) return "landing";

  return [
    toText(source.utm_source) ? `utm_source=${toText(source.utm_source)}` : "",
    toText(source.utm_medium) ? `utm_medium=${toText(source.utm_medium)}` : "",
    toText(source.utm_campaign) ? `utm_campaign=${toText(source.utm_campaign)}` : "",
    toText(source.utm_content) ? `utm_content=${toText(source.utm_content)}` : "",
    toText(source.utm_term) ? `utm_term=${toText(source.utm_term)}` : "",
    toText(source.referrer) ? `referrer=${toText(source.referrer)}` : "",
  ]
    .filter(Boolean)
    .join("; ");
}

function toText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}
