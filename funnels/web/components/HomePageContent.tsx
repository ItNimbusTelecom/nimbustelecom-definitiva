"use client";

import Image from "next/image";
import { AboutSection } from "@/components/AboutSection";
import { ChatbaseEmbed } from "@/components/ChatbaseEmbed";
import { ContactSection } from "@/components/ContactSection";
import { CookieConsent } from "@/components/CookieConsent";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LandingTracker } from "@/components/LandingTracker";
import { ServiceHub } from "@/components/ServiceHub";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VisualIcon } from "@/components/VisualIcon";
import { NIMBUS_STOREFRONT_IMAGE } from "@/lib/brand";
import { HUB_CONTENT } from "@/lib/hub";
import { I18nProvider, useI18n } from "@/lib/i18n";

export function HomePageContent() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  );
}

function HomeContent() {
  const { locale } = useI18n();
  const content = HUB_CONTENT[locale];

  return (
    <>
      <LandingTracker />
      <ChatbaseEmbed />

      <Header
        logoHref="/"
        navItems={[
          { label: content.nav.company, href: "#qui-som" },
          { label: content.nav.services, href: "#serveis" },
          { label: content.nav.reviews, href: "#opinions" },
          { label: content.nav.contact, href: "#contacte" },
          { label: content.nav.business, href: "/empreses/", highlight: true },
        ]}
        ctaLabel={content.primaryCta}
        ctaHref="#serveis"
      />

      <main>
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-5 pb-4 pt-12 md:pt-16">
          <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="inline-flex rounded-full border border-nimbus-orange/30 bg-white px-4 py-1.5 text-xs font-black uppercase tracking-wide text-nimbus-orange">
                {content.eyebrow}
              </span>

              <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-nimbus-ink md:text-[2.75rem] md:leading-[1.1]">
                {content.title}
              </h1>

              <p className="mt-5 text-base leading-7 text-nimbus-muted md:text-lg">
                {content.subtitle}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {content.heroProofs.map((proof) => (
                  <div key={proof.value} className="rounded-lg bg-white/70 p-4">
                    <p className="text-lg font-black leading-tight text-nimbus-ink">{proof.value}</p>
                    <p className="mt-1 text-sm text-nimbus-muted">{proof.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#serveis"
                  className="inline-flex items-center gap-2 rounded-full bg-nimbus-orange px-6 py-3.5 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                >
                  {content.primaryCta}
                </a>
                <a
                  href="#contacte"
                  className="inline-flex items-center gap-2 rounded-full border border-nimbus-line bg-white px-6 py-3.5 text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange/40"
                >
                  <VisualIcon name="phone" className="size-4" />
                  {content.secondaryCta}
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm md:max-w-none">
              <div className="overflow-hidden rounded-3xl border border-nimbus-line bg-white shadow-soft">
                <Image
                  src={NIMBUS_STOREFRONT_IMAGE}
                  alt=""
                  width={560}
                  height={420}
                  className="aspect-[4/3] w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* QUIENES SOMOS */}
        <AboutSection />

        {/* HUB DE SERVICIOS */}
        <ServiceHub />

        <TestimonialsSection
          content={content.reviewsSection}
          cta={{
            text: content.banners.reviews.text,
            primaryLabel: content.banners.reviews.primary,
            primaryHref: "#contacte",
            secondaryLabel: content.banners.reviews.secondary,
            secondaryHref: "#serveis",
          }}
        />

        {/* CONTACTO */}
        <ContactSection content={content.contact} />
      </main>

      <Footer anchorId="pie" />
      <FloatingContactButtons />
      <CookieConsent />
    </>
  );
}
