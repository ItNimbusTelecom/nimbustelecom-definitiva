"use client";

import { ChatbaseEmbed } from "@/components/ChatbaseEmbed";
import { CookieConsent } from "@/components/CookieConsent";
import { CoverageStudyFunnel } from "@/components/CoverageStudyFunnel";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LandingTracker } from "@/components/LandingTracker";
import { LocalServiceSection } from "@/components/LocalServiceSection";
import { ServicesWheel } from "@/components/ServicesWheel";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VisualIcon } from "@/components/VisualIcon";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { BUSINESS_CONTENT } from "@/lib/business";

const heroCardIcons = ["pencil", "wrench", "network", "eye"] as const;

export function BusinessContent() {
  return (
    <I18nProvider>
      <BusinessPageContent />
    </I18nProvider>
  );
}

function BusinessPageContent() {
  const { locale } = useI18n();
  const content = BUSINESS_CONTENT[locale];

  return (
    <>
      <LandingTracker />
      <ChatbaseEmbed />
      <Header
        logoHref="/"
        navItems={[
          { label: content.nav.problem, href: "#problema" },
          { label: content.nav.services, href: "#integrem" },
          { label: content.nav.how, href: "#com-funciona" },
          { label: content.nav.reviews, href: "#opinions" },
          { label: content.nav.contact, href: "/#contacte" },
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
                  href="#integrem"
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

        {/* EL PROBLEMA */}
        <section id="problema" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.problem.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.problem.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.problem.text}</p>
            </div>
            <div className="grid gap-3">
              {content.problem.scenes.map((scene) => (
                <div
                  key={scene}
                  className="flex gap-3 rounded-lg border border-nimbus-line bg-white p-4 shadow-sm"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                    <VisualIcon name="check-circle" className="size-4" />
                  </span>
                  <span className="font-bold text-nimbus-ink">{scene}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LA SOLUCION */}
        <section id="solucio" className="scroll-mt-24 bg-nimbus-soft py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {content.solution.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {content.solution.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.solution.text}</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {content.solution.items.map((item) => (
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
          </div>
        </section>

        {/* QUE INTEGRAMOS */}
        <section id="integrem" className="scroll-mt-24 bg-white py-20">
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

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:hidden lg:grid-cols-3">
              {content.services.items.map((item) => (
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

            <div className="mt-10">
              <ServicesWheel items={content.services.items} hubLabel={content.services.hubLabel} />
            </div>

            <p className="mt-8 rounded-lg border-l-4 border-nimbus-orange bg-orange-50 p-4 text-base leading-7 text-nimbus-ink">
              {content.services.note}
            </p>
          </div>
        </section>

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

            <div className="mt-10 grid gap-4 md:grid-cols-2">
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
        </section>

        <LocalServiceSection
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

        {/* FORMULARIO */}
        <CoverageStudyFunnel
          variant={{
            funnel: "empreses",
            serviceType: "business",
            crossSellTo: "security",
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
