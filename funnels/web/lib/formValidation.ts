const NAME_PATTERN = /^[\p{L}\s]+$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPANISH_PHONE_PATTERN = /^\d{9}$/;

export function isValidPersonName(value: string) {
  const trimmed = value.trim();
  const letterCount = trimmed.match(/\p{L}/gu)?.length ?? 0;

  return trimmed.length >= 2 && letterCount >= 2 && NAME_PATTERN.test(trimmed);
}

export function isValidSpanishPhone(value: string) {
  return SPANISH_PHONE_PATTERN.test(value.trim());
}

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}
