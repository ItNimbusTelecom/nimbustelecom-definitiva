import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { getConfig } from "../config/env.js";
import { RequestContext } from "../utils/request-context.js";

export type FunnelEntityType = "lead" | "coverage-study" | "contact-intent";

export type FunnelRecord<TPayload> = {
  id: string;
  entityType: FunnelEntityType;
  status: "new";
  language?: string;
  pageUrl?: string;
  payload: TPayload;
  requestContext?: RequestContext;
};

export type FunnelItem<TPayload = unknown> = {
  PK: string;
  SK: "METADATA";
  entityType: FunnelEntityType;
  id: string;
  createdAt: string;
  updatedAt: string;
  status: "new";
  source?: string;
  language?: string;
  pageUrl?: string;
  payload: TPayload;
  requestIp?: string;
  userAgent?: string;
};

export interface IFunnelRepository {
  create<TPayload>(record: FunnelRecord<TPayload>): Promise<FunnelItem<TPayload>>;
}

function entityPrefix(entityType: FunnelEntityType) {
  switch (entityType) {
    case "lead":
      return "LEAD";
    case "coverage-study":
      return "COVERAGE_STUDY";
    case "contact-intent":
      return "CONTACT_INTENT";
  }
}

export function mapRecordToItem<TPayload>(record: FunnelRecord<TPayload>, now = new Date()): FunnelItem<TPayload> {
  const timestamp = now.toISOString();

  return {
    PK: `${entityPrefix(record.entityType)}#${record.id}`,
    SK: "METADATA",
    entityType: record.entityType,
    id: record.id,
    createdAt: timestamp,
    updatedAt: timestamp,
    status: "new",
    language: record.language,
    pageUrl: record.pageUrl,
    payload: record.payload,
    requestIp: record.requestContext?.requestIp,
    userAgent: record.requestContext?.userAgent
  };
}

export class FunnelRepository implements IFunnelRepository {
  private readonly tableName: string;
  private readonly documentClient: Pick<DynamoDBDocumentClient, "send">;

  constructor(params?: { tableName?: string; documentClient?: Pick<DynamoDBDocumentClient, "send"> }) {
    const config = getConfig();
    this.tableName = params?.tableName ?? config.tableName;
    this.documentClient =
      params?.documentClient ?? DynamoDBDocumentClient.from(new DynamoDBClient({}), { marshallOptions: { removeUndefinedValues: true } });
  }

  async create<TPayload>(record: FunnelRecord<TPayload>) {
    if (!this.tableName) {
      throw new Error("TABLE_NAME is required to persist funnel records");
    }

    const item = mapRecordToItem(record);
    const input: PutCommandInput = {
      TableName: this.tableName,
      Item: item,
      ConditionExpression: "attribute_not_exists(PK)"
    };

    await this.documentClient.send(new PutCommand(input));
    return item;
  }
}
