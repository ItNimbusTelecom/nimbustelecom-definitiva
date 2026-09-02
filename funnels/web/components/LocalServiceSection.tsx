"use client";

import Image from "next/image";
import { NIMBUS_STOREFRONT_IMAGE } from "@/lib/brand";
import { VisualIcon } from "./VisualIcon";
import { useI18n } from "@/lib/i18n";
import type { SectionCta } from "./TestimonialsSection";

const serviceCards = [
  {
    icon: "headphones",
  },
  {
    icon: "map-pin",
  },
  {
    icon: "lightbulb",
  },
  {
    icon: "life-buoy",
  },
] as const;

export type LocalServiceContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  text: string;
  cards: [string, string][];
};

export function LocalServiceSection({
  cta,
  content,
  background = "white",
}: {
  cta?: SectionCta;
  content?: LocalServiceContent;
  background?: "white" | "soft";
}) {
  const isSoft = background === "soft";
  const { dictionary } = useI18n();
  const c = content ?? dictionary.localService;

  const banner: SectionCta = cta ?? {
    text: dictionary.localService.closing,
    primaryLabel: dictionary.localService.studyCta,
    primaryHref: "#formulari",
    secondaryLabel: dictionary.localService.plansCta,
    secondaryHref: "#tarifes",
  };

  return (
    <section id="proximitat" className={`scroll-mt-24 py-20 ${isSoft ? "bg-nimbus-soft" : "bg-white"}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
              {c.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
              {c.title}
            </h2>
            <p className="mt-4 text-lg font-bold leading-8 text-nimbus-ink">
              {c.subtitle}
            </p>
            <p className="mt-4 text-lg leading-8 text-nimbus-muted">
              {c.text}
            </p>
            <div className="mt-8 overflow-hidden rounded-lg border border-nimbus-line bg-white shadow-soft">
              <Image
                src={NIMBUS_STOREFRONT_IMAGE}
                alt="Oficina de Nimbus Telecom en Sils"
                width={680}
                height={483}
                unoptimized
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:mt-48">
            {serviceCards.map((card, index) => (
              <article key={card.icon} className={`rounded-lg border border-nimbus-line p-5 ${isSoft ? "bg-white" : "bg-nimbus-soft"}`}>
                <div className={`grid size-10 place-items-center rounded-full text-nimbus-orange ${isSoft ? "bg-orange-100" : "bg-white"}`}>
                  <VisualIcon name={card.icon} className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-black text-nimbus-ink">{c.cards[index][0]}</h3>
                <p className="mt-3 text-sm leading-6 text-nimbus-muted">{c.cards[index][1]}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 rounded-lg border-l-4 border-nimbus-orange bg-orange-50 p-6 md:flex-row md:items-center md:justify-between">
          <p className="text-lg font-bold leading-8 text-nimbus-ink">
            {banner.text}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <a
              href={banner.primaryHref}
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {banner.primaryLabel}
            </a>
            <a
              href={banner.secondaryHref}
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              {banner.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
