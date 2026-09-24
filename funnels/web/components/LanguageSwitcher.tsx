"use client";

import { LOCALE_STORAGE_KEY, LOCALES, useI18n, type Locale } from "@/lib/i18n";
import { localesFor, pathFor, type PageKey } from "@/lib/routes";

/**
 * Con `page`, cada idioma es un ENLACE a la URL de esa pagina en ese idioma,
 * no un boton que traduce en el sitio. Es la consecuencia de que cada idioma
 * tenga su propia URL: cambiar de idioma es cambiar de pagina.
 *
 * Solo se muestran los idiomas en los que esa pagina existe de verdad. Las
 * legales, por ejemplo, estan en un unico idioma: alli el selector muestra
 * uno solo en vez de ofrecer enlaces que no llevarian a ninguna traduccion.
 *
 * Sin `page` se mantiene el selector de botones de siempre, para las paginas
 * que todavia no estan separadas por idioma.
 */
export function LanguageSwitcher({ compact = false, page }: { compact?: boolean; page?: PageKey }) {
  const { locale, setLocale, dictionary } = useI18n();

  const contenedor =
    "inline-flex w-fit items-center gap-1 rounded-full border border-nimbus-line bg-white p-1";
  const estilo = (activo: boolean) =>
    `grid place-items-center rounded-full p-1.5 transition ${
      activo ? "bg-nimbus-orange shadow-sm" : "text-nimbus-muted hover:bg-nimbus-soft hover:text-nimbus-ink"
    }`;

  if (page) {
    const disponibles = localesFor(page);

    // Un idioma solo: no hay nada que elegir, no se pinta el selector.
    if (disponibles.length < 2) return null;

    return (
      <div className={contenedor} aria-label={dictionary.language.ariaLabel}>
        {disponibles.map((code) => {
          const item = LOCALES.find((l) => l.code === code);
          const activo = code === locale;

          return (
            <a
              key={code}
              href={pathFor(page, code)}
              hrefLang={code}
              aria-label={item?.label}
              aria-current={activo ? "true" : undefined}
              title={item?.label}
              // La eleccion se recuerda para que el aviso de idioma no vuelva
              // a salir en las paginas catalanas.
              onClick={() => recordarIdioma(code)}
              className={estilo(activo)}
            >
              <FlagIcon locale={code} compact={compact} />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={contenedor} aria-label={dictionary.language.ariaLabel}>
      {LOCALES.map((item) => {
        const isActive = item.code === locale;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code)}
            aria-pressed={isActive}
            aria-label={item.label}
            className={estilo(isActive)}
            title={item.label}
          >
            <FlagIcon locale={item.code} compact={compact} />
          </button>
        );
      })}
    </div>
  );
}

export function recordarIdioma(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Modo privado: sin persistencia, el aviso podra volver a salir.
  }
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
