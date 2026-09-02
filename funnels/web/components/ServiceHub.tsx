"use client";

import Link from "next/link";
import { HUB_CONTENT } from "@/lib/hub";
import { useI18n } from "@/lib/i18n";
import { VisualIcon } from "./VisualIcon";

export function ServiceHub() {
  const { locale } = useI18n();
  const content = HUB_CONTENT[locale];

  return (
    <section id="serveis" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
          {content.servicesTitle}
        </h2>
        <p className="mt-3 text-base leading-7 text-nimbus-muted">
          {content.servicesSubtitle}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {content.services.map((service) => (
          <article
            key={service.id}
            className="group flex flex-col rounded-3xl border border-nimbus-line bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-nimbus-orange/40"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-nimbus-orange/10 text-nimbus-orange">
                <VisualIcon name={service.icon} className="size-6" />
              </span>
              {!service.ready ? (
                <span className="rounded-full bg-nimbus-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-nimbus-muted">
                  {content.soonLabel}
                </span>
              ) : null}
            </div>

            <h3 className="mt-5 text-xl font-black text-nimbus-ink">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-nimbus-muted">
              {service.tagline}
            </p>

            <ul className="mt-5 space-y-2">
              {service.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-2 text-sm text-nimbus-ink"
                >
                  <VisualIcon
                    name="check-circle"
                    className="size-4 shrink-0 text-nimbus-orange"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-7 pt-1">
              <Link
                href={service.href}
                className="inline-flex items-center gap-2 rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
              >
                {service.cta}
                <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
