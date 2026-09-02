import { SpamRejectedError } from "../utils/errors.js";

export type AntiSpamInput = {
  formStartedAt?: string | number;
  elapsedSeconds?: number;
  honeypot?: string;
};

export interface IAntiSpamService {
  validate(antiSpam?: AntiSpamInput): void;
}

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

export class AntiSpamService implements IAntiSpamService {
  validate(antiSpam?: AntiSpamInput) {
    if (isHoneypotFilled(antiSpam?.honeypot)) {
      throw new SpamRejectedError("Spam rejected by honeypot");
    }

    if (isTooFast(typeof antiSpam?.elapsedSeconds === "number" ? antiSpam.elapsedSeconds : null)) {
      throw new SpamRejectedError("Spam rejected by timing");
    }

    if (antiSpam?.formStartedAt === undefined) {
      console.warn("Missing anti-spam formStartedAt");
      return;
    }

    const backendElapsedSeconds = getElapsedSeconds(antiSpam.formStartedAt);

    if (backendElapsedSeconds === null) {
      console.warn("Invalid anti-spam formStartedAt");
      return;
    }

    if (isTooFast(backendElapsedSeconds)) {
      throw new SpamRejectedError("Spam rejected by timing");
    }
  }
}
