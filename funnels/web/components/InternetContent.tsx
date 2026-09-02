"use client";

import Image from "next/image";
import { useState } from "react";
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
import { NIMBUS_WIMAX_IMAGE } from "@/lib/brand";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { INTERNET_CONTENT } from "@/lib/internet";

const approachIcons = [
  "radio-tower",
  "check-circle",
  "users",
  "map-pin",
  "shield-check",
  "headphones",
] as const;

const heroCardIcons = ["home", "masia", "store"] as const;

export function InternetContent() {
  return (
    <I18nProvider>
      <InternetPageContent />
    </I18nProvider>
  );
}

function InternetPageContent() {
  const { locale } = useI18n();
  const content = INTERNET_CONTENT[locale];

  return (
    <>
      <LandingTracker />
      <ChatbaseEmbed />
      <Header
        logoHref="/"
        navItems={[
          { label: content.nav.solution, href: "#com-funciona" },
          { label: content.nav.options, href: "#opcions" },
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
                  href="#opcions"
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

        {/* PROBLEMA */}
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.problem.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.problem.title}
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-nimbus-muted">{content.problem.text}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {content.problem.bullets.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-nimbus-line bg-white p-4 font-bold text-nimbus-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* COMO LO HACEMOS */}
        <section id="com-funciona" className="scroll-mt-24 bg-nimbus-soft py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.approach.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.approach.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.approach.text}</p>
              <div className="mt-8 overflow-hidden rounded-lg border border-white bg-white shadow-soft">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={NIMBUS_WIMAX_IMAGE}
                    alt="Antena de radioenlace para conexión rural"
                    width={724}
                    height={840}
                    unoptimized
                    className="h-full w-full object-cover object-[center_70%]"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:mt-64">
              {content.approach.checks.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                    <VisualIcon name={approachIcons[index]} className="size-4" />
                  </span>
                  <span className="font-bold text-nimbus-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPCIONES */}
        <section id="opcions" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.options.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.options.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.options.text}</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {content.options.items.map((option) => (
                <article
                  key={option.name}
                  className={`flex flex-col rounded-lg bg-white p-6 shadow-soft ${
                    option.featured ? "border-2 border-nimbus-orange" : "border border-nimbus-line"
                  }`}
                >
                  <p
                    className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${
                      option.featured
                        ? "bg-nimbus-orange text-white"
                        : "bg-nimbus-soft text-nimbus-muted"
                    }`}
                  >
                    {option.badge}
                  </p>
                  <h3 className="mt-4 text-xl font-black text-nimbus-ink">{option.name}</h3>
                  <p className="mt-2 text-3xl font-black text-nimbus-orange">
                    {option.price}
                    <span className="text-base font-bold text-nimbus-muted">{option.priceNote}</span>
                  </p>
                  <p className="mt-3 leading-7 text-nimbus-muted">{option.description}</p>
                  <ul className="mt-5 grid flex-1 gap-2 border-t border-nimbus-line pt-5">
                    {option.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm font-bold text-nimbus-ink">
                        <VisualIcon name="check-circle" className="mt-0.5 size-4 shrink-0 text-nimbus-orange" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#formulari"
                    className="mt-6 rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                  >
                    {content.primaryCta}
                  </a>
                </article>
              ))}
            </div>

            <p className="mt-8 rounded-lg border-l-4 border-nimbus-orange bg-orange-50 p-4 text-base leading-7 text-nimbus-ink">
              {content.options.note}
            </p>
          </div>
        </section>

        <LocalServiceSection
          content={content.localService}
          cta={{
            text: content.banner.text,
            primaryLabel: content.banner.primary,
            primaryHref: "#formulari",
            secondaryLabel: content.banner.secondary,
            secondaryHref: "/#contacte",
          }}
        />

        {/* DUDAS */}
        <section id="dubtes" className="scroll-mt-24 bg-nimbus-soft py-20">
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

        <TestimonialsSection
          content={content.reviewsSection}
          cta={{
            text: content.banner.text,
            primaryLabel: content.banner.primary,
            primaryHref: "#formulari",
            secondaryLabel: content.banner.secondary,
            secondaryHref: "/#contacte",
          }}
        />

        {/* FORMULARIO */}
        <CoverageStudyFunnel
          variant={{
            funnel: "internet",
            serviceType: "internet",
            crossSellTo: "mobile",
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-nimbus-line bg-white">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-black text-nimbus-ink"
      >
        {question}
        <VisualIcon
          name={isOpen ? "chevron-up" : "chevron-down"}
          className="size-4 shrink-0 text-nimbus-orange"
        />
      </button>
      {isOpen ? <p className="px-5 pb-5 leading-7 text-nimbus-muted">{answer}</p> : null}
    </div>
  );
}
