"use client";

import { LOCALES, useI18n } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, dictionary } = useI18n();

  return (
    <div
      className="inline-flex w-fit items-center gap-1 rounded-full border border-nimbus-line bg-white p-1"
      aria-label={dictionary.language.ariaLabel}
    >
      {LOCALES.map((item) => {
        const isActive = item.code === locale;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code)}
            aria-pressed={isActive}
            aria-label={item.label}
            className={`grid place-items-center rounded-full p-1.5 transition ${
              isActive
                ? "bg-nimbus-orange shadow-sm"
                : "text-nimbus-muted hover:bg-nimbus-soft hover:text-nimbus-ink"
            }`}
            title={item.label}
          >
            <FlagIcon locale={item.code} compact={compact} />
          </button>
        );
      })}
    </div>
  );
}

function FlagIcon({ locale, compact }: { locale: string; compact: boolean }) {
  const className = `${compact ? "h-4 w-6" : "h-5 w-7"} overflow-hidden rounded-[3px] ring-1 ring-black/10`;

  if (locale === "ca") {
    return (
      <svg className={className} aria-hidden="true" viewBox="0 0 32 24">
        <rect width="32" height="24" fill="#F6C343" />
        {[2, 6, 10, 14, 18, 22].map((y) => (
          <rect key={y} y={y} width="32" height="2" fill="#D71920" />
        ))}
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg className={className} aria-hidden="true" viewBox="0 0 32 24">
        <rect width="32" height="24" fill="#012169" />
        <path d="M0 0 32 24M32 0 0 24" stroke="#fff" strokeWidth="5" />
        <path d="M0 0 32 24M32 0 0 24" stroke="#C8102E" strokeWidth="2.8" />
        <path d="M16 0v24M0 12h32" stroke="#fff" strokeWidth="8" />
        <path d="M16 0v24M0 12h32" stroke="#C8102E" strokeWidth="4.8" />
      </svg>
    );
  }

  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 32 24">
      <rect width="32" height="24" fill="#AA151B" />
      <rect y="6" width="32" height="12" fill="#F1BF00" />
      <rect x="8" y="9" width="4" height="6" rx="0.5" fill="#AA151B" opacity="0.9" />
    </svg>
  );
}
