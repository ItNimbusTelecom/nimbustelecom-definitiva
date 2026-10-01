"use client";

import { CookieConsent } from "@/components/CookieConsent";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VisualIcon } from "@/components/VisualIcon";
import {
  AMICS_BASES,
  AMICS_BASES_TITLE,
  AMICS_FRIEND,
  AMICS_HERO,
  AMICS_STEPS,
} from "@/lib/amics";
import { CONTACT_INFO } from "@/lib/contact";
import { HUB_CONTENT } from "@/lib/hub";
import { I18nProvider } from "@/lib/i18n";
import { linkTo } from "@/lib/routes";

const LOCALE = "ca" as const;

export function AmicsContent() {
  return (
    <I18nProvider locale={LOCALE}>
      <AmicsPageContent />
    </I18nProvider>
  );
}

function AmicsPageContent() {
  const nav = HUB_CONTENT[LOCALE].nav;

  return (
    <>
      <Header
        page="amics"
        navItems={[
          { label: "Com funciona", href: "#com-funciona" },
          { label: "Bases", href: "#bases" },
          { label: nav.contact, href: linkTo("home", LOCALE, "#contacte") },
          { label: nav.business, href: linkTo("empreses", LOCALE), highlight: true },
        ]}
        ctaLabel="Comprovar cobertura"
        ctaHref={linkTo("internet", LOCALE, "#formulari")}
      />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange shadow-sm">
                {AMICS_HERO.eyebrow}
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-nimbus-ink md:text-6xl">
                {AMICS_HERO.title}
              </h1>
              <p className="mt-6 text-xl leading-9 text-nimbus-muted">{AMICS_HERO.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#com-funciona"
                  className="inline-flex items-center gap-2 rounded-full bg-nimbus-orange px-6 py-3.5 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                >
                  Com funciona
                </a>
                <a
                  href="#bases"
                  className="inline-flex items-center gap-2 rounded-full border border-nimbus-line bg-white px-6 py-3.5 text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
                >
                  Bases de la promoció
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-nimbus-line bg-white p-6 text-center shadow-soft md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">Per cada amic</p>
              <p className="mt-3 text-6xl font-black tracking-tight text-nimbus-ink md:text-7xl">1 mes</p>
              <p className="mt-1 text-2xl font-black text-nimbus-orange">gratis</p>
              <p className="mt-6 rounded-lg bg-orange-50 p-5 text-lg font-black leading-7 text-nimbus-ink">
                {AMICS_HERO.highlight}
              </p>
              <p className="mt-4 text-sm font-bold text-nimbus-muted">Altes fins al 31 de desembre de 2026</p>
            </div>
          </div>
        </section>

        {/* COM FUNCIONA */}
        <section id="com-funciona" className="scroll-mt-24 bg-nimbus-soft py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">Com funciona</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
              Tres passos, i cap codi per recordar
            </h2>
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {AMICS_STEPS.map((step, index) => (
                <li key={step.title} className="rounded-lg bg-white p-6 shadow-soft">
                  <span className="grid size-11 place-items-center rounded-full bg-nimbus-orange text-lg font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-black text-nimbus-ink">{step.title}</h3>
                  <p className="mt-2 leading-7 text-nimbus-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SI T'HAN RECOMANAT */}
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {AMICS_FRIEND.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {AMICS_FRIEND.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{AMICS_FRIEND.text}</p>
            </div>
            <div className="grid gap-3 rounded-lg border border-nimbus-line bg-nimbus-soft p-5 shadow-soft">
              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-center gap-3 rounded-lg bg-white p-4 font-black text-nimbus-ink transition hover:text-nimbus-orange"
              >
                <VisualIcon name="phone-call" className="size-5 text-nimbus-orange" />
                Trucant al {CONTACT_INFO.phoneLabel}
              </a>
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg bg-white p-4 font-black text-nimbus-ink transition hover:text-nimbus-orange"
              >
                <VisualIcon name="message-circle" className="size-5 text-nimbus-orange" />
                Per WhatsApp al {CONTACT_INFO.whatsappLabel}
              </a>
              <a
                href={CONTACT_INFO.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg bg-white p-4 font-black text-nimbus-ink transition hover:text-nimbus-orange"
              >
                <VisualIcon name="map-pin" className="size-5 text-nimbus-orange" />
                A l&apos;oficina: {CONTACT_INFO.address}
              </a>
              <a
                href={linkTo("internet", LOCALE, "#formulari")}
                className="mt-2 rounded-full bg-nimbus-orange px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
              >
                {AMICS_FRIEND.coverageCta}
              </a>
            </div>
          </div>
        </section>

        {/* BASES */}
        <section id="bases" className="scroll-mt-24 bg-nimbus-soft py-20">
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">Bases</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
              {AMICS_BASES_TITLE}
            </h2>
            <ol className="mt-8 grid gap-3">
              {AMICS_BASES.map((base, index) => (
                <li key={base.title} className="flex gap-4 rounded-lg bg-white p-5">
                  <span className="w-6 shrink-0 text-lg font-black text-nimbus-orange">{index + 1}.</span>
                  <p className="leading-7 text-nimbus-muted">
                    <strong className="font-black text-nimbus-ink">{base.title}:</strong> {base.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <FloatingContactButtons />
      <CookieConsent />
      <Footer anchorId="pie" />
    </>
  );
}
