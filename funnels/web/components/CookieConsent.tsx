"use client";

import { useEffect, useState } from "react";
import { denyAnalyticsConsent, grantAnalyticsConsent } from "@/lib/analytics";
import { COOKIE_CONSENT_KEY, COOKIE_SETTINGS_EVENT, type CookieChoice } from "@/lib/analyticsConfig";
import { LEGAL_LINKS } from "@/lib/contact";
import { useI18n } from "@/lib/i18n";

/**
 * Banner de cookies alineado con lo que dice la Politica de cookies: se
 * pueden ACEPTAR, RECHAZAR o CONFIGURAR, y si se aceptan no se vuelve a
 * preguntar. Aceptar y rechazar van con el mismo peso visual, como pide la
 * guia de la AEPD. Las unicas cookies que necesitan consentimiento son las de
 * Google Analytics; las tecnicas no se pueden desactivar.
 *
 * La eleccion se puede cambiar despues desde "Configurar cookies" en el pie,
 * que dispara COOKIE_SETTINGS_EVENT y reabre el panel.
 */
type View = "hidden" | "banner" | "settings";

function readChoice(): CookieChoice | null {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: CookieChoice) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
  } catch {
    // Sin localStorage la eleccion vale para esta pagina y se volvera a
    // preguntar en la siguiente. Mejor eso que no poder elegir.
  }

  if (choice === "accepted") {
    grantAnalyticsConsent();
  } else {
    denyAnalyticsConsent();
  }
}

export function CookieConsent() {
  const [view, setView] = useState<View>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const { dictionary } = useI18n();
  const text = dictionary.cookies;

  useEffect(() => {
    queueMicrotask(() => {
      setView(readChoice() === null ? "banner" : "hidden");
    });

    function openSettings() {
      setAnalytics(readChoice() === "accepted");
      setView("settings");
    }

    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  function choose(choice: CookieChoice) {
    saveChoice(choice);
    setView("hidden");
  }

  if (view === "hidden") {
    return null;
  }

  const legalNotice = LEGAL_LINKS[0];
  const privacyPolicy = LEGAL_LINKS[1];
  const cookiesPolicy = LEGAL_LINKS[2];
  const linkClass =
    "font-black text-nimbus-ink underline decoration-orange-300 underline-offset-4 transition hover:text-nimbus-orange";
  // Mismo estilo para aceptar y rechazar: ninguno de los dos empuja mas.
  const choiceButton =
    "rounded-full bg-nimbus-orange px-6 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange";
  const secondaryButton =
    "rounded-full border border-nimbus-line bg-white px-6 py-3 text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-h-[calc(100vh-2rem)] max-w-4xl overflow-y-auto rounded-lg border border-nimbus-line bg-white p-4 shadow-soft md:p-5"
    >
      <p id="cookie-consent-title" className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
        {view === "settings" ? text.settingsTitle : text.eyebrow}
      </p>
      <p className="mt-2 text-sm leading-6 text-nimbus-muted">
        {text.text}{" "}
        <a href={cookiesPolicy.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {text.cookiesPolicy}
        </a>
        ,{" "}
        <a href={privacyPolicy.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {text.privacyPolicy}
        </a>{" "}
        {text.and}{" "}
        <a href={legalNotice.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {text.legalNotice}
        </a>
        .
      </p>

      {view === "settings" ? (
        <div className="mt-4 grid gap-3">
          <div className="flex items-start justify-between gap-4 rounded-lg bg-nimbus-soft p-4">
            <div>
              <p className="font-black text-nimbus-ink">{text.technicalTitle}</p>
              <p className="mt-1 text-sm leading-6 text-nimbus-muted">{text.technicalText}</p>
            </div>
            <span className="shrink-0 text-xs font-black uppercase tracking-[0.12em] text-nimbus-muted">
              {text.alwaysActive}
            </span>
          </div>
          <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg bg-nimbus-soft p-4">
            <span>
              <span className="block font-black text-nimbus-ink">{text.analyticsTitle}</span>
              <span className="mt-1 block text-sm leading-6 text-nimbus-muted">{text.analyticsText}</span>
            </span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
              className="mt-1 size-5 shrink-0 accent-nimbus-orange"
            />
          </label>
          <div className="flex flex-wrap justify-end gap-3">
            <button type="button" onClick={() => choose("rejected")} className={choiceButton}>
              {text.reject}
            </button>
            <button type="button" onClick={() => choose(analytics ? "accepted" : "rejected")} className={secondaryButton}>
              {text.save}
            </button>
            <button type="button" onClick={() => choose("accepted")} className={choiceButton}>
              {text.accept}
            </button>
          </div>
        </div>
      ) : (
        // En movil, rechazar y aceptar en la misma fila y configurar debajo.
        <div className="mt-4 grid grid-cols-2 gap-3 sm:flex sm:justify-end">
          <button
            type="button"
            onClick={() => {
              setAnalytics(false);
              setView("settings");
            }}
            className={`${secondaryButton} order-last col-span-2 sm:order-none`}
          >
            {text.configure}
          </button>
          <button type="button" onClick={() => choose("rejected")} className={choiceButton}>
            {text.reject}
          </button>
          <button type="button" onClick={() => choose("accepted")} className={choiceButton}>
            {text.accept}
          </button>
        </div>
      )}
    </div>
  );
}
