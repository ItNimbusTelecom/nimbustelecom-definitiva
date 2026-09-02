import { describe, expect, it, vi } from "vitest";
import serverless from "serverless-http";
import { createApp } from "../src/app.js";
import { mapRecordToItem, IFunnelRepository } from "../src/repositories/FunnelRepository.js";
import { AntiSpamService, IAntiSpamService } from "../src/services/AntiSpamService.js";
import { IMakeWebhookService } from "../src/services/MakeWebhookService.js";
import { IRecaptchaService } from "../src/services/RecaptchaService.js";

function createTestApp(options?: { webhookThrows?: boolean; useRealAntiSpam?: boolean }) {
  const repository: IFunnelRepository = {
    async create(record) {
      return mapRecordToItem(record, new Date("2026-01-01T10:00:00.000Z"));
    }
  };

  const makeWebhookService: IMakeWebhookService = {
    send: vi.fn(async () => {
      if (options?.webhookThrows) throw new Error("Make failed");
    })
  };

  const antiSpamService: IAntiSpamService = options?.useRealAntiSpam ? new AntiSpamService() : { validate: vi.fn(() => undefined) };

  const recaptchaService: IRecaptchaService = {
    verify: vi.fn(async () => undefined)
  };

  return createApp({ repository, makeWebhookService, antiSpamService, recaptchaService });
}

async function invoke(app: ReturnType<typeof createTestApp>, method: string, path: string, body?: unknown) {
  const handler = serverless(app);
  const response = await handler(
    {
      httpMethod: method,
      path,
      headers: {
        "content-type": "application/json",
        "user-agent": "vitest"
      },
      multiValueHeaders: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: null,
      stageVariables: null,
      requestContext: {
        identity: {
          sourceIp: "127.0.0.1"
        }
      },
      body: body === undefined ? null : JSON.stringify(body),
      isBase64Encoded: false,
      resource: path
    } as never,
    {} as never
  );

  return {
    status: response.statusCode,
    body: JSON.parse(response.body)
  };
}

describe("Nimbus funnel API", () => {
  it("returns health status", async () => {
    const response = await invoke(createTestApp(), "GET", "/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      data: {
        status: "ok",
        service: "nimbus-funnel-api"
      }
    });
  });

  it("accepts a valid lead with phone", async () => {
    const response = await invoke(createTestApp(), "POST", "/leads", {
      name: "Patricia",
      phone: "972850155",
      preferredContactMethod: "phone",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.data.status).toBe("new");
  });

  it("rejects a lead without phone", async () => {
    const response = await invoke(createTestApp(), "POST", "/leads", {
      name: "Patricia",
      email: "info@nimbustelecom.es",
      preferredContactMethod: "email",
      language: "ca",
      consentAccepted: true
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects a lead with phone prefix", async () => {
    const response = await invoke(createTestApp(), "POST", "/leads", {
      name: "Patricia",
      phone: "+34972850155",
      preferredContactMethod: "phone",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects a lead without consent", async () => {
    const response = await invoke(createTestApp(), "POST", "/leads", {
      name: "Patricia",
      phone: "972850155",
      preferredContactMethod: "phone",
      language: "es",
      consentAccepted: false
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("accepts a coverage study with problem location text", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      phone: "972850155",
      email: "info@nimbustelecom.es",
      problemLocationText: "Sils, dentro de casa",
      preferredContactMethod: "whatsapp",
      currentProblem: "No tengo cobertura en casa",
      serviceType: "mobile",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });

  it("accepts a coverage study with problem location type", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      email: "info@nimbustelecom.es",
      problemLocationType: "En interiores, dentro de casa o del trabajo",
      preferredContactMethod: "email",
      currentProblem: "Los datos van lentos",
      serviceType: "mobile",
      language: "en",
      consentAccepted: true
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });

  it("accepts a coverage study for office contact with email and no phone", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      email: "info@nimbustelecom.es",
      problemLocationText: "Sils",
      preferredContactMethod: "office",
      currentProblem: "Los datos van lentos",
      serviceType: "mobile",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });

  it("rejects a coverage study without email", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      phone: "972850155",
      problemLocationText: "Sils",
      preferredContactMethod: "phone",
      currentProblem: "Los datos van lentos",
      serviceType: "mobile",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects a coverage study without problem location", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      phone: "972850155",
      email: "info@nimbustelecom.es",
      preferredContactMethod: "phone",
      currentProblem: "Los datos van lentos",
      serviceType: "mobile",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects a coverage study without consent", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      phone: "972850155",
      email: "info@nimbustelecom.es",
      problemLocationText: "Sils",
      preferredContactMethod: "phone",
      currentProblem: "Los datos van lentos",
      serviceType: "mobile",
      language: "es",
      consentAccepted: false
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("accepts a valid contact intent", async () => {
    const response = await invoke(createTestApp(), "POST", "/contact-intent", {
      type: "whatsapp_click",
      label: "Footer WhatsApp",
      language: "es",
      metadata: { placement: "footer" }
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });

  it("rejects an invalid contact intent type", async () => {
    const response = await invoke(createTestApp(), "POST", "/contact-intent", {
      type: "bad_type",
      language: "es"
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("keeps the lead flow successful if Make webhook fails after saving", async () => {
    const response = await invoke(createTestApp({ webhookThrows: true }), "POST", "/leads", {
      name: "Patricia",
      phone: "972850155",
      preferredContactMethod: "phone",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });

  it("silently rejects honeypot spam before saving", async () => {
    const response = await invoke(createTestApp({ useRealAntiSpam: true }), "POST", "/leads", {
      name: "Patricia",
      phone: "972850155",
      preferredContactMethod: "phone",
      language: "es",
      consentAccepted: true,
      antiSpam: {
        formStartedAt: new Date(Date.now() - 10_000).toISOString(),
        elapsedSeconds: 10,
        honeypot: "bot company"
      }
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true, data: { spam: true } });
  });
});
