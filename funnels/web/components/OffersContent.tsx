"use client";

import Image from "next/image";
import { CookieConsent } from "@/components/CookieConsent";
import { LanguageBanner } from "@/components/LanguageBanner";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { VisualIcon } from "@/components/VisualIcon";
import { trackEvent } from "@/lib/analytics";
import { NIMBUS_LOGO_URL } from "@/lib/brand";
import { CONTACT_INFO, LEGAL_LINKS } from "@/lib/contact";
import { DEFAULT_LOCALE, I18nProvider, useI18n, type Locale } from "@/lib/i18n";
import {
  AJAX_PRICE,
  EXPRESS_TV_PRICE,
  FIBER_PLANS,
  LINKTREE_URL,
  MOBILE_PLANS,
  OFFERS_CONTENT,
  RURAL_PLANS,
  SHARED_DATA_PLANS,
} from "@/lib/offers";
import { linkTo } from "@/lib/routes";

export function OffersContent({ locale = DEFAULT_LOCALE }: { locale?: Locale } = {}) {
  return (
    <I18nProvider locale={locale}>
      {/* Com a la resta del web: l'avis d'idioma nomes a la versio catalana,
          que es on cau qui escaneja el QR sense llegir catala. */}
      {locale === DEFAULT_LOCALE ? <LanguageBanner page="ofertes" /> : null}
      <OffersPageContent />
      {/* Sense el banner, ningu que arribi pel QR pot acceptar les cookies i
          GA es queda en mode denegat: les visites del flyer no es mesurarien. */}
      <CookieConsent />
    </I18nProvider>
  );
}

function OffersPageContent() {
  const { locale } = useI18n();
  const content = OFFERS_CONTENT[locale];

  return (
    <main className="min-h-screen overflow-hidden bg-white text-nimbus-ink">
      <section className="relative border-b border-nimbus-line bg-white">
        <div className="absolute inset-0 -z-0 opacity-[0.035]" aria-hidden="true">
          <div className="h-full w-full bg-[linear-gradient(120deg,transparent_0_46%,#F47B20_46%_48%,transparent_48%_100%),linear-gradient(60deg,transparent_0_46%,#1F252B_46%_48%,transparent_48%_100%)] bg-[length:180px_180px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-8 md:py-12">
          <div className="flex justify-end">
            <LanguageSwitcher compact page="ofertes" />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 flex justify-center">
              <Image
                src={NIMBUS_LOGO_URL}
                alt="Nimbus Telecom"
                width={223}
                height={70}
                unoptimized
                className="h-auto w-[190px] object-contain sm:w-[220px]"
              />
            </div>

            <h1 className="text-4xl font-black tracking-tight text-nimbus-ink md:text-6xl">{content.hero.title}</h1>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-black uppercase tracking-[0.12em] text-nimbus-ink">
              {content.hero.badges.map((badge) => (
                <span key={badge} className="rounded-full bg-nimbus-soft px-4 py-2">
                  {badge}
                </span>
              ))}
            </div>
            <ContactButtons className="mt-8 justify-center" position="hero" />
          </div>

          {/* La fibra va primer: el flyer que porta aqui es de fibra, i el
              primer que es veu ha de ser fibra (campanya fibra oct–des 2026). */}
          <div className="mt-10 grid gap-4 rounded-lg border border-nimbus-line bg-nimbus-soft p-5 shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-lg bg-white p-5">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                  <VisualIcon name="wifi" className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
                    {content.fiber.eyebrow}
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-nimbus-ink">{content.fiber.title}</h2>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {FIBER_PLANS.map((plan) => (
                  <PricePill key={plan.speed} label={plan.speed} price={plan.price} suffix={content.perMonth} />
                ))}
              </div>
              <p className="mt-3 text-center text-sm font-bold text-nimbus-muted">{content.fiber.terms}</p>
              <div className="mt-5 rounded-lg bg-orange-50 p-5 text-center">
                <p className="text-3xl font-black text-nimbus-orange">{content.fiber.discountTitle}</p>
                <p className="mt-2 text-base font-black leading-7 text-nimbus-ink md:text-lg">
                  {content.fiber.discountText}
                </p>
              </div>
            </article>
            <div className="rounded-lg bg-white p-5">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
                {content.mobile.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-nimbus-ink">{content.mobile.title}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {MOBILE_PLANS.map((plan) => (
                  <PricePill key={plan.data} label={plan.data} price={plan.price} suffix={content.perMonth} />
                ))}
              </div>
              <p className="mt-5 text-sm font-bold leading-6 text-nimbus-muted">{content.mobile.promoTerms}</p>
            </div>
          </div>

          {/* Programa de referits: es retira el 31/12/2026, quan acaba la promocio. */}
          <div className="mt-4 flex flex-col gap-4 rounded-lg bg-nimbus-ink p-5 text-white shadow-soft md:flex-row md:items-center md:justify-between md:p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-nimbus-orange text-white">
                <VisualIcon name="users" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-200">
                  {content.referral.eyebrow}
                </p>
                <p className="mt-1 text-lg font-black leading-7">{content.referral.text}</p>
              </div>
            </div>
            <a
              href={linkTo("amics", locale)}
              hrefLang={locale === "ca" ? undefined : "ca"}
              onClick={() => trackEvent("ofertes_amics_clicked", { locale })}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-nimbus-ink transition hover:bg-orange-50 hover:text-nimbus-orange"
            >
              {content.referral.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-nimbus-line bg-white p-6 shadow-soft md:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                <VisualIcon name="radio-tower" className="size-6" />
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
                  {content.rural.eyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-nimbus-ink">{content.rural.title}</h2>
              </div>
            </div>
            <div className="mt-7 grid gap-3">
              {RURAL_PLANS.map((plan) => (
                <PricePill key={plan.speed} label={plan.speed} price={plan.price} suffix={content.perMonth} />
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-nimbus-line bg-nimbus-ink p-6 text-white shadow-soft md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_0.95fr] md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-200">
                  {content.sharedData.eyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">{content.sharedData.title}</h2>
                <p className="mt-4 leading-7 text-white/75">{content.sharedData.text}</p>
                <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-nimbus-orange">
                  {content.sharedData.badge}
                </p>
              </div>
              <div className="grid gap-3">
                {SHARED_DATA_PLANS.map((plan) => (
                  <div key={plan.data} className="rounded-lg bg-white p-4 text-center text-nimbus-ink">
                    <p className="text-xl font-black">
                      {plan.data} - {plan.price}
                      {content.perMonth}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-nimbus-soft py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-2">
          <article className="rounded-lg border border-white bg-white p-6 text-center shadow-soft md:p-8">
            <p className="inline-flex rounded-full bg-orange-50 px-5 py-2 text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
              {content.ajax.badge}
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-nimbus-ink">{content.ajax.title}</h2>
            <p className="mt-3 text-2xl font-black text-nimbus-orange">{content.ajax.subtitle}</p>
            <ul className="mt-6 grid gap-3">
              {content.ajax.features.map((feature) => (
                <li key={feature} className="flex items-center justify-center gap-3 font-bold text-nimbus-ink">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                    <VisualIcon name="shield-check" className="size-4" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex justify-center">
              <div className="inline-flex rounded-full bg-nimbus-orange px-10 py-4 text-4xl font-black text-white">
                {AJAX_PRICE}
              </div>
            </div>
          </article>

          <article className="rounded-lg border border-nimbus-line bg-white p-6 text-center shadow-soft md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
              {content.expressTv.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink">{content.expressTv.title}</h2>
            <div className="mt-7 flex justify-center">
              <div className="inline-flex rounded-full bg-nimbus-orange px-10 py-4 text-4xl font-black text-white">
                {EXPRESS_TV_PRICE}
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {content.hero.badges.map((item) => (
                <div key={item} className="rounded-lg bg-nimbus-soft p-4 text-center text-base font-black text-nimbus-ink">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">Nimbus Telecom</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-nimbus-ink">{content.closing.title}</h2>
            <p className="mt-3 text-sm font-bold text-nimbus-muted">{content.vatNote}</p>
          </div>
          <ContactButtons className="md:w-[420px]" position="closing" />
        </div>
        <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center gap-5 border-t border-nimbus-line px-5 pt-6">
          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-nimbus-line bg-white px-5 py-3 text-sm font-black text-nimbus-ink shadow-sm transition hover:border-nimbus-orange hover:text-nimbus-orange"
          >
            <VisualIcon name="globe" className="size-5" />
            {content.closing.links}
          </a>
          {/* Avis legal, privacitat i cookies: la LSSI demana que les dades del
              titular siguin accessibles des de qualsevol pagina, tambe des d'aquesta. */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold text-nimbus-muted">
            <span>© Nimbus Telecom</span>
            {[content.legal.legalNotice, content.legal.privacy, content.legal.cookies].map((label, index) => (
              <a key={label} href={LEGAL_LINKS[index].href} className="underline-offset-4 hover:text-nimbus-orange hover:underline">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}

function PricePill({ label, price, suffix }: { label: string; price: string; suffix: string }) {
  return (
    <div className="rounded-full bg-yellow-300 px-5 py-3 text-center text-lg font-black text-nimbus-ink">
      <span>{label}</span>
      <span aria-hidden="true"> - </span>
      <span>
        {price}
        {suffix}
      </span>
    </div>
  );
}

// Els clics es marquen a GA amb la posicio: es l'unica conversio que fa
// aquesta pagina (no hi ha formulari), i sense aixo el flyer nomes es mesura
// per visites.
function ContactButtons({ className = "", position }: { className?: string; position: "hero" | "closing" }) {
  const { locale } = useI18n();
  const content = OFFERS_CONTENT[locale];

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      <a
        href={CONTACT_INFO.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("ofertes_whatsapp_clicked", { position, locale })}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#1FAF55]"
      >
        <WhatsAppIcon />
        {content.contact.whatsapp}
      </a>
      <a
        href={CONTACT_INFO.phoneHref}
        onClick={() => trackEvent("ofertes_phone_clicked", { position, locale })}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-nimbus-line bg-white px-5 py-3 text-sm font-black text-nimbus-ink shadow-sm transition hover:border-nimbus-orange hover:text-nimbus-orange"
      >
        <VisualIcon name="phone-call" className="size-5" />
        {content.contact.call}
      </a>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      className="size-5"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M3.5 20.5 5 16.2A8.5 8.5 0 1 1 8 19.1Z" />
      <path d="M9.2 8.9c.2-.4.4-.5.7-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.3 0 .5-.2.7l-.4.4c.5 1 1.3 1.8 2.4 2.4l.5-.5c.2-.2.5-.3.8-.2l1.4.7c.3.1.4.3.4.6v.4c0 .4-.2.7-.6.8-.6.2-1.2.2-1.8 0-2.5-.8-4.5-2.8-5.3-5.3-.2-.6-.2-1.2 0-1.8Z" />
    </svg>
  );
}
