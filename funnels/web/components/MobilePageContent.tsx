"use client";

import Image from "next/image";
import { ChatbaseEmbed } from "@/components/ChatbaseEmbed";
import { CoverageStudyFunnel } from "@/components/CoverageStudyFunnel";
import { CookieConsent } from "@/components/CookieConsent";
import { FAQSection } from "@/components/FAQSection";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroActions } from "@/components/HeroActions";
import { LandingTracker } from "@/components/LandingTracker";
import { LocalServiceSection } from "@/components/LocalServiceSection";
import { MobilePlans } from "@/components/MobilePlans";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VideoSection } from "@/components/VideoSection";
import { VisualIcon } from "@/components/VisualIcon";
import { NIMBUS_ANTENNA_IMAGE } from "@/lib/brand";
import { I18nProvider, useI18n } from "@/lib/i18n";

const solutionChecks = [
  "radio-tower",
  "phone",
  "wifi",
  "phone-call",
  "wifi",
  "globe",
  "smartphone",
  "shield-check",
] as const;

const heroCardIcons = ["home", "briefcase", "navigation"] as const;

export function MobilePageContent() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  );
}

function HomeContent() {
  const { dictionary } = useI18n();

  return (
    <>
      <LandingTracker />
      <ChatbaseEmbed />
      <Header />
      <main>
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange shadow-sm">
                {dictionary.hero.eyebrow}
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-nimbus-ink md:text-6xl">
                {dictionary.hero.title}
              </h1>
              <p className="mt-6 text-xl leading-9 text-nimbus-muted">
                {dictionary.hero.subtitle}
              </p>
              <p className="mt-5 text-lg leading-8 text-nimbus-muted">
                {dictionary.hero.text}
              </p>
              <HeroActions />
            </div>

            <div className="rounded-lg border border-nimbus-line bg-white p-6 shadow-soft">
              <div className="grid gap-4">
                {dictionary.hero.cardItems.map(([label, text], index) => (
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
                  {dictionary.hero.focusEyebrow}
                </p>
                <p className="mt-2 text-lg font-black text-nimbus-ink">{dictionary.hero.focusText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {dictionary.problem.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {dictionary.problem.title}
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-nimbus-muted">{dictionary.problem.text}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {dictionary.problem.bullets.map((item) => (
                  <li key={item} className="rounded-lg border border-nimbus-line bg-white p-4 font-bold text-nimbus-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="solucio" className="scroll-mt-24 bg-nimbus-soft py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
                {dictionary.solution.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                {dictionary.solution.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">{dictionary.solution.text}</p>
              <div className="mt-8 overflow-hidden rounded-lg border border-white bg-white shadow-soft">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={NIMBUS_ANTENNA_IMAGE}
                    alt="Antena de telecomunicaciones en una zona elevada"
                    width={382}
                    height={510}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nimbus-ink/70 to-transparent p-5">
                    <p className="max-w-sm text-sm font-black uppercase tracking-[0.16em] text-white">
                      {dictionary.solution.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {dictionary.solution.checks.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                    <VisualIcon name={solutionChecks[index]} className="size-4" />
                  </span>
                  <span className="font-bold text-nimbus-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <VideoSection />

        <LocalServiceSection />

        <MobilePlans />

        <section className="bg-nimbus-soft py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-5 md:grid-cols-3">
              {dictionary.featureCards.map(([title, text]) => (
                <article key={title} className="rounded-lg border border-nimbus-line bg-white p-6">
                  <h3 className="text-xl font-black text-nimbus-ink">{title}</h3>
                  <p className="mt-3 leading-7 text-nimbus-muted">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <FAQSection />
        <CoverageStudyFunnel />
      </main>
      <FloatingContactButtons />
      <CookieConsent />
      <Footer />
    </>
  );
}
