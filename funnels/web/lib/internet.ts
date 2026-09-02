import type { Locale } from "./i18n";

export type InternetOption = {
  badge: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  perks: string[];
  featured?: boolean;
};

export type InternetContent = {
  meta: { title: string; description: string };
  nav: { solution: string; options: string; study: string; faq: string; contact: string; business: string };
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
  problem: { eyebrow: string; title: string; text: string; bullets: string[] };
  approach: { eyebrow: string; title: string; text: string; checks: string[] };
  options: {
    eyebrow: string;
    title: string;
    text: string;
    note: string;
    items: InternetOption[];
  };
  banner: { text: string; primary: string; secondary: string };
  reviewsSection: { eyebrow: string; title: string; subtitle: string };
  faq: { eyebrow: string; title: string; items: [string, string][] };
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

export const INTERNET_CONTENT: Record<Locale, InternetContent> = {
  es: {
    meta: {
      title: "Internet en casa y en el negocio | Nimbus Telecom",
      description:
        "Fibra óptica donde llega y red propia Wimax donde no llega. Estudiamos tu caso antes de venderte nada.",
    },
    nav: {
      solution: "Cómo lo hacemos",
      options: "Opciones",
      study: "Estudiar mi caso",
      faq: "Dudas",
      contact: "Contacto",
      business: "Soy empresa",
    },
    primaryCta: "Estudiar mi caso",
    hero: {
      eyebrow: "Internet para casa y negocio",
      title: "¿Internet lento o que no llega bien a tu casa?",
      subtitle:
        "No todas las tecnologías llegan a todas partes. Antes de venderte nada, miramos qué opciones reales tienes donde vives.",
      text: "Trabajamos con fibra óptica donde está desplegada y con red propia Wimax en zonas rurales donde la fibra no llega. Y si en tu caso no hay una buena opción, te lo decimos.",
      cardItems: [
        ["Casa", "Va lento por las tardes"],
        ["Masía", "No llega la fibra"],
        ["Negocio", "Cortes que paran el trabajo"],
      ],
      focusEyebrow: "Enfoque Nimbus",
      focusText: "Miramos tu caso antes de proponerte nada.",
      primaryCta: "Estudiar mi caso",
      secondaryCta: "Ver opciones",
    },
    problem: {
      eyebrow: "El problema",
      title: "Contratar a ciegas acaba en una instalación que no funciona",
      text: "La cobertura de internet depende mucho de dónde estés. Hay calles con fibra y calles vecinas sin ella, y en zonas rurales la solución suele ser otra distinta. Contratar sin comprobarlo antes acaba en visitas fallidas, plazos que se alargan y clientes enfadados.",
      bullets: [
        "La fibra no llega a todas las direcciones",
        "En zonas rurales hace falta otra tecnología",
        "El precio final depende de la instalación",
        "Una mala instalación se nota cada día",
      ],
    },
    approach: {
      eyebrow: "Cómo lo hacemos",
      title: "Primero entendemos tu caso, después proponemos",
      text: "Nos cuentas qué te pasa y dónde, y revisamos qué opciones hay en tu zona. Si hace falta, vamos a verlo. Trabajamos con equipo propio, así que quien te instala es de la casa.",
      checks: [
        "Revisamos qué llega a tu zona",
        "Te decimos si hay opción o no",
        "Instalación con equipo propio",
        "Visita previa cuando hace falta",
        "Te explicamos el coste antes",
        "Soporte con personas, no bots",
      ],
    },
    options: {
      eyebrow: "Opciones orientativas",
      title: "Estas son las opciones con las que trabajamos",
      text: "Los precios son orientativos: la opción que te encaja y el coste final dependen de tu dirección y de la instalación. Por eso preferimos mirar tu caso antes.",
      note: "Precios orientativos sin IVA incluido en algunos casos. La disponibilidad depende de la zona.",
      items: [
        {
          badge: "Más contratada",
          name: "Fibra óptica",
          price: "desde 32€",
          priceNote: "/mes",
          description: "600 Mb y 1 Gb simétricos, en las zonas donde la fibra está desplegada.",
          perks: [
            "Instalación sin coste",
            "Router incluido",
            "12 meses de permanencia",
            "10% de descuento en las líneas móviles",
            "Velocidad simétrica"
          ],
          featured: true,
        },
        {
          badge: "Zonas rurales",
          name: "Conexión rural",
          price: "desde 29,95€",
          priceNote: "/mes",
          description:
            "De 10 a 30 Mb vía Wimax, para masías y zonas donde la fibra no llega. Sin línea fija y sin límite de descarga.",
          perks: [
            "Sin permanencia",
            "Instalación: 99,95€ (IVA incluido)",
            "Baja temporal: 2,95€/mes hasta 9 meses",
            "Sin límite de descarga",
            "No necesitas línea fija",
          ],
        },
        {
          badge: "Ahorro",
          name: "Internet y móvil",
          price: "+ desde 6,95€",
          priceNote: "/línea",
          description: "Añade líneas móviles a tu conexión y comparte datos entre ellas.",
          perks: [
            "Datos compartidos",
            "Hasta 3 líneas",
            "Sin permanencia en las líneas móviles",
            "Llamadas ilimitadas incluidas",
            "Una sola factura"
          ],
        },
      ],
    },
    banner: {
      text: "¿No sabes qué opción te encaja? Cuéntanos tu caso y lo miramos.",
      primary: "Estudiar mi caso",
      secondary: "Hablar con nosotros",
    },
    reviewsSection: {
      eyebrow: "Opiniones",
      title: "Clientes que llevaban años esperando una conexión decente",
      subtitle:
        "Muchos llegaron aquí después de pelearse con grandes operadoras que no llegaban a su casa o a su pueblo. Estas son sus reseñas en Google, sin retocar.",
    },
    faq: {
      eyebrow: "Dudas habituales",
      title: "Antes de contratar internet",
      items: [
        [
          "¿Cómo sé si me llega la fibra?",
          "No lo puedes saber solo por la dirección. Cuéntanos dónde estás y lo revisamos nosotros con las operadoras con las que trabajamos.",
        ],
        [
          "¿Qué pasa si no llega la fibra a mi casa?",
          "En muchas zonas rurales trabajamos con una red propia de Wimax, que necesita una antena. Si tampoco hay opción buena en tu caso, te lo decimos claro.",
        ],
        [
          "¿Hay permanencia?",
          "En fibra son 12 meses y la instalación no tiene coste. En conexión rural no hay permanencia, y la instalación son 99,95€ con IVA incluido.",
        ],
        [
          "¿Puedo darme de baja unos meses y volver?",
          "Sí, en conexión rural. Puedes pausar el servicio hasta 9 meses y durante ese tiempo pagas solo 2,95€ al mes con IVA incluido, en lugar de la cuota normal. Va muy bien para segundas residencias.",
        ],
        [
          "¿La conexión rural tiene límite de descarga?",
          "No. No hay límite de datos, y tampoco necesitas contratar una línea fija para tenerla.",
        ],
        [
          "¿Hay que hacer obra en casa?",
          "En fibra normalmente se aprovecha la instalación existente. En conexión rural hay que colocar una antena; lo valoramos en la visita previa y la instalación son 99,95€ con IVA incluido.",
        ],
        [
          "¿Cuánto tarda la instalación?",
          "Depende de la tecnología y de la zona. Cuando revisemos tu caso te damos un plazo realista, no uno para cerrar la venta.",
        ],
        [
          "¿Puedo juntar internet y móvil?",
          "Sí, y sale mejor de precio. Además puedes compartir datos entre hasta 3 líneas móviles.",
        ],
      ],
    },
    localService: {
      eyebrow: "Servicio cercano",
      title: "Cerca de ti cuando necesitas una respuesta",
      subtitle:
        "Nimbus no es solo un proveedor de internet. Somos un equipo local, en Sils, que revisa tu caso y te ayuda a entender qué conexión llega de verdad a tu dirección.",
      text:
        "Si internet te va lento o no te llega bien, no queremos venderte la opción más cara. Queremos saber qué tecnología llega a tu zona y qué velocidad tiene sentido para lo que necesitas. A partir de ahí, te orientamos con criterio.",
      cards: [
        ["Atención humana", "Hablas con personas que revisan tu caso, no con un proceso automático pensado solo para venderte."],
        ["Conocimiento del territorio", "Sabemos qué tecnología llega a cada zona de la Selva y el Gironès, y dónde no llega."],
        ["Te ayudamos a entender", "No tienes por qué saber si el problema es de la instalación, del router o de la cobertura. Te lo explicamos claro."],
        ["Seguimos después de contratar", "Nuestro trabajo no termina al instalar. Si hay problemas de señal o velocidad, seguimos cerca."],
      ],
    },
    form: {
      eyebrow: "Estudio de internet",
      finalText:
        "Gracias. Revisaremos qué opciones de internet llegan a tu dirección y te enviaremos una propuesta según lo que nos has contado.",
      noSalesTitle: "Sin rodeos comerciales",
      noSalesText:
        "Nos centramos en entender qué conexión llega de verdad a tu dirección y qué opción tiene más sentido.",
      summaryLabels: { problem: "Qué necesitas", location: "Dónde lo necesitas" },
      diagnosticPurpose:
        "El diagnóstico nos ayuda a entender qué opciones de internet llegan a tu dirección antes de contratar.",
      title: "¿Quieres que miremos qué opciones tienes?",
      text: "Cuéntanos qué te pasa y dónde. Revisamos tu caso y te llamamos con una recomendación concreta, sin compromiso.",
      step1Title: "¿Qué te pasa con tu internet?",
      step2Title: "¿Dónde lo necesitas?",
      step3Title: "¿Para qué lo usáis?",
      problems: [
        "No me llega la fibra",
        "Va lento",
        "Se corta a menudo",
        "No tengo internet",
        "Quiero cambiar de operador",
      ],
      locationTypes: ["Casa o piso", "Masía o casa aislada", "Negocio o local", "Segunda residencia"],
      locationLabel: "¿En qué población?",
      locationPlaceholder: "Por ejemplo: Sils, Vidreres, una urbanización concreta…",
      usageOptions: [
        "Teletrabajo o videollamadas",
        "Ver vídeo y TV",
        "Varios dispositivos a la vez",
        "Juegos online",
        "Un poco de todo",
        "Cámaras o alarma",
      ],
    },
  },

  ca: {
    meta: {
      title: "Internet a casa i al negoci | Nimbus Telecom",
      description:
        "Fibra òptica on arriba i xarxa propia de Wimax on no arriba la fibra. Estudiem el teu cas abans de vendre't res.",
    },
    nav: {
      solution: "Com ho fem",
      options: "Opcions",
      study: "Estudiar el meu cas",
      faq: "Dubtes",
      contact: "Contacte",
      business: "Soc empresa",
    },
    primaryCta: "Estudiar el meu cas",
    hero: {
      eyebrow: "Internet per a casa i negoci",
      title: "Internet lent o que no arriba bé a casa teva?",
      subtitle:
        "No totes les tecnologies arriben a tot arreu. Abans de vendre't res, mirem quines opcions reals tens on vius.",
      text: "Treballem amb fibra òptica on està desplegada i xarxa propia de Wimax en zones rurals on la fibra no arriba. I si en el teu cas no hi ha una bona opció, t'ho diem.",
      cardItems: [
        ["Casa", "Va lent a les tardes"],
        ["Masia", "No arriba la fibra"],
        ["Negoci", "Talls que aturen la feina"],
      ],
      focusEyebrow: "Enfocament Nimbus",
      focusText: "Mirem el teu cas abans de proposar-te res.",
      primaryCta: "Estudiar el meu cas",
      secondaryCta: "Veure opcions",
    },
    problem: {
      eyebrow: "El problema",
      title: "Contractar a cegues acaba en una instal·lació que no funciona",
      text: "La cobertura d'internet depèn molt d'on siguis. Hi ha carrers amb fibra i carrers veïns sense, i en zones rurals la solució acostuma a ser una altra. Contractar sense comprovar-ho abans acaba en visites fallides, terminis que s'allarguen i clients enfadats.",
      bullets: [
        "La fibra no arriba a totes les adreces",
        "En zones rurals cal una altra tecnologia",
        "El preu final depèn de la instal·lació",
        "Una mala instal·lació es nota cada dia",
      ],
    },
    approach: {
      eyebrow: "Com ho fem",
      title: "Primer entenem el teu cas, després proposem",
      text: "Ens expliques què et passa i on, i revisem quines opcions hi ha a la teva zona. Si cal, hi anem a mirar-ho. Treballem amb equip propi, així que qui t'instal·la és de la casa.",
      checks: [
        "Revisem què arriba a la teva zona",
        "Et diem si hi ha opció o no",
        "Instal·lació amb equip propi",
        "Visita prèvia quan cal",
        "T'expliquem el cost abans",
        "Suport amb persones, no bots",
      ],
    },
    options: {
      eyebrow: "Opcions orientatives",
      title: "Aquestes són les opcions amb què treballem",
      text: "Els preus són orientatius: l'opció que t'encaixa i el cost final depenen de la teva adreça i de la instal·lació. Per això preferim mirar el teu cas abans.",
      note: "Preus orientatius. La disponibilitat depèn de la zona.",
      items: [
        {
          badge: "Més contractada",
          name: "Fibra òptica",
          price: "des de 32€",
          priceNote: "/mes",
          description: "600 Mb i 1000 Mb simètrics, a les zones on la fibra està desplegada.",
          perks: [
            "Instal·lació sense cost",
            "Router inclòs",
            "12 mesos de permanència",
            "10% de descompte a les línies mòbils",
            "Velocitat simètrica"
          ],
          featured: true,
        },
        {
          badge: "Zones rurals",
          name: "Connexió rural",
          price: "des de 29,95€",
          priceNote: "/mes",
          description:
            "De 10 a 30 Mb via Wimax, per a masies i zones on la fibra no arriba. Sense línia fixa i sense límit de descàrrega.",
          perks: [
            "Sense permanència",
            "Instal·lació: 99,95€ (IVA inclòs)",
            "Baixa temporal: 2,95€/mes fins a 9 mesos",
            "Sense límit de descàrrega",
            "No cal línia fixa",
          ],
        },
        {
          badge: "Estalvi",
          name: "Internet i mòbil",
          price: "+ des de 6,95€",
          priceNote: "/línia",
          description: "Afegeix línies mòbils a la teva connexió i comparteix dades entre elles.",
          perks: [
            "Dades compartides",
            "Fins a 3 línies",
            "Sense permanència a les línies mòbils",
            "Trucades il·limitades incloses",
            "Una sola factura"
          ],
        },
      ],
    },
    banner: {
      text: "No saps quina opció t'encaixa? Explica'ns el teu cas i ho mirem.",
      primary: "Estudiar el meu cas",
      secondary: "Parlar amb nosaltres",
    },
    reviewsSection: {
      eyebrow: "Opinions",
      title: "Clients que feia anys que esperaven una connexió decent",
      subtitle:
        "Molts van arribar aquí després de barallar-se amb grans operadores que no arribaven a casa seva o al seu poble. Aquestes són les seves ressenyes a Google, sense retocar.",
    },
    faq: {
      eyebrow: "Dubtes habituals",
      title: "Abans de contractar internet",
      items: [
        [
          "Com sé si m'arriba la fibra?",
          "No ho pots saber només per l'adreça. Explica'ns on ets i ho revisem nosaltres amb les operadores amb qui treballem.",
        ],
        [
          "Què passa si no arriba la fibra a casa meva?",
          "En moltes zones rurals treballem amb xarxa propia de Wimax, que necessita una antena. Si tampoc hi ha bona opció en el teu cas, t'ho diem clar.",
        ],
        [
          "Hi ha permanència?",
          "En fibra són 12 mesos i la instal·lació no té cost. En connexió rural no hi ha permanència, i la instal·lació són 99,95€ amb IVA inclòs.",
        ],
        [
          "Puc donar-me de baixa uns mesos i tornar?",
          "Sí, en connexió rural. Pots pausar el servei fins a 9 mesos i durant aquest temps pagues només 2,95€ al mes amb IVA inclòs, en lloc de la quota normal. Va molt bé per a segones residències.",
        ],
        [
          "La connexió rural té límit de descàrrega?",
          "No. No hi ha límit de dades, i tampoc cal contractar una línia fixa per tenir-la.",
        ],
        [
          "Cal fer obra a casa?",
          "En fibra normalment s'aprofita la instal·lació existent. En connexió rural cal col·locar una antena; ho valorem a la visita prèvia i la instal·lació són 99,95€ amb IVA inclòs.",
        ],
        [
          "Quant triga la instal·lació?",
          "Depèn de la tecnologia i de la zona. Quan revisem el teu cas et donem un termini realista, no un per tancar la venda.",
        ],
        [
          "Puc ajuntar internet i mòbil?",
          "Sí, i surt més bé de preu. A més pots compartir dades entre fins a 3 línies mòbils.",
        ],
      ],
    },
    localService: {
      eyebrow: "Servei proper",
      title: "A prop teu quan necessites una resposta",
      subtitle:
        "Nimbus no és només un proveïdor d'internet. Som un equip local, a Sils, que revisa el teu cas i t'ajuda a entendre quina connexió arriba de veritat a la teva adreça.",
      text:
        "Si internet et va lent o no t'arriba bé, no volem vendre't l'opció més cara. Volem saber quina tecnologia arriba a la teva zona i quina velocitat té sentit per al que necessites. A partir d'aquí, t'orientem amb criteri.",
      cards: [
        ["Atenció humana", "Parles amb persones que revisen el teu cas, no amb un procés automàtic pensat només per vendre't."],
        ["Coneixement del territori", "Sabem quina tecnologia arriba a cada zona de la Selva i el Gironès, i on no arriba."],
        ["T'ajudem a entendre", "No cal que sàpigues si el problema és de la instal·lació, del router o de la cobertura. T'ho expliquem clar."],
        ["Seguim després de contractar", "La nostra feina no acaba en instal·lar. Si hi ha problemes de senyal o velocitat, seguim a prop."],
      ],
    },
    form: {
      eyebrow: "Estudi d'internet",
      finalText:
        "Gràcies. Revisarem quines opcions d'internet arriben a la teva adreça i t'enviarem una proposta segons el que ens has explicat.",
      noSalesTitle: "Sense rodejos comercials",
      noSalesText:
        "Ens centrem a entendre quina connexió arriba de veritat a la teva adreça i quina opció té més sentit.",
      summaryLabels: { problem: "Què necessites", location: "On ho necessites" },
      diagnosticPurpose:
        "El diagnòstic ens ajuda a entendre quines opcions d'internet arriben a la teva adreça abans de contractar.",
      title: "Vols que mirem quines opcions tens?",
      text: "Explica'ns què et passa i on. Revisem el teu cas i et truquem amb una recomanació concreta, sense compromís.",
      step1Title: "Què et passa amb el teu internet?",
      step2Title: "On el necessites?",
      step3Title: "Per a què l'useu?",
      problems: [
        "No m'arriba la fibra",
        "Va lent",
        "Es talla sovint",
        "No tinc internet",
        "Vull canviar d'operador",
      ],
      locationTypes: ["Casa o pis", "Masia o casa aïllada", "Negoci o local", "Segona residència"],
      locationLabel: "A quina població?",
      locationPlaceholder: "Per exemple: Sils, Vidreres, una urbanització concreta…",
      usageOptions: [
        "Teletreball o videotrucades",
        "Veure vídeo i TV",
        "Diversos dispositius alhora",
        "Jocs en línia",
        "Una mica de tot",
        "Càmeres o alarma",
      ],
    },
  },

  en: {
    meta: {
      title: "Home and business internet | Nimbus Telecom",
      description:
        "Fibre where it reaches and rural Wimax connections where it doesn't. We look at your case before selling you anything.",
    },
    nav: {
      solution: "How we work",
      options: "Options",
      study: "Review my case",
      faq: "Questions",
      contact: "Contact",
      business: "For business",
    },
    primaryCta: "Review my case",
    hero: {
      eyebrow: "Internet for home and business",
      title: "Slow internet, or none reaching your home?",
      subtitle:
        "Not every technology reaches everywhere. Before selling you anything, we look at the options you actually have where you live.",
      text: "We work with fibre where it's deployed and with Wimax connections in rural areas the fibre doesn't reach. And if there's no good option for you, we'll say so.",
      cardItems: [
        ["Home", "Slows down in the evening"],
        ["Farmhouse", "No fibre available"],
        ["Business", "Dropouts that stop the work"],
      ],
      focusEyebrow: "The Nimbus approach",
      focusText: "We look at your case before proposing anything.",
      primaryCta: "Review my case",
      secondaryCta: "See options",
    },
    problem: {
      eyebrow: "The problem",
      title: "Signing up blind ends in an installation that doesn't work",
      text: "Internet coverage depends heavily on where you are. Some streets have fibre and neighbouring ones don't, and in rural areas the answer is usually a different technology. Signing up without checking first leads to failed visits, slipping deadlines and unhappy customers.",
      bullets: [
        "Fibre doesn't reach every address",
        "Rural areas need a different technology",
        "The final price depends on the install",
        "A poor install shows every single day",
      ],
    },
    approach: {
      eyebrow: "How we work",
      title: "First we understand your case, then we propose",
      text: "Tell us what's happening and where, and we'll check what's available in your area. If needed, we come and look. We work with our own team, so whoever installs it works here.",
      checks: [
        "We check what reaches your area",
        "We tell you if there's an option",
        "Installed by our own team",
        "Site visit when it's needed",
        "We explain the cost upfront",
        "Support from people, not bots",
      ],
    },
    options: {
      eyebrow: "Indicative options",
      title: "These are the options we work with",
      text: "Prices are indicative: which option fits and what it finally costs depend on your address and the installation. That's why we prefer to look at your case first.",
      note: "Indicative prices. Availability depends on the area.",
      items: [
        {
          badge: "Most popular",
          name: "Fibre optic",
          price: "from €32",
          priceNote: "/month",
          description: "600 Mb and 1 Gb symmetrical, in areas where fibre is deployed.",
          perks: [
            "Free installation",
            "12-month contract",
            "Symmetrical speed"
          ],
          featured: true,
        },
        {
          badge: "Rural areas",
          name: "Rural connection",
          price: "from €29.95",
          priceNote: "/month",
          description:
            "10 to 30 Mb over Wimax, for farmhouses and areas fibre doesn't reach. No landline needed and no download cap.",
          perks: [
            "No minimum term",
            "Installation: €99.95 (VAT included)",
            "Pause it: €2.95/month for up to 9 months",
            "No download cap",
            "No landline needed",
          ],
        },
        {
          badge: "Bundle",
          name: "Internet and mobile",
          price: "+ from €6.95",
          priceNote: "/line",
          description: "Add mobile lines to your connection and share data between them.",
          perks: [
            "Shared data",
            "Up to 3 lines",
            "No minimum term on mobile lines",
            "Unlimited calls included",
            "A single bill"
          ],
        },
      ],
    },
    banner: {
      text: "Not sure which option fits? Tell us your case and we'll look into it.",
      primary: "Review my case",
      secondary: "Talk to us",
    },
    reviewsSection: {
      eyebrow: "Reviews",
      title: "Customers who spent years waiting for a decent connection",
      subtitle:
        "Many came here after fighting with big operators that never reached their home or their village. These are their Google reviews, unedited.",
    },
    faq: {
      eyebrow: "Common questions",
      title: "Before signing up for internet",
      items: [
        [
          "How do I know if fibre reaches me?",
          "You can't tell from the address alone. Tell us where you are and we'll check it with the operators we work with.",
        ],
        [
          "What if fibre doesn't reach my home?",
          "In many rural areas we work with Wimax connections, which need an antenna. If there's no good option for you either, we'll tell you straight.",
        ],
        [
          "Is there a minimum term?",
          "Fibre has a 12-month term and the installation is free. Rural connections have no minimum term, and the installation is €99.95 including VAT.",
        ],
        [
          "Can I pause the service for a few months?",
          "Yes, on rural connections. You can pause it for up to 9 months and pay just €2.95 a month including VAT instead of the usual fee. It works well for second homes.",
        ],
        [
          "Does the rural connection have a download cap?",
          "No. There's no data cap, and you don't need a landline to have it either.",
        ],
        [
          "Does it need building work?",
          "Fibre usually reuses the existing installation. A rural connection needs an antenna fitted; we assess that during the site visit and the installation is €99.95 including VAT.",
        ],
        [
          "How long does installation take?",
          "It depends on the technology and the area. Once we've reviewed your case we'll give you a realistic timeframe, not one designed to close the sale.",
        ],
        [
          "Can I bundle internet and mobile?",
          "Yes, and it works out cheaper. You can also share data across up to 3 mobile lines.",
        ],
      ],
    },
    localService: {
      eyebrow: "Nearby service",
      title: "Close to you when you need an answer",
      subtitle:
        "Nimbus is not just an internet provider. We are a local team in Sils that reviews your case and helps you understand which connection actually reaches your address.",
      text:
        "If your internet is slow or not reaching you well, we don't want to sell you the most expensive option. We want to know what technology reaches your area and what speed makes sense for what you need. From there, we guide you with judgement.",
      cards: [
        ["Human attention", "You talk to people who review your case, not an automated process designed just to sell to you."],
        ["Local knowledge", "We know what technology reaches each area of La Selva and El Gironès, and where it doesn't."],
        ["We help you understand", "You don't need to know if the problem is the installation, the router or coverage. We explain it clearly."],
        ["We stay after you sign up", "Our work doesn't end at installation. If there are signal or speed issues, we stay close."],
      ],
    },
    form: {
      eyebrow: "Internet review",
      finalText:
        "Thank you. We'll check which internet options reach your address and send you a proposal based on what you've told us.",
      noSalesTitle: "No sales talk",
      noSalesText:
        "We focus on understanding which connection actually reaches your address and which option makes the most sense.",
      summaryLabels: { problem: "What you need", location: "Where you need it" },
      diagnosticPurpose:
        "The review helps us understand which internet options reach your address before you sign up.",
      title: "Want us to look at what's available for you?",
      text: "Tell us what's happening and where. We'll review your case and call you with a specific recommendation, no strings attached.",
      step1Title: "What's wrong with your internet?",
      step2Title: "Where do you need it?",
      step3Title: "What do you use it for?",
      problems: [
        "Fibre doesn't reach me",
        "It's slow",
        "It drops out often",
        "I have no internet",
        "I want to switch provider",
      ],
      locationTypes: ["House or flat", "Farmhouse or isolated home", "Business premises", "Second home"],
      locationLabel: "Which town?",
      locationPlaceholder: "For example: Sils, Vidreres, a specific development…",
      usageOptions: [
        "Remote work or video calls",
        "Video and TV",
        "Several devices at once",
        "Online gaming",
        "A bit of everything",
        "Cameras or alarm",
      ],
    },
  },
};
