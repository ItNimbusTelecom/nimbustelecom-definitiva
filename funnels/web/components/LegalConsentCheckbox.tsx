"use client";

import { useI18n } from "@/lib/i18n";

type LegalConsentCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  id?: string;
  name?: string;
};

const PRIVACY_POLICY_URL = "/politica-de-privacidad/";
const LEGAL_NOTICE_URL = "/aviso-legal/";

export function LegalConsentCheckbox({
  checked,
  onChange,
  error,
  id = "legal-consent",
  name = "consent",
}: LegalConsentCheckboxProps) {
  const { dictionary } = useI18n();
  const errorId = `${id}-error`;

  return (
    <div className="mt-5">
      <div className="flex gap-3 text-sm leading-6 text-nimbus-muted">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 size-4 shrink-0 accent-nimbus-orange"
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? "true" : undefined}
        />
        <label htmlFor={id}>
          {dictionary.legal.before}{" "}
          <a
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-nimbus-ink underline decoration-nimbus-orange/40 underline-offset-4 transition hover:text-nimbus-orange"
          >
            {dictionary.legal.privacy}
          </a>{" "}
          {dictionary.legal.middle}{" "}
          <a
            href={LEGAL_NOTICE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-nimbus-ink underline decoration-nimbus-orange/40 underline-offset-4 transition hover:text-nimbus-orange"
          >
            {dictionary.legal.notice}
          </a>
          .<span className="ml-1 text-red-600" aria-hidden="true">*</span>
        </label>
      </div>
      {error ? (
        <p id={errorId} className="mt-2 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
