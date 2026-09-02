"use client";

import { trackEvent } from "@/lib/analytics";
import { openChatbase } from "@/lib/chatbase";
import { useI18n } from "@/lib/i18n";
import { VisualIcon } from "./VisualIcon";

export function FAQSection() {
  const { dictionary } = useI18n();

  function openAssistantWithQuestion(question: string) {
    openChatbase(question);
    trackEvent("faq_item_opened", { question });
  }

  return (
    <section id="faq" className="scroll-mt-24 bg-nimbus-soft py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">{dictionary.faq.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {dictionary.faq.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">{dictionary.faq.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {dictionary.faq.items.map(([question]) => (
            <button
              key={question}
              type="button"
              onClick={() => openAssistantWithQuestion(question)}
              className="group flex min-h-28 items-start justify-between gap-4 rounded-lg border border-nimbus-line bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-nimbus-orange hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange"
            >
              <span className="text-base font-black leading-6 text-nimbus-ink transition group-hover:text-nimbus-orange">
                {question}
              </span>
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange"
              >
                <VisualIcon name="message-circle" className="size-4" />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-orange-100 bg-white p-6 md:flex md:items-center md:justify-between md:gap-8">
          <p className="text-xl font-black text-nimbus-ink">{dictionary.faq.ctaText}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <a
              href="#formulari"
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {dictionary.faq.studyCta}
            </a>
            <a
              href="#tarifes"
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              {dictionary.faq.plansCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
