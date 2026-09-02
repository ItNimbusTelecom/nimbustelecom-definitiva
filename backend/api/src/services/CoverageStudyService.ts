import { randomUUID } from "node:crypto";
import { IFunnelRepository } from "../repositories/FunnelRepository.js";
import { CoverageStudyInput } from "../schemas/coverage-study.schema.js";
import { RequestContext } from "../utils/request-context.js";
import { IAntiSpamService } from "./AntiSpamService.js";
import { IMakeWebhookService } from "./MakeWebhookService.js";
import { IRecaptchaService } from "./RecaptchaService.js";

export class CoverageStudyService {
  constructor(
    private readonly repository: IFunnelRepository,
    private readonly makeWebhookService: IMakeWebhookService,
    private readonly antiSpamService: IAntiSpamService,
    private readonly recaptchaService: IRecaptchaService
  ) {}

  async create(input: CoverageStudyInput, context?: RequestContext) {
    this.antiSpamService.validate(input.antiSpam);
    await this.recaptchaService.verify(input.recaptchaToken);

    const item = await this.repository.create({
      id: randomUUID(),
      entityType: "coverage-study",
      status: "new",
      language: input.language,
      pageUrl: input.pageUrl,
      payload: input,
      requestContext: context
    });

    try {
      await this.makeWebhookService.send(item);
    } catch (error) {
      console.error("Make webhook failed after coverage study was saved", { id: item.id, error });
    }

    return { id: item.id, status: item.status };
  }
}
