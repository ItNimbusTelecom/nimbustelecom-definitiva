import { SITE_URL } from "@/lib/seo";

/**
 * Datos estructurados de la ficha de negocio (schema.org LocalBusiness).
 *
 * Para que sirvan de algo tienen que coincidir EXACTAMENTE con lo que hay en
 * Google Business Profile y en los directorios: el nombre, la dirección y el
 * teléfono. Si cambia uno, cambia en todos; un NAP que no cuadra es peor que
 * no tener ficha, porque el buscador deja de saber cuál es la buena.
 *
 * Fuente de los datos: lib/contact.ts y la ficha de Google del local. El
 * horario se repite aquí en formato máquina porque CONTACT_INFO.hours es una
 * frase en castellano y no se puede convertir sin adivinar: si cambia allí,
 * hay que cambiarlo aquí.
 */

const PERFILES = [
  "https://www.facebook.com/profile.php?id=100064631156923",
  "https://www.linkedin.com/company/nimbustelecomsl/",
  "https://www.instagram.com/nimbustelecom/",
  "https://linktr.ee/nimbustelecom",
];

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#negoci`,
    name: "Nimbus Telecom",
    legalName: "Nimbus Telecom S.L.",
    description:
      "Operador local de telecomunicacions a la Selva i el Gironès: internet, mòbil i fibra amb tècnics propis i botiga a Sils.",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/nimbus-logo-header.png`,
    image: `${SITE_URL}/og-nimbus.jpg`,
    telephone: "+34972850155",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer Major, 42",
      postalCode: "17410",
      addressLocality: "Sils",
      addressRegion: "Girona",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.8090068,
      longitude: 2.74377,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "AdministrativeArea", name: "La Selva" },
      { "@type": "AdministrativeArea", name: "El Gironès" },
    ],
    sameAs: PERFILES,
  };
}
