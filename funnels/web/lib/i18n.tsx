"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "es" | "ca" | "en";

export type TestimonialItem = { text: string; name: string; rating?: number; date?: string };

export const DEFAULT_LOCALE: Locale = "ca";
export const LOCALE_STORAGE_KEY = "nimbus-locale";

export const LOCALES: Array<{ code: Locale; label: string }> = [
  { code: "ca", label: "Català" },
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];

export const translations = {
  es: {
    language: { ariaLabel: "Seleccionar idioma" },
    nav: {
      solution: "Solución",
      plans: "Tarifas",
      study: "Estudiar mi caso",
      reviews: "Opiniones",
      faq: "FAQ",
      contact: "Contacto",
      business: "Soy empresa",
      clientArea: "Área Clientes",
      primaryCta: "Revisar cobertura",
      aria: "Navegación principal",
    },
    hero: {
      eyebrow: "Líneas móviles con triple cobertura",
      title: "¿Tienes problemas de cobertura móvil?",
      subtitle:
        "No siempre es culpa de tu teléfono ni de tu tarifa. A veces el problema es que tu operador trabaja con una sola red y esa red no funciona bien donde tú vives, trabajas o te mueves.",
      text:
        "En Nimbus trabajamos con líneas móviles con triple cobertura para darte más opciones reales de conexión y ayudarte a encontrar una solución que encaje mejor con tu caso.",
      studyCta: "Quiero que estudiéis mi caso",
      plansCta: "Ver opciones móviles",
      cardItems: [
        ["Casa", "Poca señal en interiores"],
        ["Trabajo", "Llamadas que se cortan"],
        ["Movimiento", "Datos lentos por zonas"],
      ],
      focusEyebrow: "Enfoque Nimbus",
      focusText: "Revisamos dónde te falla antes de orientarte.",
    },
    problem: {
      eyebrow: "El problema",
      title: "Cambiar de tarifa no siempre arregla la cobertura",
      text:
        "Si el problema está en la red que usa tu operador, cambiar a otra tarifa de la misma red puede dejarte igual. Por eso antes de venderte una línea, nos interesa entender dónde te falla, cuándo te falla y cómo usas el móvil.",
      bullets: [
        "¿Te quedas sin cobertura en casa?",
        "¿Se cortan las llamadas?",
        "¿Los datos van lentos en algunas zonas?",
        "¿Te mueves mucho y la cobertura cambia según el lugar?",
        "¿Tu operador actual no te da una solución clara?",
      ],
    },
    solution: {
      eyebrow: "Solución Nimbus",
      title: "La diferencia: más de una red para buscar mejor cobertura",
      text:
        "Muchas compañías trabajan con una única red móvil. En Nimbus trabajamos con líneas móviles con triple cobertura: Movistar, Orange y MásMóvil/Yoigo. Esto nos permite orientarte mejor según tu caso y buscar una opción con más posibilidades reales de funcionar bien donde la necesitas.",
      imageCaption: "Más opciones reales de conexión",
      checks: [
        "Triple cobertura",
        "Llamadas ilimitadas",
        "5G si tu terminal es compatible",
        "VoLTE si tu terminal es compatible",
        "Llamadas WiFi si tu terminal es compatible",
        "Roaming",
        "eSIM disponible",
        "Sin venderte más de lo que necesitas",
      ],
    },
    video: {
      eyebrow: "Vídeo explicativo",
      title: "Una SIM, más opciones de cobertura",
      subtitle:
        "La cobertura móvil no es magia ni intuición. Depende de las redes disponibles, de la zona, del interior de los edificios, del terminal y de cómo te mueves.",
      paragraphs: [
        "En muchas compañías, tu línea móvil trabaja sobre una sola red. Si esa red no funciona bien donde tú estás, puedes seguir teniendo el mismo problema aunque cambies de tarifa.",
        "En Nimbus trabajamos con líneas móviles con triple cobertura: Movistar, Orange y MásMóvil/Yoigo. Esto nos permite ampliar las opciones disponibles y orientarte mejor según tu caso.",
      ],
      aria: "Vídeo explicativo sobre triple cobertura",
      play: "Reproducir vídeo",
      pending: "Vídeo pendiente",
      pendingText: "Vídeo explicativo pendiente de añadir.",
      message: "El vídeo estará disponible próximamente.",
      below:
        "Pronto añadiremos aquí una explicación breve para que puedas ver, en menos de un minuto, por qué una línea con triple cobertura puede ayudarte si sueles quedarte sin señal o tienes llamadas que se cortan.",
      studyCta: "Quiero que estudiéis mi caso",
      plansCta: "Ver tarifas móviles",
    },
    localService: {
      eyebrow: "Servicio cercano",
      title: "Cerca de ti cuando necesitas una respuesta",
      subtitle:
        "Nimbus no es solo una línea móvil. Somos un equipo local, en Sils, que escucha tu caso y te ayuda a entender qué está pasando antes de recomendarte una solución.",
      text:
        "Si tienes problemas de cobertura, no queremos venderte más datos ni una tarifa cualquiera. Queremos saber dónde te falla, cuándo te falla y cómo te afecta. A partir de ahí, te orientamos con criterio y buscamos la opción que tenga más sentido para tu día a día.",
      cards: [
        ["Atención humana", "Hablas con personas que escuchan tu problema, no con un proceso automático pensado solo para venderte otra tarifa."],
        ["Conocimiento del territorio", "Trabajamos en la zona y conocemos muchos de los problemas reales de cobertura, instalación y uso que se encuentran hogares y negocios."],
        ["Te ayudamos a entender", "No tienes por qué saber si el problema es de la red, del móvil, de la configuración o de la tarifa. Te lo explicamos de forma clara."],
        ["Seguimos después de contratar", "Nuestro trabajo no termina cuando activas la línea. Si necesitas ayuda, seguimos cerca para revisar, configurar y resolver."],
      ],
      closing:
        "Por eso hablamos de estudiar tu caso: porque la mejor tarifa no siempre es la más grande ni la más barata, sino la que encaja contigo.",
      studyCta: "Quiero que estudiéis mi caso",
      plansCta: "Ver tarifas móviles",
    },
    featureCards: [
      ["Sin permanencia", "Opciones móviles pensadas para contratar sin atarte más de lo necesario."],
      ["Atención cercana", "Teléfono, WhatsApp y oficina física en Sils para revisar dudas reales."],
      ["Tecnología útil", "5G, VoLTE, llamadas WiFi y eSIM cuando tu terminal y la línea lo permiten."],
    ],
    plans: {
      eyebrow: "Opciones móviles",
      title: "Opciones móviles orientativas",
      text:
        "Puedes ver nuestras opciones móviles y contratar directamente. Si tienes un problema concreto de cobertura, también puedes pedirnos que estudiemos tu caso antes de recomendarte una opción.",
      callsBadge: "Llamadas",
      cta: "Solicitar",
      scrollLeft: "Ver tarifas anteriores",
      scrollRight: "Ver más tarifas",
      carouselHint: "Desliza o usa las flechas para ver más tarifas",
      promoBadge: "Para nuevas contrataciones hasta el 30/09/2026",
      promoNote:
        "Tarifas JUNTS ESTIU. Promo de por vida mientras se mantenga la tarifa. No acumulable con otras promociones.",
      description: (data: string) =>
        `Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye ${data} de datos.`,
      features: [
        "Precio mensual",
        "Sin permanencia",
        "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
      ],
    },
    faq: {
      eyebrow: "Dudas habituales",
      title: "Dudas habituales antes de cambiar de línea móvil",
      subtitle:
        "Haz clic en una duda y el asistente Nimbus se abrirá para ayudarte con esa pregunta.",
      ctaText: "¿Sigues teniendo dudas sobre tu cobertura?",
      studyCta: "Quiero que estudiéis mi caso",
      plansCta: "Ver tarifas móviles",
      items: [
        ["¿Me garantizáis que siempre tendré cobertura?", "No. Ninguna compañía puede garantizar cobertura perfecta en todos los lugares. Lo que sí hacemos es darte más opciones reales trabajando con triple cobertura y revisando tu caso antes de recomendarte una línea."],
        ["¿Qué significa triple cobertura?", "Significa que trabajamos con líneas móviles que pueden operar sobre varias redes disponibles, como Movistar, Orange y MásMóvil/Yoigo. Eso nos permite tener más margen para buscar una opción que funcione mejor según dónde uses el móvil."],
        ["¿Tengo que cambiar de número?", "No necesariamente. Podemos ayudarte a conservar tu número actual mediante portabilidad."],
        ["¿Tiene permanencia?", "No. Las tarifas móviles indicadas son sin permanencia."],
        ["¿Por qué no contratar simplemente la tarifa más barata?", "Porque si tienes problemas de cobertura, el precio no es lo único importante. Conviene revisar dónde te falla, qué red usas ahora y cómo utilizas el móvil. La mejor tarifa no siempre es la más grande ni la más barata, sino la que encaja con tu caso."],
        ["¿El 5G funciona siempre?", "No siempre. El 5G depende de la cobertura disponible en la zona y de que tu terminal sea compatible."],
        ["¿Puedo usar llamadas WiFi o VoLTE?", "Sí, siempre que tu terminal sea compatible, el servicio esté disponible y esté correctamente configurado."],
        ["¿Me podéis ayudar si no sé configurar el móvil?", "Sí. Parte del valor de Nimbus es ayudarte a entender y configurar el servicio para que funcione como toca."],
        ["¿Qué pasa si después de contratar sigo teniendo problemas?", "Revisaremos el caso contigo. La cobertura puede depender de la zona, del interior del edificio, del terminal y de la red disponible. Nuestro objetivo es no dejarte solo después de activar la línea."],
        ["¿Puedo contratar directamente sin pedir estudio de cobertura?", "Sí. Puedes solicitar una tarifa directamente desde esta página. El estudio de cobertura está pensado para personas que ya tienen problemas o dudas y quieren una recomendación más ajustada."],
      ],
    },
    testimonials: {
      eyebrow: "Opiniones",
      title: "Clientes que querían dejar de pelearse con la cobertura",
      subtitle:
        "Cuando alguien llega a Nimbus con un problema de cobertura, muchas veces no busca solo una tarifa. Busca que alguien escuche, entienda qué está pasando y le recomiende con criterio.",
      ctaText: "¿Tienes un problema parecido?",
      studyCta: "Quiero que estudiéis mi caso",
      plansCta: "Ver tarifas móviles",
      sourceLabel: "Reseña de Google",
      prevAria: "Opinión anterior",
      nextAria: "Opinión siguiente",
      readMore: "Leer más",
      readLess: "Leer menos",
      items: [
        {
          text: "Molt bon tracte i molt atents!",
          name: "Loudes Alsina",
          rating: 5,
          date: "2024-10-30",
        },
        {
          text: "Muy buen trato al cliente, eficaces, rapidos y todo a muy buen precio. Nada mas que pedir",
          name: "jordi pla",
          rating: 5,
          date: "2024-01-04",
        },
        {
          text: "Ahora más cerca...",
          name: "Carmen Graciela Signetti Vazquez",
          rating: 5,
          date: "2023-09-09",
        },
        {
          text: "Excelente servicio, tanto pre-evento como durante y post. El sistema funcionó perfectamente y la atención, excepcional. Muchas gracias.",
          name: "Mireia Cano Díaz",
          rating: 5,
          date: "2023-05-19",
        },
        {
          text: "Són ràpids en donar solucions i també en dur-les a terme.",
          name: "Eva Aluart",
          rating: 5,
          date: "2022-12-14",
        },
        {
          text: "D'ençà que vam començar a treballar amb Nimbus ens han aportat bones solucions i ens han ajudat a optimitzar costos, tenen amb un servei atent i personalitzat.",
          name: "Ginesta Ginesta",
          rating: 4,
          date: "2022-11-11",
        },
        {
          text: "Una excelente conexión, atención al cliente buenísimo calidad precio inmejorable",
          name: "Cristina Vázquez Jimeno",
          rating: 5,
          date: "2022-11-01",
        },
        {
          text: "Después de un año y medio intentando que ADAMO instalara la fibra en mi domicilio de Breda, sin resultado, contacté con NIMBUS y se hicieron cargo de la instalación. El trabajo no era sencillo, pero lo hicieron de forma impecable.",
          name: "Tomas Gs",
          rating: 5,
          date: "2022-10-18",
        },
        {
          text: "Gran servicio y atención al cliente. Con las grandes compañías telefónicas cuesta mucho que te atiendan cuando tienes un problema y con ellos esto no ocurre.",
          name: "Rosa Girbent i Costey",
          rating: 5,
        },
        {
          text: "Buena cobertura.",
          name: "Santiago Canton Membrado",
          rating: 5,
        },
        {
          text: "Trato muy cercano y se preocupan mucho por buscar la mejor oferta y propuesta según tus necesidades.",
          name: "Saül Segura",
          rating: 5,
        },
        {
          text: "Operador cercano, rápido y efectivo. Atención en catalán sin esperas.",
          name: "Dimas SC",
          rating: 5,
        },
        {
          text: "NIMBUS ha sido el único servicio que nos ha instalado fibra óptica en nuestro domicilio. De no ser por ellos, las oligarquías seguirían ignorando nuestras peticiones. Gracias, ahora podemos trabajar decentemente.",
          name: "Sergi",
          rating: 5,
        },
        {
          text: "Son el mejor operador de telefonía, internet y servicios de telecomunicaciones. Muy profesionales y proactivos asesorando al cliente, promoviendo la mejor opción y a buen precio. Su servicio tecnico y atención al cliente son excelentes. Recomendable 100%.",
          name: "PUJOLAR SERVICE",
          rating: 5,
        },
        {
          text: "Nos han montado fibra cuando nadie más le interesaba, buen servicio y buen precio km0 sin anuncios ni promos ni chorradas. Perfecto",
          name: "Ferran Guri",
          rating: 5,
        },
        {
          text: "Siempre están ahí por nosotros. Muy buenos profesionales, atentos, rápidos, y resolutivos",
          name: "Mante Auselle",
          rating: 5,
        },
        {
          text: "Nos dieron solución al problema que teníamos. de momento estamos muy contentos!",
          name: "TERRAFUST",
          rating: 5,
        },
        {
          text: "Muy amables y eficientes con su trabajo. Rápida gestión y comunicación con el cliente.",
          name: "Laura",
          rating: 5,
        },
      ] as TestimonialItem[],
    },
    modal: {
      title: "¿Cómo prefieres contratar?",
      generalTitle: "Habla con nosotros",
      generalText:
        "Déjanos tus datos y te contactamos por el canal que prefieras. Sin compromiso y sin insistir.",
      message: "¿En qué te podemos ayudar?",
      text: "Te ayudamos a cerrar la contratación de esta línea móvil y resolver cualquier duda antes de activar el servicio.",
      choices: { phone: "Que me llaméis", whatsapp: "Prefiero WhatsApp", office: "Quiero acercarme a la oficina" },
      officeTitle: "Puedes venir a nuestra oficina en C/Major, 42 - Sils.",
      officePhone: "Teléfono: 972 85 01 55",
      officeWhatsapp: "WhatsApp: 622 81 26 04",
      officeText: "Te atenderemos allí directamente para resolver dudas y avanzar con la contratación.",
      officeMapTitle: "Mapa de Nimbus Telecom en Google Maps",
      openMaps: "Abrir en Google Maps",
      whatsappIntro: "Déjanos tus datos para hablarte nosotros.",
      name: "Nombre",
      phone: "Teléfono",
      emailOptional: "Email opcional",
      optional: "(opcional)",
      openWhatsapp: "Abrir WhatsApp",
      talkWhatsapp: "Hablar por WhatsApp",
      submit: "Enviar solicitud",
      submitting: "Enviando...",
      sentTitle: "Solicitud recibida",
      sentText: "Gracias. Revisaremos tu solicitud de contratación y te contactaremos para avanzar con la opción elegida.",
      close: "Cerrar",
      errors: {
        name: "Indica un nombre válido de al menos 2 letras.",
        phone: "Indica un teléfono español válido de 9 números.",
        consent: "Necesitamos tu aceptación para contactar contigo.",
        submit: "No hemos podido enviar la solicitud.",
      },
    },
    form: {
      eyebrow: "Estudio de cobertura",
      title: "¿Quieres que estudiemos tu caso de cobertura?",
      text:
        "Si tienes problemas de cobertura, cuéntanos dónde te pasa y cómo usas el móvil. Revisaremos tu caso y te contactaremos con una recomendación personalizada.",
      noSalesTitle: "Sin rodeos comerciales",
      noSalesText: "Nos centramos en entender dónde falla la cobertura y qué opciones tienen más sentido.",
      completed: "Completado",
      stepLabel: "Paso",
      of: "de",
      step1Title: "¿Qué problema de cobertura tienes?",
      coverageProblems: [
        "No tengo cobertura en casa",
        "No tengo cobertura en el trabajo",
        "Pierdo cobertura cuando me muevo",
        "Las llamadas se cortan",
        "Los datos van lentos",
        "No estoy seguro, solo sé que me falla",
      ],
      step2Title: "¿Dónde te pasa más?",
      locationTypes: [
        "En una localidad concreta",
        "En varias zonas",
        "En carretera o desplazándome",
        "En interiores, dentro de casa o del trabajo",
        "No lo tengo claro",
      ],
      locationLabel: "Localidad, zona o lugares donde te falla",
      locationPlaceholder: "Ejemplo: Sils, Vidreres, carretera hacia Girona, dentro de casa, etc.",
      step3Title: "¿Cómo usas normalmente el móvil?",
      usageOptions: [
        "Estoy casi siempre en casa o en el trabajo",
        "Me muevo mucho durante el día",
        "Viajo por varias zonas de Girona o Barcelona",
        "Uso mucho llamadas",
        "Uso mucho datos móviles",
        "Un poco de todo",
      ],
      step4Title: "Ya tenemos una primera idea de tu caso",
      step4Text:
        "Con lo que nos has contado podemos revisar mejor qué puede estar pasando y qué opción móvil puede tener más sentido para ti.",
      step4Secondary: "Para enviarte el resultado del estudio o comentarlo contigo, necesitamos tus datos de contacto.",
      step5Title: "¿Dónde te enviamos el resultado del estudio?",
      step5Text:
        "Te contactaremos solo para revisar tu caso de cobertura y orientarte sobre la opción que mejor encaje contigo.",
      emailHelp: "Te enviaremos el reporte del estudio a este email.",
      contactLabels: { phone: "Por teléfono", whatsapp: "Por WhatsApp" },
      fields: {
        name: "Nombre",
        phone: "Teléfono",
        phoneOptional: "Teléfono opcional",
        email: "Email",
        emailOptional: "Email opcional",
        currentOperator: "Operador actual opcional",
        additionalComment: "Comentario adicional opcional",
      },
      back: "Atrás",
      continue: "Continuar",
      requestStudy: "Quiero mi estudio de cobertura",
      submit: "Enviar solicitud de estudio",
      submitting: "Enviando...",
      finalTitle: "Solicitud recibida",
      finalText:
        "Gracias. Revisaremos tu caso de cobertura y te enviaremos una propuesta personalizada según lo que nos has contado.",
      finalResponseTime:
        "Te responderemos a la brevedad dentro del siguiente horario de oficina disponible.",
      finalDiagnosticPurpose:
        "El diagnóstico nos ayuda a entender dónde te falla la cobertura y a orientarte sobre qué tarifa móvil puede encajar mejor con tu caso antes de contratar.",
      summary: {
        problem: "Problema principal",
        location: "Dónde te pasa más",
        zone: "Zona indicada",
        notProvided: "No indicada",
        preferredContact: "Preferencia de contacto",
        currentOperator: "Operador actual",
      },
      another: "Hacer otra consulta",
      crossSell: {
        mobile: "Ver opciones móviles",
        internet: "Ver opciones de internet",
        business: "Ver opciones para empresas",
        security: "Ver opciones de seguridad",
      },
      errors: {
        coverageProblem: "Selecciona el problema principal de cobertura.",
        location: "Selecciona dónde te pasa más.",
        locationText: "Indica la población o zona donde te pasa.",
        usage: "Selecciona al menos una forma de uso.",
        name: "Indica un nombre válido de al menos 2 letras.",
        phone: "Indica un teléfono español válido de 9 números.",
        email: "Indica un email válido para enviarte el reporte.",
        consent: "Necesitamos tu aceptación para contactar contigo.",
        submit: "No hemos podido enviar la solicitud.",
      },
    },
    legal: {
      before: "Acepto que Nimbus Telecom trate mis datos para contactar conmigo sobre mi solicitud, de acuerdo con la",
      privacy: "Política de privacidad",
      middle: "y el",
      notice: "Aviso legal",
    },
    footer: {
      claim: "Partner tecnológico local para hogares y negocios.",
      contact: "Contacto",
      office: "Oficina",
      socialLegal: "Redes y legal",
      legalLinks: ["Aviso legal", "Política de privacidad", "Política de cookies", "Declaración de accesibilidad"],
      hours: "Lunes a viernes, de 9:00 a 17:00",
      commercialHours: "Atención comercial preferente de 09:00 a 18:00",
      rights: "Todos los derechos reservados.",
      from: "Atención desde Sils",
      legalAria: "Enlaces legales",
      socialAria: "Redes sociales",
      docsAria: "Documentación y tarifas",
      docsLinks: [
        "Tarifas telefonía fija",
        "Tarifas números especiales",
        "Tarifas internacionales",
        "Condiciones de Roaming",
        "Derecho de desistimiento",
        "Códigos cortos",
      ],
      officialLinksPrefix: "Contacto, ubicación, horarios y redes sociales",
      officialLinksCta: "Ver enlaces oficiales",
    },
    floating: {
      openAssistant: "Abrir asistente Nimbus",
      assistantTitle: "Asistente Nimbus",
      assistantEyebrow: "IA",
      assistantText:
        "Nuestro asistente puede ayudarte con dudas rápidas sobre cobertura móvil, tarifas y cómo funciona el estudio de cobertura.",
      assistantPending:
        "El asistente IA estará disponible próximamente. Mientras tanto, puedes usar WhatsApp o solicitar un estudio de cobertura.",
      selectedQuestion: "Pregunta seleccionada",
      study: "Pedir estudio de cobertura",
      whatsapp: "Escribir por WhatsApp",
      close: "Cerrar",
      closeAria: "Cerrar asistente Nimbus",
      whatsappAria: "Escribir a Nimbus por WhatsApp",
    },
    cookies: {
      eyebrow: "Cookies",
      text:
        "Utilizamos cookies propias y de terceros para mejorar la experiencia y analizar el uso del sitio. Al navegar por esta web aceptas su uso. Puedes consultar más información en la",
      cookiesPolicy: "Política de cookies",
      privacyPolicy: "Política de privacidad",
      legalNotice: "Aviso legal",
      and: "y el",
      accept: "Aceptar",
    },
  },
  ca: {
    language: { ariaLabel: "Seleccionar idioma" },
    nav: {
      solution: "Solució",
      plans: "Tarifes",
      study: "Estudi de cobertura",
      reviews: "Opinions",
      faq: "FAQ",
      contact: "Contacte",
      business: "Soc empresa",
      clientArea: "Àrea Clients",
      primaryCta: "Revisar cobertura",
      aria: "Navegació principal",
    },
    hero: {
      eyebrow: "Línies mòbils amb triple cobertura",
      title: "Tens problemes de cobertura mòbil?",
      subtitle:
        "No sempre és culpa del teu telèfon ni de la teva tarifa. De vegades el problema és que el teu operador treballa amb una sola xarxa i aquesta xarxa no funciona bé allà on vius, treballes o et mous.",
      text:
        "A Nimbus treballem amb línies mòbils amb triple cobertura per donar-te més opcions reals de connexió i ajudar-te a trobar una solució que encaixi millor amb el teu cas.",
      studyCta: "Vull que estudieu el meu cas",
      plansCta: "Veure opcions mòbils",
      cardItems: [
        ["Casa", "Poc senyal en interiors"],
        ["Feina", "Trucades que es tallen"],
        ["Moviment", "Dades lentes segons la zona"],
      ],
      focusEyebrow: "Enfocament Nimbus",
      focusText: "Revisem on et falla abans d’orientar-te.",
    },
    problem: {
      eyebrow: "El problema",
      title: "Canviar de tarifa no sempre arregla la cobertura",
      text:
        "Si el problema és a la xarxa que fa servir el teu operador, canviar a una altra tarifa de la mateixa xarxa et pot deixar igual. Per això, abans de vendre’t una línia, ens interessa entendre on et falla, quan et falla i com fas servir el mòbil.",
      bullets: [
        "Et quedes sense cobertura a casa?",
        "Se’t tallen les trucades?",
        "Les dades van lentes en algunes zones?",
        "Et mous molt i la cobertura canvia segons el lloc?",
        "El teu operador actual no et dona una solució clara?",
      ],
    },
    solution: {
      eyebrow: "Solució Nimbus",
      title: "La diferència: més d’una xarxa per buscar millor cobertura",
      text:
        "Moltes companyies treballen amb una única xarxa mòbil. A Nimbus treballem amb línies mòbils amb triple cobertura: Movistar, Orange i MásMóvil/Yoigo. Això ens permet orientar-te millor segons el teu cas i buscar una opció amb més possibilitats reals de funcionar bé on la necessites.",
      imageCaption: "Més opcions reals de connexió",
      checks: [
        "Triple cobertura",
        "Trucades il·limitades",
        "5G si el teu terminal és compatible",
        "VoLTE si el teu terminal és compatible",
        "Trucades WiFi si el teu terminal és compatible",
        "Roaming",
        "eSIM disponible",
        "Sense vendre’t més del que necessites",
      ],
    },
    video: {
      eyebrow: "Vídeo explicatiu",
      title: "Una SIM, més opcions de cobertura",
      subtitle:
        "La cobertura mòbil no és màgia ni intuïció. Depèn de les xarxes disponibles, de la zona, de l’interior dels edificis, del terminal i de com et mous.",
      paragraphs: [
        "En moltes companyies, la teva línia mòbil treballa sobre una sola xarxa. Si aquesta xarxa no funciona bé allà on ets, pots continuar tenint el mateix problema encara que canviïs de tarifa.",
        "A Nimbus treballem amb línies mòbils amb triple cobertura: Movistar, Orange i MásMóvil/Yoigo. Això ens permet ampliar les opcions disponibles i orientar-te millor segons el teu cas.",
      ],
      aria: "Vídeo explicatiu sobre triple cobertura",
      play: "Reproduir vídeo",
      pending: "Vídeo pendent",
      pendingText: "Vídeo explicatiu pendent d’afegir.",
      message: "El vídeo estarà disponible pròximament.",
      below:
        "Aviat afegirem aquí una explicació breu perquè puguis veure, en menys d’un minut, per què una línia amb triple cobertura et pot ajudar si sovint et quedes sense senyal o tens trucades que es tallen.",
      studyCta: "Vull que estudieu el meu cas",
      plansCta: "Veure tarifes mòbils",
    },
    localService: {
      eyebrow: "Servei proper",
      title: "A prop teu quan necessites una resposta",
      subtitle:
        "Nimbus no és només una línia mòbil. Som un equip local, a Sils, que escolta el teu cas i t’ajuda a entendre què està passant abans de recomanar-te una solució.",
      text:
        "Si tens problemes de cobertura, no volem vendre’t més dades ni una tarifa qualsevol. Volem saber on et falla, quan et falla i com t’afecta. A partir d’aquí, t’orientem amb criteri i busquem l’opció que tingui més sentit per al teu dia a dia.",
      cards: [
        ["Atenció humana", "Parles amb persones que escolten el teu problema, no amb un procés automàtic pensat només per vendre’t una altra tarifa."],
        ["Coneixement del territori", "Treballem a la zona i coneixem molts dels problemes reals de cobertura, instal·lació i ús que es troben llars i negocis."],
        ["T’ajudem a entendre", "No has de saber si el problema és de la xarxa, del mòbil, de la configuració o de la tarifa. T’ho expliquem de manera clara."],
        ["Seguim després de contractar", "La nostra feina no acaba quan actives la línia. Si necessites ajuda, continuem a prop per revisar, configurar i resoldre."],
      ],
      closing:
        "Per això parlem d’estudiar el teu cas: perquè la millor tarifa no sempre és la més gran ni la més barata, sinó la que encaixa amb tu.",
      studyCta: "Vull que estudieu el meu cas",
      plansCta: "Veure tarifes mòbils",
    },
    featureCards: [
      ["Sense permanència", "Opcions mòbils pensades per contractar sense lligar-te més del necessari."],
      ["Atenció propera", "Telèfon, WhatsApp i oficina física a Sils per revisar dubtes reals."],
      ["Tecnologia útil", "5G, VoLTE, trucades WiFi i eSIM quan el teu terminal i la línia ho permeten."],
    ],
    plans: {
      eyebrow: "Opcions mòbils",
      title: "Opcions mòbils orientatives",
      text:
        "Pots veure les nostres opcions mòbils i contractar directament. Si tens un problema concret de cobertura, també pots demanar-nos que estudiem el teu cas abans de recomanar-te una opció.",
      callsBadge: "Trucades",
      cta: "Sol·licitar",
      scrollLeft: "Veure tarifes anteriors",
      scrollRight: "Veure més tarifes",
      carouselHint: "Fes lliscar o usa les fletxes per veure més tarifes",
      promoBadge: "Per noves contractacions fins el 30/09/2026",
      promoNote:
        "Tarifes JUNTS ESTIU. Promo de per vida mentre es mantingui la tarifa. No acumulable amb altres promocions.",
      description: (data: string) =>
        `Inclou trucades il·limitades a fixos i mòbils nacionals. Inclou ${data} de dades.`,
      features: [
        "Preu mensual",
        "Sense permanència",
        "Acumula gigues: les dades que no fas servir aquest mes, les tens el següent.",
      ],
    },
    faq: {
      eyebrow: "Dubtes habituals",
      title: "Dubtes habituals abans de canviar de línia mòbil",
      subtitle:
        "Fes clic en un dubte i l’assistent Nimbus s’obrirà per ajudar-te amb aquesta pregunta.",
      ctaText: "Encara tens dubtes sobre la teva cobertura?",
      studyCta: "Vull que estudieu el meu cas",
      plansCta: "Veure tarifes mòbils",
      items: [
        ["Em garantiu que sempre tindré cobertura?", "No. Cap companyia pot garantir cobertura perfecta a tots els llocs. El que sí que fem és donar-te més opcions reals treballant amb triple cobertura i revisant el teu cas abans de recomanar-te una línia."],
        ["Què significa triple cobertura?", "Significa que treballem amb línies mòbils que poden operar sobre diverses xarxes disponibles, com Movistar, Orange i MásMóvil/Yoigo. Això ens dona més marge per buscar una opció que funcioni millor segons on fas servir el mòbil."],
        ["He de canviar de número?", "No necessàriament. Et podem ajudar a conservar el teu número actual mitjançant portabilitat."],
        ["Té permanència?", "No. Les tarifes mòbils indicades són sense permanència."],
        ["Per què no contractar simplement la tarifa més barata?", "Perquè si tens problemes de cobertura, el preu no és l’únic important. Convé revisar on et falla, quina xarxa fas servir ara i com utilitzes el mòbil. La millor tarifa no sempre és la més gran ni la més barata, sinó la que encaixa amb el teu cas."],
        ["El 5G funciona sempre?", "No sempre. El 5G depèn de la cobertura disponible a la zona i que el teu terminal sigui compatible."],
        ["Puc fer servir trucades WiFi o VoLTE?", "Sí, sempre que el teu terminal sigui compatible, el servei estigui disponible i estigui correctament configurat."],
        ["Em podeu ajudar si no sé configurar el mòbil?", "Sí. Part del valor de Nimbus és ajudar-te a entendre i configurar el servei perquè funcioni com toca."],
        ["Què passa si després de contractar continuo tenint problemes?", "Revisarem el cas amb tu. La cobertura pot dependre de la zona, de l’interior de l’edifici, del terminal i de la xarxa disponible. El nostre objectiu és no deixar-te sol després d’activar la línia."],
        ["Puc contractar directament sense demanar estudi de cobertura?", "Sí. Pots sol·licitar una tarifa directament des d’aquesta pàgina. L’estudi de cobertura està pensat per a persones que ja tenen problemes o dubtes i volen una recomanació més ajustada."],
      ],
    },
    testimonials: {
      eyebrow: "Opinions",
      title: "Clients que volien deixar de barallar-se amb la cobertura",
      subtitle:
        "Quan algú arriba a Nimbus amb un problema de cobertura, moltes vegades no busca només una tarifa. Busca que algú l’escolti, entengui què està passant i li recomani amb criteri.",
      ctaText: "Tens un problema semblant?",
      studyCta: "Vull que estudieu el meu cas",
      plansCta: "Veure tarifes mòbils",
      sourceLabel: "Ressenya de Google",
      prevAria: "Opinió anterior",
      nextAria: "Opinió següent",
      readMore: "Llegir més",
      readLess: "Llegir menys",
      items: [
        {
          text: "Molt bon tracte i molt atents!",
          name: "Loudes Alsina",
          rating: 5,
          date: "2024-10-30",
        },
        {
          text: "Muy buen trato al cliente, eficaces, rapidos y todo a muy buen precio. Nada mas que pedir",
          name: "jordi pla",
          rating: 5,
          date: "2024-01-04",
        },
        {
          text: "Ahora más cerca...",
          name: "Carmen Graciela Signetti Vazquez",
          rating: 5,
          date: "2023-09-09",
        },
        {
          text: "Excelente servicio, tanto pre-evento como durante y post. El sistema funcionó perfectamente y la atención, excepcional. Muchas gracias.",
          name: "Mireia Cano Díaz",
          rating: 5,
          date: "2023-05-19",
        },
        {
          text: "Són ràpids en donar solucions i també en dur-les a terme.",
          name: "Eva Aluart",
          rating: 5,
          date: "2022-12-14",
        },
        {
          text: "D'ençà que vam començar a treballar amb Nimbus ens han aportat bones solucions i ens han ajudat a optimitzar costos, tenen amb un servei atent i personalitzat.",
          name: "Ginesta Ginesta",
          rating: 4,
          date: "2022-11-11",
        },
        {
          text: "Una excelente conexión, atención al cliente buenísimo calidad precio inmejorable",
          name: "Cristina Vázquez Jimeno",
          rating: 5,
          date: "2022-11-01",
        },
        {
          text: "Después de un año y medio intentando que ADAMO instalara la fibra en mi domicilio de Breda, sin resultado, contacté con NIMBUS y se hicieron cargo de la instalación. El trabajo no era sencillo, pero lo hicieron de forma impecable.",
          name: "Tomas Gs",
          rating: 5,
          date: "2022-10-18",
        },
        {
          text: "Gran servicio y atención al cliente. Con las grandes compañías telefónicas cuesta mucho que te atiendan cuando tienes un problema y con ellos esto no ocurre.",
          name: "Rosa Girbent i Costey",
          rating: 5,
        },
        {
          text: "Buena cobertura.",
          name: "Santiago Canton Membrado",
          rating: 5,
        },
        {
          text: "Trato muy cercano y se preocupan mucho por buscar la mejor oferta y propuesta según tus necesidades.",
          name: "Saül Segura",
          rating: 5,
        },
        {
          text: "Operador cercano, rápido y efectivo. Atención en catalán sin esperas.",
          name: "Dimas SC",
          rating: 5,
        },
        {
          text: "NIMBUS ha sido el único servicio que nos ha instalado fibra óptica en nuestro domicilio. De no ser por ellos, las oligarquías seguirían ignorando nuestras peticiones. Gracias, ahora podemos trabajar decentemente.",
          name: "Sergi",
          rating: 5,
        },
        {
          text: "Son el mejor operador de telefonía, internet y servicios de telecomunicaciones. Muy profesionales y proactivos asesorando al cliente, promoviendo la mejor opción y a buen precio. Su servicio tecnico y atención al cliente son excelentes. Recomendable 100%.",
          name: "PUJOLAR SERVICE",
          rating: 5,
        },
        {
          text: "Nos han montado fibra cuando nadie más le interesaba, buen servicio y buen precio km0 sin anuncios ni promos ni chorradas. Perfecto",
          name: "Ferran Guri",
          rating: 5,
        },
        {
          text: "Siempre están ahí por nosotros. Muy buenos profesionales, atentos, rápidos, y resolutivos",
          name: "Mante Auselle",
          rating: 5,
        },
        {
          text: "Nos dieron solución al problema que teníamos. de momento estamos muy contentos!",
          name: "TERRAFUST",
          rating: 5,
        },
        {
          text: "Muy amables y eficientes con su trabajo. Rápida gestión y comunicación con el cliente.",
          name: "Laura",
          rating: 5,
        },
      ] as TestimonialItem[],
    },
    modal: {
      title: "Com prefereixes contractar?",
      generalTitle: "Parla amb nosaltres",
      generalText:
        "Deixa’ns les teves dades i et contactem pel canal que prefereixis. Sense compromís i sense insistir.",
      message: "En què et podem ajudar?",
      text: "T’ajudem a tancar la contractació d’aquesta línia mòbil i resoldre qualsevol dubte abans d’activar el servei.",
      choices: { phone: "Que em truqueu", whatsapp: "Prefereixo WhatsApp", office: "Vull venir a l’oficina" },
      officeTitle: "Pots venir a la nostra oficina a C/Major, 42 - Sils.",
      officePhone: "Telèfon: 972 85 01 55",
      officeWhatsapp: "WhatsApp: 622 81 26 04",
      officeText: "T’atendrem allà directament per resoldre dubtes i avançar amb la contractació.",
      officeMapTitle: "Mapa de Nimbus Telecom a Google Maps",
      openMaps: "Obrir a Google Maps",
      whatsappIntro: "Deixa’ns les teves dades per parlar-te nosaltres.",
      name: "Nom",
      phone: "Telèfon",
      emailOptional: "Email opcional",
      optional: "(opcional)",
      openWhatsapp: "Obrir WhatsApp",
      talkWhatsapp: "Parlar per WhatsApp",
      submit: "Enviar sol·licitud",
      submitting: "Enviant...",
      sentTitle: "Sol·licitud rebuda",
      sentText: "Gràcies. Revisarem la teva sol·licitud de contractació i et contactarem per avançar amb l’opció triada.",
      close: "Tancar",
      errors: {
        name: "Indica un nom vàlid d’almenys 2 lletres.",
        phone: "Indica un telèfon espanyol vàlid de 9 números.",
        consent: "Necessitem la teva acceptació per contactar amb tu.",
        submit: "No hem pogut enviar la sol·licitud.",
      },
    },
    form: {
      eyebrow: "Estudi de cobertura",
      title: "Vols que estudiem el teu cas de cobertura?",
      text:
        "Si tens problemes de cobertura, explica’ns on et passa i com fas servir el mòbil. Revisarem el teu cas i et contactarem amb una recomanació personalitzada.",
      noSalesTitle: "Sense rodejos comercials",
      noSalesText: "Ens centrem a entendre on falla la cobertura i quines opcions tenen més sentit.",
      completed: "Completat",
      stepLabel: "Pas",
      of: "de",
      step1Title: "Quin problema de cobertura tens?",
      coverageProblems: [
        "No tinc cobertura a casa",
        "No tinc cobertura a la feina",
        "Perdo cobertura quan em moc",
        "Les trucades es tallen",
        "Les dades van lentes",
        "No n’estic segur, només sé que em falla",
      ],
      step2Title: "On et passa més?",
      locationTypes: [
        "En una localitat concreta",
        "En diverses zones",
        "En carretera o desplaçant-me",
        "En interiors, dins de casa o de la feina",
        "No ho tinc clar",
      ],
      locationLabel: "Localitat, zona o llocs on et falla",
      locationPlaceholder: "Exemple: Sils, Vidreres, carretera cap a Girona, dins de casa, etc.",
      step3Title: "Com fas servir normalment el mòbil?",
      usageOptions: [
        "Estic gairebé sempre a casa o a la feina",
        "Em moc molt durant el dia",
        "Viatjo per diverses zones de Girona o Barcelona",
        "Faig servir molt les trucades",
        "Faig servir moltes dades mòbils",
        "Una mica de tot",
      ],
      step4Title: "Ja tenim una primera idea del teu cas",
      step4Text:
        "Amb el que ens has explicat podem revisar millor què pot estar passant i quina opció mòbil pot tenir més sentit per a tu.",
      step4Secondary: "Per enviar-te el resultat de l’estudi o comentar-lo amb tu, necessitem les teves dades de contacte.",
      step5Title: "On t’enviem el resultat de l’estudi?",
      step5Text: "Et contactarem només per revisar el teu cas de cobertura i orientar-te sobre l’opció que millor encaixi amb tu.",
      emailHelp: "T’enviarem l’informe de l’estudi a aquest email.",
      contactLabels: { phone: "Per telèfon", whatsapp: "Per WhatsApp" },
      fields: {
        name: "Nom",
        phone: "Telèfon",
        phoneOptional: "Telèfon opcional",
        email: "Email",
        emailOptional: "Email opcional",
        currentOperator: "Operador actual opcional",
        additionalComment: "Comentari addicional opcional",
      },
      back: "Enrere",
      continue: "Continuar",
      requestStudy: "Vull el meu estudi de cobertura",
      submit: "Enviar sol·licitud d’estudi",
      submitting: "Enviant...",
      finalTitle: "Sol·licitud rebuda",
      finalText: "Gràcies. Revisarem el teu cas de cobertura i t’enviarem una proposta personalitzada segons el que ens has explicat.",
      finalResponseTime:
        "Et respondrem al més aviat possible dins del següent horari d’oficina disponible.",
      finalDiagnosticPurpose:
        "El diagnòstic ens ajuda a entendre on et falla la cobertura i a orientar-te sobre quina tarifa mòbil pot encaixar millor amb el teu cas abans de contractar.",
      summary: {
        problem: "Problema principal",
        location: "On et passa més",
        zone: "Zona indicada",
        notProvided: "No indicada",
        preferredContact: "Preferència de contacte",
        currentOperator: "Operador actual",
      },
      another: "Fer una altra consulta",
      crossSell: {
        mobile: "Veure opcions mòbils",
        internet: "Veure opcions d'internet",
        business: "Veure opcions per a empreses",
        security: "Veure opcions de seguretat",
      },
      errors: {
        coverageProblem: "Selecciona el problema principal de cobertura.",
        location: "Selecciona on et passa més.",
        locationText: "Indica la població o zona on et passa.",
        usage: "Selecciona almenys una forma d’ús.",
        name: "Indica un nom vàlid d’almenys 2 lletres.",
        phone: "Indica un telèfon espanyol vàlid de 9 números.",
        email: "Indica un email vàlid per enviar-te l’informe.",
        consent: "Necessitem la teva acceptació per contactar amb tu.",
        submit: "No hem pogut enviar la sol·licitud.",
      },
    },
    legal: {
      before: "Accepto que Nimbus Telecom tracti les meves dades per contactar amb mi sobre la meva sol·licitud, d’acord amb la",
      privacy: "Política de privacitat",
      middle: "i l’",
      notice: "Avís legal",
    },
    footer: {
      claim: "Partner tecnològic local per a llars i negocis.",
      contact: "Contacte",
      office: "Oficina",
      socialLegal: "Xarxes i legal",
      legalLinks: ["Avís legal", "Política de privacitat", "Política de cookies", "Declaració d’accessibilitat"],
      hours: "De dilluns a divendres, de 9:00 a 17:00",
      commercialHours: "Atenció comercial preferent de 09:00 a 18:00",
      rights: "Tots els drets reservats.",
      from: "Atenció des de Sils",
      legalAria: "Enllaços legals",
      socialAria: "Xarxes socials",
      docsAria: "Documentació i tarifes",
      docsLinks: [
        "Tarifes telefonia fixa",
        "Tarifes números especials",
        "Tarifes internacionals",
        "Condicions de Roaming",
        "Dret de desistiment",
        "Codis curts",
      ],
      officialLinksPrefix: "Contacte, ubicació, horaris i xarxes socials",
      officialLinksCta: "Veure enllaços oficials",
    },
    floating: {
      openAssistant: "Obrir assistent Nimbus",
      assistantTitle: "Assistent Nimbus",
      assistantEyebrow: "IA",
      assistantText:
        "El nostre assistent et pot ajudar amb dubtes ràpids sobre cobertura mòbil, tarifes i com funciona l’estudi de cobertura.",
      assistantPending:
        "L’assistent IA estarà disponible pròximament. Mentrestant, pots usar WhatsApp o sol·licitar un estudi de cobertura.",
      selectedQuestion: "Pregunta seleccionada",
      study: "Demanar estudi de cobertura",
      whatsapp: "Escriure per WhatsApp",
      close: "Tancar",
      closeAria: "Tancar assistent Nimbus",
      whatsappAria: "Escriure a Nimbus per WhatsApp",
    },
    cookies: {
      eyebrow: "Cookies",
      text:
        "Fem servir cookies pròpies i de tercers per millorar l’experiència i analitzar l’ús del lloc. En navegar per aquesta web n’acceptes l’ús. Pots consultar més informació a la",
      cookiesPolicy: "Política de cookies",
      privacyPolicy: "Política de privacitat",
      legalNotice: "l’Avís legal",
      and: "i",
      accept: "Acceptar",
    },
  },
  en: {
    language: { ariaLabel: "Select language" },
    nav: {
      solution: "Solution",
      plans: "Plans",
      study: "Coverage review",
      reviews: "Reviews",
      faq: "FAQ",
      contact: "Contact",
      business: "For business",
      clientArea: "Client Area",
      primaryCta: "Review coverage",
      aria: "Main navigation",
    },
    hero: {
      eyebrow: "Mobile lines with triple coverage",
      title: "Having mobile coverage problems?",
      subtitle:
        "It is not always your phone or your plan. Sometimes the problem is that your operator works with a single network, and that network does not work well where you live, work or move around.",
      text:
        "At Nimbus we work with mobile lines with triple coverage to give you more real connection options and help you find a solution that fits your case better.",
      studyCta: "I want you to review my case",
      plansCta: "View mobile options",
      cardItems: [
        ["Home", "Weak indoor signal"],
        ["Work", "Dropped calls"],
        ["On the move", "Slow data in some areas"],
      ],
      focusEyebrow: "Nimbus approach",
      focusText: "We review where coverage fails before guiding you.",
    },
    problem: {
      eyebrow: "The problem",
      title: "Changing plan does not always fix coverage",
      text:
        "If the issue is the network your operator uses, switching to another plan on the same network can leave you in the same situation. That is why, before selling you a line, we want to understand where it fails, when it fails and how you use your mobile.",
      bullets: [
        "Do you lose coverage at home?",
        "Do calls drop?",
        "Is mobile data slow in some areas?",
        "Do you move around a lot and coverage changes by location?",
        "Does your current operator fail to give you a clear solution?",
      ],
    },
    solution: {
      eyebrow: "Nimbus solution",
      title: "The difference: more than one network to look for better coverage",
      text:
        "Many companies work with a single mobile network. At Nimbus we work with mobile lines with triple coverage: Movistar, Orange and MásMóvil/Yoigo. This lets us guide you better according to your case and look for an option with more real possibilities of working well where you need it.",
      imageCaption: "More real connection options",
      checks: [
        "Triple coverage",
        "Unlimited calls",
        "5G if your device is compatible",
        "VoLTE if your device is compatible",
        "WiFi calling if your device is compatible",
        "Roaming",
        "eSIM available",
        "No selling you more than you need",
      ],
    },
    video: {
      eyebrow: "Explainer video",
      title: "One SIM, more coverage options",
      subtitle:
        "Mobile coverage is not magic or guesswork. It depends on available networks, the area, indoor conditions, the device and how you move around.",
      paragraphs: [
        "With many companies, your mobile line works on a single network. If that network does not work well where you are, you can keep having the same problem even if you change plan.",
        "At Nimbus we work with mobile lines with triple coverage: Movistar, Orange and MásMóvil/Yoigo. This helps us expand the available options and guide you better according to your case.",
      ],
      aria: "Explainer video about triple coverage",
      play: "Play video",
      pending: "Video pending",
      pendingText: "Explainer video pending.",
      message: "The video will be available soon.",
      below:
        "We will soon add a short explanation here so you can see, in under a minute, why a line with triple coverage may help if you often lose signal or have dropped calls.",
      studyCta: "I want you to review my case",
      plansCta: "View mobile plans",
    },
    localService: {
      eyebrow: "Local service",
      title: "Close to you when you need an answer",
      subtitle:
        "Nimbus is not just a mobile line. We are a local team in Sils that listens to your case and helps you understand what is happening before recommending a solution.",
      text:
        "If you have coverage problems, we do not want to sell you more data or just any plan. We want to know where it fails, when it fails and how it affects you. From there, we guide you with judgement and look for the option that makes the most sense for your day to day.",
      cards: [
        ["Human support", "You talk to people who listen to your problem, not to an automated process designed only to sell you another plan."],
        ["Local knowledge", "We work in the area and know many of the real coverage, installation and usage issues that homes and businesses face."],
        ["We help you understand", "You do not need to know whether the issue is the network, the phone, the settings or the plan. We explain it clearly."],
        ["We stay after activation", "Our work does not end when you activate the line. If you need help, we stay close to review, configure and solve."],
      ],
      closing:
        "That is why we talk about reviewing your case: the best plan is not always the biggest or the cheapest, but the one that fits you.",
      studyCta: "I want you to review my case",
      plansCta: "View mobile plans",
    },
    featureCards: [
      ["No contract commitment", "Mobile options designed so you can subscribe without being tied for longer than needed."],
      ["Close support", "Phone, WhatsApp and a physical office in Sils to review real questions."],
      ["Useful technology", "5G, VoLTE, WiFi calling and eSIM when your device and line allow it."],
    ],
    plans: {
      eyebrow: "Mobile options",
      title: "Indicative mobile options",
      text:
        "You can view our mobile options and request one directly. If you have a specific coverage problem, you can also ask us to review your case before recommending an option.",
      callsBadge: "Calls",
      cta: "Request",
      scrollLeft: "View previous plans",
      scrollRight: "View more plans",
      carouselHint: "Swipe or use the arrows to view more plans",
      promoBadge: "For new sign-ups until 30/09/2026",
      promoNote:
        "JUNTS ESTIU plans. Lifetime promo while keeping the same plan. Not combinable with other promotions.",
      description: (data: string) =>
        `Includes unlimited calls to national landlines and mobiles. Includes ${data} of data.`,
      features: [
        "Monthly price",
        "No contract commitment",
        "Data rollover: the data you do not use this month is available next month.",
      ],
    },
    faq: {
      eyebrow: "Common questions",
      title: "Common questions before changing mobile line",
      subtitle: "Click a question and the Nimbus assistant will open to help you with it.",
      ctaText: "Still have questions about your coverage?",
      studyCta: "I want you to review my case",
      plansCta: "View mobile plans",
      items: [
        ["Do you guarantee I will always have coverage?", "No. No company can guarantee perfect coverage everywhere. What we do is give you more real options by working with triple coverage and reviewing your case before recommending a line."],
        ["What does triple coverage mean?", "It means we work with mobile lines that can operate over several available networks, such as Movistar, Orange and MásMóvil/Yoigo. That gives us more room to look for an option that works better depending on where you use your mobile."],
        ["Do I have to change my number?", "Not necessarily. We can help you keep your current number through portability."],
        ["Is there a contract commitment?", "No. The listed mobile plans have no contract commitment."],
        ["Why not simply choose the cheapest plan?", "Because if you have coverage problems, price is not the only important factor. It is worth reviewing where it fails, what network you currently use and how you use your mobile. The best plan is not always the biggest or the cheapest, but the one that fits your case."],
        ["Does 5G always work?", "Not always. 5G depends on coverage available in the area and on your device being compatible."],
        ["Can I use WiFi calling or VoLTE?", "Yes, as long as your device is compatible, the service is available and it is correctly configured."],
        ["Can you help me if I do not know how to configure my phone?", "Yes. Part of Nimbus’s value is helping you understand and configure the service so it works properly."],
        ["What if I still have problems after subscribing?", "We will review the case with you. Coverage may depend on the area, indoor conditions, the device and the available network. Our goal is not to leave you alone after activating the line."],
        ["Can I request a plan directly without a coverage review?", "Yes. You can request a plan directly from this page. The coverage review is designed for people who already have problems or doubts and want a more tailored recommendation."],
      ],
    },
    testimonials: {
      eyebrow: "Reviews",
      title: "Customers who wanted to stop fighting with coverage",
      subtitle:
        "When someone comes to Nimbus with a coverage problem, they often are not just looking for a plan. They want someone to listen, understand what is happening and recommend with judgement.",
      ctaText: "Have a similar problem?",
      studyCta: "I want you to review my case",
      plansCta: "View mobile plans",
      sourceLabel: "Google review",
      prevAria: "Previous review",
      nextAria: "Next review",
      readMore: "Read more",
      readLess: "Read less",
      items: [
        {
          text: "Molt bon tracte i molt atents!",
          name: "Loudes Alsina",
          rating: 5,
          date: "2024-10-30",
        },
        {
          text: "Muy buen trato al cliente, eficaces, rapidos y todo a muy buen precio. Nada mas que pedir",
          name: "jordi pla",
          rating: 5,
          date: "2024-01-04",
        },
        {
          text: "Ahora más cerca...",
          name: "Carmen Graciela Signetti Vazquez",
          rating: 5,
          date: "2023-09-09",
        },
        {
          text: "Excelente servicio, tanto pre-evento como durante y post. El sistema funcionó perfectamente y la atención, excepcional. Muchas gracias.",
          name: "Mireia Cano Díaz",
          rating: 5,
          date: "2023-05-19",
        },
        {
          text: "Són ràpids en donar solucions i també en dur-les a terme.",
          name: "Eva Aluart",
          rating: 5,
          date: "2022-12-14",
        },
        {
          text: "D'ençà que vam començar a treballar amb Nimbus ens han aportat bones solucions i ens han ajudat a optimitzar costos, tenen amb un servei atent i personalitzat.",
          name: "Ginesta Ginesta",
          rating: 4,
          date: "2022-11-11",
        },
        {
          text: "Una excelente conexión, atención al cliente buenísimo calidad precio inmejorable",
          name: "Cristina Vázquez Jimeno",
          rating: 5,
          date: "2022-11-01",
        },
        {
          text: "Después de un año y medio intentando que ADAMO instalara la fibra en mi domicilio de Breda, sin resultado, contacté con NIMBUS y se hicieron cargo de la instalación. El trabajo no era sencillo, pero lo hicieron de forma impecable.",
          name: "Tomas Gs",
          rating: 5,
          date: "2022-10-18",
        },
        {
          text: "Gran servicio y atención al cliente. Con las grandes compañías telefónicas cuesta mucho que te atiendan cuando tienes un problema y con ellos esto no ocurre.",
          name: "Rosa Girbent i Costey",
          rating: 5,
        },
        {
          text: "Buena cobertura.",
          name: "Santiago Canton Membrado",
          rating: 5,
        },
        {
          text: "Trato muy cercano y se preocupan mucho por buscar la mejor oferta y propuesta según tus necesidades.",
          name: "Saül Segura",
          rating: 5,
        },
        {
          text: "Operador cercano, rápido y efectivo. Atención en catalán sin esperas.",
          name: "Dimas SC",
          rating: 5,
        },
        {
          text: "NIMBUS ha sido el único servicio que nos ha instalado fibra óptica en nuestro domicilio. De no ser por ellos, las oligarquías seguirían ignorando nuestras peticiones. Gracias, ahora podemos trabajar decentemente.",
          name: "Sergi",
          rating: 5,
        },
        {
          text: "Son el mejor operador de telefonía, internet y servicios de telecomunicaciones. Muy profesionales y proactivos asesorando al cliente, promoviendo la mejor opción y a buen precio. Su servicio tecnico y atención al cliente son excelentes. Recomendable 100%.",
          name: "PUJOLAR SERVICE",
          rating: 5,
        },
        {
          text: "Nos han montado fibra cuando nadie más le interesaba, buen servicio y buen precio km0 sin anuncios ni promos ni chorradas. Perfecto",
          name: "Ferran Guri",
          rating: 5,
        },
        {
          text: "Siempre están ahí por nosotros. Muy buenos profesionales, atentos, rápidos, y resolutivos",
          name: "Mante Auselle",
          rating: 5,
        },
        {
          text: "Nos dieron solución al problema que teníamos. de momento estamos muy contentos!",
          name: "TERRAFUST",
          rating: 5,
        },
        {
          text: "Muy amables y eficientes con su trabajo. Rápida gestión y comunicación con el cliente.",
          name: "Laura",
          rating: 5,
        },
      ] as TestimonialItem[],
    },
    modal: {
      title: "How would you prefer to subscribe?",
      generalTitle: "Let’s talk",
      generalText:
        "Leave us your details and we will contact you through your preferred channel. No commitment, no pushing.",
      message: "How can we help you?",
      text: "We help you complete the subscription for this mobile line and resolve any questions before activating the service.",
      choices: { phone: "Call me", whatsapp: "I prefer WhatsApp", office: "I want to visit the office" },
      officeTitle: "You can visit our office at C/Major, 42 - Sils.",
      officePhone: "Phone: 972 85 01 55",
      officeWhatsapp: "WhatsApp: 622 81 26 04",
      officeText: "We will help you there directly to answer questions and move forward with the subscription.",
      officeMapTitle: "Nimbus Telecom map on Google Maps",
      openMaps: "Open in Google Maps",
      whatsappIntro: "Leave us your details so we can contact you.",
      name: "Name",
      phone: "Phone",
      emailOptional: "Email optional",
      optional: "(optional)",
      openWhatsapp: "Open WhatsApp",
      talkWhatsapp: "Talk on WhatsApp",
      submit: "Send request",
      submitting: "Sending...",
      sentTitle: "Request received",
      sentText: "Thank you. We will review your subscription request and contact you to move forward with the selected option.",
      close: "Close",
      errors: {
        name: "Enter a valid name with at least 2 letters.",
        phone: "Enter a valid 9-digit Spanish phone number.",
        consent: "We need your acceptance to contact you.",
        submit: "We could not send the request.",
      },
    },
    form: {
      eyebrow: "Coverage review",
      title: "Would you like us to review your coverage case?",
      text:
        "If you have coverage problems, tell us where it happens and how you use your mobile. We will review your case and contact you with a personalised recommendation.",
      noSalesTitle: "No sales detours",
      noSalesText: "We focus on understanding where coverage fails and which options make more sense.",
      completed: "Completed",
      stepLabel: "Step",
      of: "of",
      step1Title: "What coverage problem do you have?",
      coverageProblems: [
        "I have no coverage at home",
        "I have no coverage at work",
        "I lose coverage when I move around",
        "Calls drop",
        "Data is slow",
        "I am not sure, I just know it fails",
      ],
      step2Title: "Where does it happen most?",
      locationTypes: [
        "In a specific town",
        "In several areas",
        "On the road or while moving",
        "Indoors, at home or at work",
        "I am not sure",
      ],
      locationLabel: "Town, area or places where it fails",
      locationPlaceholder: "Example: Sils, Vidreres, road to Girona, inside home, etc.",
      step3Title: "How do you normally use your mobile?",
      usageOptions: [
        "I am almost always at home or at work",
        "I move around a lot during the day",
        "I travel through several areas of Girona or Barcelona",
        "I use calls a lot",
        "I use mobile data a lot",
        "A bit of everything",
      ],
      step4Title: "We already have a first idea of your case",
      step4Text:
        "With what you have told us, we can better review what may be happening and which mobile option may make more sense for you.",
      step4Secondary: "To send you the result of the review or discuss it with you, we need your contact details.",
      step5Title: "Where should we send the result of the review?",
      step5Text: "We will contact you only to review your coverage case and guide you on the option that best fits you.",
      emailHelp: "We will send the coverage review report to this email.",
      contactLabels: { phone: "By phone", whatsapp: "By WhatsApp" },
      fields: {
        name: "Name",
        phone: "Phone",
        phoneOptional: "Phone optional",
        email: "Email",
        emailOptional: "Email optional",
        currentOperator: "Current operator optional",
        additionalComment: "Additional comment optional",
      },
      back: "Back",
      continue: "Continue",
      requestStudy: "I want my coverage review",
      submit: "Send review request",
      submitting: "Sending...",
      finalTitle: "Request received",
      finalText: "Thank you. We will review your coverage case and send you a personalised proposal based on what you told us.",
      finalResponseTime:
        "We will reply as soon as possible during the next available office hours.",
      finalDiagnosticPurpose:
        "The diagnosis helps us understand where coverage fails and guide you on which mobile plan may fit your case better before subscribing.",
      summary: {
        problem: "Main problem",
        location: "Where it happens most",
        zone: "Area indicated",
        notProvided: "Not provided",
        preferredContact: "Contact preference",
        currentOperator: "Current operator",
      },
      another: "Make another request",
      crossSell: {
        mobile: "View mobile options",
        internet: "View internet options",
        business: "View business options",
        security: "View security options",
      },
      errors: {
        coverageProblem: "Select the main coverage problem.",
        location: "Select where it happens most.",
        locationText: "Enter the town or area where it happens.",
        usage: "Select at least one usage type.",
        name: "Enter a valid name with at least 2 letters.",
        phone: "Enter a valid 9-digit Spanish phone number.",
        email: "Enter a valid email so we can send you the report.",
        consent: "We need your acceptance to contact you.",
        submit: "We could not send the request.",
      },
    },
    legal: {
      before: "I agree that Nimbus Telecom may process my data to contact me about my request, in accordance with the",
      privacy: "Privacy Policy",
      middle: "and",
      notice: "Legal Notice",
    },
    footer: {
      claim: "Local technology partner for homes and businesses.",
      contact: "Contact",
      office: "Office",
      socialLegal: "Social and legal",
      legalLinks: ["Legal Notice", "Privacy Policy", "Cookie Policy", "Accessibility Statement"],
      hours: "Monday to Friday, 9:00 to 17:00",
      commercialHours: "Preferred sales support from 09:00 to 18:00",
      rights: "All rights reserved.",
      from: "Support from Sils",
      legalAria: "Legal links",
      socialAria: "Social media",
      docsAria: "Documentation and rates",
      docsLinks: [
        "Landline rates",
        "Special numbering rates",
        "International rates",
        "Roaming conditions",
        "Right of withdrawal",
        "Short codes",
      ],
      officialLinksPrefix: "Contact, location, opening hours and social media",
      officialLinksCta: "View official links",
    },
    floating: {
      openAssistant: "Open Nimbus assistant",
      assistantTitle: "Nimbus Assistant",
      assistantEyebrow: "AI",
      assistantText:
        "Our assistant can help you with quick questions about mobile coverage, plans and how the coverage review works.",
      assistantPending:
        "The AI assistant will be available soon. In the meantime, you can use WhatsApp or request a coverage review.",
      selectedQuestion: "Selected question",
      study: "Request coverage review",
      whatsapp: "Write on WhatsApp",
      close: "Close",
      closeAria: "Close Nimbus assistant",
      whatsappAria: "Write to Nimbus on WhatsApp",
    },
    cookies: {
      eyebrow: "Cookies",
      text:
        "We use first-party and third-party cookies to improve the experience and analyze site usage. By browsing this website, you accept their use. You can find more information in the",
      cookiesPolicy: "Cookie Policy",
      privacyPolicy: "Privacy Policy",
      legalNotice: "Legal Notice",
      and: "and the",
      accept: "Accept",
    },
  },
} as const;

type I18nContextValue = {
  locale: Locale;
  dictionary: (typeof translations)[Locale];
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Lee la eleccion guardada. localStorage puede lanzar en modo privado o con
 * cookies de terceros bloqueadas, asi que nunca debe tumbar el render.
 */
export function getStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Idioma del navegador -> locale soportado. Recorre navigator.languages en
 * orden de preferencia y se queda con la primera coincidencia por prefijo
 * ("ca-ES" y "ca-valencia" -> "ca", "es-419" -> "es"). Si no coincide
 * ninguno, DEFAULT_LOCALE (catalan).
 */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") {
    return DEFAULT_LOCALE;
  }

  const candidates =
    Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];

  for (const candidate of candidates) {
    const prefix = typeof candidate === "string" ? candidate.toLowerCase().split("-")[0] : "";
    if (isLocale(prefix)) {
      return prefix;
    }
  }

  return DEFAULT_LOCALE;
}

/**
 * Locale activo: eleccion guardada > idioma del navegador > catalan.
 * Solo debe llamarse en cliente (tras el montaje): con output: export el HTML
 * es estatico y leer navigator durante el render rompe la hidratacion.
 */
export function resolveLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  return getStoredLocale() ?? detectBrowserLocale();
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      // El idioma detectado NO se persiste: solo se guarda la eleccion
      // explicita del usuario en el selector. Asi el visitante sigue al
      // navegador mientras no decida otra cosa.
      setLocaleState(resolveLocale());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    } catch {
      // Sin persistencia (modo privado): el cambio vale para esta sesion.
    }
  }

  const value = useMemo(
    () => ({
      locale,
      dictionary: translations[locale],
      setLocale,
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export function isLocale(value: unknown): value is Locale {
  return value === "es" || value === "ca" || value === "en";
}
