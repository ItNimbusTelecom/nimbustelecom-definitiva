import { getConfig } from "../config/env.js";
import { ValidationError } from "../utils/errors.js";

export interface IRecaptchaService {
  verify(token?: string, action?: string): Promise<void>;
}

/**
 * reCAPTCHA v3 no dice "es un bot" o "no lo es": devuelve una puntuacion de 0
 * a 1. Comprobar solo `success` no sirve de nada, porque success significa
 * unicamente que el token es autentico y no ha caducado: un bot que ejecuta
 * JavaScript obtiene tokens validos con puntuacion baja.
 *
 * El umbral es el mismo 0.5 que ya usaba el backend de formularios de la web
 * de WordPress. Si empiezan a colarse spam o a rebotar personas de verdad, es
 * el numero a mover, mirando antes la consola de reCAPTCHA para ver como se
 * reparten las puntuaciones reales.
 */
const PUNTUACION_MINIMA = 0.5;

type RespuestaGoogle = {
  success?: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

export class RecaptchaService implements IRecaptchaService {
  async verify(token?: string, action?: string) {
    const config = getConfig();

    if (!config.recaptchaEnabled) return;
    if (!config.recaptchaSecret) {
      throw new Error("RECAPTCHA_SECRET is required when RECAPTCHA_ENABLED=true");
    }
    if (!token) {
      throw new ValidationError("reCAPTCHA token is required");
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: config.recaptchaSecret,
        response: token
      })
    });

    const result = (await response.json()) as RespuestaGoogle;

    if (!result.success) {
      console.warn("reCAPTCHA rejected the token", { errors: result["error-codes"] });
      throw new ValidationError("reCAPTCHA verification failed");
    }

    // La accion viaja firmada dentro del token: comprobarla evita que alguien
    // reutilice en el formulario un token obtenido en otra parte de la web.
    if (action && result.action && result.action !== action) {
      console.warn("reCAPTCHA action mismatch", { esperada: action, recibida: result.action });
      throw new ValidationError("reCAPTCHA verification failed");
    }

    if (typeof result.score === "number" && result.score < PUNTUACION_MINIMA) {
      // Se registra la puntuacion para poder ajustar el umbral con datos en
      // vez de a ojo. Sin datos personales: solo el numero y la accion.
      console.warn("reCAPTCHA score below threshold", { score: result.score, action: result.action });
      throw new ValidationError("reCAPTCHA verification failed");
    }
  }
}
