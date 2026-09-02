export function getElapsedSeconds(formStartedAt: string | number) {
  const startedAtMs = typeof formStartedAt === "number" ? formStartedAt : Date.parse(formStartedAt);

  if (!Number.isFinite(startedAtMs)) {
    return null;
  }

  return Math.max(0, Math.round((Date.now() - startedAtMs) / 1000));
}

export function isHoneypotFilled(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isTooFast(elapsedSeconds: number | null, minSeconds = 3) {
  return typeof elapsedSeconds === "number" && elapsedSeconds < minSeconds;
}
