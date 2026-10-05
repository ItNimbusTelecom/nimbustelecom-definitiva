/**
 * Programa de referits «Amics de la fibra Nimbus» (campanya fibra oct–des
 * 2026). Els textos i les bases surten de la pagina de la campanya a Notion;
 * si alla canvia alguna cosa, es canvia aqui.
 *
 * Nomes en catala: es el desti del SMS i del email de referits, que surten en
 * catala. Les pagines d'internet en castella i angles hi enllacen igualment.
 */

export const AMICS_META = {
  title: "Amics de la fibra: un mes gratis per cada amic | Nimbus Telecom",
  description:
    "Per cada amic que contracti la fibra de Nimbus dient el teu nom i el teu mòbil, tens un mes gratis. Sense límit, fins al 31 de desembre de 2026.",
};

export const AMICS_HERO = {
  eyebrow: "Amics de la fibra Nimbus",
  title: "Un mes gratis per cada amic que porti la fibra a Nimbus",
  text: "Fins al 31 de desembre, per cada amic, familiar o veí que contracti la fibra de Nimbus i ens digui el teu nom i el teu mòbil, tu tens un mes gratis.",
  highlight: "Sense límit: si en venen tres, són tres mesos gratis, un darrere l'altre.",
};

export const AMICS_STEPS = [
  {
    title: "Explica-li que ets client de Nimbus",
    text: "A un amic, a un familiar o a un veí que vulgui fibra a casa.",
  },
  {
    title: "Quan contracti, que ens digui el teu nom i el teu mòbil",
    text: "Res més: ni codis ni el DNI de ningú. Ha de ser en el moment de l'alta.",
  },
  {
    title: "Nosaltres t'apliquem el mes gratis",
    text: "El descompte cau a la teva factura següent. Si en porta més d'un, els mesos s'encadenen.",
  },
];

export const AMICS_FRIEND = {
  eyebrow: "Si t'han recomanat",
  title: "Contracta la fibra i digues qui t'ha recomanat",
  text: "Pots contractar trucant, per WhatsApp o a la nostra oficina de Sils. Quan ho facis, digues-nos el nom i el mòbil de qui t'ha parlat de nosaltres: s'ha de dir en el moment de l'alta, després ja no es pot afegir.",
  coverageCta: "Comprova si la fibra arriba a casa teva",
};

export type AmicsBase = { title: string; text: string };

export const AMICS_BASES_TITLE = "Amics de la fibra Nimbus — Bases de la promoció";

export const AMICS_BASES: AmicsBase[] = [
  {
    title: "Qui pot recomanar",
    text: "Qualsevol titular d'un contracte actiu amb Nimbus Telecom i al corrent de pagament.",
  },
  {
    title: "Qui és un client nou",
    text: "La persona que dona d'alta un servei de fibra òptica de Nimbus, sol o en pack, en una adreça amb cobertura, i que no n'era client de fibra.",
  },
  {
    title: "Com funciona",
    text: "En contractar, el client nou ens diu el nom i el mòbil de qui l'ha recomanat. S'ha de dir en el moment de l'alta; no s'accepten recomanacions posteriors.",
  },
  {
    title: "El premi",
    text: "Per cada client nou, qui recomana té un mes gratis, és a dir, un descompte del 100 % de la quota mensual d'un dels seus contractes amb Nimbus (el de fibra, si en té), aplicat a la seva factura següent.",
  },
  {
    title: "Sense límit",
    text: "Cada recomanació suma un mes més. Els mesos s'apliquen un darrere l'altre.",
  },
  {
    title: "Només en descompte",
    text: "El premi no es pot canviar per diners ni cedir a una altra persona. Si qui recomana es dona de baixa, perd els mesos pendents.",
  },
  {
    title: "Desistiment",
    text: "Si el client nou desisteix del contracte dins dels 14 dies, no hi ha premi.",
  },
  {
    title: "Vigència",
    text: "Altes fetes de l'1 d'octubre al 31 de desembre de 2026.",
  },
  {
    title: "Altres promocions",
    // Decidit a la reunio del 02/10: compatible amb les altres promocions.
    text: "El client nou no té premi propi. El mes gratis és compatible amb les altres promocions que tingui qui recomana.",
  },
  {
    title: "Dades",
    text: "El nom i el mòbil de qui recomana només s'utilitzen per identificar-lo i aplicar-li el descompte.",
  },
  {
    title: "Canvis",
    text: "Nimbus Telecom pot modificar o finalitzar la promoció avisant-ho en aquesta pàgina. Les recomanacions ja fetes es respecten.",
  },
];
