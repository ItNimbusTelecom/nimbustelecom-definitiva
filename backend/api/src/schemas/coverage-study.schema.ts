import { z } from "zod";
import {
  AntiSpamSchema,
  LanguageSchema,
  OptionalSpanishPhoneSchema,
  OptionalTrimmedString,
  PersonNameSchema,
  PreferredContactMethodSchema,
  RequiredEmailSchema
} from "./common.js";

export const ServiceTypeSchema = z.enum(["mobile", "fiber", "internet", "business", "unknown", "security"]);

export const CoverageStudySchema = z
  .object({
    name: PersonNameSchema,
    phone: OptionalSpanishPhoneSchema,
    email: RequiredEmailSchema,
    problemLocationText: OptionalTrimmedString,
    problemLocationType: OptionalTrimmedString,
    preferredContactMethod: PreferredContactMethodSchema,
    currentProblem: z.string().trim().min(1, "Current problem is required"),
    currentOperator: OptionalTrimmedString,
    serviceType: ServiceTypeSchema,
    language: LanguageSchema,
    pageUrl: OptionalTrimmedString,
    antiSpam: AntiSpamSchema,
    consentAccepted: z.literal(true, {
      errorMap: () => ({ message: "Consent must be accepted" })
    }),
    recaptchaToken: OptionalTrimmedString
  })
  .refine((value) => value.preferredContactMethod === "office" || value.preferredContactMethod === "email" || Boolean(value.phone), {
    message: "Phone is required for phone or WhatsApp contact",
    path: ["phone"]
  })
  .refine((value) => Boolean(value.problemLocationText || value.problemLocationType), {
    message: "Problem location is required",
    path: ["problemLocationText"]
  });

export type CoverageStudyInput = z.infer<typeof CoverageStudySchema>;
