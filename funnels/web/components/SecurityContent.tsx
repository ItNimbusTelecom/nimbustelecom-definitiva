"use client";

import { ChatbaseEmbed } from "@/components/ChatbaseEmbed";
import { CookieConsent } from "@/components/CookieConsent";
import { CoverageStudyFunnel } from "@/components/CoverageStudyFunnel";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LandingTracker } from "@/components/LandingTracker";
import { LocalServiceSection } from "@/components/LocalServiceSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VisualIcon } from "@/components/VisualIcon";
import { useEffect, useState } from "react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { SECURITY_CONTENT } from "@/lib/security";
import Image from "next/image";
import { NIMBUS_SECURITY_IMAGES, NIMBUS_SECURITY_VIDEOS } from "@/lib/brand";

const heroCardIcons = ["technician", "sliders", "wrench"] as const;

export function SecurityContent() {
  return (
    <I18nProvider>
      <SecurityPageContent />
    </I18nProvider>
  );
}

function SecurityPageContent() {
  const { locale } = useI18n();
  const content = SECURITY_CONTENT[locale];

  return (
    <>
      <LandingTracker />
      <ChatbaseEmbed />
      <Header
        logoHref="/"
        wide
        navItems={[
          { label: content.nav.what, href: "#protegim" },
          { label: content.services.eyebrow, href: "#serveis" },
          { label: content.nav.how, href: "#com-funciona" },
          { label: content.nav.faq, href: "#dubtes" },
          { label: content.nav.contact, href: "/#contacte" },
          { label: content.nav.business, href: "/empreses/", highlight: true },
        ]}
        ctaLabel={content.primaryCta}
        ctaHref="#formulari"
      />

      <main>
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
                  href="#formulari"
                  className="inline-flex items-center gap-2 rounded-full bg-nimbus-orange px-6 py-3.5 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                >
                  {content.hero.primaryCta}
                </a>
                <a
                  href="#protegim"
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

        {/* QUE PROTEGEMOS */}
        <section id="protegim" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.protect.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.protect.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.protect.text}</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {content.protect.items.map((item, index) => (
                <article
                  key={item.title}
                  className="flex flex-col rounded-lg border border-nimbus-line bg-white p-6 shadow-soft"
                >
                  <span className="grid size-12 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                    <VisualIcon name={item.icon} className="size-6" />
                  </span>
                  <h3 className="mt-4 text-xl font-black text-nimbus-ink">{item.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-nimbus-muted">{item.text}</p>
                  <a
                    href={`#${content.services.items[index]?.id ?? "serveis"}`}
                    className="mt-6 rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                  >
                    {content.protect.moreInfoCta}
                  </a>
                </article>
              ))}
            </div>

            <p className="mt-8 rounded-lg border-l-4 border-nimbus-orange bg-orange-50 p-4 text-base leading-7 text-nimbus-ink">
              {content.protect.note}
            </p>
          </div>
        </section>

        {/* SERVICIOS EN DETALLE - una sección completa por servicio */}
        <section id="serveis" className="scroll-mt-24 bg-white pt-20 pb-5">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.services.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.services.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.services.text}</p>
            </div>
          </div>
        </section>

        {content.services.items.map((item, index) => (
          <section
            key={item.id}
            id={item.id}
            className={`scroll-mt-24 bg-white py-5 ${
              index === content.services.items.length - 1 ? "pb-20" : ""
            }`}
          >
            <div className="mx-auto max-w-7xl px-5">
              <div className="rounded-lg border border-nimbus-line bg-white p-6 shadow-soft md:p-10">
                <div className="max-w-5xl">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                      <VisualIcon name={item.icon} className="size-7" />
                    </span>
                    <h3 className="text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                      {item.title}
                    </h3>
                    {item.badge ? (
                      <span className="rounded-lg bg-nimbus-orange px-5 py-3 text-lg font-black text-white md:text-xl">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-lg leading-8 text-nimbus-muted">{item.lead}</p>
                </div>

                <div className="mt-8">
                  <div
                    className={`mx-auto grid max-w-4xl gap-4 ${
                      NIMBUS_SECURITY_VIDEOS[index % NIMBUS_SECURITY_VIDEOS.length].length > 1
                        ? "sm:grid-cols-2"
                        : ""
                    }`}
                  >
                    {NIMBUS_SECURITY_VIDEOS[index % NIMBUS_SECURITY_VIDEOS.length].map((video) => (
                      <video
                        key={video.src}
                        src={video.src}
                        poster={video.poster}
                        controls
                        playsInline
                        preload="metadata"
                        className="max-h-[640px] w-full rounded-lg bg-nimbus-soft object-contain"
                      />
                    ))}
                  </div>

                  <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {item.points.slice(0, 4).map((point) => (
                      <div
                        key={point}
                        className="flex flex-col gap-3 rounded-lg bg-nimbus-soft p-5"
                      >
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                          <VisualIcon name="check-circle" className="size-4" />
                        </span>
                        <p className="text-sm leading-6 text-nimbus-muted">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <a
                    href="#formulari"
                    className="inline-flex rounded-full bg-nimbus-orange px-6 py-3.5 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                  >
                    {content.primaryCta}
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* COMO FUNCIONA */}
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

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              <SecuritySlideshow />
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

        {/* RGPD */}
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.rgpd.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.rgpd.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.rgpd.text}</p>
            </div>
            <div className="grid gap-3">
              {content.rgpd.checks.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-nimbus-line bg-white p-4 shadow-sm">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                    <VisualIcon name="check-circle" className="size-4" />
                  </span>
                  <span className="font-bold text-nimbus-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LocalServiceSection
          background="soft"
          content={content.localService}
          cta={{
            text: content.form.text,
            primaryLabel: content.primaryCta,
            primaryHref: "#formulari",
            secondaryLabel: content.nav.contact,
            secondaryHref: "/#contacte",
          }}
        />

        <TestimonialsSection
          content={content.reviewsSection}
          cta={{
            text: content.form.text,
            primaryLabel: content.primaryCta,
            primaryHref: "#formulari",
            secondaryLabel: content.nav.contact,
            secondaryHref: "/#contacte",
          }}
        />

        {/* DUDAS */}
        <section id="dubtes" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
              {content.faq.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
              {content.faq.title}
            </h2>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {content.faq.items.map(([question, answer]) => (
                <FaqItem key={question} question={question} answer={answer} />
              ))}
            </div>
          </div>
        </section>

        {/* FORMULARIO */}
        <CoverageStudyFunnel
          variant={{
            funnel: "seguridad",
            serviceType: "security",
            crossSellTo: "business",
            eyebrow: content.form.eyebrow,
            title: content.form.title,
            text: content.form.text,
            step1Title: content.form.step1Title,
            step2Title: content.form.step2Title,
            step3Title: content.form.step3Title,
            problems: content.form.problems,
            locationTypes: content.form.locationTypes,
            locationLabel: content.form.locationLabel,
            locationPlaceholder: content.form.locationPlaceholder,
            requireLocationText: true,
            usageOptions: content.form.usageOptions,
            diagnosticPurpose: content.form.diagnosticPurpose,
            finalText: content.form.finalText,
            noSalesTitle: content.form.noSalesTitle,
            noSalesText: content.form.noSalesText,
            extraNote: content.travelNote,
            summaryLabels: content.form.summaryLabels,
          }}
        />
      </main>

      <FloatingContactButtons />
      <CookieConsent />
      <Footer anchorId="pie" />
    </>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-nimbus-line bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left font-black text-nimbus-ink"
      >
        {question}
        <VisualIcon name={open ? "chevron-up" : "chevron-down"} className="size-5 shrink-0 text-nimbus-orange" />
      </button>
      {open ? <p className="px-5 pb-5 leading-7 text-nimbus-muted">{answer}</p> : null}
    </div>
  );
}

function SecuritySlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % NIMBUS_SECURITY_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full overflow-hidden rounded-lg border border-white bg-white shadow-soft">
      <div className="relative h-full min-h-[320px] lg:aspect-auto">
        {NIMBUS_SECURITY_IMAGES.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={1400}
            height={1006}
            unoptimized
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}