import { z } from "zod";

const NAME_PATTERN = /^[\p{L}\s]+$/u;
const SPANISH_PHONE_PATTERN = /^\d{9}$/;

export const PreferredContactMethodSchema = z.enum(["phone", "whatsapp", "email", "office"]);
export const LanguageSchema = z.enum(["es", "ca", "en"]).default("es");

export const OptionalTrimmedString = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value === "" ? undefined : value));

export const PersonNameSchema = z.string().trim().refine(isValidPersonName, {
  message: "Name must contain at least 2 letters and only letters or spaces"
});

export const RequiredSpanishPhoneSchema = z.string().trim().refine(isValidSpanishPhone, {
  message: "Phone must contain exactly 9 digits"
});

export const OptionalSpanishPhoneSchema = OptionalTrimmedString.refine(
  (value) => value === undefined || isValidSpanishPhone(value),
  {
    message: "Phone must contain exactly 9 digits"
  }
);

export const RequiredEmailSchema = z.string().trim().email("Email must be valid");

export const OptionalEmailSchema = OptionalTrimmedString.refine(
  (value) => value === undefined || z.string().email().safeParse(value).success,
  {
    message: "Email must be valid"
  }
);

export const MetadataSchema = z.record(z.unknown()).optional();

export const AntiSpamSchema = z
  .object({
    formStartedAt: z.union([z.string(), z.number()]).optional(),
    elapsedSeconds: z.number().optional(),
    honeypot: OptionalTrimmedString
  })
  .optional();

export function isValidPersonName(value: string) {
  const trimmed = value.trim();
  const letterCount = trimmed.match(/\p{L}/gu)?.length ?? 0;

  return trimmed.length >= 2 && letterCount >= 2 && NAME_PATTERN.test(trimmed);
}

export function isValidSpanishPhone(value: string) {
  return SPANISH_PHONE_PATTERN.test(value.trim());
}
