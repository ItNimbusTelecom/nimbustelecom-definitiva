"use client";

import { useI18n } from "@/lib/i18n";

/**
 * Google permite ocultar el distintivo flotante de reCAPTCHA —lo ocultamos en
 * globals.css porque se solapa con el boton de WhatsApp— a condicion de
 * mostrar este aviso en el flujo del formulario. Si se vuelve a enseñar el
 * distintivo, este texto sobra; mientras este oculto, es obligatorio.
 */
export function RecaptchaNotice({ className = "" }: { className?: string }) {
  const { dictionary } = useI18n();
  const t = dictionary.recaptcha;

  return (
    <p className={`text-xs leading-5 text-nimbus-muted ${className}`}>
      {t.notice}{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-orange-300 underline-offset-2 transition hover:text-nimbus-orange"
      >
        {t.privacy}
      </a>{" "}
      ·{" "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-orange-300 underline-offset-2 transition hover:text-nimbus-orange"
      >
        {t.terms}
      </a>
    </p>
  );
}
