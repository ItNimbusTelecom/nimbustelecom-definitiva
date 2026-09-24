import { z } from "zod";
import {
  AntiSpamSchema,
  LanguageSchema,
  OptionalEmailSchema,
  OptionalTrimmedString,
  PersonNameSchema,
  PreferredContactMethodSchema,
  RequiredSpanishPhoneSchema
} from "./common.js";

export const ServiceTypeSchema = z.enum(["mobile", "fiber", "internet", "business", "unknown", "security"]);

export const CoverageStudySchema = z
  .object({
    name: PersonNameSchema,
    phone: RequiredSpanishPhoneSchema,
    email: OptionalEmailSchema,
    problemLocationText: OptionalTrimmedString,
    problemLocationType: OptionalTrimmedString,
    preferredContactMethod: PreferredContactMethodSchema,
    currentProblem: z.string().trim().min(1, "Current problem is required"),
    currentOperator: OptionalTrimmedString,
    serviceType: ServiceTypeSchema,
    source: OptionalTrimmedString,
    language: LanguageSchema,
    pageUrl: OptionalTrimmedString,
    antiSpam: AntiSpamSchema,
    consentAccepted: z.literal(true, {
      errorMap: () => ({ message: "Consent must be accepted" })
    }),
    recaptchaToken: OptionalTrimmedString
  })
  .refine((value) => value.preferredContactMethod !== "email" || Boolean(value.email), {
    message: "Email is required when the preferred contact method is email",
    path: ["email"]
  })
  .refine((value) => Boolean(value.problemLocationText || value.problemLocationType), {
    message: "Problem location is required",
    path: ["problemLocationText"]
  });

export type CoverageStudyInput = z.infer<typeof CoverageStudySchema>;
