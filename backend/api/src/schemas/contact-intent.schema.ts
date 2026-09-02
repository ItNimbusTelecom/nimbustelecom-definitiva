import { z } from "zod";
import { LanguageSchema, MetadataSchema, OptionalTrimmedString } from "./common.js";

export const ContactIntentTypeSchema = z.enum([
  "whatsapp_click",
  "phone_click",
  "email_click",
  "chat_ai_click",
  "coverage_cta_click",
  "plan_request_click",
  "other"
]);

export const ContactIntentSchema = z.object({
  type: ContactIntentTypeSchema,
  label: OptionalTrimmedString,
  pageUrl: OptionalTrimmedString,
  language: LanguageSchema,
  metadata: MetadataSchema
});

export type ContactIntentInput = z.infer<typeof ContactIntentSchema>;
