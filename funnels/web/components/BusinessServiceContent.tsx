"use client";

import Image from "next/image";
import { ChatbaseEmbed } from "@/components/ChatbaseEmbed";
import { CookieConsent } from "@/components/CookieConsent";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { FaqList } from "@/components/FaqList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LandingTracker } from "@/components/LandingTracker";
import { LanguageBanner } from "@/components/LanguageBanner";
import { VisualIcon } from "@/components/VisualIcon";
import { DEFAULT_LOCALE, I18nProvider, useI18n, type Locale } from "@/lib/i18n";
import type { BusinessServiceContent as ServiceContent } from "@/lib/businessService";
import { linkTo, pathFor, type PageKey } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

const heroCardIcons = ["technician", "wrench", "map-pin"] as const;

// Ancla de la seccion "para que sirve": una por idioma, porque se ve en la URL.
const USES_ANCHOR: Record<Locale, string> = { ca: "utilitat", es: "utilidad", en: "utility" };

/**
 * Pagina de servicio para empresas (radioenllacos, xarxes, backup, centraleta,
 * antenes...). Todas tienen la misma estructura: hero, tres casos de uso,
 * como lo hacemos, zona, FAQ con FAQPage y CTA al formulario de empresas.
 * Lo que cambia es el contenido (lib/<servicio>.ts) y la imagen.
 */
export function BusinessServiceContent({
  page,
  content,
  image,
  locale = DEFAULT_LOCALE,
}: {
  page: PageKey;
  content: Record<Locale, ServiceContent>;
  image: { src: string; alt: string; width: number; height: number };
  locale?: Locale;
}) {
  return (
    <I18nProvider locale={locale}>
      {locale === DEFAULT_LOCALE ? <LanguageBanner page={page} /> : null}
      <ServicePageContent page={page} content={content} image={image} />
    </I18nProvider>
  );
}

function ServicePageContent({
  page,
  content: allContent,
  image,
}: {
  page: PageKey;
  content: Record<Locale, ServiceContent>;
  image: { src: string; alt: string; width: number; height: number };
}) {
  const { locale } = useI18n();
  const content = allContent[locale];
  // El formulario de empresas ya recoge lo que hace falta (quien eres, que
  // necesitas, donde): no se duplica aqui.
  const formHref = linkTo("empreses", locale, "#formulari");
  const usesAnchor = USES_ANCHOR[locale];

  return (
    <>
      <LandingTracker />
      <ChatbaseEmbed />
      <Header
        page={page}
        navItems={[
          { label: content.nav.what, href: `#${usesAnchor}` },
          { label: content.nav.how, href: "#com-funciona" },
          { label: content.nav.zone, href: "#zona" },
          { label: content.nav.faq, href: "#dubtes" },
          { label: content.nav.contact, href: linkTo("home", locale, "#contacte") },
          { label: content.nav.business, href: linkTo("empreses", locale), highlight: true },
        ]}
        ctaLabel={content.primaryCta}
        ctaHref={formHref}
        wide
        singleLineNav
      />

      <main>
        {/* Marcado Service + FAQPage. El Service dice que es, quien lo hace y
            donde: es lo que un asistente necesita para responder "quien
            instala radioenllacos a la Selva". */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: content.hero.eyebrow,
              serviceType: content.serviceType,
              description: content.meta.description,
              url: `${SITE_URL}${pathFor(page, locale)}`,
              provider: {
                "@type": "LocalBusiness",
                name: "Nimbus Telecom",
                url: SITE_URL,
                telephone: "+34972850155",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Carrer Major, 42",
                  postalCode: "17410",
                  addressLocality: "Sils",
                  addressRegion: "Girona",
                  addressCountry: "ES",
                },
              },
              areaServed: content.zone.towns.map((town) => ({ "@type": "City", name: town })),
            }).replace(/</g, "\\u003c"),
          }}
        />

        {/* HERO */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange shadow-sm">
                {content.hero.eyebrow}
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-nimbus-ink md:text-6xl">
                {content.hero.title}
              </h1>
              <p className="mt-6 text-xl leading-9 text-nimbus-muted">{content.hero.subtitle}</p>
              <p className="mt-5 text-lg leading-8 text-nimbus-muted">{content.hero.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={formHref}
                  className="inline-flex items-center gap-2 rounded-full bg-nimbus-orange px-6 py-3.5 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                >
                  {content.primaryCta}
                </a>
                <a
                  href={`#${usesAnchor}`}
                  className="inline-flex items-center gap-2 rounded-full border border-nimbus-line bg-white px-6 py-3.5 text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
                >
                  {content.hero.secondaryCta}
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-nimbus-line bg-white p-6 shadow-soft">
              <div className="grid gap-4">
                {content.hero.cardItems.map(([label, text], index) => (
                  <div key={label} className="flex items-center gap-4 rounded-lg bg-nimbus-soft p-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-full bg-nimbus-orange text-white">
                      <VisualIcon name={heroCardIcons[index] ?? "check-circle"} className="size-6" />
                    </div>
                    <div>
                      <p className="font-black text-nimbus-ink">{label}</p>
                      <p className="text-sm text-nimbus-muted">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-orange-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
                  {content.hero.focusEyebrow}
                </p>
                <p className="mt-2 text-lg font-black text-nimbus-ink">{content.hero.focusText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PARA QUE SIRVE */}
        <section id={usesAnchor} className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.uses.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.uses.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.uses.text}</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {content.uses.items.map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col rounded-lg border border-nimbus-line bg-white p-6 shadow-soft"
                >
                  <span className="grid size-12 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                    <VisualIcon name={item.icon} className="size-6" />
                  </span>
                  <h3 className="mt-4 text-xl font-black text-nimbus-ink">{item.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-nimbus-muted">{item.text}</p>
                </article>
              ))}
            </div>

            <p className="mt-8 rounded-lg border-l-4 border-nimbus-orange bg-orange-50 p-4 text-base leading-7 text-nimbus-ink">
              {content.uses.note}
              {content.uses.noteLink ? (
                <>
                  {" "}
                  <a href={linkTo(content.uses.noteLink.page, locale)} className="font-black text-nimbus-orange underline">
                    {content.uses.noteLink.label}
                  </a>
                </>
              ) : null}
            </p>
          </div>
        </section>

        {/* COMO LO HACEMOS */}
        <section id="com-funciona" className="scroll-mt-24 bg-nimbus-soft py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.how.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.how.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.how.text}</p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
              <div className="overflow-hidden rounded-lg border border-white bg-white shadow-soft">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  unoptimized
                  className="h-full min-h-[320px] w-full object-cover"
                />
              </div>
              <div className="grid content-between gap-4">
                {content.how.steps.map(([title, text], index) => (
                  <div key={title} className="flex gap-4 rounded-lg bg-white p-5 shadow-sm">
                    <div className="grid size-10 shrink-0 place-items-center rounded-full bg-nimbus-orange text-base font-black text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-black text-nimbus-ink">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-nimbus-muted">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ZONA */}
        <section id="zona" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.zone.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.zone.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.zone.text}</p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-3">
              {content.zone.towns.map((town) => (
                <li
                  key={town}
                  className="inline-flex items-center gap-2 rounded-full border border-nimbus-line bg-nimbus-soft px-4 py-2 text-sm font-bold text-nimbus-ink"
                >
                  <VisualIcon name="map-pin" className="size-4 text-nimbus-orange" />
                  {town}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-7 text-nimbus-muted">{content.zone.note}</p>
          </div>
        </section>

        {/* DUDAS */}
        <section id="dubtes" className="scroll-mt-24 bg-nimbus-soft py-20">
          <div className="mx-auto max-w-3xl px-5">
            {/* Marcado FAQPage: sale de la misma lista que las preguntas de
                pantalla, asi que no se puede desincronizar. Las respuestas
                tienen que estar en el HTML (ver FaqList) para que sea valido. */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: content.faq.items.map(([question, answer]) => ({
                    "@type": "Question",
                    name: question,
                    acceptedAnswer: { "@type": "Answer", text: answer },
                  })),
                }).replace(/</g, "\\u003c"),
              }}
            />
            <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
              {content.faq.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
              {content.faq.title}
            </h2>
            <FaqList items={content.faq.items} />
          </div>
        </section>

        {/* CTA */}
        <section id="contacte" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="rounded-lg bg-nimbus-ink p-8 text-white shadow-soft md:p-12">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-200">
                {content.cta.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{content.cta.title}</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">{content.cta.text}</p>
              {/* Un sol boto: porta a l'estudi per a empreses de /empreses/. */}
              <div className="mt-8 flex justify-center">
                <a
                  href={formHref}
                  className="inline-flex items-center gap-2 rounded-full bg-nimbus-orange px-6 py-3.5 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                >
                  {content.cta.formLabel}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingContactButtons />
      <CookieConsent />
      <Footer anchorId="pie" />
    </>
  );
}

