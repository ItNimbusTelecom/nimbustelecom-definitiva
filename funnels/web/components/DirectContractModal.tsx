"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { getElapsedSeconds } from "@/lib/antispam";
import { isValidPersonName, isValidSpanishPhone } from "@/lib/formValidation";
import { useI18n } from "@/lib/i18n";
import { type MobilePlan } from "@/lib/plans";
import { submitLead as submitLeadRequest } from "@/lib/submitLead";
import { getLeadSource } from "@/lib/utm";
import { LegalConsentCheckbox } from "./LegalConsentCheckbox";
import { VisualIcon } from "./VisualIcon";

type ContactChoice = "phone" | "whatsapp" | "office";

type DirectContractModalProps = {
  plan: MobilePlan;
  onClose: () => void;
};

const contactChoices: Array<{ id: ContactChoice; icon: "phone" | "message-circle" | "map-pin" }> = [
  { id: "phone", icon: "phone" },
  { id: "whatsapp", icon: "message-circle" },
  { id: "office", icon: "map-pin" },
];

const WHATSAPP_URL =
  "https://wa.me/34622812604?text=Hola%20Nimbus%2C%20quiero%20informaci%C3%B3n%20para%20contratar%20una%20l%C3%ADnea%20m%C3%B3vil.";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/5LVXuQYrybacb82U8";
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Nimbus%20Telecom%2C%20C%2F%20Major%2042%2C%20Sils&output=embed";

export function DirectContractModal({ plan, onClose }: DirectContractModalProps) {
  const { dictionary } = useI18n();
  const [choice, setChoice] = useState<ContactChoice>("phone");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [formStartedAt] = useState(() => new Date().toISOString());
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const preferredContact = choice;
  const consentError = error === dictionary.modal.errors.consent ? error : undefined;

  function selectChoice(nextChoice: ContactChoice) {
    setChoice(nextChoice);
    setError("");
    setSent(false);
    if (nextChoice === "office") {
      trackEvent("contratacion_oficina_selected", { plan_id: plan.id });
    }
  }

  function openWhatsapp() {
    trackEvent("contratacion_whatsapp_clicked", { plan_id: plan.id });
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!isValidPersonName(name)) {
      setError(dictionary.modal.errors.name);
      return;
    }

    if (!isValidSpanishPhone(phone)) {
      setError(dictionary.modal.errors.phone);
      return;
    }

    if (!consent) {
      setError(dictionary.modal.errors.consent);
      return;
    }

    setIsSubmitting(true);
    trackEvent("contratacion_directa_submitted", { plan_id: plan.id, preferred_contact: preferredContact });
    const elapsedSeconds = getElapsedSeconds(formStartedAt);

    const payload = {
      funnel: "cobertura-movil",
      leadType: "contratacion-directa",
      version: "mvp-2",
      submittedAt: new Date().toISOString(),
      selectedPlan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        data: plan.data,
        description: plan.description,
      },
      source: getLeadSource(),
      antiSpam: {
        formStartedAt,
        elapsedSeconds,
        honeypot: company,
      },
      contact: {
        name,
        phone,
        preferredContact,
        consent,
      },
    };

    try {
      await submitLeadRequest(payload);
      trackEvent("contratacion_directa_completed", { plan_id: plan.id, preferred_contact: preferredContact });
      setSent(true);
    } catch (submitError) {
      trackEvent("contratacion_submit_error", { plan_id: plan.id });
      setError(submitError instanceof Error ? submitError.message : dictionary.modal.errors.submit);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-nimbus-ink/45 px-4 py-6">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b border-nimbus-line p-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-nimbus-orange">{plan.name}</p>
            <p className="mt-1 text-lg font-black text-nimbus-ink">
              {plan.price} · {plan.data}
            </p>
            <h3 className="mt-2 text-2xl font-black text-nimbus-ink">{dictionary.modal.title}</h3>
            <p className="mt-2 text-sm leading-6 text-nimbus-muted">{dictionary.modal.text}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-nimbus-line text-xl text-nimbus-muted transition hover:bg-nimbus-soft"
            aria-label={dictionary.modal.close}
          >
            ×
          </button>
        </div>

        {sent ? (
          <div className="p-6">
            <h4 className="text-xl font-black text-nimbus-ink">{dictionary.modal.sentTitle}</h4>
            <p className="mt-3 text-nimbus-muted">{dictionary.modal.sentText}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {dictionary.modal.close}
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {contactChoices.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectChoice(item.id)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${
                    choice === item.id
                      ? "border-nimbus-orange bg-orange-50 text-nimbus-ink"
                      : "border-nimbus-line text-nimbus-muted hover:border-nimbus-orange"
                  }`}
                >
                  <VisualIcon name={item.icon} className="size-4 shrink-0 text-nimbus-orange" />
                  <span>{dictionary.modal.choices[item.id]}</span>
                </button>
              ))}
            </div>

            {choice === "office" ? (
              <div className="mt-6 overflow-hidden rounded-lg border border-nimbus-line bg-nimbus-soft">
                <iframe
                  title={dictionary.modal.officeMapTitle}
                  src={GOOGLE_MAPS_EMBED_URL}
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="border-t border-nimbus-line bg-white p-4">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-black text-nimbus-orange transition hover:text-nimbus-orangeDark"
                  >
                    <VisualIcon name="map-pin" className="size-4" />
                    {dictionary.modal.openMaps}
                  </a>
                </div>
              </div>
            ) : null}

            {choice !== "office" ? (
              <form onSubmit={submitLead} className="mt-6">
                {choice === "whatsapp" ? (
                  <p className="mb-5 rounded-lg bg-nimbus-soft p-4 text-sm font-bold leading-6 text-nimbus-ink">
                    {dictionary.modal.whatsappIntro}
                  </p>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="direct-contract-company">Empresa</label>
                    <input
                      id="direct-contract-company"
                      name="company"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      autoComplete="off"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  </div>
                  <Field label={dictionary.modal.name} value={name} onChange={setName} autoComplete="name" required />
                  <Field label={dictionary.modal.phone} value={phone} onChange={setPhone} autoComplete="tel" required />
                </div>

                <LegalConsentCheckbox
                  id="direct-contract-consent"
                  checked={consent}
                  onChange={setConsent}
                  error={consentError}
                />

                {choice === "whatsapp" ? (
                  <button
                    type="button"
                    onClick={openWhatsapp}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white transition hover:bg-[#1FAF55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                  >
                    <WhatsappIcon />
                    {dictionary.modal.talkWhatsapp}
                  </button>
                ) : null}

                {error && !consentError ? (
                  <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 w-full rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? dictionary.modal.submitting : dictionary.modal.submit}
                </button>
              </form>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  autoComplete,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm font-bold text-nimbus-ink">
      <RequiredLabel label={label} required={required} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
        autoComplete={autoComplete}
        inputMode={autoComplete === "tel" ? "numeric" : undefined}
        pattern={autoComplete === "tel" ? "[0-9]{9}" : undefined}
      />
    </label>
  );
}

function RequiredLabel({ label, required }: { label: string; required: boolean }) {
  return (
    <>
      {label}
      {required ? <span className="ml-1 text-red-600" aria-hidden="true">*</span> : null}
    </>
  );
}

function WhatsappIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M5.6 18.4A8.5 8.5 0 1 1 12 21a8.4 8.4 0 0 1-3.9-.95L4 21l.95-4.05A8.4 8.4 0 0 1 5.6 18.4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.7c.2-.4.35-.45.65-.45h.5c.2 0 .45.05.6.45l.6 1.4c.1.3.05.5-.15.7l-.35.4c.55 1 1.35 1.8 2.45 2.35l.45-.35c.2-.2.45-.25.7-.15l1.45.65c.35.15.4.4.4.6v.45c0 .35-.1.55-.45.75-.45.25-1.1.4-1.75.25-2.65-.6-5.15-3-5.9-5.65-.2-.65 0-1.35.3-1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}
