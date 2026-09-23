import type { Locale } from "@/lib/i18n";

/**
 * Textos de la pagina 404. Viven aqui y no en el diccionario grande porque
 * son cuatro frases que no comparte nadie mas, y asi la pagina de error no
 * arrastra el resto del diccionario.
 */
export type NotFoundContent = {
  eyebrow: string;
  title: string;
  text: string;
  homeCta: string;
  servicesTitle: string;
  helpText: string;
};

export const NOT_FOUND_CONTENT: Record<Locale, NotFoundContent> = {
  es: {
    eyebrow: "Error 404",
    title: "Esta página no existe",
    text: "Puede que el enlace sea antiguo o que haya una errata en la dirección. Vuelve al inicio o ve directamente a lo que buscabas.",
    homeCta: "Volver al inicio",
    servicesTitle: "O ve directamente a:",
    helpText: "¿No encuentras lo que buscas? Llámanos:",
  },
  ca: {
    eyebrow: "Error 404",
    title: "Aquesta pàgina no existeix",
    text: "Potser l’enllaç és antic o hi ha una errada a l’adreça. Torna a l’inici o ves directament al que buscaves.",
    homeCta: "Tornar a l’inici",
    servicesTitle: "O ves directament a:",
    helpText: "No trobes el que busques? Truca’ns:",
  },
  en: {
    eyebrow: "Error 404",
    title: "This page does not exist",
    text: "The link may be old or the address may have a typo. Go back to the home page or straight to what you were looking for.",
    homeCta: "Back to home",
    servicesTitle: "Or go straight to:",
    helpText: "Can’t find what you need? Call us:",
  },
};
