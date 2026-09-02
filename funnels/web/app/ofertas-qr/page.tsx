import type { Metadata } from "next";
import Image from "next/image";
import { VisualIcon } from "@/components/VisualIcon";
import { CONTACT_INFO } from "@/lib/contact";
import { NIMBUS_LOGO_URL } from "@/lib/brand";

const LINKTREE_URL = "https://linktr.ee/nimbustelecom";

export const metadata: Metadata = {
  title: "Ofertes reals en fibra, mòbil i internet | Nimbus Telecom",
  description:
    "Promoció Nimbus Telecom amb ofertes de fibra òptica, mòbil, internet rural, alarma Ajax i Servei Express TV.",
  alternates: { canonical: "/ofertas-qr/" },
  robots: {
    index: false,
    follow: false,
  },
};

const ruralPlans = [
  { speed: "10 Mb", price: "29,95€" },
  { speed: "15 Mb", price: "39,95€" },
  { speed: "30 Mb", price: "49,95€" },
];

const mobilePlans = [
  { data: "50GB", price: "6,95€" },
  { data: "80GB", price: "7,95€" },
  { data: "150GB", price: "10,95€" },
  { data: "400GB", price: "14,95€" },
];

const mobilePromoTerms =
  "Tarifes JUNTS ESTIU vàlides fins al 30/09/2026. Promo de per vida mentre es mantingui la tarifa. No acumulable amb altres promocions.";

const sharedDataPlans = [
  { data: "120GB", price: "21,90€" },
  { data: "160GB", price: "26,90€" },
  { data: "300GB", price: "36,90€" },
];

const fiberPlans = [
  { speed: "600Mb", price: "32€" },
  { speed: "1000Mb", price: "38€" },
];

const ajaxFeatures = ["Control total des del mòbil", "Avisos immediats", "Instal·lació inclosa"];

export default function OffersQrPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-nimbus-ink">
      <section className="relative border-b border-nimbus-line bg-white">
        <div className="absolute inset-0 -z-0 opacity-[0.035]" aria-hidden="true">
          <div className="h-full w-full bg-[linear-gradient(120deg,transparent_0_46%,#F47B20_46%_48%,transparent_48%_100%),linear-gradient(60deg,transparent_0_46%,#1F252B_46%_48%,transparent_48%_100%)] bg-[length:180px_180px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-8 md:py-12">
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

            <h1 className="text-4xl font-black tracking-tight text-nimbus-ink md:text-6xl">
              Ofertes reals en fibra, mòbil i internet
            </h1>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-black uppercase tracking-[0.12em] text-nimbus-ink">
              <span className="rounded-full bg-nimbus-soft px-4 py-2">Sense sorpreses</span>
              <span className="rounded-full bg-nimbus-soft px-4 py-2">Sense complicacions</span>
              <span className="rounded-full bg-nimbus-soft px-4 py-2">Atenció propera</span>
            </div>
            <ContactButtons className="mt-8 justify-center" />
          </div>

          <div className="mt-10 grid gap-4 rounded-lg border border-nimbus-line bg-nimbus-soft p-5 shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
            <PromoCard
              eyebrow="Internet rural"
              title="Connexió per zones on la fibra no arriba"
              icon="radio-tower"
              plans={ruralPlans.map((plan) => `${plan.speed} - ${plan.price}/mes`)}
            />
            <div className="rounded-lg bg-white p-5">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">Mòbil</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-nimbus-ink">
                Tarifes mòbils sense sorpreses
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {mobilePlans.map((plan) => (
                  <PricePill key={plan.data} label={plan.data} price={plan.price} />
                ))}
              </div>
              <p className="mt-5 text-sm font-bold leading-6 text-nimbus-muted">{mobilePromoTerms}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-nimbus-line bg-white p-6 shadow-soft md:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                <VisualIcon name="wifi" className="size-6" />
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">Fibra òptica</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-nimbus-ink">Fibra per a casa o negoci</h2>
              </div>
            </div>
            <div className="mt-7 grid gap-3">
              {fiberPlans.map((plan) => (
                <PricePill key={plan.speed} label={plan.speed} price={plan.price} />
              ))}
            </div>
            <DiscountCallout />
          </article>

          <article className="rounded-lg border border-nimbus-line bg-nimbus-ink p-6 text-white shadow-soft md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_0.95fr] md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-200">Dades compartides</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Comparteix dades entre línies mòbils</h2>
                <p className="mt-4 leading-7 text-white/75">
                  Si tens diverses línies mòbils, pots compartir dades entre elles.
                </p>
                <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-nimbus-orange">
                  Màx. 3 línies
                </p>
              </div>
              <div className="grid gap-3">
                {sharedDataPlans.map((plan) => (
                  <div key={plan.data} className="rounded-lg bg-white p-4 text-center text-nimbus-ink">
                    <p className="text-xl font-black">
                      {plan.data} - {plan.price}/mes
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
              Sense quotes mensuals
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-nimbus-ink">Alarma Ajax</h2>
            <p className="mt-3 text-2xl font-black text-nimbus-orange">Protegeix casa teva</p>
            <ul className="mt-6 grid gap-3">
              {ajaxFeatures.map((feature) => (
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
                499€
              </div>
            </div>
          </article>

          <article className="rounded-lg border border-nimbus-line bg-white p-6 text-center shadow-soft md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
              Servei Express TV
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink">
              Deixa la teva senyal funcionant en una sola visita
            </h2>
            <div className="mt-7 flex justify-center">
              <div className="inline-flex rounded-full bg-nimbus-orange px-10 py-4 text-4xl font-black text-white">
                75€
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Sense sorpreses", "Sense complicacions", "Atenció propera"].map((item) => (
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
            <h2 className="mt-2 text-3xl font-black tracking-tight text-nimbus-ink">
              T&apos;ajudem a escollir la millor opció per a casa teva.
            </h2>
          </div>
          <ContactButtons className="md:w-[420px]" />
        </div>
        <div className="mx-auto mt-8 flex max-w-6xl justify-center border-t border-nimbus-line px-5 pt-6">
          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-nimbus-line bg-white px-5 py-3 text-sm font-black text-nimbus-ink shadow-sm transition hover:border-nimbus-orange hover:text-nimbus-orange"
          >
            <VisualIcon name="globe" className="size-5" />
            Tots els enllaços Nimbus
          </a>
        </div>
      </section>
    </main>
  );
}

type PromoCardProps = {
  eyebrow: string;
  title: string;
  icon: "radio-tower" | "wifi";
  plans: string[];
};

function PromoCard({ eyebrow, title, icon, plans }: PromoCardProps) {
  return (
    <article className="rounded-lg bg-white p-5">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
          <VisualIcon name={icon} className="size-5" />
        </span>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-nimbus-ink">{title}</h2>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {plans.map((plan) => (
          <div key={plan} className="rounded-full bg-yellow-300 px-5 py-3 text-center text-lg font-black text-nimbus-ink">
            {plan}
          </div>
        ))}
      </div>
    </article>
  );
}

function PricePill({ label, price, suffix = "/mes" }: { label: string; price: string; suffix?: string }) {
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

function DiscountCallout({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`mt-6 rounded-lg bg-orange-50 p-5 text-center ${compact ? "" : "md:p-6"}`}>
      <p className={`${compact ? "text-3xl" : "text-4xl"} font-black text-nimbus-orange`}>
        10% de descompte
      </p>
      <p className="mt-2 text-base font-black leading-7 text-nimbus-ink md:text-lg">
        A totes les línies mòbils en contractar la fibra.
      </p>
    </div>
  );
}

function ContactButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      <a
        href={CONTACT_INFO.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#1FAF55]"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <a
        href={CONTACT_INFO.phoneHref}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-nimbus-line bg-white px-5 py-3 text-sm font-black text-nimbus-ink shadow-sm transition hover:border-nimbus-orange hover:text-nimbus-orange"
      >
        <VisualIcon name="phone-call" className="size-5" />
        Trucar
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
