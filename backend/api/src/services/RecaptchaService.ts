import { getConfig } from "../config/env.js";
import { ValidationError } from "../utils/errors.js";

export interface IRecaptchaService {
  verify(token?: string): Promise<void>;
}

export class RecaptchaService implements IRecaptchaService {
  async verify(token?: string) {
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

    const result = (await response.json()) as { success?: boolean };
    if (!result.success) {
      throw new ValidationError("reCAPTCHA verification failed");
    }
  }
}
