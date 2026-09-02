// Contenido legal de Nimbus Telecom S.L.
// IMPORTANTE: el texto procede literalmente de las paginas legales publicadas
// en WordPress. NO reescribir ni traducir sin revision juridica.

export type LegalBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type LegalDocument = {
  slug: string;
  title: string;
  metaDescription: string;
  blocks: LegalBlock[];
};

export const avisoLegal: LegalDocument = {
  slug: "aviso-legal",
  title: "Aviso legal",
  metaDescription: "Aviso legal de Nimbus Telecom S.L.: datos identificativos, condiciones de acceso y uso de la web, propiedad intelectual y responsabilidades.",
  blocks: [
    { type: "paragraph", text: "Con el fin de dar cumplimiento en el artículo 10 de la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico, informamos a los usuarios de nuestros datos:" },
    { type: "list", items: [
      "Denominación Social: NIMBUS TELECOM S.L.",
      "Domicilio Social: C/ Tramontana, 99, 17411 Vidreres, (Girona)",
      "NIF: B55329643",
      "Teléfono: 972850155",
      "E-mail: info@nimbustelecom.cat",
      "Sitio web: www.nimbustelecom.cat",
    ] },
    { type: "paragraph", text: "NIMBUS TELECOM S.L. facilita a los usuarios el acceso y la utilización de diferentes servicios y contenidos puestos a disposición a través de su web." },
    { type: "paragraph", text: "Toda persona que acceda en esta web asume el papel de usuario (en lo sucesivo usuario), e implica la aceptación total y sin reservas de todas y cada una de las disposiciones incluidas en este aviso legal, así como a cualquier otra disposición legal que sea de aplicación." },
    { type: "paragraph", text: "Como usuarios, tienen que leer atentamente este Aviso Legal en cualquier de las ocasiones que entren a la web, pues esta puede sufrir modificaciones puesto que Nimbus Telecom, S.L. se reserva el derecho a modificar cualquier tipo de información que pueda aparecer en la web, sin que exista la obligación de preaviso o poner en conocimiento de los usuarios estas obligaciones, siendo suficientes la publicación en la página web." },
    { type: "heading", text: "Propiedad intelectual e industrial" },
    { type: "paragraph", text: "El diseño del portal y sus códigos fuente, así como los logos, marcas y demás signos distintivos que aparecen en el mismo pertenecen a Nimbus Telecom, S.L. y están protegidos por los correspondientes derechos de propiedad intelectual e industrial." },
    { type: "heading", text: "Condiciones de acceso y uso de la web" },
    { type: "paragraph", text: "El acceso y uso de la web de Nimbus Telecom, S.L. tiene carácter gratuito para todos los usuarios." },
    { type: "heading", text: "Menores de edad" },
    { type: "paragraph", text: "Para el uso de los servicios, los menores de edad tienen que obtener siempre previamente el consentimiento de los padres, tutores o representantes legales, responsables últimos de todos los actos realizados por los menores a su cargo. La responsabilidad en la determinación de contenidos concretos, a los cuales acceden los menores corresponde a aquellos, es por eso que si acceden a contenido no apropiados por internet, se tendrán que establecer en sus ordenadores mecanismos, en particular programas informáticos, filtros y bloqueos, que permitan limitar los contenidos disponibles y, aunque no sean infalibles, son de especial utilidad para controlar y restringir los materiales a los que pueden acceder los menores." },
    { type: "heading", text: "Obligación de hacer un uso correcto de la Web" },
    { type: "paragraph", text: "El usuario se compromete a utilizar la web de conformidad a la Ley y al presente Aviso Legal, así como a la moral y a buenas costumbres. A tal efecto, el usuario se abstendrá de utilizar la página con fines ilícitos o prohibidos, lesivos de derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de equipos informáticos o documentos, archivos y toda clase de contenidos almacenados en cualquier equipo informático del prestamista." },
    { type: "paragraph", text: "En particular, y a título indicativo pero no exhaustivo, el usuario se compromete a no transmitir, difundir o poner a disposición de terceros informaciones, datos, contenidos, mensajes, gráficas, dibujos, archivos de sonido o imagen, fotografías, grabaciones, software y, en general, cualquier clase de material que:" },
    { type: "list", items: [
      "Sea contraria, desprecie o atente contra los derechos fundamentales y las libertades públicas reconocidas constitucionalmente, en tratados internacionales y otras normas vigentes;",
      "Induzca, incite o promueva actuaciones delictivas, denigrantes, difamatorias, violentas o, en general, contrarias a la ley, a la moral y al orden público;",
      "Induzca, incite o promueva actuaciones, actitudes o pensamientos discriminatorios por razón de sexo, raza, religión, creencias, edad o condición;",
      "Sea contrario al derecho al honor, a la intimidad personal o familiar o a la propia imagen de las personas;",
    ] },
    { type: "paragraph", text: "De cualquier manera perjudique la credibilidad de Nimbus Telecom, S.L. o de terceros; y constituya publicidad ilícita, engañosa o desleal." },
    { type: "heading", text: "Responsabilidades" },
    { type: "paragraph", text: "El acceso y uso de esta página web es responsabilidad de los usuarios. No es objeto de garantía por parte del Responsable:" },
    { type: "list", items: [
      "La infalibilidad, la disponibilidad, la continuidad, la inexistencia de deficiencias de seguridad de la página web.",
      "Que el contenido de la página o la información que pasa a través del mismo esté libre de virus o de otros elementos lesivos, así como de errores, omisiones o incorrecciones.",
      "Los posibles daños o perjuicios que se pudieran derivar de interferencias, omisiones, interrupciones, virus informáticos, averías o desconexiones en el funcionamiento operativo de la página web.",
      "Retrasos o bloqueos en el uso de esta página causados por deficiencias o sobrecargas del centro de procesamiento de datos, ni de los daños que puedan ser causados por terceras personas mediante intromisiones ilegítimas que están fuera de nuestro control.",
      "Se exonera de responsabilidad al Responsable ante cualquier daño o perjuicio que pudiera sufrir el usuario como consecuencia de errores, defectos u omisiones en la información facilitada siempre que proceda de otras fuentes ajenas.",
    ] },
    { type: "paragraph", text: "El mero acceso a la página web no supone entablar ningún tipo de relación comercial entre el responsable y el usuario." },
    { type: "heading", text: "Responsabilidad de los contenidos" },
    { type: "paragraph", text: "No nos hacemos responsables de la legalidad de otros sitios web de terceros desde los que pueda acceder al portal. Tampoco respondemos de la legalidad de otros sitios web de terceros, que pudieran estar vinculados o enlazados desde este portal." },
    { type: "paragraph", text: "No somos responsables del uso que terceros hagan de la información publicada en el portal, ni tampoco de los daños sufridos o pérdidas económicas que, de forma directa o indirecta, produzcan o puedan producir perjuicios económicos, materiales o sobre datos, provocados por el uso de dicha información." },
    { type: "heading", text: "Reproducción de contenidos" },
    { type: "paragraph", text: "En virtud de lo dispuesto en la Ley de Propiedad Intelectual quedan expresamente prohibidas la reproducción, distribución y la comunicación pública de la totalidad o parte de los contenidos de esta página web, con fines comerciales en cualquier soporte, y por cualquier medio técnico, sin la autorización del titular de la web." },
    { type: "heading", text: "Enlaces (LINKS)" },
    { type: "paragraph", text: "Desde el sitio web es posible que se redirija a contenidos de terceras webs. Dado que desde la web no podemos controlar siempre los contenidos introducidos por los terceros, Nimbus Telecom, S.L. no asume ningún tipo de responsabilidad respecto a estos contenidos. En todo caso, procederemos a la retirada inmediata de cualquier contenido que pudiera contravenir la legislación nacional o internacional, la moral o el orden público, procediendo a la retirada inmediata de la re-dirección en estas webs, poniendo en conocimiento de las autoridades competentes el contenido en cuestión." },
    { type: "paragraph", text: "Nimbus Telecom, S.L. no se responsabiliza de la información y contenidos almacenados, a título enunciativo pero no limitante, en foros, chats, generadores de blogs, comentarios, redes sociales, o cualquier otro medio que permita a terceros publicar contenidos de forma independiente a la página web. No obstante, y en cumplimiento del que dispone el artículo 11 y 16 de la LSSICE, Nimbus Telecom, S.L. se pone a disposición de todos los usuarios, autoridades y fuerzas de seguridad, y colaborando de forma activa en la retirada o, cuando sea necesario, el bloqueo de todos aquellos contenidos que puedan afectar o contravenir la legislación nacional, internacional, derechos de terceros o la moral y el orden público. En caso de que el usuario considere que puede existir algún contenido que pudiera ser susceptible de esta clasificación, se ruega lo notifique de forma inmediata a info@nimbustelecom.cat." },
    { type: "heading", text: "Virus piratería y otros ataques informáticos" },
    { type: "paragraph", text: "El usuario no debe realizar un uso indebido de esta página web mediante la introducción intencionada en la misma de virus, troyanos, gusanos, bombas lógicas o cualquier otro programa o material tecnológicamente perjudicial o dañino. El usuario no tratará de tener acceso no autorizado a esta página web, al servidor en que dicha página se encuentra alojada o a cualquier servidor, ordenador o base de datos relacionada con nuestra página web. El usuario se compromete a no atacar esta página web. El incumplimiento de esta cláusula podría llevar aparejada la comisión de infracciones tipificadas por la normativa aplicable. Informaremos de cualquier incumplimiento de dicha normativa a las autoridades competentes y cooperaremos con ellas para descubrir la identidad del atacante. Asimismo, en caso de incumplimiento de la presente cláusula, dejará inmediatamente de estar autorizado a usar esta página web. No seremos responsables de cualquier daño o pérdida resultante de un ataque de denegación de servicio, virus o cualquier otro programa o material tecnológicamente perjudicial o dañino que pueda afectar a su ordenador, equipo informático, datos o materiales como consecuencia del uso de esta página web o de la descarga de contenidos de la misma o a los que la misma redireccione." },
    { type: "heading", text: "Legislación aplicable y jurisdicción" },
    { type: "paragraph", text: "Para la resolución de las controversias o cuestiones relacionadas con la presente página web o de las actividades en esta desarrolladas, será de aplicación la legislación española, a la que se someten expresamente las partes, siente competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales de Santa Coloma de Farners." },
    { type: "paragraph", text: "Le informamos que dispone de un procedimiento de resolución extrajudicial de controversias gratuito y accesible a todos los ciudadanos, se trata de la plataforma de resolución de litigios en línea de la Unión Europea, accesible a través del siguiente enlace https://ec.europa.eu/consumers/odr/main/?event=main.home2.show" },
    { type: "paragraph", text: "Puede formular cualquier queja y reclamación dirigiéndose a info@nimbustelecom.cat" },
    { type: "heading", text: "COOKIES" },
    { type: "paragraph", text: "La Web de Nimbus Telecom, S.L. utiliza cookies (pequeños archivos de información que el servidor envía al ordenador de quien accede en la página) para llevar a cabo determinadas funciones que son consideradas imprescindibles por el buen funcionamiento y visualización del lugar. Las cookies utilizadas tienen, en todo caso, carácter temporal, con la única finalidad de hacer más eficaz la navegación, y desaparecen a la acabar la sesión del usuario. En ningún caso se utilizarán las cookies para recoger información de carácter personal. Para mayor información, ver nuestra Política de Cookies." },
    { type: "heading", text: "Fecha de última actualización" },
    { type: "paragraph", text: "El presente texto ha sido revisado el 18/03/2024" },
  ],
};

export const politicaPrivacidad: LegalDocument = {
  slug: "politica-de-privacidad",
  title: "Política de privacidad",
  metaDescription: "Política de privacidad de Nimbus Telecom S.L.: tratamiento de datos personales, derechos del interesado y propiedad intelectual.",
  blocks: [
    { type: "heading", text: "INFORMACIÓN LEGAL LSSIYCE" },
    { type: "paragraph", text: "De acuerdo con las obligaciones previstas en la Ley 34/2002, de servicios de la Sociedad de la Información y del comercio electrónico (en adelante LSSIYCE), NIMBUS TELECOM S.L. manifiesta que el dominio https://nimbustelecom.cat/ es propiedad de NIMBUS TELECOM S.L., con CIF B55329643, y domicilio social en C/Tramontana, 99 – 17411 Vidreres (Girona)." },
    { type: "paragraph", text: "NIMBUS TELECOM S.L. no puede asumir ninguna responsabilidad derivada del uso incorrecto, inapropiado o ilícito de la información aparecida en sus páginas." },
    { type: "paragraph", text: "Con los límites establecidos en la ley, NIMBUS TELECOM S.L. no asume ninguna responsabilidad derivada de la falta de veracidad, integridad, actualización y precisión de los datos o informaciones que se contienen en sus páginas de Internet. Los contenidos e información de las páginas de Internet de NIMBUS TELECOM S.L. están elaborados por profesionales debidamente cualificados para el ejercicio de su profesión. Sin embargo, los contenidos e información no vinculan a la susodicha, ni constituyen opiniones, consejos o asesoramiento legal de ningún tipo, pues se trata meramente de un servicio ofrecido con carácter informativo y divulgativo." },
    { type: "paragraph", text: "Las páginas de Internet de NIMBUS TELECOM S.L. pueden contener enlaces (links) a otras páginas de terceras. Por lo tanto, ésta no puede asumir responsabilidades por el contenido que pueda aparecer en páginas de terceros. Los textos, imágenes, sonidos, animaciones, software y el resto de contenidos incluidos en este website son propiedad exclusiva de NIMBUS TELECOM S.L. o sus licenciantes. Cualquier acto de transmisión, distribución, cesión, reproducción, almacenamiento o comunicación pública total o parcial, debe contar con el consentimiento expreso de NIMBUS TELECOM S.L." },
    { type: "heading", text: "PROTECCIÓN DE DATOS PERSONALES" },
    { type: "paragraph", text: "En virtud de la normativa de protección de datos de carácter personal, por la presente autoriza a que los datos personales facilitados serán tratados bajo la responsabilidad de la mercantil NIMBUS TELECOM S.L." },
    { type: "paragraph", text: "En cualquier caso, podrá indicar la revocación del consentimiento dado, si ésta fue la base que legitimó el tratamiento o ejercitar los derechos previstos:" },
    { type: "list", items: [
      "De acceso: el interesado tiene derecho a saber si el responsable trata datos personales suyos y, si es así, tiene derecho a acceder a estos datos, así como a obtener información al respecto de los tratamientos realizados.",
      "Rectificación: Está vinculado al carácter de inexactitud o incompleto de los datos. El interesado tiene derecho a rectificar sus datos personales inexactos y que se completen sus datos personales incompletos.",
      "Supresión: El interesado tiene derecho a obtener la supresión de sus datos personales («derecho al olvido»), cuando estos ya no son necesarios para la finalidad para la cual se recogieron, se revoca el consentimiento en el cual se basaba el tratamiento, el interesado se opone al tratamiento, los datos se han tratado ilícitamente, se tienen que suprimir para cumplir una obligación legal o se han obtenido en relación con la oferta de servicios de la sociedad de la información dirigida a menores.",
      "Limitación del tratamiento: es un derecho de la persona interesada consistente en marcar sus datos de carácter personal conservados con la finalidad de limitar el tratamiento en el futuro. La limitación del tratamiento supone que, a petición de la persona interesada, sus datos personales indicados se dejen de tratar.",
      "Oposición: el interesado tiene derecho a oponerse al tratamiento de sus datos cuando se base en algunos supuestos concretos y se invoque un motivo relacionado con su situación personal.",
      "Portabilidad de los datos: el interesado tiene derecho a recibir sus datos personales facilitados al responsable del tratamiento en un formato estructurado, de uso común y de lectura mecánica, si se basa en el consentimiento o en un contrato o cuando el tratamiento se realiza por medios automatizados.",
      "A no ser objeto de decisiones individuales automatizadas: el interesado tiene derecho a no ser objeto de una decisión basada en el tratamiento automatizado de sus datos, incluida la elaboración de perfiles que produzca efectos jurídicos en él o que le afecte negativamente.",
    ] },
    { type: "paragraph", text: "Si desea ejercitar sus derechos de acceso, rectificación o supresión, la limitación del tratamiento U oponer-se, así como el derecho a la portabilidad de los datos, puede dirigirse a: C/ Major, 42 17410 Sils (Girona) o bien, enviar un correo electrónico a info@nimbustelecom.cat" },
    { type: "paragraph", text: "Asimismo, también podrá presentar una reclamación ante la Agencia Española de Protección de Datos." },
    { type: "heading", text: "PROPIEDAD INDUSTRIAL E INTELECTUAL" },
    { type: "paragraph", text: "Esta web es propiedad de NIMBUS TELECOM S.L.. Los derechos de Propiedad Intelectual y derechos de explotación y reproducción de esta web, de sus páginas, pantallas, la Información que contienen, su apariencia y diseño, así como los vínculos («hiperlinks») que se establezcan desde ella a otras páginas web de cualquier sociedad filial y/o dominada de NIMBUS TELECOM S.L., son propiedad exclusiva de ésta, salvo que expresamente se especifique otra cosa." },
    { type: "paragraph", text: "Cualquier denominación, diseño y/o logotipo, así como cualquier producto o servicio ofrecidos y reflejados en esta página web, son marcas debidamente registradas por NIMBUS TELECOM S.L., por sus sociedades filiales y/o dominadas o por terceros." },
    { type: "paragraph", text: "Cualquier uso indebido de las mismas por personas diferentes de su legítimo titular y sin el consentimiento expreso e inequívoco por parte de éste podrá ser denunciado y perseguido a través de todos los medio legales existentes en el Ordenamiento Jurídico español y/o comunitario." },
    { type: "paragraph", text: "Los derechos de propiedad intelectual y marcas de terceros están destacados convenientemente y deben ser respetados por todo aquél que acceda a esta página, no siendo responsabilidad de NIMBUS TELECOM S.L. el uso que EL USUARIO pueda llevar a cabo al respecto, recayendo la responsabilidad exclusiva en su persona." },
    { type: "paragraph", text: "Sólo para uso personal y privado se permite descargar los contenidos, copiar o imprimir cualquier página de esta web. Queda prohibido reproducir, transmitir, modificar o suprimir la información, contenido o advertencias de esta web sin la previa autorización por escrito de NIMBUS TELECOM S.L." },
    { type: "paragraph", text: "NIMBUS TELECOM S.L. no transfiere a los usuarios la propiedad de su software. El usuario es el propietario del soporte en el cual el software es grabado. NIMBUS TELECOM S.L. posee todos los derechos de propiedad industrial e intelectual, incluyendo el software. Si el usuario transfiere el software de este website a su terminal, no podrá diseccionar para su estudio y descompilar, traducir la versión del código objeto original o su lenguaje a otro código o lenguaje." },
    { type: "heading", text: "LEY APLICABLE Y JURISDICCIÓN" },
    { type: "paragraph", text: "Las presentes condiciones generales se rigen por la Legislación española, siendo competentes los Juzgados y Tribunales españoles para conocer de cuantas cuestiones se susciten sobre la interpretación, aplicación e cumplimiento de las mismas. EL USUARIO, por virtud de su aceptación a las condiciones generales recogidas en este aviso legal, renuncia expresamente a cualquier fuero que, por aplicación de la Ley de Enjuiciamiento Civil vigente pudiera corresponderle." },
  ],
};

export const politicaCookies: LegalDocument = {
  slug: "politica-de-cookies",
  title: "Política de cookies",
  metaDescription: "Política de cookies de Nimbus Telecom S.L.: qué son, para qué se utilizan, tipos empleados y cómo desactivarlas.",
  blocks: [
    { type: "heading", text: "ANTECEDENTES" },
    { type: "paragraph", text: "En conformidad con la normativa española que regula el uso de las cookies en relación a la prestación de servicios de comunicaciones electrónicas, recogida en el Real decreto ley 13/2012 de 30 de marzo, le informamos sobre las cookies utilizadas a la web de NIMBUS TELECOM S.L. (de ahora en lo sucesivo también el prestamista) y el motivo de su uso. Así mismo, le informamos que al navegar en el sitio web usted está prestando su consentimiento para poder utilizarlas." },
    { type: "heading", text: "¿Qué son las cookies?" },
    { type: "paragraph", text: "En inglés, el término “cookie” significa galleta, pero en el ámbito de la navegación web, una “cookie” es algo completamente distinto." },
    { type: "paragraph", text: "Cuando accedes a nuestra web, en el navegador de tu dispositivo se almacena una pequeña cantidad de texto que se denomina “cookie”. Este texto contiene información variada sobre tu navegación, hábitos, preferencias, personalizaciones de contenidos, etc." },
    { type: "paragraph", text: "Existen otras tecnologías que funcionan de manera similar y que también se usan para recopilar datos sobre tu actividad de navegación. Llamaremos “cookies” a todas estas tecnologías en su conjunto." },
    { type: "paragraph", text: "Los usos concretos que hacemos de estas tecnologías se describen en el presente documento." },
    { type: "heading", text: "¿Para qué se utilizan las cookies en esta web?" },
    { type: "paragraph", text: "Las cookies son una parte esencial de cómo funciona nuestro sitio web. El objetivo principal de nuestras cookies es mejorar tu experiencia en la navegación. Por ejemplo, para recordar tus preferencias (idioma, país, etc.) durante la navegación y en futuras visitas. La información recogida en las cookies nos permite además mejorar la web, adaptarla a tus intereses como usuario, acelerar las búsquedas que realices, etc." },
    { type: "paragraph", text: "En determinados casos, si hemos obtenido tu previo consentimiento informado, podremos utilizar cookies para otros usos, como por ejemplo para obtener información que nos permita mostrarte publicidad basada en el análisis de tus hábitos de navegación." },
    { type: "heading", text: "¿Para qué NO se utilizan las cookies en esta web?" },
    { type: "paragraph", text: "En las cookies que utilizamos no se almacena información sensible de identificación personal como tu nombre, dirección, tu contraseña, etc." },
    { type: "heading", text: "¿Quién utiliza la información almacenada en las cookies?" },
    { type: "paragraph", text: "La información almacenada en las cookies de nuestro sitio web es utilizada exclusivamente por nosotros, a excepción de aquellas identificadas más adelante como ‘cookie de terceros’, que son utilizadas y gestionadas por entidades externas que nos proporcionan servicios que mejoran la experiencia del usuario. Por ejemplo las estadísticas que se recogen sobre el número de visitas, el contenido que más gusta, etc. Lo suele gestionar GOOGLE ANALYTICS ." },
    { type: "paragraph", text: "Las cookies de terceros también se suelen utilizar para garantizar las operaciones de pago realizadas a través de la web." },
    { type: "heading", text: "¿Cómo puedo evitar el uso de cookies en este sitio web?" },
    { type: "paragraph", text: "Si prefieres evitar el uso de las cookies, puedes RECHAZAR su uso o puedes CONFIGURAR las que quieres evitar y las que permites utilizar (en este documento te damos información ampliada al respecto de cada tipo de cookie, su finalidad, destinatario, temporalidad, etc.)." },
    { type: "paragraph", text: "Si las has aceptado, no volveremos a preguntarte a menos que borres las cookies en tu dispositivo según se indica en el apartado siguiente." },
    { type: "paragraph", text: "Si quieres revocar el consentimiento tendrás que eliminar las cookies y volver a configurarlas." },
    { type: "heading", text: "¿Cómo deshabilito y elimino la utilización de cookies?" },
    { type: "paragraph", text: "Para restringir, bloquear o borrar las cookies de este sitio web (y las usadas por terceros) puedes hacerlo, en cualquier momento, modificando la configuración de tu navegador. Ten en cuenta que esta configuración es diferente en cada navegador, si bien es habitual encontrar la configuración de cookies en el menú ‘Preferencias’ ‘Herramientas’ “Opciones” y después en “Privacidad y Seguridad” ó en “borrar datos de navegación”, etc." },
    { type: "paragraph", text: "Para más detalle sobre la configuración de las cookies en cada navegador, puedes consultar el menú ‘Ayuda’ del mismo." },
    { type: "heading", text: "¿Qué tipos de cookies se utilizan en esta página web?" },
    { type: "paragraph", text: "Cada página web utiliza sus propias cookies. En nuestra web utilizamos las que se indican a continuación:" },
    { type: "paragraph", text: "SEGÚN LA ENTIDAD QUE LO GESTIONA" },
    { type: "list", items: [
      "Cookies propias: Son aquellas que se envían al equipo terminal del usuario desde un equipo o dominio gestionado por el propio editor y desde el que se presta el servicio solicitado por el usuario.",
      "Cookies de terceros: Son aquellas que se envían al equipo terminal del usuario desde un equipo o dominio que no es gestionado por el editor, sino por otra entidad que trata los datos obtenidos través de las cookies.",
    ] },
    { type: "paragraph", text: "En el caso de que las cookies sean servidas desde un equipo o dominio gestionado por el propio editor, pero la información que se recoja mediante estas sea gestionada por un tercero, no pueden ser consideradas como cookies propias si el tercero las utiliza para sus propias finalidades (por ejemplo, la mejora de los servicios que presta o la prestación de servicios de carácter publicitario a favor de otras entidades)." },
    { type: "paragraph", text: "SEGÚN SU FINALIDAD" },
    { type: "list", items: [
      "Cookies técnicas: Son aquellas necesarias para la navegación y el buen funcionamiento de nuestra página web, como por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder a partes de acceso restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido, gestionar el pago, controlar el fraude vinculado a la seguridad del servicio, realizar la solicitud de inscripción o participación en un evento, contar visitas a efectos de la facturación de licencias del software con el que funciona el servicio (sitio web, plataforma o aplicación), utilizar elementos de seguridad durante la navegación, almacenar contenidos para la difusión de vídeos o sonido, habilitar contenidos dinámicos (por ejemplo, animación de carga de un texto o imagen) o compartir contenidos a través de redes sociales.",
      "Cookies de análisis: Permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado. Para ello se analiza su navegación en nuestra página web con el fin de mejorar la oferta de productos o servicios que le ofrecemos.",
      "Cookies de preferencias o personalización: Son aquellas que permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios, como, por ejemplo, el idioma, el número de resultados a mostrar cuando el usuario realiza una búsqueda, el aspecto o contenido del servicio en función del tipo de navegador a través del cual el usuario accede al servicio o de la región desde la que accede al servicio, etc.",
      "Publicitarias comportamentales: Son aquellas que, tratadas por nosotros o por terceros, nos permiten analizar sus hábitos de navegación en Internet para que podamos mostrarle publicidad relacionada con su perfil de navegación.",
    ] },
    { type: "paragraph", text: "SEGÚN EL PLAZO DE TIEMPO QUE PERMANECEN ACTIVADAS" },
    { type: "list", items: [
      "Cookies de sesión: Son aquellas diseñadas para recabar y almacenar datos mientras el usuario accede a una página web. Se suelen emplear para almacenar información que solo interesa conservar para la prestación del servicio solicitado por el usuario en una sola ocasión (por ejemplo, una lista de productos adquiridos) y desaparecen al terminar la sesión.",
      "Cookies persistentes: Son aquellas en las que los datos siguen almacenados en el terminal y pueden ser accedidos y tratados durante un periodo definido por el responsable de la cookie, y que puede ir de unos minutos a varios años. A este respecto debe valorarse específicamente si es necesaria la utilización de cookies persistentes, puesto que los riesgos para la privacidad podrían reducirse mediante la utilización de cookies de sesión. En todo caso, cuando se instalen cookies persistentes, se recomienda reducir al mínimo necesario su duración temporal atendiendo a la finalidad de su uso. A estos efectos, el Dictamen 4/2012 del GT29 indicó que para que una cookie pueda estar exenta del deber de consentimiento informado, su caducidad debe estar relacionada con su finalidad. Debido a ello, es mucho más probable que se consideren como exceptuadas las cookies de sesión que las persistentes.",
    ] },
  ],
};

export const declaracionAccesibilidad: LegalDocument = {
  slug: "declaracion-de-accesibilidad",
  title: "Declaración de accesibilidad",
  metaDescription: "Declaración de accesibilidad de Nimbus Telecom S.L.: normativa aplicada, medidas adoptadas y canal de contacto.",
  blocks: [
    { type: "paragraph", text: "Nuestra empresa apuesta por la responsabilidad social corporativa al estar convencida de que su comportamiento ético y su compromiso social y medioambiental, además de responder a imperativos de equidad y justicia, son también rentables al traducirse en una mejora del clima laboral y generar vínculos de reciprocidad y aceptación en el entorno. Por estas razones en el sitio web se han adoptado una serie de medidas con el objetivo de garantizar la accesibilidad de los contenidos, con el fin de:" },
    { type: "list", items: [
      "Facilitar el acceso de los usuarios independientemente de sus capacidades o de su entorno.",
      "Permitir el acceso con diferentes agentes de usuario.",
      "Incluir contenidos claros y bien estructurados.",
      "Mejorar la navegación y la experiencia del usuario.",
    ] },
    { type: "heading", text: "Normativa aplicada" },
    { type: "paragraph", text: "Las páginas de este sitio web han sido desarrolladas cumpliendo el Nivel AA según la Norma UNE-EN 301549:2022 (WCAG 2.1), que a su vez se basa en las Directrices de Accesibilidad para el Contenido Web 2.0 del W3C. Todos los requisitos de Prioridad 1 y Prioridad 2 han sido comprobados por analistas expertos en accesibilidad a través de análisis manuales de la accesibilidad, complementados a través de diferentes herramientas semiautomáticas, agentes de usuario y ayudas técnicas." },
    { type: "heading", text: "Medidas adoptadas" },
    { type: "paragraph", text: "Se han adoptado las siguientes medidas:" },
    { type: "list", items: [
      "Separación de contenido y presentación: Uso de hojas de estilo (CSS) para la presentación de la información y de código HTML para su correcta estructuración. La maquetación se adapta correctamente a los agentes de usuario más extendidos y el tamaño de las fuentes se ha definido en medidas relativas para permitir su redimensionamiento.",
      "Alternativa a elementos no textuales: Para cualquier elemento no textual se han incluido las alternativas necesarias de forma que ningún usuario encuentre barreras de acceso a los contenidos.",
      "Mecanismos de navegación adecuados: Los enlaces ofrecen detalles de la función o destino del hipervínculo. Se ofrecen mecanismos de interacción que facilitan al usuario la localización de información y la orientación a través del sitio.",
      "Empleo correcto de los estándares: Los documentos del portal se han construido en base a las especificaciones del W3C, el organismo que marca los estándares internacionales que se deben usar en la web.Los documentos son válidos y ofrecen el marcado adecuado para cada tipología de contenido.",
      "Objetos programados: No se emplean objetos programados para presentar la información ni ofrecer funcionalidades importantes. Esto permite navegar por el sitio independientemente de las tecnologías disponibles en el agente de usuario.",
      "Accesibilidad de los pdf´s: Ciertos pdf´s publicados en nuestra web, no disponen de una estructura accesible debido a imposibilidades técnicas. En tal caso y, si existe necesidad, pueden escribir a nuestra sección de contacto y solicitarnos el documento.",
    ] },
    { type: "heading", text: "Contacto" },
    { type: "paragraph", text: "Cualquier queja, consulta o sugerencia de mejora sobre la accesibilidad del portal web se podrá canalizar a través de cualquiera de los medios disponibles en la sección de contacto del portal." },
    { type: "heading", text: "Última revisión de Accesibilidad" },
    { type: "paragraph", text: "Mayo de 2024" },
  ],
};

export const LEGAL_DOCUMENTS = {
  "aviso-legal": avisoLegal,
  "politica-de-privacidad": politicaPrivacidad,
  "politica-de-cookies": politicaCookies,
  "declaracion-de-accesibilidad": declaracionAccesibilidad,
} as const;
