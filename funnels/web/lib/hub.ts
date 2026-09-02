import type { Locale } from "@/lib/i18n";

/**
 * Contenido de la home (hub de servicios).
 *
 * Cada servicio apunta a su funnel. Mientras un funnel no exista, `href`
 * apunta temporalmente a la página antigua de WordPress para no dejar
 * enlaces rotos: cuando el funnel esté listo, basta con cambiar el href
 * y poner `ready: true`.
 */

export type HubService = {
  id: string;
  href: string;
  ready: boolean;
  icon: "smartphone" | "radio-tower" | "shield-check" | "users";
  title: string;
  tagline: string;
  bullets: string[];
  cta: string;
};

export type HubContent = {
  nav: { company: string; services: string; local: string; reviews: string; business: string; contact: string };
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  heroProofs: Array<{ value: string; label: string }>;
  servicesTitle: string;
  servicesSubtitle: string;
  soonLabel: string;
  banners: {
    local: { text: string; primary: string; secondary: string };
    reviews: { text: string; primary: string; secondary: string };
  };
  reviewsSection: { eyebrow: string; title: string; subtitle: string };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    phoneTitle: string;
    whatsappTitle: string;
    emailTitle: string;
    officeTitle: string;
    officeCta: string;
    hours: string;
    copyEmail: string;
    copyNumber: string;
    copied: string;
  };
  services: HubService[];
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    text: string;
    values: Array<{ icon: "map-pin" | "shield-check" | "users"; title: string; text: string }>;
  };
};

export const HUB_CONTENT: Record<Locale, HubContent> = {
  es: {
    nav: { company: "Quiénes somos", services: "Servicios", local: "Cercanía", reviews: "Opiniones", business: "Soy empresa", contact: "Contacto" },
    eyebrow: "Operador de la Selva y el Gironès",
    title: "Internet y móvil con alguien a quien puedes llamar",
    subtitle:
      "Estamos en Sils, en la calle Major. Si tienes un problema, vienes, llamas o nos escribes y hablas con alguien del equipo. Instalamos nosotros y damos la cara nosotros.",
    primaryCta: "Ver qué necesito",
    secondaryCta: "Hablar con nosotros",
    heroProofs: [
      { value: "Desde 2015", label: "en el territorio" },
      { value: "Equipo propio", label: "técnicos de casa" },
      { value: "Tienda física", label: "C/Major, 42 · Sils" },
    ],
    servicesTitle: "¿Qué necesitas resolver?",
    servicesSubtitle:
      "Elige por dónde empezar y te llevamos paso a paso hasta una propuesta concreta.",
    soonLabel: "Próximamente",
    banners: {
      local: {
        text: "Por eso empezamos escuchando: cuéntanos qué necesitas y te decimos qué opciones reales tienes, sin compromiso.",
        primary: "Hablar con nosotros",
        secondary: "Ver qué ofrecemos",
      },
      reviews: {
        text: "¿No tienes claro qué necesitas?",
        primary: "Cuéntanos tu caso",
        secondary: "Ver servicios",
      },
    },
    reviewsSection: {
      eyebrow: "Opiniones",
      title: "Lo que dicen quienes ya nos tienen cerca",
      subtitle:
        "Clientes que buscaban a alguien a quien poder llamar y que les entendiera a la primera. Estas son sus reseñas en Google, sin retocar.",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Habla con nosotros",
      subtitle:
        "Elige el canal que te vaya mejor. Al otro lado hay personas del equipo, no un contestador.",
      phoneTitle: "Llámanos",
      whatsappTitle: "Escríbenos por WhatsApp",
      emailTitle: "Envíanos un email",
      officeTitle: "Ven a vernos",
      officeCta: "Cómo llegar",
      hours: "Lunes a viernes, de 9:00 a 17:00",
      copyEmail: "Copiar correo",
      copyNumber: "Copiar número",
      copied: "Copiado",
    },
    about: {
      eyebrow: "Quiénes somos",
      title: "La tecnología que esperas, con la atención cercana que echas de menos",
      lead:
        "Nimbus Telecom es un operador y una empresa de servicios técnicos con base en Vidreres. Trabajamos en el territorio, con equipo propio, y atendemos cada día a personas que solo quieren algo sencillo: que les expliquen las cosas claras.",
      text:
        "Creemos que la transparencia es un valor olvidado en este sector y queremos recuperarlo. No vendemos lo que tenemos, sino lo que necesitas.",
      values: [
        {
          icon: "map-pin",
          title: "Conocemos el territorio",
          text: "Sabemos qué redes llegan a cada zona, así que te decimos qué opciones tienes de verdad en tu dirección.",
        },
        {
          icon: "shield-check",
          title: "Transparencia real",
          text: "Sin letra pequeña ni sorpresas en la factura. Te explicamos qué contratas y qué puedes esperar.",
        },
        {
          icon: "users",
          title: "Equipo propio",
          text: "Profesionales del sector TIC que instalan, mantienen y dan soporte. Hablas con personas, no con un robot.",
        },
      ],
    },
    services: [
      {
        id: "movil",
        href: "/movil/",
        ready: true,
        icon: "smartphone",
        title: "Cobertura móvil",
        tagline:
          "Si el móvil pierde señal en casa o en el trabajo, el problema suele ser la red de tu operador, no tu teléfono.",
        bullets: [
          "Líneas con triple cobertura",
          "Estudiamos tu caso concreto",
          "Portabilidad sin cortes",
        ],
        cta: "Explorar ofertas",
      },
      {
        id: "internet",
        href: "/internet/",
        ready: true,
        icon: "radio-tower",
        title: "Internet en casa",
        tagline:
          "Fibra óptica donde llega y conexión rural vía radio donde no llega. Comprobamos qué tienes disponible en tu dirección.",
        bullets: [
          "Fibra hasta 1 Gb",
          "WiMAX para zonas rurales",
          "Packs con fijo y móvil",
        ],
        cta: "Comprobar mi cobertura",
      },
      {
        id: "seguridad",
        href: "/seguridad/",
        ready: true,
        icon: "shield-check",
        title: "Seguridad",
        tagline:
          "Videovigilancia, alarmas y control de accesos, con proyecto a medida valorado por nuestro equipo técnico.",
        bullets: [
          "Cámaras CCTV con acceso remoto",
          "Alarmas que controlas desde el móvil",
          "Control de accesos y presencia",
        ],
        cta: "Más información",
      },
      {
        id: "empresas",
        href: "/empreses/",
        ready: true,
        icon: "users",
        title: "Soluciones TIC para empresas",
        tagline:
          "Toda la tecnología de tu empresa con un solo proveedor: conectividad, comunicaciones, seguridad y redes con ingeniería propia.",
        bullets: [
          "Un solo interlocutor para todo",
          "Ingeniería e instalación propias",
          "Soporte cercano cuando algo falla",
        ],
        cta: "Descubrir soluciones para empresas",
      },
    ],
  },

  ca: {
    nav: { company: "Qui som", services: "Serveis", local: "Proximitat", reviews: "Opinions", business: "Soc empresa", contact: "Contacte" },
    eyebrow: "Operador de la Selva i el Gironès",
    title: "Internet i mòbil amb algú a qui pots trucar",
    subtitle:
      "Som a Sils, al carrer Major. Si tens un problema, vens, truques o ens escrius i parles amb algú de l'equip. Instal·lem nosaltres i donem la cara nosaltres.",
    primaryCta: "Veure què necessito",
    secondaryCta: "Parlar amb nosaltres",
    heroProofs: [
      { value: "Des del 2015", label: "al territori" },
      { value: "Equip propi", label: "tècnics de casa" },
      { value: "Botiga física", label: "C/Major, 42 · Sils" },
    ],
    servicesTitle: "Què necessites resoldre?",
    servicesSubtitle:
      "Tria per on començar i t'acompanyem pas a pas fins a una proposta concreta.",
    soonLabel: "Properament",
    banners: {
      local: {
        text: "Per això comencem escoltant: explica'ns què necessites i et diem quines opcions reals tens, sense compromís.",
        primary: "Parlar amb nosaltres",
        secondary: "Veure què oferim",
      },
      reviews: {
        text: "No tens clar què necessites?",
        primary: "Explica'ns el teu cas",
        secondary: "Veure serveis",
      },
    },
    reviewsSection: {
      eyebrow: "Opinions",
      title: "El que diuen els qui ja ens tenen a prop",
      subtitle:
        "Clients que buscaven algú a qui poder trucar i que els entengués a la primera. Aquestes són les seves ressenyes a Google, sense retocar.",
    },
    contact: {
      eyebrow: "Contacte",
      title: "Parla amb nosaltres",
      subtitle:
        "Tria el canal que et vagi millor. A l'altra banda hi ha persones de l'equip, no un contestador.",
      phoneTitle: "Truca'ns",
      whatsappTitle: "Escriu-nos per WhatsApp",
      emailTitle: "Envia'ns un correu",
      officeTitle: "Vine a veure'ns",
      officeCta: "Com arribar-hi",
      hours: "De dilluns a divendres, de 9:00 a 17:00",
      copyEmail: "Copiar el correu",
      copyNumber: "Copiar el número",
      copied: "Copiat",
    },
    about: {
      eyebrow: "Qui som",
      title: "La tecnologia que esperes, amb l'atenció propera que trobes a faltar",
      lead:
        "Nimbus Telecom és un operador i una empresa de serveis tècnics amb seu a Vidreres. Treballem al territori, amb equip propi, i atenem cada dia persones que només volen una cosa senzilla: que els expliquin les coses clares.",
      text:
        "Creiem que la transparència és un valor oblidat en aquest sector i el volem recuperar. No venem el que tenim, sinó el que necessites.",
      values: [
        {
          icon: "map-pin",
          title: "Coneixem el territori",
          text: "Sabem quines xarxes arriben a cada zona, així que et diem quines opcions tens realment a la teva adreça.",
        },
        {
          icon: "shield-check",
          title: "Transparència real",
          text: "Sense lletra petita ni sorpreses a la factura. T'expliquem què contractes i què pots esperar.",
        },
        {
          icon: "users",
          title: "Equip propi",
          text: "Professionals del sector TIC que instal·len, mantenen i donen suport. Parles amb persones, no amb un robot.",
        },
      ],
    },
    services: [
      {
        id: "movil",
        href: "/movil/",
        ready: true,
        icon: "smartphone",
        title: "Cobertura mòbil",
        tagline:
          "Si el mòbil perd senyal a casa o a la feina, el problema acostuma a ser la xarxa del teu operador, no el telèfon.",
        bullets: [
          "Línies amb triple cobertura",
          "Estudiem el teu cas concret",
          "Portabilitat sense talls",
        ],
        cta: "Explorar ofertes",
      },
      {
        id: "internet",
        href: "/internet/",
        ready: true,
        icon: "radio-tower",
        title: "Internet a casa",
        tagline:
          "Fibra òptica on arriba i connexió rural via ràdio on no arriba. Comprovem què tens disponible a la teva adreça.",
        bullets: [
          "Fibra fins a 1 Gb",
          "WiMAX per a zones rurals",
          "Packs amb fix i mòbil",
        ],
        cta: "Comprovar la meva cobertura",
      },
      {
        id: "seguridad",
        href: "/seguridad/",
        ready: true,
        icon: "shield-check",
        title: "Seguretat",
        tagline:
          "Videovigilància, alarmes i control d'accessos, amb projecte a mida valorat pel nostre equip tècnic.",
        bullets: [
          "Càmeres CCTV amb accés remot",
          "Alarmes que controles des del mòbil",
          "Control d'accessos i presència",
        ],
        cta: "Més informació",
      },
      {
        id: "empresas",
        href: "/empreses/",
        ready: true,
        icon: "users",
        title: "Solucions TIC per a empreses",
        tagline:
          "Tota la tecnologia de la teva empresa amb un sol proveïdor: connectivitat, comunicacions, seguretat i xarxes amb enginyeria pròpia.",
        bullets: [
          "Un sol interlocutor per a tot",
          "Enginyeria i instal·lació pròpies",
          "Suport proper quan alguna cosa falla",
        ],
        cta: "Descobrir solucions per a empreses",
      },
    ],
  },

  en: {
    nav: { company: "About us", services: "Services", local: "Local", reviews: "Reviews", business: "For business", contact: "Contact" },
    eyebrow: "Local operator in La Selva and Gironès",
    title: "Internet and mobile with someone you can actually call",
    subtitle:
      "We're in Sils, on Carrer Major. If something goes wrong you can drop by, call or message us and talk to someone on the team. We install it and we stand behind it.",
    primaryCta: "See what I need",
    secondaryCta: "Talk to us",
    heroProofs: [
      { value: "Since 2015", label: "in the area" },
      { value: "Our own team", label: "local technicians" },
      { value: "A real shop", label: "C/Major, 42 · Sils" },
    ],
    servicesTitle: "What do you need to solve?",
    servicesSubtitle:
      "Pick where to start and we'll walk you through to a concrete proposal.",
    soonLabel: "Coming soon",
    banners: {
      local: {
        text: "That's why we start by listening: tell us what you need and we'll show you the options that actually fit, no strings attached.",
        primary: "Talk to us",
        secondary: "See what we offer",
      },
      reviews: {
        text: "Not sure what you need?",
        primary: "Tell us your case",
        secondary: "See services",
      },
    },
    reviewsSection: {
      eyebrow: "Reviews",
      title: "What people who already have us nearby say",
      subtitle:
        "Customers who wanted someone they could actually call and who would understand them right away. These are their Google reviews, unedited.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk",
      subtitle:
        "Pick whichever channel suits you best. There are real team members on the other side, not a machine.",
      phoneTitle: "Call us",
      whatsappTitle: "Message us on WhatsApp",
      emailTitle: "Send us an email",
      officeTitle: "Visit us",
      officeCta: "Get directions",
      hours: "Monday to Friday, 9:00–17:00",
      copyEmail: "Copy email",
      copyNumber: "Copy number",
      copied: "Copied",
    },
    about: {
      eyebrow: "Who we are",
      title: "The technology you expect, with the close attention you miss",
      lead:
        "Nimbus Telecom is an operator and a technical services company based in Vidreres. We work locally, with our own team, and every day we help people who just want something simple: clear explanations.",
      text:
        "We believe transparency is a forgotten value in this industry and we want it back. We don't sell what we have, we sell what you need.",
      values: [
        {
          icon: "map-pin",
          title: "We know the area",
          text: "We know which networks reach each zone, so we tell you what options you really have at your address.",
        },
        {
          icon: "shield-check",
          title: "Real transparency",
          text: "No small print, no surprises on the bill. We explain what you sign up for and what to expect.",
        },
        {
          icon: "users",
          title: "Our own team",
          text: "ICT professionals who install, maintain and support. You talk to people, not a robot.",
        },
      ],
    },
    services: [
      {
        id: "movil",
        href: "/movil/",
        ready: true,
        icon: "smartphone",
        title: "Mobile coverage",
        tagline:
          "If your phone loses signal at home or at work, the problem is usually your operator's network, not your phone.",
        bullets: [
          "Lines with triple coverage",
          "We study your specific case",
          "Number porting without downtime",
        ],
        cta: "Explore offers",
      },
      {
        id: "internet",
        href: "/internet/",
        ready: true,
        icon: "radio-tower",
        title: "Home internet",
        tagline:
          "Fibre where it reaches and rural radio connection where it doesn't. We check what's available at your address.",
        bullets: [
          "Fibre up to 1 Gb",
          "WiMAX for rural areas",
          "Bundles with landline and mobile",
        ],
        cta: "Check my coverage",
      },
      {
        id: "seguridad",
        href: "/seguridad/",
        ready: true,
        icon: "shield-check",
        title: "Security",
        tagline:
          "CCTV, alarms and access control, with a tailor-made project assessed by our technical team.",
        bullets: [
          "CCTV cameras with remote access",
          "Alarms you control from your phone",
          "Access and attendance control",
        ],
        cta: "More information",
      },
      {
        id: "empresas",
        href: "/empreses/",
        ready: true,
        icon: "users",
        title: "ICT solutions for businesses",
        tagline:
          "All your company's technology with one provider: connectivity, communications, security and networks with in-house engineering.",
        bullets: [
          "A single point of contact for everything",
          "In-house engineering and installation",
          "Local support when something fails",
        ],
        cta: "Discover business solutions",
      },
    ],
  },
};
