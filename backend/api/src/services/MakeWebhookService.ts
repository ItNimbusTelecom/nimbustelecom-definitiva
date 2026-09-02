import { getConfig } from "../config/env.js";
import { FunnelItem } from "../repositories/FunnelRepository.js";

export interface IMakeWebhookService {
  send(item: FunnelItem): Promise<void>;
}

export class MakeWebhookService implements IMakeWebhookService {
  async send(item: FunnelItem) {
    const webhookUrl = getWebhookUrlForItem(item);

    if (!webhookUrl) {
      console.warn(`Make webhook skipped: no webhook configured for ${item.entityType}`);
      return;
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        entityType: item.entityType,
        status: item.status,
        createdAt: item.createdAt,
        language: item.language,
        pageUrl: item.pageUrl,
        requestIp: item.requestIp,
        userAgent: item.userAgent,
        payload: item.payload
      })
    });

    if (!response.ok) {
      throw new Error(`Make webhook failed with status ${response.status}`);
    }
  }
}

export function getWebhookUrlForItem(item: Pick<FunnelItem, "entityType">) {
  const config = getConfig();

  if (item.entityType === "coverage-study") {
    return normalizeMakeWebhookUrl(config.makeCoverageWebhookUrl ?? config.makeWebhookUrl);
  }

  if (item.entityType === "lead") {
    return normalizeMakeWebhookUrl(config.makeLeadWebhookUrl ?? config.makeWebhookUrl);
  }

  return normalizeMakeWebhookUrl(config.makeWebhookUrl);
}

export function normalizeMakeWebhookUrl(value: string | undefined) {
  const raw = value?.trim();

  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;

  const makeAtFormat = raw.match(/^([^@]+)@hook\.eu1\.make\.com$/);
  if (makeAtFormat?.[1]) {
    return `https://hook.eu1.make.com/${makeAtFormat[1]}`;
  }

  if (raw.startsWith("hook.eu1.make.com/")) {
    return `https://${raw}`;
  }

  return `https://${raw}`;
}
