export type MobilePlan = {
  id: string;
  name: string;
  price: string;
  data: string;
  description: string;
  features: string[];
  ctaLabel: string;
};

export const MOBILE_PLANS: MobilePlan[] = [
  {
    id: "mini-1gb",
    price: "4,95 €/mes",
    name: "MINI",
    data: "1Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 1Gb de datos.",
    features: [
      "IVA incluido",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "junts-50-estiu",
    price: "6,95 €/mes",
    name: "JUNTS 50 ESTIU",
    data: "50Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 50Gb de datos.",
    features: [
      "Precio mensual",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "junts-80-estiu",
    price: "7,95 €/mes",
    name: "JUNTS 80 ESTIU",
    data: "80Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 80Gb de datos.",
    features: [
      "Precio mensual",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "junts-150-estiu",
    price: "10,95 €/mes",
    name: "JUNTS 150 ESTIU",
    data: "150Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 150Gb de datos.",
    features: [
      "Precio mensual",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "junts-200-estiu",
    price: "11,95 €/mes",
    name: "JUNTS 200 ESTIU",
    data: "200Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 200Gb de datos.",
    features: [
      "Precio mensual",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "junts-400-estiu",
    price: "14,95 €/mes",
    name: "JUNTS 400 ESTIU",
    data: "400Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 400Gb de datos.",
    features: [
      "Precio mensual",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "junts-500-estiu",
    price: "19,95 €/mes",
    name: "JUNTS 500 ESTIU",
    data: "500Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 500Gb de datos.",
    features: [
      "Precio mensual",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "ilimitadas-400gb",
    price: "24,95 €/mes",
    name: "ILIMITADAS + 400Gb",
    data: "400Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 400Gb de datos.",
    features: [
      "IVA incluido",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
];
