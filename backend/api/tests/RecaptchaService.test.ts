import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RecaptchaService } from "../src/services/RecaptchaService.js";
import { ValidationError } from "../src/utils/errors.js";

function respuestaDeGoogle(body: Record<string, unknown>) {
  return vi.fn().mockResolvedValue({ json: async () => body } as Response);
}

describe("RecaptchaService", () => {
  const entornoOriginal = { ...process.env };

  beforeEach(() => {
    process.env.RECAPTCHA_ENABLED = "true";
    process.env.RECAPTCHA_SECRET = "secreto-de-prueba";
  });

  afterEach(() => {
    process.env = { ...entornoOriginal };
    vi.restoreAllMocks();
  });

  it("no comprueba nada mientras este desactivado", async () => {
    process.env.RECAPTCHA_ENABLED = "false";
    const fetchMock = respuestaDeGoogle({});
    vi.stubGlobal("fetch", fetchMock);

    await expect(new RecaptchaService().verify(undefined, "lead")).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rechaza un envio sin token", async () => {
    await expect(new RecaptchaService().verify(undefined, "lead")).rejects.toBeInstanceOf(ValidationError);
  });

  it("acepta un token bueno con puntuacion alta", async () => {
    vi.stubGlobal("fetch", respuestaDeGoogle({ success: true, score: 0.9, action: "lead" }));

    await expect(new RecaptchaService().verify("token", "lead")).resolves.toBeUndefined();
  });

  it("rechaza un token que Google da por invalido", async () => {
    vi.stubGlobal("fetch", respuestaDeGoogle({ success: false, "error-codes": ["timeout-or-duplicate"] }));

    await expect(new RecaptchaService().verify("token", "lead")).rejects.toBeInstanceOf(ValidationError);
  });

  // El caso que de verdad justifica reCAPTCHA v3: el token es autentico, pero
  // la puntuacion dice que detras hay un bot.
  it("rechaza un token valido con puntuacion por debajo del umbral", async () => {
    vi.stubGlobal("fetch", respuestaDeGoogle({ success: true, score: 0.1, action: "lead" }));

    await expect(new RecaptchaService().verify("token", "lead")).rejects.toBeInstanceOf(ValidationError);
  });

  it("rechaza un token obtenido para otra accion", async () => {
    vi.stubGlobal("fetch", respuestaDeGoogle({ success: true, score: 0.9, action: "otra_cosa" }));

    await expect(new RecaptchaService().verify("token", "lead")).rejects.toBeInstanceOf(ValidationError);
  });

  // Google no siempre devuelve score: si falta, no se puede juzgar y se acepta.
  it("acepta cuando Google no devuelve puntuacion", async () => {
    vi.stubGlobal("fetch", respuestaDeGoogle({ success: true, action: "lead" }));

    await expect(new RecaptchaService().verify("token", "lead")).resolves.toBeUndefined();
  });

  it("avisa si se activa la verificacion sin clave secreta", async () => {
    process.env.RECAPTCHA_SECRET = "";

    await expect(new RecaptchaService().verify("token", "lead")).rejects.toThrow(/RECAPTCHA_SECRET/);
  });
});
