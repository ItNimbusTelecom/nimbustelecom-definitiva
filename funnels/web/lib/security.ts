import type { Locale } from "./i18n";

export type SecurityContent = {
  meta: { title: string; description: string };
  nav: { what: string; how: string; study: string; faq: string; contact: string; business: string };
  primaryCta: string;
  travelNote: string;
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
  protect: {
    eyebrow: string;
    title: string;
    text: string;
    items: { icon: "shield-check" | "smartphone" | "users"; title: string; text: string }[];
    note: string;
    moreInfoCta: string;
  };
  services: {
    eyebrow: string;
    title: string;
    text: string;
    items: {
      id: string;
      icon: "shield-check" | "smartphone" | "users";
      title: string;
      lead: string;
      points: string[];
      badge?: string;
    }[];
  };
  reviewsSection: { eyebrow: string; title: string; subtitle: string };
  localService: {
    eyebrow: string;
    title: string;
    subtitle: string;
    text: string;
    cards: [string, string][];
  };
  how: {
    eyebrow: string;
    title: string;
    text: string;
    steps: [string, string][];
  };
  rgpd: { eyebrow: string; title: string; text: string; checks: string[] };
  faq: { eyebrow: string; title: string; items: [string, string][] };
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

export const SECURITY_CONTENT: Record<Locale, SecurityContent> = {
  es: {
    meta: {
      title: "Seguridad para tu casa y tu negocio | Nimbus Telecom",
      description:
        "Cámaras, alarmas y control de accesos con proyecto a medida. Un técnico de ingeniería valora tu espacio y diseña la protección que necesitas.",
    },
    nav: { what: "Qué protegemos", how: "Cómo funciona", study: "Pedir valoración", faq: "Dudas", contact: "Contacto", business: "Soy empresa" },
    primaryCta: "Pedir valoración",
    travelNote:
      "El desplazamiento es gratuito hasta 20 km de nuestras oficinas. A partir de esa distancia, el desplazamiento tiene un coste adicional que te indicamos antes de confirmar la visita.",
    hero: {
      eyebrow: "Seguridad a medida",
      title: "Cada espacio se protege de una manera distinta",
      subtitle:
        "No vendemos kits cerrados. Un técnico de ingeniería visita tu casa o tu negocio, valora el espacio y diseña el proyecto de protección que de verdad necesitas.",
      text: "Cámaras, alarmas y control de accesos, instalados por nuestro propio equipo y con todo el papeleo en regla.",
      primaryCta: "Pedir valoración",
      secondaryCta: "Ver qué protegemos",
      cardItems: [
        ["Visita técnica", "Un técnico valora tu espacio sin compromiso"],
        ["Proyecto a medida", "Equipos e instalación según lo que necesitas"],
        ["Instalación propia", "Lo montamos nosotros, sin subcontratas"],
      ],
      focusEyebrow: "Sin compromiso",
      focusText: "La valoración no te obliga a nada: primero el proyecto, después decides.",
    },
    protect: {
      eyebrow: "Qué protegemos",
      title: "Cámaras, alarmas y control de accesos",
      text: "Tres formas de proteger un espacio que se pueden combinar según el caso. En la visita te decimos qué tiene sentido para el tuyo y qué no.",
      items: [
        {
          icon: "shield-check",
          title: "Videovigilancia CCTV",
          text: "Cámaras para ver qué pasa en tu local, nave o vivienda, en directo y con grabación. Diseñamos la cobertura para que no queden ángulos muertos.",
        },
        {
          icon: "smartphone",
          title: "Alarmas",
          text: "Sistemas de alarma que controlas desde el móvil, con avisos inmediatos si algo se dispara. Sin cuotas mensuales: el equipo es tuyo desde el primer día.",
        },
        {
          icon: "users",
          title: "Control de accesos",
          text: "Decide quién entra, por dónde y a qué horas: tarjetas, teclados o control desde el móvil para negocios y comunidades.",
        },
      ],
      note: "Ni cámaras, ni alarmas, ni control de accesos: ningún servicio de seguridad Nimbus lleva cuota mensual. Pagas la instalación una vez y el equipo es tuyo desde el primer día.",
      moreInfoCta: "Más información",
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "De la primera llamada a la instalación",
      text: "Sin precios inventados por teléfono: cada proyecto se valora sobre el terreno.",
      steps: [
        ["Nos cuentas qué quieres proteger", "Casa, negocio, local o nave: nos explicas tu caso en dos minutos con el formulario."],
        ["Un técnico visita tu espacio", "Valora accesos, puntos débiles y qué protección tiene sentido. Sin compromiso."],
        ["Te presentamos el proyecto", "Equipos, instalación y precio cerrado, explicado para que se entienda."],
        ["Instalamos nosotros", "Nuestro propio equipo monta y deja todo funcionando, con el papeleo en regla."],
      ],
    },
    rgpd: {
      eyebrow: "Todo en regla",
      title: "La videovigilancia tiene normas. Te las dejamos resueltas.",
      text: "Instalar cámaras implica obligaciones legales que casi nadie te cuenta cuando compras un kit por internet. Nosotros lo dejamos todo en regla desde el primer día.",
      checks: [
        "Cartelería obligatoria de zona videovigilada",
        "Configuración de plazos de conservación de imágenes",
        "Orientación de cámaras respetando espacios de terceros",
        "Asesoramiento sobre el registro de actividades de tratamiento",
      ],
    },
    faq: {
      eyebrow: "Dudas frecuentes",
      title: "Lo que nos preguntan antes de empezar",
      items: [
        [
          "¿Cuánto cuesta una instalación?",
          "Depende del espacio y de lo que haya que proteger: no hay dos proyectos iguales. Por eso la valoración con el técnico es gratuita hasta 20 km de nuestras oficinas, y el precio de la instalación te lo damos cerrado antes de empezar, sin sorpresas.",
        ],
        [
          "¿La valoración me compromete a algo?",
          "No. El técnico visita, valora y te presentamos el proyecto. Si no te encaja, no pasa nada.",
        ],
        [
          "¿Algún servicio lleva cuota mensual?",
          "No. Ni las cámaras, ni las alarmas, ni el control de accesos llevan cuota mensual en Nimbus. Pagas el equipo una vez y es tuyo desde el primer día: es algo que nos diferencia de la competencia.",
        ],
        [
          "¿Instaláis vosotros o subcontratáis?",
          "Instalamos nosotros, con técnicos propios de la zona. Los mismos que te instalan son los que te atienden si algún día necesitas algo.",
        ],
        [
          "¿Puedo ver las cámaras desde el móvil?",
          "Sí. Tanto las cámaras como las alarmas se controlan desde el móvil, estés donde estés.",
        ],
        [
          "¿Qué pasa con la protección de datos?",
          "Nos encargamos de que la instalación cumpla la normativa: cartelería, conservación de imágenes y orientación de cámaras. Te lo dejamos en regla.",
        ],
      ],
    },
    services: {
      eyebrow: "En detalle",
      title: "Qué hacemos en cada servicio",
      text: "Somos multimarca: elegimos el equipo en función de lo que necesita cada instalación, no al revés.",
      items: [
        {
          id: "cctv",
          icon: "shield-check",
          title: "Videovigilancia CCTV",
          lead: "Cámaras para ver qué pasa en tu casa, local o nave, estés donde estés.",
          points: [
            "Grabación en la nube: no dependes de un disco que alguien pueda llevarse.",
            "Acceso desde el móvil. Según el equipo, verás la imagen en directo o capturas del momento en que salta la detección.",
            "Diseñamos la cobertura sobre el terreno para que no queden ángulos muertos.",
            "Sin cuotas mensuales: pagas la instalación una vez y el sistema es tuyo.",
            "Instalación cumpliendo la normativa de protección de datos: cartelería, orientación de cámaras y plazos de conservación.",
          ],
        },
        {
          id: "alarmas",
          icon: "smartphone",
          title: "Alarmas AJAX",
          lead: "Sistemas que controlas tú desde el móvil, con avisos inmediatos y sin cuotas mensuales.",
          points: [
            "Partimos de un pack base y lo adaptamos: cada espacio necesita un número distinto de detectores y una configuración propia.",
            "El técnico valora accesos, puntos débiles y cómo se usa el espacio antes de decidir qué instalar.",
            "Controlas el sistema desde el móvil y recibes avisos al instante si algo se dispara.",
            "Sin cuotas mensuales: el equipo es tuyo desde el primer día.",
          ],
        },
        {
          id: "accesos",
          icon: "users",
          title: "Control de accesos",
          lead: "Decide quién entra, por dónde y a qué horas, sin repartir copias de llaves.",
          badge: "Somos partners oficiales de iLOQ en la provincia de Girona",
          points: [
            "Trabajamos con iLOQ, del que somos partner oficial en la provincia de Girona.",
            "Llaves digitales: si alguien deja de tener acceso, se revoca sin cambiar la cerradura.",
            "Para comunidades, empresas, naves y espacios con varios usuarios.",
            "Sin cuotas mensuales: el sistema es tuyo desde el primer día.",
            "Registro de quién ha entrado y cuándo, si lo necesitas.",
          ],
        },
      ],
    },
    reviewsSection: {
      eyebrow: "Opiniones",
      title: "Lo que dicen nuestros clientes",
      subtitle:
        "Empresas y particulares que nos tienen cerca desde hace años. Estas son sus reseñas en Google, sin retocar.",
    },
    localService: {
      eyebrow: "Servicio cercano",
      title: "Cerca de ti cuando necesitas una respuesta",
      subtitle:
        "Nimbus no es solo una empresa que instala cámaras. Somos un equipo local, en Sils, que visita tu espacio y te ayuda a entender qué protección tiene sentido antes de proponerte nada.",
      text:
        "No queremos venderte el kit más caro ni el más barato. Queremos ver dónde están los puntos débiles, cómo se usa el espacio y qué te preocupa de verdad. A partir de ahí, diseñamos un proyecto que encaje con tu caso.",
      cards: [
        ["Atención humana", "Hablas con personas que visitan tu espacio, no con un comercial que vende el mismo kit a todo el mundo."],
        ["Conocimiento del territorio", "Trabajamos en la zona y conocemos los problemas reales de seguridad de casas, locales y naves de la comarca."],
        ["Te ayudamos a entender", "No tienes por qué saber qué cámara o qué alarma necesitas. El técnico te lo explica de forma clara y sin tecnicismos."],
        ["Seguimos después de instalar", "Nuestro trabajo no termina al montar los equipos. Si necesitas ajustes o tienes dudas, seguimos cerca."],
      ],
    },
    form: {
      eyebrow: "Valoración con técnico",
      finalText:
        "Gracias. Revisaremos qué quieres proteger y te contactaremos para concertar la visita del técnico.",
      noSalesTitle: "Sin rodeos comerciales",
      noSalesText:
        "Nos centramos en entender qué quieres proteger y qué instalación tiene sentido para tu espacio.",
      summaryLabels: { problem: "Qué quieres proteger", location: "Cómo es el espacio" },
      title: "¿Quieres que un técnico valore tu caso?",
      text: "Cuéntanos qué quieres proteger y dónde. Te llamamos, resolvemos dudas y, si tiene sentido, concertamos la visita del técnico. Sin compromiso.",
      step1Title: "¿Qué quieres proteger?",
      step2Title: "¿Cómo es el espacio?",
      locationTypes: [
        "Se vive o trabaja a diario",
        "Pasa temporadas vacío",
        "Tiene accesos exteriores o patio",
        "Zona aislada o poco transitada",
      ],
      step3Title: "¿Qué te preocupa más?",
      problems: [
        "Mi casa",
        "Mi negocio o local",
        "Una nave o almacén",
        "Una segunda residencia",
      ],
      locationLabel: "¿En qué población?",
      locationPlaceholder: "Por ejemplo: Sils, Vidreres, un polígono concreto...",
      usageOptions: [
        "Robos o intrusiones",
        "Vigilar a distancia desde el móvil",
        "Controlar quién entra y sale",
        "Todo un poco, necesito orientación",
      ],
      diagnosticPurpose:
        "Con esta información el técnico prepara la visita y te orienta mejor sobre qué protección tiene sentido para tu espacio.",
    },
  },
  ca: {
    meta: {
      title: "Seguretat per a casa teva i el teu negoci | Nimbus Telecom",
      description:
        "Càmeres, alarmes i control d'accessos amb projecte a mida. Un tècnic d'enginyeria valora el teu espai i dissenya la protecció que necessites.",
    },
    nav: { what: "Què protegim", how: "Com funciona", study: "Demanar valoració", faq: "Dubtes", contact: "Contacte", business: "Soc empresa" },
    primaryCta: "Demanar valoració",
    travelNote:
      "El desplaçament és gratuït fins a 20 km de les nostres oficines. A partir d'aquesta distància, el desplaçament té un cost addicional que t'indiquem abans de confirmar la visita.",
    hero: {
      eyebrow: "Seguretat a mida",
      title: "Cada espai es protegeix d'una manera diferent",
      subtitle:
        "No venem kits tancats. Un tècnic d'enginyeria visita casa teva o el teu negoci, valora l'espai i dissenya el projecte de protecció que de veritat necessites.",
      text: "Càmeres, alarmes i control d'accessos, instal·lats pel nostre propi equip i amb tota la paperassa en regla.",
      primaryCta: "Demanar valoració",
      secondaryCta: "Veure què protegim",
      cardItems: [
        ["Visita tècnica", "Un tècnic valora el teu espai sense compromís"],
        ["Projecte a mida", "Equips i instal·lació segons el que necessites"],
        ["Instal·lació pròpia", "Ho muntem nosaltres, sense subcontractes"],
      ],
      focusEyebrow: "Sense compromís",
      focusText: "La valoració no t'obliga a res: primer el projecte, després decideixes.",
    },
    protect: {
      eyebrow: "Què protegim",
      title: "Càmeres, alarmes i control d'accessos",
      text: "Tres maneres de protegir un espai que es poden combinar segons el cas. A la visita et diem què té sentit per al teu i què no.",
      items: [
        {
          icon: "shield-check",
          title: "Videovigilància CCTV",
          text: "Càmeres per veure què passa al teu local, nau o habitatge, en directe i amb gravació. Dissenyem la cobertura perquè no quedin angles morts.",
        },
        {
          icon: "smartphone",
          title: "Alarmes",
          text: "Sistemes d'alarma que controles des del mòbil, amb avisos immediats si alguna cosa es dispara. Sense quotes mensuals: l'equip és teu des del primer dia.",
        },
        {
          icon: "users",
          title: "Control d'accessos",
          text: "Decideix qui entra, per on i a quines hores: targetes, teclats o control des del mòbil per a negocis i comunitats.",
        },
      ],
      note: "Ni càmeres, ni alarmes, ni control d'accessos: cap servei de seguretat Nimbus porta quota mensual. Pagues la instal·lació un cop i l'equip és teu des del primer dia.",
      moreInfoCta: "Més informació",
    },
    how: {
      eyebrow: "Com funciona",
      title: "De la primera trucada a la instal·lació",
      text: "Sense preus inventats per telèfon: cada projecte es valora sobre el terreny.",
      steps: [
        ["Ens expliques què vols protegir", "Casa, negoci, local o nau: ens expliques el teu cas en dos minuts amb el formulari."],
        ["Un tècnic visita el teu espai", "Valora accessos, punts febles i quina protecció té sentit. Sense compromís."],
        ["Et presentem el projecte", "Equips, instal·lació i preu tancat, explicat perquè s'entengui."],
        ["Instal·lem nosaltres", "El nostre propi equip ho munta i ho deixa tot funcionant, amb la paperassa en regla."],
      ],
    },
    rgpd: {
      eyebrow: "Tot en regla",
      title: "La videovigilància té normes. Te les deixem resoltes.",
      text: "Instal·lar càmeres implica obligacions legals que gairebé ningú t'explica quan compres un kit per internet. Nosaltres ho deixem tot en regla des del primer dia.",
      checks: [
        "Cartelleria obligatòria de zona videovigilada",
        "Configuració dels terminis de conservació d'imatges",
        "Orientació de càmeres respectant espais de tercers",
        "Assessorament sobre el registre d'activitats de tractament",
      ],
    },
    faq: {
      eyebrow: "Dubtes freqüents",
      title: "El que ens pregunten abans de començar",
      items: [
        [
          "Quant costa una instal·lació?",
          "Depèn de l'espai i del que calgui protegir: no hi ha dos projectes iguals. Per això la valoració amb el tècnic és gratuïta fins a 20 km de les nostres oficines, i el preu de la instal·lació te'l donem tancat abans de començar, sense sorpreses.",
        ],
        [
          "La valoració em compromet a res?",
          "No. El tècnic visita, valora i et presentem el projecte. Si no t'encaixa, no passa res.",
        ],
        [
          "Algun servei porta quota mensual?",
          "No. Ni les càmeres, ni les alarmes, ni el control d'accessos porten quota mensual a Nimbus. Pagues l'equip un cop i és teu des del primer dia: és una cosa que ens diferencia de la competència.",
        ],
        [
          "Instal·leu vosaltres o subcontracteu?",
          "Instal·lem nosaltres, amb tècnics propis de la zona. Els mateixos que t'instal·len són els que t'atenen si algun dia necessites res.",
        ],
        [
          "Puc veure les càmeres des del mòbil?",
          "Sí. Tant les càmeres com les alarmes es controlen des del mòbil, siguis on siguis.",
        ],
        [
          "Què passa amb la protecció de dades?",
          "Ens encarreguem que la instal·lació compleixi la normativa: cartelleria, conservació d'imatges i orientació de càmeres. T'ho deixem en regla.",
        ],
      ],
    },
    reviewsSection: {
      eyebrow: "Opinions",
      title: "El que diuen els nostres clients",
      subtitle:
        "Empreses i particulars que ens tenen a prop des de fa anys. Aquestes són les seves ressenyes a Google, sense retocar.",
    },
    localService: {
      eyebrow: "Servei proper",
      title: "A prop teu quan necessites una resposta",
      subtitle:
        "Nimbus no és només una empresa que instal·la càmeres. Som un equip local, a Sils, que visita el teu espai i t'ajuda a entendre quina protecció té sentit abans de proposar-te res.",
      text:
        "No volem vendre't el kit més car ni el més barat. Volem veure on són els punts febles, com s'utilitza l'espai i què et preocupa de veritat. A partir d'aquí, dissenyem un projecte que encaixi amb el teu cas.",
      cards: [
        ["Atenció humana", "Parles amb persones que visiten el teu espai, no amb un comercial que ven el mateix kit a tothom."],
        ["Coneixement del territori", "Treballem a la zona i coneixem els problemes reals de seguretat de cases, locals i naus de la comarca."],
        ["T'ajudem a entendre", "No cal que sàpigues quina càmera o quina alarma necessites. El tècnic t'ho explica clar i sense tecnicismes."],
        ["Seguim després d'instal·lar", "La nostra feina no acaba en muntar els equips. Si necessites ajustos o tens dubtes, seguim a prop."],
      ],
    },
    services: {
      eyebrow: "En detall",
      title: "Què fem a cada servei",
      text: "Som multimarca: triem l'equip en funció del que necessita cada instal·lació, no a l'inrevés.",
      items: [
        {
          id: "cctv",
          icon: "shield-check",
          title: "Videovigilància CCTV",
          lead: "Càmeres per veure què passa a casa teva, al local o a la nau, siguis on siguis.",
          points: [
            "Gravació al núvol: no depens d'un disc que algú es pugui endur.",
            "Accés des del mòbil. Segons l'equip, veuràs la imatge en directe o captures del moment en què salta la detecció.",
            "Dissenyem la cobertura sobre el terreny perquè no quedin angles morts.",
            "Sense quotes mensuals: pagues la instal·lació un cop i el sistema és teu.",
            "Instal·lació complint la normativa de protecció de dades: cartelleria, orientació de càmeres i terminis de conservació.",
          ],
        },
        {
          id: "alarmes",
          icon: "smartphone",
          title: "Alarmes AJAX",
          lead: "Sistemes que controles tu des del mòbil, amb avisos immediats i sense quotes mensuals.",
          points: [
            "Partim d'un pack base i l'adaptem: cada espai necessita un nombre diferent de detectors i una configuració pròpia.",
            "El tècnic valora accessos, punts febles i com s'utilitza l'espai abans de decidir què instal·lar.",
            "Controles el sistema des del mòbil i reps avisos a l'instant si alguna cosa es dispara.",
            "Sense quotes mensuals: l'equip és teu des del primer dia.",
          ],
        },
        {
          id: "accessos",
          icon: "users",
          title: "Control d'accessos",
          lead: "Decideix qui entra, per on i a quines hores, sense repartir còpies de claus.",
          badge: "Som partners oficials d'iLOQ a la província de Girona",
          points: [
            "Treballem amb iLOQ, del qual som partner oficial a la província de Girona.",
            "Claus digitals: si algú deixa de tenir accés, es revoca sense canviar el pany.",
            "Per a comunitats, empreses, naus i espais amb diversos usuaris.",
            "Sense quotes mensuals: el sistema és teu des del primer dia.",
            "Registre de qui ha entrat i quan, si ho necessites.",
          ],
        },
      ],
    },
    form: {
      eyebrow: "Valoració amb tècnic",
      finalText:
        "Gràcies. Revisarem què vols protegir i et contactarem per concertar la visita del tècnic.",
      noSalesTitle: "Sense rodejos comercials",
      noSalesText:
        "Ens centrem a entendre què vols protegir i quina instal·lació té sentit per al teu espai.",
      summaryLabels: { problem: "Què vols protegir", location: "Com és l'espai" },
      title: "Vols que un tècnic valori el teu cas?",
      text: "Explica'ns què vols protegir i on. Et truquem, resolem dubtes i, si té sentit, concertem la visita del tècnic. Sense compromís.",
      step1Title: "Què vols protegir?",
      step2Title: "Com és l'espai?",
      locationTypes: [
        "S'hi viu o treballa cada dia",
        "Passa temporades buit",
        "Té accessos exteriors o pati",
        "Zona aïllada o poc transitada",
      ],
      step3Title: "Què et preocupa més?",
      problems: [
        "Casa meva",
        "El meu negoci o local",
        "Una nau o magatzem",
        "Una segona residència",
      ],
      locationLabel: "A quina població?",
      locationPlaceholder: "Per exemple: Sils, Vidreres, un polígon concret...",
      usageOptions: [
        "Robatoris o intrusions",
        "Vigilar a distància des del mòbil",
        "Controlar qui entra i surt",
        "Una mica de tot, necessito orientació",
      ],
      diagnosticPurpose:
        "Amb aquesta informació el tècnic prepara la visita i t'orienta millor sobre quina protecció té sentit per al teu espai.",
    },
  },
  en: {
    meta: {
      title: "Security for your home and business | Nimbus Telecom",
      description:
        "CCTV, alarms and access control with tailor-made projects. An engineering technician assesses your space and designs the protection you need.",
    },
    nav: { what: "What we protect", how: "How it works", study: "Request assessment", faq: "FAQ", contact: "Contact", business: "For business" },
    primaryCta: "Request assessment",
    travelNote:
      "Travel is free within 20 km of our offices. Beyond that distance, travel involves an additional cost, which we'll confirm before booking the visit.",
    hero: {
      eyebrow: "Tailor-made security",
      title: "Every space needs its own kind of protection",
      subtitle:
        "We don't sell fixed kits. An engineering technician visits your home or business, assesses the space and designs the protection project you actually need.",
      text: "CCTV, alarms and access control, installed by our own team and with all the paperwork in order.",
      primaryCta: "Request assessment",
      secondaryCta: "See what we protect",
      cardItems: [
        ["Technical visit", "A technician assesses your space with no obligation"],
        ["Tailor-made project", "Equipment and installation based on what you need"],
        ["Own installers", "We install it ourselves, no subcontractors"],
      ],
      focusEyebrow: "No obligation",
      focusText: "The assessment doesn't commit you to anything: first the project, then you decide.",
    },
    protect: {
      eyebrow: "What we protect",
      title: "CCTV, alarms and access control",
      text: "Three ways to protect a space, which can be combined depending on the case. During the visit we tell you what makes sense for yours and what doesn't.",
      items: [
        {
          icon: "shield-check",
          title: "CCTV surveillance",
          text: "Cameras to see what's happening at your premises, warehouse or home, live and recorded. We design the coverage so there are no blind spots.",
        },
        {
          icon: "smartphone",
          title: "Alarms",
          text: "Alarm systems you control from your phone, with instant alerts if something goes off. No monthly fees: the equipment is yours from day one.",
        },
        {
          icon: "users",
          title: "Access control",
          text: "Decide who enters, where and at what times: cards, keypads or phone-based control for businesses and residents' associations.",
        },
      ],
      note: "No cameras, no alarms, no access control: none of our security services come with a monthly fee. You pay for the installation once and the equipment is yours from day one.",
      moreInfoCta: "More information",
    },
    how: {
      eyebrow: "How it works",
      title: "From the first call to the installation",
      text: "No made-up prices over the phone: every project is assessed on site.",
      steps: [
        ["Tell us what you want to protect", "Home, business, premises or warehouse: explain your case in two minutes with the form."],
        ["A technician visits your space", "They assess entrances, weak points and what protection makes sense. No obligation."],
        ["We present the project", "Equipment, installation and a fixed price, explained clearly."],
        ["We install it ourselves", "Our own team sets everything up and leaves it working, with the paperwork in order."],
      ],
    },
    rgpd: {
      eyebrow: "Everything in order",
      title: "Video surveillance has rules. We sort them out for you.",
      text: "Installing cameras involves legal obligations that almost nobody mentions when you buy a kit online. We leave everything compliant from day one.",
      checks: [
        "Mandatory video surveillance signage",
        "Image retention periods properly configured",
        "Camera angles respecting third-party spaces",
        "Guidance on the record of processing activities",
      ],
    },
    faq: {
      eyebrow: "Frequently asked",
      title: "What people ask us before starting",
      items: [
        [
          "How much does an installation cost?",
          "It depends on the space and what needs protecting: no two projects are the same. That's why the assessment with the technician is free within 20 km of our offices, and we give you a fixed installation price before starting, with no surprises.",
        ],
        [
          "Does the assessment commit me to anything?",
          "No. The technician visits, assesses, and we present the project. If it doesn't work for you, no problem.",
        ],
        [
          "Does any service have monthly fees?",
          "No. Cameras, alarms and access control never have monthly fees at Nimbus. You pay for the equipment once and it's yours from day one: it's one of the things that sets us apart from the competition.",
        ],
        [
          "Do you install it yourselves or subcontract?",
          "We install it ourselves, with our own local technicians. The same people who install it are the ones who help you if you ever need anything.",
        ],
        [
          "Can I watch the cameras from my phone?",
          "Yes. Both cameras and alarms are controlled from your phone, wherever you are.",
        ],
        [
          "What about data protection?",
          "We make sure the installation complies with the regulations: signage, image retention and camera angles. We leave it all in order.",
        ],
      ],
    },
    services: {
      eyebrow: "In detail",
      title: "What we do in each service",
      text: "We work with multiple brands: we choose the equipment based on what each installation needs, not the other way round.",
      items: [
        {
          id: "cctv",
          icon: "shield-check",
          title: "CCTV surveillance",
          lead: "Cameras to see what's happening at your home, premises or warehouse, wherever you are.",
          points: [
            "Cloud recording: you don't depend on a hard drive someone could take away.",
            "Access from your phone. Depending on the equipment, you'll see a live image or snapshots from the moment detection triggers.",
            "We design the coverage on site so there are no blind spots.",
            "No monthly fees: you pay for the installation once and the system is yours.",
            "Installation compliant with data protection rules: signage, camera angles and retention periods.",
          ],
        },
        {
          id: "alarms",
          icon: "smartphone",
          title: "AJAX alarms",
          lead: "Systems you control from your phone, with instant alerts and no monthly fees.",
          points: [
            "We start from a base pack and adapt it: every space needs a different number of detectors and its own setup.",
            "The technician assesses entrances, weak points and how the space is used before deciding what to install.",
            "You control the system from your phone and get instant alerts if something goes off.",
            "No monthly fees: the equipment is yours from day one.",
          ],
        },
        {
          id: "access",
          icon: "users",
          title: "Access control",
          lead: "Decide who comes in, where and at what times, without handing out copies of keys.",
          badge: "We are official iLOQ partners in the province of Girona",
          points: [
            "We work with iLOQ, and we are their official partner in the province of Girona.",
            "Digital keys: if someone loses access, it's revoked without changing the lock.",
            "For residents' associations, businesses, warehouses and spaces with several users.",
            "No monthly fees: the system is yours from day one.",
            "A record of who entered and when, if you need it.",
          ],
        },
      ],
    },
    reviewsSection: {
      eyebrow: "Reviews",
      title: "What our customers say",
      subtitle:
        "Businesses and individuals who have had us nearby for years. These are their Google reviews, unedited.",
    },
    localService: {
      eyebrow: "Nearby service",
      title: "Close to you when you need an answer",
      subtitle:
        "Nimbus is not just a company that installs cameras. We are a local team in Sils that visits your space and helps you understand what protection makes sense before proposing anything.",
      text:
        "We don't want to sell you the most expensive kit, or the cheapest. We want to see where the weak points are, how the space is used and what really worries you. From there, we design a project that fits your case.",
      cards: [
        ["Human attention", "You talk to people who visit your space, not a salesperson selling the same kit to everyone."],
        ["Local knowledge", "We work in the area and know the real security issues of homes, premises and warehouses here."],
        ["We help you understand", "You don't need to know which camera or alarm you need. The technician explains it clearly, without jargon."],
        ["We stay after installing", "Our work doesn't end when the equipment is up. If you need adjustments or have questions, we stay close."],
      ],
    },
    form: {
      eyebrow: "Technician assessment",
      finalText:
        "Thank you. We'll review what you want to protect and contact you to arrange the technician's visit.",
      noSalesTitle: "No sales talk",
      noSalesText:
        "We focus on understanding what you want to protect and what installation makes sense for your space.",
      summaryLabels: { problem: "What you want to protect", location: "What the space is like" },
      title: "Want a technician to assess your case?",
      text: "Tell us what you want to protect and where. We'll call you, answer your questions and, if it makes sense, arrange the technician's visit. No obligation.",
      step1Title: "What do you want to protect?",
      step2Title: "What is the space like?",
      locationTypes: [
        "Lived or worked in daily",
        "Empty for long periods",
        "Has outdoor access or a yard",
        "Isolated or low-traffic area",
      ],
      step3Title: "What worries you most?",
      problems: [
        "My home",
        "My business or premises",
        "A warehouse",
        "A second home",
      ],
      locationLabel: "In which town?",
      locationPlaceholder: "For example: Sils, Vidreres, a specific industrial estate...",
      usageOptions: [
        "Break-ins or intrusions",
        "Watching remotely from my phone",
        "Controlling who comes in and out",
        "A bit of everything, I need guidance",
      ],
      diagnosticPurpose:
        "With this information the technician prepares the visit and can better advise you on what protection makes sense for your space.",
    },
  },
};
