#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as cdk from "aws-cdk-lib";
import { NimbusFunnelBackendStack } from "../lib/nimbus-funnel-backend-stack.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Configuracion de produccion: cuenta de AWS, origenes de CORS y webhooks de
 * Make. Sale de backend/infra/.env.prod, que NO va a git porque el repo es
 * publico. Copia .env.prod.example y rellenalo.
 *
 * Antes salia del entorno de quien desplegaba, y eso mordio dos veces:
 *
 *   - Un `cdk deploy` con el perfil de AWS equivocado no fallaba. CDK tomaba
 *     la cuenta de las credenciales activas, creaba una copia entera del stack
 *     en esa otra cuenta y, a partir de ahi, el `cdk diff` comparaba contra la
 *     copia en vez de contra produccion.
 *   - Desplegar sin las variables de Make dejaba los webhooks vacios. Con eso
 *     el lead se guarda en DynamoDB, no llega a ISP y no salta ninguna alarma:
 *     MakeWebhookService solo escribe un console.warn.
 *
 * Las variables que ya esten en el entorno mandan sobre el fichero, para poder
 * sobreescribir una suelta sin editarlo.
 */
function cargarEnvProd() {
  const ruta = path.join(__dirname, "../.env.prod");
  if (!fs.existsSync(ruta)) return;

  for (const linea of fs.readFileSync(ruta, "utf8").split("\n")) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith("#")) continue;

    const corte = limpia.indexOf("=");
    if (corte === -1) continue;

    const clave = limpia.slice(0, corte).trim();
    const valor = limpia.slice(corte + 1).trim().replace(/^["']|["']$/g, "");
    if (!(clave in process.env)) process.env[clave] = valor;
  }
}

cargarEnvProd();

const app = new cdk.App();
const stage = app.node.tryGetContext("stage") ?? process.env.STAGE ?? "dev";

function entornoDeProduccion(): cdk.Environment {
  const cuenta = process.env.NIMBUS_PROD_ACCOUNT;

  if (!cuenta) {
    throw new Error(
      "Falta NIMBUS_PROD_ACCOUNT.\n" +
        "Produccion vive en la cuenta de AWS de Nimbus, y el numero no esta en el repo porque es publico.\n" +
        "Crea backend/infra/.env.prod a partir de .env.prod.example (no se sube a git)."
    );
  }

  // CDK_DEFAULT_ACCOUNT es la cuenta de las credenciales activas. Si no cuadra,
  // parar aqui: seguir significaria desplegar una copia del stack en la cuenta
  // equivocada, y el siguiente `cdk diff` ya compararia contra esa copia.
  const activa = process.env.CDK_DEFAULT_ACCOUNT;
  if (activa && activa !== cuenta) {
    throw new Error(
      `Las credenciales activas son de la cuenta ${activa}, y produccion esta en ${cuenta}.\n` +
        "Usa el perfil de Nimbus:  AWS_PROFILE=nimbus npm run deploy -- -c stage=prod"
    );
  }

  const sinWebhook = ["MAKE_LEAD_WEBHOOK_URL", "MAKE_COVERAGE_WEBHOOK_URL"].filter(
    (clave) => !process.env[clave]
  );
  if (sinWebhook.length > 0) {
    throw new Error(
      `Faltan los webhooks de Make: ${sinWebhook.join(", ")}.\n` +
        "Desplegarlos vacios hace que los leads se guarden en DynamoDB y no lleguen a ISP, sin error visible.\n" +
        "Los valores vivos:  aws lambda get-function-configuration --profile nimbus " +
        "--function-name nimbus-funnel-api-prod --query 'Environment.Variables'"
    );
  }

  return { account: cuenta, region: process.env.NIMBUS_PROD_REGION ?? "eu-west-1" };
}

const env: cdk.Environment =
  stage === "prod"
    ? entornoDeProduccion()
    : { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION };

new NimbusFunnelBackendStack(app, `NimbusFunnelBackend-${stage}`, {
  stage,
  env
});
