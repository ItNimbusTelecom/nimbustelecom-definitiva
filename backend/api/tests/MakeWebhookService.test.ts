import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mapRecordToItem } from "../src/repositories/FunnelRepository.js";
import { getWebhookUrlForItem, MakeWebhookService, normalizeMakeWebhookUrl } from "../src/services/MakeWebhookService.js";

describe("MakeWebhookService", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.MAKE_WEBHOOK_URL = "fallback@hook.eu1.make.com";
    process.env.MAKE_LEAD_WEBHOOK_URL = "lead123@hook.eu1.make.com";
    process.env.MAKE_COVERAGE_WEBHOOK_URL = "coverage123@hook.eu1.make.com";
  });

  afterEach(() => {
    global.fetch = originalFetch;
    delete process.env.MAKE_WEBHOOK_URL;
    delete process.env.MAKE_LEAD_WEBHOOK_URL;
    delete process.env.MAKE_COVERAGE_WEBHOOK_URL;
  });

  it("normalizes Make webhook token format", () => {
    expect(normalizeMakeWebhookUrl("abc123@hook.eu1.make.com")).toBe("https://hook.eu1.make.com/abc123");
    expect(normalizeMakeWebhookUrl("https://hook.eu1.make.com/abc123")).toBe("https://hook.eu1.make.com/abc123");
  });

  it("posts saved funnel item to Make", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200 })) as never;
    global.fetch = fetchMock;

    const item = mapRecordToItem(
      {
        id: "lead-1",
        entityType: "lead",
        status: "new",
        language: "es",
        pageUrl: "https://example.com",
        payload: { name: "Nimbus" },
        requestContext: { requestIp: "127.0.0.1", userAgent: "vitest" }
      },
      new Date("2026-01-01T10:00:00.000Z")
    );

    await new MakeWebhookService().send(item);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://hook.eu1.make.com/lead123",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.stringContaining("\"id\":\"lead-1\"")
      })
    );
  });

  it("selects the coverage study webhook for coverage records", () => {
    expect(getWebhookUrlForItem({ entityType: "coverage-study" })).toBe("https://hook.eu1.make.com/coverage123");
  });

  it("falls back to the generic webhook for other entity types", () => {
    expect(getWebhookUrlForItem({ entityType: "contact-intent" })).toBe("https://hook.eu1.make.com/fallback");
  });
});
