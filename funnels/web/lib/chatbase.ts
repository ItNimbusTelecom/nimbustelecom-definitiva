export type ChatbaseOpenOptions = {
  /** Mensaje que se envia solo al abrirse el widget. */
  message?: string;
  /** Oculta el mensaje hasta que el bot empieza a responder. */
  hideMessage?: boolean;
};

export type ChatbaseFunction = {
  (...args: unknown[]): unknown;
  q?: unknown[];
  open?: (options?: ChatbaseOpenOptions) => void;
};

declare global {
  interface Window {
    chatbase?: ChatbaseFunction;
  }
}

export const CHATBASE_SCRIPT_ID = "jr_7Bmw7q5zBtpoQi3CGk";

/** Version a pantalla completa del asistente, usada en la pagina /chat/. */
export const CHATBASE_HELP_URL = "https://www.chatbase.co/jr_7Bmw7q5zBtpoQi3CGk/help";

/**
 * Abre el asistente. Si se pasa una pregunta, Chatbase la envia sola al abrirse
 * el widget, asi que el usuario ve la respuesta sin escribir nada.
 *
 * Antes de que el script termine de cargar, window.chatbase es un Proxy que
 * encola las llamadas y las reproduce al inicializarse: por eso funciona
 * aunque alguien pulse una pregunta nada mas entrar en la pagina.
 */
export function openChatbase(question?: string) {
  if (typeof window === "undefined" || !window.chatbase) {
    return;
  }

  const options = question ? { message: question } : undefined;
  const api = window.chatbase;

  if (typeof api.open === "function") {
    api.open(options);
    return;
  }

  if (options) {
    api("open", options);
    return;
  }

  api("open");
}
