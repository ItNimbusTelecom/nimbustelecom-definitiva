"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { DirectContractModal } from "./DirectContractModal";
import { VisualIcon } from "./VisualIcon";

export type ContactContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
};

export function ContactSection({ content }: { content: ContactContent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    trackEvent("contacto_general_opened", { section: "home" });
    setIsModalOpen(true);
  }

  return (
    <section id="contacte" className="scroll-mt-24 bg-nimbus-soft py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
          {content.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
          {content.title}
        </h2>
        <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.subtitle}</p>

        <button
          type="button"
          onClick={openModal}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-nimbus-orange px-8 py-4 text-base font-black text-white shadow-soft transition hover:bg-nimbus-orangeDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange"
        >
          <VisualIcon name="phone" className="size-5" />
          {content.ctaLabel}
        </button>
      </div>

      {isModalOpen ? <DirectContractModal onClose={() => setIsModalOpen(false)} /> : null}
    </section>
  );
}
