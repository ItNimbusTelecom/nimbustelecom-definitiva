import type { PageKey } from "@/lib/routes";

/**
 * Forma comun de las paginas de servicio para empresas. Cada servicio tiene su
 * fichero (radiolinks.ts, networks.ts, internetBackup.ts, pbx.ts, antennas.ts)
 * con este mismo contenido en ca/es/en, y todas se pintan con
 * components/BusinessServiceContent.tsx.
 *
 * Las FAQ se redactan con las palabras que usa quien pregunta ("qui instal·la
 * X a la Selva?"): son las que leen los buscadores y los asistentes de IA.
 */
export type ServiceIcon = "building" | "eye" | "masia" | "network" | "store" | "briefcase" | "phone-call" | "headphones" | "shield-check" | "globe" | "radio-tower" | "smartphone" | "home" | "users" | "clock" | "database";

export type BusinessServiceContent = {
  meta: { title: string; description: string };
  /** Texto corto en ingles para el schema.org Service. */
  serviceType: string;
  nav: { what: string; how: string; zone: string; faq: string; contact: string; business: string };
  primaryCta: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    text: string;
    secondaryCta: string;
    cardItems: [string, string][];
    focusEyebrow: string;
    focusText: string;
  };
  uses: {
    eyebrow: string;
    title: string;
    text: string;
    items: { icon: ServiceIcon; title: string; text: string }[];
    note: string;
    noteLink?: { page: PageKey; label: string };
  };
  how: {
    eyebrow: string;
    title: string;
    text: string;
    steps: [string, string][];
  };
  zone: {
    eyebrow: string;
    title: string;
    text: string;
    towns: string[];
    note: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: [string, string][];
  };
  cta: {
    eyebrow: string;
    title: string;
    text: string;
    formLabel: string;
  };
};

/** Poblaciones que se listan en todas las paginas de servicio. */
export const SERVICE_TOWNS = [
  "Sils",
  "Santa Coloma de Farners",
  "Maçanet de la Selva",
  "Vidreres",
  "Caldes de Malavella",
  "Riudellots de la Selva",
  "Llagostera",
  "Cassà de la Selva",
  "Girona",
  "Lloret de Mar",
  "Blanes",
  "Tossa de Mar",
];
