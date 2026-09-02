import { randomUUID } from "node:crypto";
import { IFunnelRepository } from "../repositories/FunnelRepository.js";
import { ContactIntentInput } from "../schemas/contact-intent.schema.js";
import { RequestContext } from "../utils/request-context.js";

export class ContactIntentService {
  constructor(private readonly repository: IFunnelRepository) {}

  async create(input: ContactIntentInput, context?: RequestContext) {
    const item = await this.repository.create({
      id: randomUUID(),
      entityType: "contact-intent",
      status: "new",
      language: input.language,
      pageUrl: input.pageUrl,
      payload: input,
      requestContext: context
    });

    return { id: item.id, status: item.status };
  }
}
