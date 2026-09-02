"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NIMBUS_LOGO_URL } from "@/lib/brand";
import { CLIENT_AREA_URL } from "@/lib/contact";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export type HeaderNavItem = { label: string; href: string; highlight?: boolean };

type HeaderProps = {
  /** Enlaces del menu. Por defecto, los del funnel de cobertura. */
  navItems?: HeaderNavItem[];
  /** Texto del boton naranja. */
  ctaLabel?: string;
  /** Destino del boton naranja. */
  ctaHref?: string;
  /** Destino del logo. */
  logoHref?: string;
  /** Contenedor mas ancho para paginas con muchos items de menu (ej. seguretat). */
  wide?: boolean;
};

export function Header({ navItems, ctaLabel, ctaHref, logoHref, wide }: HeaderProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dictionary } = useI18n();
  const items: HeaderNavItem[] = navItems ?? [
    { label: dictionary.nav.solution, href: "#solucio" },
    { label: dictionary.nav.plans, href: "#tarifes" },
    { label: dictionary.nav.reviews, href: "#opinions" },
    { label: dictionary.nav.faq, href: "#faq" },
    { label: dictionary.nav.contact, href: "/#contacte" },
    { label: dictionary.nav.business, href: "/empreses/", highlight: true },
  ];
  const primaryHref = ctaHref ?? "#formulari";
  const primaryLabel = ctaLabel ?? dictionary.nav.primaryCta;

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-nimbus-line/80 bg-white/92 backdrop-blur">
      <div
        className={`mx-auto flex items-center justify-between gap-2 px-6 py-4 sm:gap-5 sm:px-8 ${
          wide ? "max-w-[92rem]" : "max-w-7xl"
        }`}
      >
        <a href={logoHref ?? "/"} className="flex shrink-0 items-center" aria-label="Nimbus Telecom">
          <Image
            src={NIMBUS_LOGO_URL}
            alt="Nimbus Telecom"
            className="h-auto w-[112px] object-contain sm:w-[158px]"
            width={223}
            height={70}
            unoptimized
          />
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label={dictionary.nav.aria}>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                item.highlight
                  ? "rounded-full border-2 border-nimbus-orange bg-orange-50 px-4 py-2 text-sm font-black text-nimbus-orange transition hover:bg-nimbus-orange hover:text-white text-center"
                  : "rounded-full border-2 border-transparent px-4 py-2 text-sm font-bold text-nimbus-muted transition hover:border-nimbus-orange hover:bg-orange-100 hover:text-nimbus-ink text-center"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher compact />
          </div>
          <a
            href={CLIENT_AREA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap rounded-full border border-nimbus-line bg-white px-3 py-2 text-xs font-bold text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange sm:inline-flex sm:px-4 sm:text-sm"
          >
            {dictionary.nav.clientArea}
          </a>
          <a
            href={CLIENT_AREA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full bg-nimbus-orange px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-nimbus-orangeDark sm:hidden"
          >
            {dictionary.nav.clientArea}
          </a>
          <a
            href={primaryHref}
            className="hidden whitespace-nowrap rounded-full bg-nimbus-orange px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-nimbus-orangeDark sm:inline-flex sm:px-4 sm:text-sm"
          >
            {primaryLabel}
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="grid size-10 place-items-center rounded-full border border-nimbus-orange bg-white text-nimbus-ink shadow-sm transition hover:bg-orange-50 hover:text-nimbus-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange lg:hidden"
          >
            <span className="sr-only">{isMenuOpen ? "Cerrar menú" : "Abrir menú"}</span>
            <span aria-hidden="true" className="grid gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <div id="mobile-menu" className="border-t border-nimbus-line bg-white px-4 py-4 shadow-soft lg:hidden">
          <nav className="mx-auto grid max-w-6xl gap-2" aria-label={dictionary.nav.aria}>
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={
                  item.highlight
                    ? "rounded-lg border-2 border-nimbus-orange bg-orange-50 px-4 py-3 text-sm font-black text-nimbus-orange transition hover:bg-nimbus-orange hover:text-white"
                    : "rounded-lg px-4 py-3 text-sm font-black text-nimbus-ink transition hover:bg-nimbus-soft hover:text-nimbus-orange"
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={primaryHref}
            onClick={() => setIsMenuOpen(false)}
            className="mx-auto mt-2 block max-w-6xl rounded-lg border border-nimbus-line px-4 py-3 text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
          >
            {primaryLabel}
          </a>
          <div className="mx-auto mt-4 max-w-6xl">
            <LanguageSwitcher />
          </div>
        </div>
      ) : null}
    </header>
  );
}
