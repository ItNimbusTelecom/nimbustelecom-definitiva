import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as cdk from "aws-cdk-lib";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as logs from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export type NimbusFunnelBackendStackProps = cdk.StackProps & {
  stage: string;
};

export class NimbusFunnelBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: NimbusFunnelBackendStackProps) {
    super(scope, id, props);

    const allowedOrigins = this.node.tryGetContext("allowedOrigins") ?? process.env.FRONTEND_ALLOWED_ORIGINS ?? "";
    const recaptchaEnabled = this.node.tryGetContext("recaptchaEnabled") ?? process.env.RECAPTCHA_ENABLED ?? "false";
    const tableNamePrefix = this.node.tryGetContext("tableNamePrefix") ?? "NimbusFunnel";

    const table = new dynamodb.Table(this, "NimbusFunnelTable", {
      tableName: `${tableNamePrefix}Table-${props.stage}`,
      partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: props.stage === "prod" ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
      pointInTimeRecoverySpecification: {
        pointInTimeRecoveryEnabled: props.stage === "prod"
      }
    });

    table.addGlobalSecondaryIndex({
      indexName: "entityType-createdAt-index",
      partitionKey: { name: "entityType", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "createdAt", type: dynamodb.AttributeType.STRING }
    });

    table.addGlobalSecondaryIndex({
      indexName: "status-createdAt-index",
      partitionKey: { name: "status", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "createdAt", type: dynamodb.AttributeType.STRING }
    });

    const apiRoot = path.join(__dirname, "../../api");

    const apiFunction = new nodejs.NodejsFunction(this, "NimbusFunnelApiFunction", {
      entry: path.join(apiRoot, "src/lambda.ts"),
      projectRoot: apiRoot,
      depsLockFilePath: path.join(apiRoot, "package-lock.json"),
      handler: "handler",
      functionName: `nimbus-funnel-api-${props.stage}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(15),
      logGroup: new logs.LogGroup(this, "NimbusFunnelApiLogGroup", {
        logGroupName: `/aws/lambda/nimbus-funnel-api-${props.stage}`,
        retention: logs.RetentionDays.ONE_MONTH,
        removalPolicy: props.stage === "prod" ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY
      }),
      bundling: {
        format: nodejs.OutputFormat.CJS,
        mainFields: ["module", "main"],
        sourceMap: true
      },
      environment: {
        STAGE: props.stage,
        TABLE_NAME: table.tableName,
        FRONTEND_ALLOWED_ORIGINS: allowedOrigins,
        RECAPTCHA_ENABLED: recaptchaEnabled,
        RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET ?? "",
        MAKE_WEBHOOK_URL: process.env.MAKE_WEBHOOK_URL ?? "",
        MAKE_LEAD_WEBHOOK_URL: process.env.MAKE_LEAD_WEBHOOK_URL ?? "",
        MAKE_COVERAGE_WEBHOOK_URL: process.env.MAKE_COVERAGE_WEBHOOK_URL ?? ""
      }
    });

    table.grantReadWriteData(apiFunction);

    const httpApi = new apigatewayv2.HttpApi(this, "NimbusFunnelHttpApi", {
      apiName: `nimbus-funnel-api-${props.stage}`,
      corsPreflight:
        allowedOrigins.length > 0
          ? {
              allowOrigins: allowedOrigins.split(",").map((origin: string) => origin.trim()),
              allowMethods: [apigatewayv2.CorsHttpMethod.GET, apigatewayv2.CorsHttpMethod.POST, apigatewayv2.CorsHttpMethod.OPTIONS],
              allowHeaders: ["Content-Type", "Authorization"],
              maxAge: cdk.Duration.days(10)
            }
          : undefined
    });

    const integration = new integrations.HttpLambdaIntegration("NimbusFunnelApiIntegration", apiFunction);
    httpApi.addRoutes({
      path: "/{proxy+}",
      methods: [apigatewayv2.HttpMethod.ANY],
      integration
    });
    httpApi.addRoutes({
      path: "/",
      methods: [apigatewayv2.HttpMethod.ANY],
      integration
    });
        // Throttling: sin esto, el API queda con los 10.000 r/s por defecto de la
    // cuenta. 5 r/s amb rafega de 10 sobra per a un formulari de contacte i
    // talla qualsevol abus automatitzat. (Aplicat a ma el 26/08/2026;
    // aquest bloc ho fa permanent.)
    const defaultStage = httpApi.defaultStage!.node.defaultChild as apigatewayv2.CfnStage;
    defaultStage.defaultRouteSettings = {
      throttlingRateLimit: 5,
      throttlingBurstLimit: 10,
      detailedMetricsEnabled: true
    };

    new cdk.CfnOutput(this, "ApiUrl", {
      value: httpApi.apiEndpoint
    });

    new cdk.CfnOutput(this, "TableName", {
      value: table.tableName
    });
  }
}
