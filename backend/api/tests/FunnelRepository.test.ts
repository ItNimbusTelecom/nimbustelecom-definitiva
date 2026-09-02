import { describe, expect, it, vi } from "vitest";
import { FunnelRepository, mapRecordToItem } from "../src/repositories/FunnelRepository.js";

describe("FunnelRepository", () => {
  it("maps a funnel record to a DynamoDB item", () => {
    const item = mapRecordToItem(
      {
        id: "record-1",
        entityType: "coverage-study",
        status: "new",
        language: "es",
        pageUrl: "https://example.com",
        payload: { name: "Nimbus" },
        requestContext: { requestIp: "127.0.0.1", userAgent: "vitest" }
      },
      new Date("2026-01-01T10:00:00.000Z")
    );

    expect(item).toEqual({
      PK: "COVERAGE_STUDY#record-1",
      SK: "METADATA",
      entityType: "coverage-study",
      id: "record-1",
      createdAt: "2026-01-01T10:00:00.000Z",
      updatedAt: "2026-01-01T10:00:00.000Z",
      status: "new",
      language: "es",
      pageUrl: "https://example.com",
      payload: { name: "Nimbus" },
      requestIp: "127.0.0.1",
      userAgent: "vitest"
    });
  });

  it("sends a PutCommand without touching AWS real services", async () => {
    const send = vi.fn(async () => undefined);
    const repository = new FunnelRepository({
      tableName: "NimbusFunnelTable-test",
      documentClient: { send }
    });

    await repository.create({
      id: "record-1",
      entityType: "lead",
      status: "new",
      language: "es",
      payload: { name: "Nimbus" }
    });

    expect(send).toHaveBeenCalledOnce();
    expect(send.mock.calls[0][0].input).toEqual(
      expect.objectContaining({
        TableName: "NimbusFunnelTable-test",
        ConditionExpression: "attribute_not_exists(PK)"
      })
    );
  });
});
