export const CONTACT_INFO = {
  phoneLabel: "972 85 01 55",
  phoneHref: "tel:+34972850155",
  whatsappLabel: "622 81 26 04",
  whatsappHref: "https://wa.me/34622812604",
  email: "soporte@nimbustelecom.cat",
  emailHref: "mailto:soporte@nimbustelecom.cat",
  address: "C/Major, 42 - Sils",
  mapsHref: "https://www.google.com/maps/place/NIMBUS+TELECOM+S.L./@41.8088967,2.7437291,21z/data=!4m15!1m8!3m7!1s0x12bb21873742a6bb:0xecb2d552410befd0!2sCarrer+Major,+42,+17410+Sils,+Girona!3b1!8m2!3d41.8090234!4d2.7437217!16s%2Fg%2F11rp2q92y7!3m5!1s0x12bb235e2f90b919:0xe2610d130855768f!8m2!3d41.8090068!4d2.74377!16s%2Fg%2F11gmjlpwhr?entry=ttu&g_ep=EgoyMDI2MDgxMC4wIKXMDSoASAFQAw%3D%3D",
  hours: "Lunes a viernes, de 9:00 a 17:00",
  commercialHours: "Atención comercial preferente de 09:00 a 18:00",
};

export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100064631156923#",
    icon: "facebook",
    hoverClassName: "hover:text-[#1877F2]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nimbustelecomsl/posts/?feedView=all",
    icon: "linkedin",
    hoverClassName: "hover:text-[#0A66C2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nimbustelecom/",
    icon: "instagram",
    hoverClassName: "hover:text-[#E4405F]",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/+34622812604",
    icon: "message-circle",
    hoverClassName: "hover:text-[#25D366]",
  },
] as const;

/** Portal del cliente (ISPgestion). */
export const CLIENT_AREA_URL = "https://clientesnimbustelecom.ispgestion.com/site/login";

/**
 * Documentación oficial (tarifas y condiciones). Las etiquetas traducidas
 * están en lib/i18n.tsx → footer.docsLinks, en el mismo orden.
 */
export const DOC_LINKS = [
  { href: "https://documentacio.nimbustelecom.cat/fijos-internacional/" },
  { href: "https://documentacio.nimbustelecom.cat/numeracion_especial/" },
  { href: "https://documentacio.nimbustelecom.cat/tarifas_internacional/" },
  { href: "https://documentacio.nimbustelecom.cat/roaming/" },
  { href: "/docs/formulacio_de_desistimiento.pdf" },
  { href: "/docs/guia_de_codigos_cortos_castellano.pdf" },
];

export const LEGAL_LINKS = [
  {
    label: "Aviso legal",
    href: "/aviso-legal/",
  },
  {
    label: "Política de privacidad",
    href: "/politica-de-privacidad/",
  },
  {
    label: "Política de cookies",
    href: "/politica-de-cookies/",
  },
  {
    label: "Declaración de accesibilidad",
    href: "/declaracion-de-accesibilidad/",
  },
];
