import type { Locale } from "./i18n";

export type BusinessContent = {
  meta: { title: string; description: string };
  nav: { problem: string; services: string; how: string; study: string; reviews: string; contact: string };
  primaryCta: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    cardItems: [string, string][];
    focusEyebrow: string;
    focusText: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    text: string;
    scenes: string[];
  };
  solution: {
    eyebrow: string;
    title: string;
    text: string;
    items: { icon: "users" | "lightbulb" | "map-pin"; title: string; text: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    text: string;
    items: {
      icon: "globe" | "phone-call" | "shield-check" | "radio-tower" | "life-buoy";
      title: string;
      text: string;
    }[];
    note: string;
    hubLabel: string;
  };
  how: {
    eyebrow: string;
    title: string;
    text: string;
    steps: [string, string][];
  };
  reviewsSection: { eyebrow: string; title: string; subtitle: string };
  localService: {
    eyebrow: string;
    title: string;
    subtitle: string;
    text: string;
    cards: [string, string][];
  };
  form: {
    eyebrow: string;
    title: string;
    text: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    problems: string[];
    locationTypes: string[];
    locationLabel: string;
    locationPlaceholder: string;
    usageOptions: string[];
    diagnosticPurpose: string;
    finalText: string;
    noSalesTitle: string;
    noSalesText: string;
    summaryLabels: { problem: string; location: string };
  };
};

export const BUSINESS_CONTENT: Record<Locale, BusinessContent> = {
  es: {
    meta: {
      title: "Soluciones TIC para empresas | Nimbus Telecom",
      description:
        "Un solo proveedor para toda la tecnología de tu empresa: conectividad, comunicaciones, seguridad y redes con ingeniería propia y un solo interlocutor.",
    },
    nav: {
      problem: "El problema",
      services: "Qué integramos",
      how: "Cómo funciona",
      study: "Pedir estudio",
      reviews: "Opiniones",
      contact: "Contacto",
    },
    primaryCta: "Pedir estudio",
    hero: {
      eyebrow: "Soluciones TIC para empresas",
      title: "Toda tu tecnología, un solo proveedor",
      subtitle:
        "Conectividad, comunicaciones, seguridad, redes... Diseñamos, instalamos y supervisamos todo el sistema TIC de tu empresa.",
      text: "Cuando algo falla, llamas a un solo número: el nuestro. Sin intermediarios ni proveedores que se pasan la pelota.",
      primaryCta: "Pedir estudio para mi empresa",
      secondaryCta: "Ver qué integramos",
      cardItems: [
        ["Diseñamos", "El proyecto sale de nuestra ingeniería, pensado para tu negocio."],
        ["Instalamos", "Equipo propio, sin subcontratas, con el papeleo en regla."],
        ["Integramos", "Todos los sistemas trabajan juntos, bajo una sola supervisión."],
        ["Supervisamos", "Seguimos el sistema día a día y respondemos cuando nos necesitas."],
      ],
      focusEyebrow: "Un solo número",
      focusText: "Cuando algo falla, nos llamas a nosotros. Del resto nos ocupamos nosotros.",
    },
    problem: {
      eyebrow: "El problema",
      title: "¿Te suena esto?",
      text: "Una empresa te puso las cámaras. Otra, la centralita. Una tercera te lleva la red. Y el día que algo deja de funcionar, cada una dice que la culpa es de la otra — y tú pierdes horas haciendo de mediador entre proveedores.",
      scenes: [
        "Cada servicio, con una empresa distinta y un contrato distinto",
        "Cuando hay una incidencia, nadie se hace responsable",
        "Sistemas que no se hablan entre ellos",
        "Horas perdidas llamando, esperando y reclamando",
      ],
    },
    solution: {
      eyebrow: "La solución Nimbus",
      title: "Nosotros nos ocupamos de todo",
      text: "Todo el sistema sale de nuestra ingeniería: lo diseñamos, lo instalamos, lo integramos y lo supervisamos. Cuando hay una incidencia, viene un técnico de casa que conoce toda la instalación — sin intermediarios, sin esperar a que dos empresas se pongan de acuerdo.",
      items: [
        {
          icon: "users",
          title: "Un solo interlocutor",
          text: "Un contrato, un teléfono y un equipo que responde por todo el sistema, no por una parte.",
        },
        {
          icon: "lightbulb",
          title: "Ingeniería propia",
          text: "Larga experiencia en soluciones TIC y al día de todo lo que sale al mercado, siempre con criterio de calidad y durabilidad.",
        },
        {
          icon: "map-pin",
          title: "Respuesta de proximidad",
          text: "Equipo local, en Sils. La atención al cliente es nuestra carta de presentación: cuando nos necesitas, estamos.",
        },
      ],
    },
    services: {
      eyebrow: "Qué integramos",
      title: "Las soluciones TIC que tu empresa necesita",
      text: "Estas son las grandes familias. Dentro de cada una hay muchas soluciones concretas — y las elegimos en función de lo que necesita tu negocio, no al revés.",
      items: [
        {
          icon: "globe",
          title: "Conectividad",
          text: "Fibra y WiMAX profesional para que la empresa no se quede nunca sin internet.",
        },
        {
          icon: "phone-call",
          title: "Comunicaciones",
          text: "Líneas móviles de empresa, centralita y telefonía fija integradas.",
        },
        {
          icon: "shield-check",
          title: "Seguridad",
          text: "Cámaras, alarmas y control de accesos, sin cuotas mensuales.",
        },
        {
          icon: "radio-tower",
          title: "Redes y WiFi",
          text: "Redes internas y WiFi profesional dimensionados para tu espacio.",
        },
        {
          icon: "life-buoy",
          title: "Mantenimiento y soporte",
          text: "Mantenimiento informático y soporte técnico de todo el sistema.",
        },
      ],
      note: "Tu empresa puede necesitar algo que no aparece aquí: pregúntanos, si es TIC, sabemos hacerlo.",
      hubLabel: "Tu empresa",
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Del primer contacto al sistema funcionando",
      text: "Sin precios inventados por teléfono: cada proyecto se valora sobre el terreno.",
      steps: [
        [
          "Nos explicas tu empresa",
          "Qué hacéis, qué espacios tenéis y qué necesitáis: dos minutos con el formulario.",
        ],
        [
          "Visitamos las instalaciones",
          "Un técnico valora el estado actual, qué se puede aprovechar y qué hay que renovar.",
        ],
        [
          "Te presentamos el proyecto unificado",
          "Equipos, integración y precio cerrado, explicado para que se entienda.",
        ],
        [
          "Instalamos, integramos y seguimos a tu lado",
          "Nuestro equipo lo monta todo y, a partir de ahí, cualquier incidencia es cosa nuestra.",
        ],
      ],
    },
    reviewsSection: {
      eyebrow: "Opiniones",
      title: "Empresas que dejaron de ir detrás de cinco proveedores",
      subtitle:
        "Negocios que buscaban un único interlocutor para todo y alguien que respondiera al teléfono. Estas son sus reseñas en Google, sin retocar.",
    },
    localService: {
      eyebrow: "Servicio cercano",
      title: "Cerca de ti cuando necesitas una respuesta",
      subtitle:
        "Nimbus no es una gran operadora con un call center en la otra punta del mundo. Somos un equipo local, en Sils, que conoce tu empresa y su instalación.",
      text: "No queremos venderte el sistema más caro ni el más barato. Queremos entender cómo trabaja tu empresa y diseñar un sistema que encaje — y quedarnos cerca para cuando nos necesites.",
      cards: [
        [
          "Atención humana",
          "Hablas con personas que conocen tu instalación, no con un call center.",
        ],
        [
          "Conocimiento del territorio",
          "Trabajamos con empresas, naves y comercios de la comarca cada día.",
        ],
        [
          "Te ayudamos a entender",
          "No hace falta que sepas de tecnología: te lo explicamos claro y sin tecnicismos.",
        ],
        [
          "Seguimos después de instalar",
          "Nuestro trabajo no acaba al montar los equipos: supervisamos el sistema y respondemos cuando hace falta.",
        ],
      ],
    },
    form: {
      eyebrow: "Estudio para empresas",
      title: "¿Quieres que analicemos el sistema TIC de tu empresa?",
      text: "Cuéntanos cómo es tu empresa y qué necesitas. Te llamamos, lo analizamos y, si tiene sentido, concertamos la visita. Sin compromiso.",
      step1Title: "¿Qué necesita tu empresa?",
      problems: [
        "Conectividad e internet",
        "Comunicaciones (móvil y centralita)",
        "Seguridad (cámaras, alarmas, accesos)",
        "Un poco de todo, quiero asesoramiento",
      ],
      step2Title: "¿Cómo es el espacio de trabajo?",
      locationTypes: [
        "Oficina o despacho",
        "Local comercial o tienda",
        "Nave industrial o almacén",
        "Más de una sede o espacio",
      ],
      step3Title: "¿Qué te preocupa más?",
      usageOptions: [
        "Tengo demasiados proveedores distintos",
        "Las incidencias tardan en resolverse",
        "La instalación se ha quedado corta o antigua",
        "Estamos creciendo y hay que ampliar",
      ],
      locationLabel: "¿En qué población está la empresa?",
      locationPlaceholder: "Por ejemplo: Sils, Vidreres, un polígono concreto...",
      diagnosticPurpose:
        "Con esto nuestro equipo prepara la visita conociendo tu caso antes de llegar.",
      finalText:
        "Gracias. Revisaremos lo que nos has contado y te contactaremos para concertar la visita.",
      noSalesTitle: "Sin rodeos comerciales",
      noSalesText:
        "Nos centramos en entender cómo trabaja tu empresa y qué sistema tiene sentido para tu caso.",
      summaryLabels: { problem: "Qué necesitas", location: "Cómo es el espacio" },
    },
  },
  ca: {
    meta: {
      title: "Solucions TIC per a empreses | Nimbus Telecom",
      description:
        "Un sol proveïdor per a tota la tecnologia de la teva empresa: connectivitat, comunicacions, seguretat i xarxes amb enginyeria pròpia i un sol interlocutor.",
    },
    nav: {
      problem: "El problema",
      services: "Què integrem",
      how: "Com funciona",
      study: "Demanar estudi",
      reviews: "Opinions",
      contact: "Contacte",
    },
    primaryCta: "Demanar estudi",
    hero: {
      eyebrow: "Solucions TIC per a empreses",
      title: "Tota la teva tecnologia, un sol proveïdor",
      subtitle:
        "Connectivitat, comunicacions, seguretat, xarxes... Dissenyem, instal·lem i supervisem tot el sistema TIC de la teva empresa.",
      text: "Quan alguna cosa falla, truques a un sol número: el nostre. Sense intermediaris ni proveïdors que es passen la pilota.",
      primaryCta: "Demanar estudi per a la meva empresa",
      secondaryCta: "Veure què integrem",
      cardItems: [
        ["Dissenyem", "El projecte surt de la nostra enginyeria, pensat per al teu negoci."],
        ["Instal·lem", "Equip propi, sense subcontractes, amb la paperassa en regla."],
        ["Integrem", "Tots els sistemes treballen junts, sota una sola supervisió."],
        ["Supervisem", "Seguim el sistema dia a dia i responem quan ens necessites."],
      ],
      focusEyebrow: "Un sol número",
      focusText: "Quan alguna cosa falla, ens truques a nosaltres. De la resta ens n'ocupem nosaltres.",
    },
    problem: {
      eyebrow: "El problema",
      title: "Et sona, això?",
      text: "Una empresa et va posar les càmeres. Una altra, la centraleta. Una tercera et porta la xarxa. I el dia que alguna cosa deixa de funcionar, cadascuna diu que la culpa és de l'altra — i tu perds hores fent de mediador entre proveïdors.",
      scenes: [
        "Cada servei, amb una empresa diferent i un contracte diferent",
        "Quan hi ha una incidència, ningú no se'n fa responsable",
        "Sistemes que no es parlen entre ells",
        "Hores perdudes trucant, esperant i reclamant",
      ],
    },
    solution: {
      eyebrow: "La solució Nimbus",
      title: "Nosaltres ens n'ocupem de tot",
      text: "Tot el sistema surt de la nostra enginyeria: el dissenyem, l'instal·lem, l'integrem i el supervisem. Quan hi ha una incidència, ve un tècnic de casa que coneix tota la instal·lació — sense intermediaris, sense esperar que dues empreses es posin d'acord.",
      items: [
        {
          icon: "users",
          title: "Un sol interlocutor",
          text: "Un contracte, un telèfon i un equip que respon per tot el sistema, no per una part.",
        },
        {
          icon: "lightbulb",
          title: "Enginyeria pròpia",
          text: "Llarga experiència en solucions TIC i al dia de tot el que surt al mercat, sempre amb criteri de qualitat i durabilitat.",
        },
        {
          icon: "map-pin",
          title: "Resposta de proximitat",
          text: "Equip local, a Sils. L'atenció al client és la nostra carta de presentació: quan ens necessites, hi som.",
        },
      ],
    },
    services: {
      eyebrow: "Què integrem",
      title: "Les solucions TIC que la teva empresa necessita",
      text: "Aquestes són les grans famílies. Dins de cadascuna hi ha moltes solucions concretes — i les triem en funció del que necessita el teu negoci, no a l'inrevés.",
      items: [
        {
          icon: "globe",
          title: "Connectivitat",
          text: "Fibra i WiMAX professional perquè l'empresa no es quedi mai sense internet.",
        },
        {
          icon: "phone-call",
          title: "Comunicacions",
          text: "Línies mòbils d'empresa, centraleta i telefonia fixa integrades.",
        },
        {
          icon: "shield-check",
          title: "Seguretat",
          text: "Càmeres, alarmes i control d'accessos, sense quotes mensuals.",
        },
        {
          icon: "radio-tower",
          title: "Xarxes i WiFi",
          text: "Xarxes internes i WiFi professional dimensionats per al teu espai.",
        },
        {
          icon: "life-buoy",
          title: "Manteniment i suport",
          text: "Manteniment informàtic i suport tècnic de tot el sistema.",
        },
      ],
      note: "La teva empresa pot necessitar alguna cosa que no apareix aquí, pregunta'ns: si és TIC, en sabem.",
      hubLabel: "La teva empresa",
    },
    how: {
      eyebrow: "Com funciona",
      title: "Del primer contacte al sistema funcionant",
      text: "Sense preus inventats per telèfon: cada projecte es valora sobre el terreny.",
      steps: [
        [
          "Ens expliques la teva empresa",
          "Què feu, quins espais teniu i què necessiteu: dos minuts amb el formulari.",
        ],
        [
          "Visitem les instal·lacions",
          "Un tècnic valora l'estat actual, què es pot aprofitar i què cal renovar.",
        ],
        [
          "Et presentem el projecte unificat",
          "Equips, integració i preu tancat, explicat perquè s'entengui.",
        ],
        [
          "Instal·lem, integrem i seguim al teu costat",
          "El nostre equip ho munta tot i, a partir d'aquí, qualsevol incidència és cosa nostra.",
        ],
      ],
    },
    reviewsSection: {
      eyebrow: "Opinions",
      title: "Empreses que van deixar d'anar darrere de cinc proveïdors",
      subtitle:
        "Negocis que buscaven un únic interlocutor per a tot i algú que respongués al telèfon. Aquestes són les seves ressenyes a Google, sense retocar.",
    },
    localService: {
      eyebrow: "Servei proper",
      title: "A prop teu quan necessites una resposta",
      subtitle:
        "Nimbus no és una gran operadora amb un call center a l'altra punta del món. Som un equip local, a Sils, que coneix la teva empresa i la seva instal·lació.",
      text: "No volem vendre't el sistema més car ni el més barat. Volem entendre com treballa la teva empresa i dissenyar un sistema que hi encaixi — i quedar-nos a prop per quan ens necessitis.",
      cards: [
        [
          "Atenció humana",
          "Parles amb persones que coneixen la teva instal·lació, no amb un call center.",
        ],
        [
          "Coneixement del territori",
          "Treballem amb empreses, naus i comerços de la comarca cada dia.",
        ],
        [
          "T'ajudem a entendre",
          "No cal que sàpigues de tecnologia: t'ho expliquem clar i sense tecnicismes.",
        ],
        [
          "Seguim després d'instal·lar",
          "La nostra feina no acaba en muntar els equips: supervisem el sistema i responem quan cal.",
        ],
      ],
    },
    form: {
      eyebrow: "Estudi per a empreses",
      title: "Vols que analitzem el sistema TIC de la teva empresa?",
      text: "Explica'ns com és la teva empresa i què necessites. Et truquem, ho analitzem i, si té sentit, concertem la visita. Sense compromís.",
      step1Title: "Què necessita la teva empresa?",
      problems: [
        "Connectivitat i internet",
        "Comunicacions (mòbil i centraleta)",
        "Seguretat (càmeres, alarmes, accessos)",
        "Una mica de tot, vull assessorament",
      ],
      step2Title: "Com és l'espai de treball?",
      locationTypes: [
        "Oficina o despatx",
        "Local comercial o botiga",
        "Nau industrial o magatzem",
        "Més d'una seu o espai",
      ],
      step3Title: "Què et preocupa més?",
      usageOptions: [
        "Tinc massa proveïdors diferents",
        "Les incidències triguen a resoldre's",
        "La instal·lació s'ha quedat curta o antiga",
        "Estem creixent i hem d'ampliar",
      ],
      locationLabel: "A quina població és l'empresa?",
      locationPlaceholder: "Per exemple: Sils, Vidreres, un polígon concret...",
      diagnosticPurpose:
        "Amb això el nostre equip prepara la visita coneixent el teu cas abans d'arribar.",
      finalText:
        "Gràcies. Revisarem el que ens has explicat i et contactarem per concertar la visita.",
      noSalesTitle: "Sense rodejos comercials",
      noSalesText:
        "Ens centrem a entendre com treballa la teva empresa i quin sistema té sentit per al teu cas.",
      summaryLabels: { problem: "Què necessites", location: "Com és l'espai" },
    },
  },
  en: {
    meta: {
      title: "ICT solutions for businesses | Nimbus Telecom",
      description:
        "One provider for all of your company's technology: connectivity, communications, security and networks with in-house engineering and a single point of contact.",
    },
    nav: {
      problem: "The problem",
      services: "What we integrate",
      how: "How it works",
      study: "Request a study",
      reviews: "Reviews",
      contact: "Contact",
    },
    primaryCta: "Request a study",
    hero: {
      eyebrow: "ICT solutions for businesses",
      title: "All your technology, one provider",
      subtitle:
        "Connectivity, communications, security, networks... We design, install and supervise your company's entire ICT system.",
      text: "When something fails, you call one number: ours. No middlemen, no providers passing the buck.",
      primaryCta: "Request a study for my business",
      secondaryCta: "See what we integrate",
      cardItems: [
        ["Design", "The project comes from our own engineering, built around your business."],
        ["Install", "Our own team, no subcontractors, with all the paperwork in order."],
        ["Integrate", "All systems work together, under a single supervision."],
        ["Supervise", "We monitor the system day to day and respond when you need us."],
      ],
      focusEyebrow: "One number",
      focusText: "When something fails, you call us. We take care of the rest.",
    },
    problem: {
      eyebrow: "The problem",
      title: "Does this sound familiar?",
      text: "One company installed your cameras. Another, the phone system. A third runs your network. And the day something stops working, each one blames the other — and you lose hours mediating between providers.",
      scenes: [
        "Every service with a different company and a different contract",
        "When there's an incident, nobody takes responsibility",
        "Systems that don't talk to each other",
        "Hours lost calling, waiting and complaining",
      ],
    },
    solution: {
      eyebrow: "The Nimbus solution",
      title: "We take care of everything",
      text: "The whole system comes from our own engineering: we design it, install it, integrate it and supervise it. When there's an incident, one of our own technicians shows up knowing the entire installation — no middlemen, no waiting for two companies to agree.",
      items: [
        {
          icon: "users",
          title: "A single point of contact",
          text: "One contract, one phone number and one team accountable for the whole system, not just a part.",
        },
        {
          icon: "lightbulb",
          title: "In-house engineering",
          text: "Long experience with ICT solutions and up to date with everything new on the market, always with quality and durability in mind.",
        },
        {
          icon: "map-pin",
          title: "Local response",
          text: "A local team, in Sils. Customer service is our calling card: when you need us, we're there.",
        },
      ],
    },
    services: {
      eyebrow: "What we integrate",
      title: "The ICT solutions your business needs",
      text: "These are the main families. Within each there are many specific solutions — and we choose them based on what your business needs, not the other way around.",
      items: [
        {
          icon: "globe",
          title: "Connectivity",
          text: "Professional fibre and WiMAX so your business is never without internet.",
        },
        {
          icon: "phone-call",
          title: "Communications",
          text: "Business mobile lines, PBX and landline telephony, integrated.",
        },
        {
          icon: "shield-check",
          title: "Security",
          text: "Cameras, alarms and access control, with no monthly fees.",
        },
        {
          icon: "radio-tower",
          title: "Networks and WiFi",
          text: "Internal networks and professional WiFi sized for your space.",
        },
        {
          icon: "life-buoy",
          title: "Maintenance and support",
          text: "IT maintenance and technical support for the whole system.",
        },
      ],
      note: "Your business might need something that isn't listed here: ask us — if it's ICT, we know how.",
      hubLabel: "Your business",
    },
    how: {
      eyebrow: "How it works",
      title: "From first contact to a working system",
      text: "No made-up prices over the phone: every project is assessed on site.",
      steps: [
        [
          "Tell us about your business",
          "What you do, what spaces you have and what you need: two minutes with the form.",
        ],
        [
          "We visit your premises",
          "A technician assesses the current state, what can be kept and what needs renewing.",
        ],
        [
          "We present the unified project",
          "Equipment, integration and a fixed price, explained so it makes sense.",
        ],
        [
          "We install, integrate and stay by your side",
          "Our team sets everything up and, from then on, any incident is our problem.",
        ],
      ],
    },
    reviewsSection: {
      eyebrow: "Reviews",
      title: "Businesses that stopped chasing five different providers",
      subtitle:
        "Companies that wanted a single point of contact for everything and someone who picks up the phone. These are their Google reviews, unedited.",
    },
    localService: {
      eyebrow: "Local service",
      title: "Close by when you need an answer",
      subtitle:
        "Nimbus isn't a big operator with a call centre on the other side of the world. We're a local team, in Sils, that knows your business and its installation.",
      text: "We don't want to sell you the most expensive system or the cheapest one. We want to understand how your business works and design a system that fits — and stay close for when you need us.",
      cards: [
        [
          "Human service",
          "You talk to people who know your installation, not to a call centre.",
        ],
        [
          "Local knowledge",
          "We work with businesses, warehouses and shops across the area every day.",
        ],
        [
          "We help you understand",
          "You don't need to know tech: we explain things clearly, without jargon.",
        ],
        [
          "We stay after installing",
          "Our job doesn't end when the equipment is up: we supervise the system and respond when needed.",
        ],
      ],
    },
    form: {
      eyebrow: "Business study",
      title: "Want us to analyse your company's ICT system?",
      text: "Tell us about your business and what you need. We'll call you, analyse it and, if it makes sense, arrange the visit. No obligation.",
      step1Title: "What does your business need?",
      problems: [
        "Connectivity and internet",
        "Communications (mobile and PBX)",
        "Security (cameras, alarms, access)",
        "A bit of everything, I want advice",
      ],
      step2Title: "What's your workspace like?",
      locationTypes: [
        "Office",
        "Shop or commercial premises",
        "Industrial unit or warehouse",
        "More than one site or space",
      ],
      step3Title: "What worries you most?",
      usageOptions: [
        "I have too many different providers",
        "Incidents take too long to resolve",
        "The installation is outdated or too small",
        "We're growing and need to expand",
      ],
      locationLabel: "Where is the business located?",
      locationPlaceholder: "For example: Sils, Vidreres, a specific industrial estate...",
      diagnosticPurpose:
        "This lets our team prepare the visit knowing your case before arriving.",
      finalText:
        "Thank you. We'll review what you've told us and contact you to arrange the visit.",
      noSalesTitle: "No sales runaround",
      noSalesText:
        "We focus on understanding how your business works and what system makes sense for your case.",
      summaryLabels: { problem: "What you need", location: "Your workspace" },
    },
  },
};
