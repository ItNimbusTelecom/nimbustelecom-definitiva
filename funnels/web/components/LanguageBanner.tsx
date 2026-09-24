"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { DEFAULT_LOCALE, LOCALES, detectBrowserLocale, getStoredLocale, translations, type Locale } from "@/lib/i18n";
import { localesFor, pathFor, type PageKey } from "@/lib/routes";
import { recordarIdioma } from "./LanguageSwitcher";
import { VisualIcon } from "./VisualIcon";

/**
 * POR QUE AVISAR Y NO REDIRIGIR
 *
 * Antes la web se traducia sola en la misma URL segun el navegador. Con una
 * URL por idioma eso ya no vale: si /mobil/ se autotradujese al castellano, el
 * mismo contenido estaria en dos sitios y el buscador no sabria cual indexar.
 *
 * La alternativa evidente —redirigir por JavaScript— es peor: Googlebot
 * ejecuta JavaScript y navega en ingles, asi que acabaria redirigido fuera de
 * las paginas catalanas justo cuando intenta indexarlas.
 *
 * Asi que se avisa y decide la persona. Al elegir, la preferencia se guarda y
 * el aviso no vuelve a salir. Solo aparece en las paginas catalanas, que son
 * las que no llevan prefijo y por tanto donde puede caer alguien que no lee
 * catalan.
 */
const CLAVE_DESCARTADO = "nimbus-locale-banner";

export function LanguageBanner({ page }: { page: PageKey }) {
  const [sugerido, setSugerido] = useState<Locale | null>(null);

  useEffect(() => {
    // En un efecto y no en el render: depende del navegador, y el HTML
    // exportado tiene que ser el mismo para todos.
    if (getStoredLocale()) return;

    try {
      if (window.localStorage.getItem(CLAVE_DESCARTADO) === "1") return;
    } catch {
      // Sin localStorage el aviso puede repetirse. Mejor eso que no avisar.
    }

    const delNavegador = detectBrowserLocale();
    if (delNavegador === DEFAULT_LOCALE) return;
    if (!localesFor(page).includes(delNavegador)) return;

    setSugerido(delNavegador);
    trackEvent("idioma_avis_mostrat", { locale: delNavegador });
  }, [page]);

  if (!sugerido) return null;

  const destino = pathFor(page, sugerido);
  if (!destino) return null;

  const texto = translations[sugerido].language.alsoAvailable;
  const etiqueta = LOCALES.find((l) => l.code === sugerido)?.label ?? sugerido;

  function descartar() {
    try {
      window.localStorage.setItem(CLAVE_DESCARTADO, "1");
    } catch {
      // Da igual: se cierra para esta visita.
    }
    setSugerido(null);
  }

  return (
    <div className="border-b border-nimbus-line bg-nimbus-soft" lang={sugerido}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5">
        <p className="text-sm text-nimbus-ink">
          {texto}{" "}
          <a
            href={destino}
            hrefLang={sugerido}
            onClick={() => {
              recordarIdioma(sugerido as Locale);
              trackEvent("idioma_avis_acceptat", { locale: sugerido });
            }}
            className="font-black underline decoration-orange-300 underline-offset-4 transition hover:text-nimbus-orange"
          >
            {etiqueta}
          </a>
        </p>
        <button
          type="button"
          onClick={descartar}
          aria-label={translations[sugerido].language.dismiss}
          title={translations[sugerido].language.dismiss}
          className="grid size-7 shrink-0 place-items-center rounded-full text-nimbus-muted transition hover:bg-white hover:text-nimbus-ink"
        >
          <VisualIcon name="x" className="size-4" />
        </button>
      </div>
    </div>
  );
}
