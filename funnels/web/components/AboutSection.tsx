"use client";

import { HUB_CONTENT } from "@/lib/hub";
import { useI18n } from "@/lib/i18n";
import { VisualIcon } from "./VisualIcon";

export function AboutSection() {
  const { locale } = useI18n();
  const about = HUB_CONTENT[locale].about;

  return (
    <section id="qui-som" className="scroll-mt-[600px] border-y border-nimbus-line bg-white/70">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-nimbus-orange">
              {about.eyebrow}
            </span>
            <h2 className="mt-3 text-2xl font-black leading-snug tracking-tight text-nimbus-ink md:text-3xl">
              {about.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-nimbus-muted">
              {about.lead}
            </p>
            <p className="mt-4 text-base leading-7 text-nimbus-muted">
              {about.text}
            </p>
          </div>

          <ul className="space-y-4">
            {about.values.map((value) => (
              <li
                key={value.title}
                className="flex gap-4 rounded-2xl border border-nimbus-line bg-white p-5"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-nimbus-orange/10 text-nimbus-orange">
                  <VisualIcon name={value.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-nimbus-ink">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-nimbus-muted">
                    {value.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
