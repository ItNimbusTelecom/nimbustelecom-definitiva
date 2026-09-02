const truthy = new Set(["1", "true", "yes", "on"]);

export type AppConfig = {
  stage: string;
  tableName: string;
  frontendAllowedOrigins: string[];
  recaptchaEnabled: boolean;
  recaptchaSecret?: string;
  makeWebhookUrl?: string;
  makeLeadWebhookUrl?: string;
  makeCoverageWebhookUrl?: string;
};

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return truthy.has(value.toLowerCase());
}

function parseOrigins(value: string | undefined) {
  if (!value) return [];
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function getConfig(): AppConfig {
  return {
    stage: process.env.STAGE ?? "dev",
    tableName: process.env.TABLE_NAME ?? "",
    frontendAllowedOrigins: parseOrigins(process.env.FRONTEND_ALLOWED_ORIGINS),
    recaptchaEnabled: parseBoolean(process.env.RECAPTCHA_ENABLED, false),
    recaptchaSecret: process.env.RECAPTCHA_SECRET,
    makeWebhookUrl: process.env.MAKE_WEBHOOK_URL,
    makeLeadWebhookUrl: process.env.MAKE_LEAD_WEBHOOK_URL,
    makeCoverageWebhookUrl: process.env.MAKE_COVERAGE_WEBHOOK_URL
  };
}
