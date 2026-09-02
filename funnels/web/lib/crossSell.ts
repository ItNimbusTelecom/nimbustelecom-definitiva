export type CrossSellTarget = "mobile" | "internet" | "business" | "security";

export const CROSS_SELL_HREF: Partial<Record<CrossSellTarget, string>> = {
  mobile: "/movil/#tarifes",
  internet: "/internet/#opcions",
  business: "/empreses/",
  security: "/seguridad/",
};