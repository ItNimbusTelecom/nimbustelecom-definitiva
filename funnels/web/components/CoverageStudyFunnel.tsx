"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { getElapsedSeconds } from "@/lib/antispam";
import { isValidEmail, isValidPersonName, isValidSpanishPhone } from "@/lib/formValidation";
import { useI18n } from "@/lib/i18n";
import { submitLead } from "@/lib/submitLead";
import { getLeadSource } from "@/lib/utm";
import { LegalConsentCheckbox } from "./LegalConsentCheckbox";
import { VisualIcon } from "./VisualIcon";
import { CROSS_SELL_HREF, type CrossSellTarget } from "@/lib/crossSell";

type PreferredContact = "phone" | "whatsapp";

/** Textos y ajustes que cambian entre funnels. Sin esto, se usa el de cobertura movil. */
export type StudyFunnelVariant = {
  funnel: string;
  serviceType: "mobile" | "internet" | "security" | "business";
  crossSellTo: CrossSellTarget;
  eyebrow: string;
  title: string;
  text: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  problems: readonly string[];
  locationTypes: readonly string[];
  locationLabel: string;
  locationPlaceholder: string;
  requireLocationText?: boolean;
  usageOptions: readonly string[];
  diagnosticPurpose?: string;
  finalText?: string;
  noSalesTitle?: string;
  noSalesText?: string;
  extraNote?: string;
  summaryLabels?: { problem: string; location: string };
};

export function CoverageStudyFunnel({ variant }: { variant?: StudyFunnelVariant }) {
  const { dictionary } = useI18n();
  const v: StudyFunnelVariant = variant ?? {
    funnel: "cobertura-movil",
    serviceType: "mobile",
    crossSellTo: "internet",
    eyebrow: dictionary.form.eyebrow,
    title: dictionary.form.title,
    text: dictionary.form.text,
    step1Title: dictionary.form.step1Title,
    step2Title: dictionary.form.step2Title,
    step3Title: dictionary.form.step3Title,
    problems: dictionary.form.coverageProblems,
    locationTypes: dictionary.form.locationTypes,
    locationLabel: dictionary.form.locationLabel,
    locationPlaceholder: dictionary.form.locationPlaceholder,
    requireLocationText: true,
    usageOptions: dictionary.form.usageOptions,
  };
  const crossSellHref = CROSS_SELL_HREF[v.crossSellTo] ?? "#";
  const crossSellLabel = dictionary.form.crossSell[v.crossSellTo];
  const [step, setStep] = useState(1);
  const [coverageProblem, setCoverageProblem] = useState("");
  const [problemLocationType, setProblemLocationType] = useState("");
  const [problemLocationText, setProblemLocationText] = useState("");
  const [mobileUsage, setMobileUsage] = useState<string[]>([]);
  const [preferredContact, setPreferredContact] = useState<PreferredContact>("phone");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentOperator, setCurrentOperator] = useState("");
  const [additionalComment, setAdditionalComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => new Date().toISOString());
  const [error, setError] = useState("");
  const [contactError, setContactError] = useState("");
  const [hasTriedContactSubmit, setHasTriedContactSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

const completedSteps = [
    Boolean(coverageProblem),
    Boolean(problemLocationType),
    mobileUsage.length > 0,
    step > 4 || completed,
    completed,
  ].filter(Boolean).length;
  const progress = completed ? 100 : Math.round(((step - 1) / 5) * 100);
  const visibleError = step === 5 ? (hasTriedContactSubmit ? contactError : "") : error;
  const consentError = visibleError === dictionary.form.errors.consent ? visibleError : undefined;

  function startIfNeeded() {
    if (step === 1 && !coverageProblem) {
      setFormStartedAt(new Date().toISOString());
      trackEvent("estudio_cobertura_started", { funnel: v.funnel });
    }
  }

  function chooseCoverageProblem(value: string) {
    startIfNeeded();
    setCoverageProblem(value);
    setError("");
    trackEvent("estudio_cobertura_step_1_answered", { answer: value });
  }

  function chooseLocationType(value: string) {
    setProblemLocationType(value);
    setError("");
    trackEvent("estudio_cobertura_step_2_answered", { answer: value });
  }

  function toggleUsage(value: string) {
    setMobileUsage((current) => {
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      trackEvent("estudio_cobertura_step_3_answered", { answers: next });
      return next;
    });
    setError("");
  }

  function nextStep() {
    setError("");

    if (step === 1 && !coverageProblem) {
      setError(dictionary.form.errors.coverageProblem);
      return;
    }

    if (step === 2 && !problemLocationType) {
      setError(dictionary.form.errors.location);
      return;
    }
    
    if (step === 2 && v.requireLocationText && !problemLocationText.trim()) {
      setError(dictionary.form.errors.locationText);
      return;
    }

    if (step === 3 && mobileUsage.length === 0) {
      setError(dictionary.form.errors.usage);
      return;
    }

    if (step === 4) {
      setHasTriedContactSubmit(false);
      setContactError("");
      trackEvent("estudio_cobertura_ready_for_contact", { funnel: v.funnel });
    }

    setStep((current) => Math.min(current + 1, 5));
  }

  function previousStep() {
    setError("");
    setStep((current) => Math.max(current - 1, 1));
  }

  function resetFunnel() {
    setStep(1);
    setCoverageProblem("");
    setProblemLocationType("");
    setProblemLocationText("");
    setMobileUsage([]);
    setPreferredContact("phone");
    setName("");
    setPhone("");
    setEmail("");
    setCurrentOperator("");
    setAdditionalComment("");
    setConsent(false);
    setCompany("");
    setFormStartedAt(new Date().toISOString());
    setError("");
    setContactError("");
    setHasTriedContactSubmit(false);
    setCompleted(false);
  }

  function validateContact() {
    if (!isValidPersonName(name)) {
      return dictionary.form.errors.name;
    }
    if (!isValidSpanishPhone(phone)) {
      return dictionary.form.errors.phone;
    }
    if (!isValidEmail(email)) {
      return dictionary.form.errors.email;
    }
    if (!consent) {
      return dictionary.form.errors.consent;
    }
    return "";
  }

  async function submitStudy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasTriedContactSubmit(true);
    const validationError = validateContact();
    setContactError(validationError);

    if (validationError) {
      return;
    }

    setIsSubmitting(true);
    trackEvent("estudio_cobertura_contact_submitted", { preferred_contact: preferredContact });
    const elapsedSeconds = getElapsedSeconds(formStartedAt);

    const payload = {
      funnel: v.funnel,
      leadType: "estudio-cobertura",
      version: "mvp-2",
      submittedAt: new Date().toISOString(),
      serviceType: v.serviceType,
      source: getLeadSource(),
      antiSpam: {
        formStartedAt,
        elapsedSeconds,
        honeypot: company,
      },
      answers: {
        coverageProblem,
        problemLocationType,
        problemLocationText,
        mobileUsage,
        currentOperator,
        additionalComment,
      },
      contact: {
        name,
        phone,
        email,
        preferredContact,
        consent,
      },
    };

    try {
      await submitLead(payload);
      trackEvent("estudio_cobertura_completed", { preferred_contact: preferredContact });
      setCompleted(true);
    } catch (submitError) {
      trackEvent("estudio_cobertura_submit_error", { preferred_contact: preferredContact });
      setContactError(submitError instanceof Error ? submitError.message : dictionary.form.errors.submit);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="formulari" className="scroll-mt-24 bg-nimbus-soft py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">{v.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {v.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">{v.text}</p>
          <div className="mt-7 rounded-lg border border-nimbus-line bg-white p-5 text-sm leading-7 text-nimbus-muted">
            <p className="font-black text-nimbus-ink">{v.noSalesTitle ?? dictionary.form.noSalesTitle}</p>
            <p>{v.noSalesText ?? dictionary.form.noSalesText}</p>
          </div>
        </div>

        <div className="rounded-lg border border-nimbus-line bg-white p-6 shadow-soft">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm font-bold text-nimbus-muted">
              <span>
                {completed ? dictionary.form.completed : `${dictionary.form.stepLabel} ${step} ${dictionary.form.of} 5`}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-nimbus-soft">
              <div className="h-full rounded-full bg-nimbus-orange transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {completed ? (
            <div>
              <h3 className="text-2xl font-black text-nimbus-ink">{dictionary.form.finalTitle}</h3>
                <p className="mt-3 leading-7 text-nimbus-muted">{v.finalText ?? dictionary.form.finalText}</p>
              <div className="mt-5 grid gap-3 rounded-lg border border-orange-100 bg-orange-50 p-5">
                <p className="leading-7 text-nimbus-ink">{dictionary.form.finalResponseTime}</p>
                <p className="leading-7 text-nimbus-ink">{v.diagnosticPurpose ?? dictionary.form.finalDiagnosticPurpose}</p>
              </div>
              <dl className="mt-6 grid gap-3 rounded-lg bg-nimbus-soft p-5 text-sm">
                <SummaryItem label={v.summaryLabels?.problem ?? dictionary.form.summary.problem} value={coverageProblem} />
                <SummaryItem label={v.summaryLabels?.location ?? dictionary.form.summary.location} value={problemLocationType} />
                <SummaryItem label={dictionary.form.summary.zone} value={problemLocationText || dictionary.form.summary.notProvided} />
                <SummaryItem label={dictionary.form.summary.preferredContact} value={preferredContactLabel(preferredContact, dictionary)} />
                {currentOperator ? <SummaryItem label={dictionary.form.summary.currentOperator} value={currentOperator} /> : null}
              </dl>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetFunnel}
                  className="rounded-full border border-nimbus-line px-5 py-3 text-sm font-black text-nimbus-ink transition hover:bg-nimbus-soft"
                >
                  {dictionary.form.another}
                </button>
                <a
                  href={crossSellHref}
                  className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                >
                  {crossSellLabel}
                </a>
              </div>
            </div>
          ) : (
            <>
              {step === 1 ? (
                <QuestionStep title={v.step1Title}>
                  <SingleChoice options={v.problems} value={coverageProblem} onChange={chooseCoverageProblem} />
                </QuestionStep>
              ) : null}

              {step === 2 ? (
                <QuestionStep title={v.step2Title}>
                  <SingleChoice options={v.locationTypes} value={problemLocationType} onChange={chooseLocationType} />
                  <label className="mt-5 block text-sm font-bold text-nimbus-ink">
                    {v.locationLabel}
                    <textarea
                      value={problemLocationText}
                      onChange={(event) => setProblemLocationText(event.target.value)}
                      placeholder={v.locationPlaceholder}
                      className="mt-2 min-h-28 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
                    />
                  </label>
                </QuestionStep>
              ) : null}

              {step === 3 ? (
                <QuestionStep title={v.step3Title}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {v.usageOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleUsage(option)}
                        className={`rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${
                          mobileUsage.includes(option)
                            ? "border-nimbus-orange bg-orange-50 text-nimbus-ink"
                            : "border-nimbus-line text-nimbus-muted hover:border-nimbus-orange"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </QuestionStep>
              ) : null}

              {step === 4 ? (
                <QuestionStep title={dictionary.form.step4Title}>
                  <p className="text-lg leading-8 text-nimbus-muted">{dictionary.form.step4Text}</p>
                  <p className="mt-4 text-sm leading-6 text-nimbus-muted">{dictionary.form.step4Secondary}</p>
                </QuestionStep>
              ) : null}

              {step === 5 ? (
                <form id="coverage-study-contact" onSubmit={submitStudy}>
                  <QuestionStep title={dictionary.form.step5Title}>
                    <p className="mb-5 text-sm leading-6 text-nimbus-muted">{dictionary.form.step5Text}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(["phone", "whatsapp"] as PreferredContact[]).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setPreferredContact(option);
                            setContactError("");
                            setHasTriedContactSubmit(false);
                          }}
                          className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-left text-sm font-black transition ${
                            preferredContact === option
                              ? "border-nimbus-orange bg-orange-50 text-nimbus-ink"
                              : "border-nimbus-line text-nimbus-muted hover:border-nimbus-orange"
                          }`}
                        >
                          <VisualIcon name={preferredContactIcon(option)} className="size-4 shrink-0 text-nimbus-orange" />
                          <span>{preferredContactLabel(option, dictionary)}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                        <label htmlFor="coverage-study-company">Empresa</label>
                        <input
                          id="coverage-study-company"
                          name="company"
                          value={company}
                          onChange={(event) => setCompany(event.target.value)}
                          autoComplete="off"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      </div>
                      <Field
                        label={dictionary.form.fields.name}
                        value={name}
                        onChange={(value) => {
                          setName(value);
                          setContactError("");
                          setHasTriedContactSubmit(false);
                        }}
                        autoComplete="name"
                        required
                      />
                      <Field
                        label={dictionary.form.fields.phone}
                        value={phone}
                        onChange={(value) => {
                          setPhone(value);
                          setContactError("");
                          setHasTriedContactSubmit(false);
                        }}
                        autoComplete="tel"
                        required
                      />
                      <Field
                        label={dictionary.form.fields.email}
                        value={email}
                        onChange={(value) => {
                          setEmail(value);
                          setContactError("");
                          setHasTriedContactSubmit(false);
                        }}
                        autoComplete="email"
                        helpText={dictionary.form.emailHelp}
                        required
                      />
                      <Field
                        label={dictionary.form.fields.currentOperator}
                        value={currentOperator}
                        onChange={setCurrentOperator}
                        autoComplete="organization"
                      />
                    </div>

                    <label className="mt-4 block text-sm font-bold text-nimbus-ink">
                      {dictionary.form.fields.additionalComment}
                      <textarea
                        value={additionalComment}
                        onChange={(event) => setAdditionalComment(event.target.value)}
                        className="mt-2 min-h-24 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
                      />
                    </label>

                    <LegalConsentCheckbox
                      id="coverage-study-consent"
                      checked={consent}
                      onChange={(checked) => {
                        setConsent(checked);
                        setContactError("");
                        setHasTriedContactSubmit(false);
                      }}
                      error={consentError}
                    />
                  </QuestionStep>
                </form>
              ) : null}

              {visibleError && !consentError ? (
                <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{visibleError}</p>
              ) : null}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={previousStep}
                  disabled={step === 1 || isSubmitting}
                  className="rounded-full border border-nimbus-line px-5 py-3 text-sm font-black text-nimbus-ink transition hover:bg-nimbus-soft disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {dictionary.form.back}
                </button>
                {step === 5 ? (
                  <button
                    type="submit"
                    form="coverage-study-contact"
                    disabled={isSubmitting}
                    className="rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? dictionary.form.submitting : dictionary.form.submit}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                  >
                    {step === 4 ? dictionary.form.requestStudy : dictionary.form.continue}
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {v.extraNote ? (
          <p className="rounded-lg border-l-4 border-nimbus-orange bg-orange-50 p-5 text-base leading-7 text-nimbus-ink lg:col-span-2">
            {v.extraNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function QuestionStep({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-2xl font-black tracking-tight text-nimbus-ink">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function SingleChoice({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${
            value === option
              ? "border-nimbus-orange bg-orange-50 text-nimbus-ink"
              : "border-nimbus-line text-nimbus-muted hover:border-nimbus-orange"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  autoComplete,
  helpText,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  helpText?: string;
  required?: boolean;
}) {
  const isPhone = autoComplete === "tel";
  const isEmail = autoComplete === "email";

  return (
    <label className="text-sm font-bold text-nimbus-ink">
      {label}
      {required ? <span className="ml-1 text-red-600" aria-hidden="true">*</span> : null}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
        autoComplete={autoComplete}
        inputMode={isPhone ? "numeric" : isEmail ? "email" : undefined}
        pattern={isPhone ? "[0-9]{9}" : undefined}
        type={isEmail ? "email" : "text"}
      />
      {helpText ? <span className="mt-2 block text-xs font-bold leading-5 text-nimbus-muted">{helpText}</span> : null}
    </label>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
      <dt className="font-black text-nimbus-ink">{label}</dt>
      <dd className="text-nimbus-muted">{value}</dd>
    </div>
  );
}

function preferredContactLabel(value: PreferredContact, dictionary: ReturnType<typeof useI18n>["dictionary"]) {
  return dictionary.form.contactLabels[value];
}

function preferredContactIcon(value: PreferredContact) {
  if (value === "phone") {
    return "phone" as const;
  }
  if (value === "whatsapp") {
    return "message-circle" as const;
  }
  return "phone" as const;
}
