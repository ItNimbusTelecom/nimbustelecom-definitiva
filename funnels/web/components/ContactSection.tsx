"use client";

import { useState } from "react";
import { CONTACT_INFO } from "@/lib/contact";
import { VisualIcon } from "./VisualIcon";

export type ContactContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  phoneTitle: string;
  whatsappTitle: string;
  emailTitle: string;
  officeTitle: string;
  officeCta: string;
  hours: string;
  copyEmail: string;
  copyNumber: string;
  copied: string;
};

export function ContactSection({ content }: { content: ContactContent }) {
  const [copiedField, setCopiedField] = useState<string>("");

  async function copyValue(field: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(""), 2000);
    } catch {
      setCopiedField("");
    }
  }

  return (
    <section id="contacte" className="scroll-mt-24 bg-nimbus-soft py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">{content.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center rounded-lg border border-nimbus-line bg-white p-5 text-center transition hover:border-nimbus-orange">
            <div className="grid size-10 place-items-center rounded-full bg-nimbus-soft text-nimbus-orange">
              <VisualIcon name="phone" className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-black text-nimbus-ink">{content.phoneTitle}</h3>
            <div className="mt-2 flex items-center justify-center gap-2">
              <a
                href={CONTACT_INFO.phoneHref}
                className="text-sm font-bold text-nimbus-ink transition hover:text-nimbus-orange"
              >
                {CONTACT_INFO.phoneLabel}
              </a>
              <button
                type="button"
                onClick={() => copyValue("phone", CONTACT_INFO.phoneLabel)}
                aria-label={content.copyNumber}
                title={content.copyNumber}
                className="shrink-0 rounded p-1 text-nimbus-muted transition hover:bg-nimbus-soft hover:text-nimbus-orange"
              >
                <VisualIcon name={copiedField === "phone" ? "check-circle" : "copy"} className="size-4" />
              </button>
            </div>
            <p
              aria-live="polite"
              className={`mt-1 text-xs font-black uppercase tracking-wide text-nimbus-orange transition-opacity ${
                copiedField === "phone" ? "opacity-100" : "opacity-0"
              }`}
            >
              {content.copied}
            </p>
          </div>

          <div className="flex flex-col items-center rounded-lg border border-nimbus-line bg-white p-5 text-center transition hover:border-nimbus-orange">
            <div className="grid size-10 place-items-center rounded-full bg-nimbus-soft text-nimbus-orange">
              <VisualIcon name="message-circle" className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-black text-nimbus-ink">{content.whatsappTitle}</h3>
            <div className="mt-2 flex items-center justify-center gap-2">
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-nimbus-ink transition hover:text-nimbus-orange"
              >
                {CONTACT_INFO.whatsappLabel}
              </a>
              <button
                type="button"
                onClick={() => copyValue("whatsapp", CONTACT_INFO.whatsappLabel)}
                aria-label={content.copyNumber}
                title={content.copyNumber}
                className="shrink-0 rounded p-1 text-nimbus-muted transition hover:bg-nimbus-soft hover:text-nimbus-orange"
              >
                <VisualIcon name={copiedField === "whatsapp" ? "check-circle" : "copy"} className="size-4" />
              </button>
            </div>
            <p
              aria-live="polite"
              className={`mt-1 text-xs font-black uppercase tracking-wide text-nimbus-orange transition-opacity ${
                copiedField === "whatsapp" ? "opacity-100" : "opacity-0"
              }`}
            >
              {content.copied}
            </p>
          </div>

          <div className="flex flex-col items-center rounded-lg border border-nimbus-line bg-white p-5 text-center transition hover:border-nimbus-orange">
            <div className="grid size-10 place-items-center rounded-full bg-nimbus-soft text-nimbus-orange">
              <VisualIcon name="mail" className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-black text-nimbus-ink">{content.emailTitle}</h3>
            <div className="mt-2 flex items-center justify-center gap-2">
              <a
                href={CONTACT_INFO.emailHref}
                className="break-all text-sm font-bold text-nimbus-ink transition hover:text-nimbus-orange"
              >
                {CONTACT_INFO.email}
              </a>
              <button
                type="button"
                onClick={() => copyValue("email", CONTACT_INFO.email)}
                aria-label={content.copyEmail}
                title={content.copyEmail}
                className="shrink-0 rounded p-1 text-nimbus-muted transition hover:bg-nimbus-soft hover:text-nimbus-orange"
              >
                <VisualIcon name={copiedField === "email" ? "check-circle" : "copy"} className="size-4" />
              </button>
            </div>
            <p
              aria-live="polite"
              className={`mt-1 text-xs font-black uppercase tracking-wide text-nimbus-orange transition-opacity ${
                copiedField === "email" ? "opacity-100" : "opacity-0"
              }`}
            >
              {content.copied}
            </p>
          </div>

          <a
            href={CONTACT_INFO.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-lg border border-nimbus-line bg-white p-5 text-center transition hover:border-nimbus-orange"
          >
            <div className="grid size-10 place-items-center rounded-full bg-nimbus-soft text-nimbus-orange">
              <VisualIcon name="map-pin" className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-black text-nimbus-ink">{content.officeTitle}</h3>
            <p className="mt-2 text-sm font-bold text-nimbus-ink group-hover:text-nimbus-orange">
              {CONTACT_INFO.address}
            </p>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-nimbus-muted">
              <VisualIcon name="clock" className="size-3.5" />
              {content.hours}
            </p>
            <p className="mt-2 text-xs font-black uppercase tracking-wide text-nimbus-orange">
              {content.officeCta}
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
