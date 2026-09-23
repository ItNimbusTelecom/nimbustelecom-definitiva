"use client";

import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VisualIcon } from "@/components/VisualIcon";
import { CONTACT_INFO } from "@/lib/contact";
import { HUB_CONTENT } from "@/lib/hub";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { NOT_FOUND_CONTENT } from "@/lib/notFound";

export function NotFoundContent() {
  return (
    <I18nProvider>
      <NotFound />
    </I18nProvider>
  );
}

function NotFound() {
  const { locale } = useI18n();
  const hub = HUB_CONTENT[locale];
  const content = NOT_FOUND_CONTENT[locale];

  // Solo los servicios que ya tienen funnel propio: enviar a alguien desde un
  // error a una pagina vieja de WordPress seria encadenar dos decepciones.
  const services = hub.services.filter((service) => service.ready);

  return (
    <>
      <Header
        logoHref="/"
        navItems={[
          { label: hub.nav.company, href: "/#qui-som" },
          { label: hub.nav.services, href: "/#serveis" },
          { label: hub.nav.reviews, href: "/#opinions" },
          { label: hub.nav.contact, href: "/#contacte" },
          { label: hub.nav.business, href: "/empreses/", highlight: true },
        ]}
        ctaLabel={hub.primaryCta}
        ctaHref="/#serveis"
      />

      <main className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
          {content.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-7 text-nimbus-muted">{content.text}</p>

        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-nimbus-orange px-6 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange"
        >
          {content.homeCta}
        </a>

        <section className="mt-12 border-t border-nimbus-line pt-8">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-muted">
            {content.servicesTitle}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href={service.href}
                  className="flex items-center gap-3 rounded-lg border border-nimbus-line p-4 transition hover:border-nimbus-orange hover:shadow-soft"
                >
                  <VisualIcon name={service.icon} className="size-5 shrink-0 text-nimbus-orange" />
                  <span className="font-black text-nimbus-ink">{service.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-sm text-nimbus-muted">
          {content.helpText}{" "}
          <a
            href={CONTACT_INFO.phoneHref}
            className="font-black text-nimbus-ink underline decoration-orange-300 underline-offset-4 transition hover:text-nimbus-orange"
          >
            {CONTACT_INFO.phoneLabel}
          </a>
        </p>
      </main>

      <Footer anchorId="pie" />
      <CookieConsent />
    </>
  );
}
