import cors from "cors";
import express from "express";
import { getConfig } from "./config/env.js";
import { FunnelRepository, IFunnelRepository } from "./repositories/FunnelRepository.js";
import { createContactIntentRouter } from "./routes/contact-intent.js";
import { createCoverageStudyRouter } from "./routes/coverage-study.js";
import { createHealthRouter } from "./routes/health.js";
import { createLeadsRouter } from "./routes/leads.js";
import { ContactIntentService } from "./services/ContactIntentService.js";
import { CoverageStudyService } from "./services/CoverageStudyService.js";
import { AntiSpamService, IAntiSpamService } from "./services/AntiSpamService.js";
import { LeadService } from "./services/LeadService.js";
import { IMakeWebhookService, MakeWebhookService } from "./services/MakeWebhookService.js";
import { IRecaptchaService, RecaptchaService } from "./services/RecaptchaService.js";
import { errorHandler } from "./utils/errors.js";

export type AppDependencies = {
  repository?: IFunnelRepository;
  makeWebhookService?: IMakeWebhookService;
  antiSpamService?: IAntiSpamService;
  recaptchaService?: IRecaptchaService;
};

export function createApp(deps: AppDependencies = {}) {
  const app = express();
  const config = getConfig();

  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || config.frontendAllowedOrigins.length === 0 || config.frontendAllowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error("Origin not allowed by CORS"));
      }
    })
  );

  const repository = deps.repository ?? new FunnelRepository();
  const makeWebhookService = deps.makeWebhookService ?? new MakeWebhookService();
  const antiSpamService = deps.antiSpamService ?? new AntiSpamService();
  const recaptchaService = deps.recaptchaService ?? new RecaptchaService();

  app.use(createHealthRouter());
  app.use(createLeadsRouter(new LeadService(repository, makeWebhookService, antiSpamService, recaptchaService)));
  app.use(createCoverageStudyRouter(new CoverageStudyService(repository, makeWebhookService, antiSpamService, recaptchaService)));
  app.use(createContactIntentRouter(new ContactIntentService(repository)));

  app.use(errorHandler);

  return app;
}

export const app = createApp();
