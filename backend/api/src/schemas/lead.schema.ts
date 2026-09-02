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

export const LeadSchema = z.object({
  name: PersonNameSchema,
  phone: RequiredSpanishPhoneSchema,
  email: OptionalEmailSchema,
  preferredContactMethod: PreferredContactMethodSchema,
  message: OptionalTrimmedString,
  source: OptionalTrimmedString,
  language: LanguageSchema,
  pageUrl: OptionalTrimmedString,
  antiSpam: AntiSpamSchema,
  consentAccepted: z.literal(true, {
    errorMap: () => ({ message: "Consent must be accepted" })
  }),
  recaptchaToken: OptionalTrimmedString
});

export type LeadInput = z.infer<typeof LeadSchema>;
