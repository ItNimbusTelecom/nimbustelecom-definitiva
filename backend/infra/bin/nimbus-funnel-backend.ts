#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { NimbusFunnelBackendStack } from "../lib/nimbus-funnel-backend-stack.js";

const app = new cdk.App();
const stage = app.node.tryGetContext("stage") ?? process.env.STAGE ?? "dev";

new NimbusFunnelBackendStack(app, `NimbusFunnelBackend-${stage}`, {
  stage,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
