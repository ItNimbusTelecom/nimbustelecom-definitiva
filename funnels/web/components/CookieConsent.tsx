"use client";

import { useEffect, useState } from "react";
import { LEGAL_LINKS } from "@/lib/contact";
import { useI18n } from "@/lib/i18n";

const COOKIE_CONSENT_KEY = "nimbus-cookie-consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { dictionary } = useI18n();

  useEffect(() => {
    queueMicrotask(() => {
      setIsVisible(localStorage.getItem(COOKIE_CONSENT_KEY) !== "accepted");
    });
  }, []);

  function acceptCookies() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  const legalNotice = LEGAL_LINKS[0];
  const privacyPolicy = LEGAL_LINKS[1];
  const cookiesPolicy = LEGAL_LINKS[2];

  return (
    <div className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-4xl rounded-lg border border-nimbus-line bg-white p-4 shadow-soft md:p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
            {dictionary.cookies.eyebrow}
          </p>
          <p className="mt-2 text-sm leading-6 text-nimbus-muted">
            {dictionary.cookies.text}{" "}
            <a
              href={cookiesPolicy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-nimbus-ink underline decoration-orange-300 underline-offset-4 transition hover:text-nimbus-orange"
            >
              {dictionary.cookies.cookiesPolicy}
            </a>
            ,{" "}
            <a
              href={privacyPolicy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-nimbus-ink underline decoration-orange-300 underline-offset-4 transition hover:text-nimbus-orange"
            >
              {dictionary.cookies.privacyPolicy}
            </a>{" "}
            {dictionary.cookies.and}{" "}
            <a
              href={legalNotice.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-nimbus-ink underline decoration-orange-300 underline-offset-4 transition hover:text-nimbus-orange"
            >
              {dictionary.cookies.legalNotice}
            </a>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={acceptCookies}
          className="rounded-full bg-nimbus-orange px-6 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange"
        >
          {dictionary.cookies.accept}
        </button>
      </div>
    </div>
  );
}
