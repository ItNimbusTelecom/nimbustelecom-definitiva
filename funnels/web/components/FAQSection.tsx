"use client";

import { useId, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { openChatbase } from "@/lib/chatbase";
import { useI18n } from "@/lib/i18n";
import { VisualIcon } from "./VisualIcon";

/**
 * POR QUE LAS RESPUESTAS SE VEN EN LA PAGINA
 *
 * Antes esta seccion solo mostraba las preguntas: al hacer clic se abria el
 * chat de Chatbase con la pregunta escrita y la respuesta se leia alli. Las
 * respuestas existian —estan redactadas en los tres idiomas en lib/i18n.tsx,
 * faq.items— pero no se pintaban en ningun sitio.
 *
 * Eso tenia dos costes que no se veian:
 *
 *   1. Google solo indexaba los titulos. Diez preguntas que la gente busca
 *      literalmente ("¿tiene permanencia?", "¿tengo que cambiar de numero?")
 *      y ninguna respuesta que posicionar.
 *   2. Los asistentes de IA tampoco podian leerlas, asi que no podian citar a
 *      Nimbus al responder esas mismas dudas.
 *
 * Y sobre todo: el marcado FAQPage (el JSON-LD de mas abajo, que es lo que
 * hace que Google despliegue las preguntas en los resultados) EXIGE que el
 * contenido marcado sea visible en la pagina. Marcar respuestas que nadie
 * puede leer es motivo de accion manual por parte de Google.
 *
 * Por eso el acordeon: la respuesta se ve, el marcado es legitimo, y el chat
 * sigue estando a un clic dentro de cada respuesta para quien quiera mas.
 *
 * SI ALGUIEN QUIERE VOLVER A LA VERSION DE SOLO PREGUNTAS: hay que quitar
 * tambien el JSON-LD de aqui abajo, o el marcado se queda apuntando a un
 * contenido que ya no se ve.
 */
export function FAQSection() {
  const { dictionary } = useI18n();
  const [abiertas, setAbiertas] = useState<ReadonlySet<number>>(new Set());
  const idBase = useId();

  function alternar(indice: number, pregunta: string) {
    setAbiertas((previas) => {
      const siguientes = new Set(previas);
      if (siguientes.has(indice)) {
        siguientes.delete(indice);
      } else {
        siguientes.add(indice);
        trackEvent("faq_item_opened", { question: pregunta });
      }
      return siguientes;
    });
  }

  function abrirAsistente(pregunta: string) {
    openChatbase(pregunta);
    trackEvent("faq_chat_opened", { question: pregunta });
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dictionary.faq.items.map(([pregunta, respuesta]) => ({
      "@type": "Question",
      name: pregunta,
      acceptedAnswer: { "@type": "Answer", text: respuesta },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-24 bg-nimbus-soft py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto max-w-3xl px-5">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">{dictionary.faq.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {dictionary.faq.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">{dictionary.faq.subtitle}</p>
        </div>

        <div className="mt-10 divide-y divide-nimbus-line overflow-hidden rounded-lg border border-nimbus-line bg-white">
          {dictionary.faq.items.map(([pregunta, respuesta], indice) => {
            const abierta = abiertas.has(indice);
            const idPanel = `${idBase}-faq-${indice}`;
            const idBoton = `${idPanel}-boto`;

            return (
              <div key={pregunta}>
                <h3>
                  <button
                    id={idBoton}
                    type="button"
                    aria-expanded={abierta}
                    aria-controls={idPanel}
                    onClick={() => alternar(indice, pregunta)}
                    className="group flex w-full items-start justify-between gap-4 p-5 text-left transition hover:bg-orange-50/60 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nimbus-orange"
                  >
                    <span className="text-base font-black leading-6 text-nimbus-ink transition group-hover:text-nimbus-orange">
                      {pregunta}
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange"
                    >
                      <VisualIcon name={abierta ? "chevron-up" : "chevron-down"} className="size-4" />
                    </span>
                  </button>
                </h3>

                {/* El panel se mantiene en el DOM y solo se oculta: asi el
                    contenido esta en el HTML exportado, que es lo que leen el
                    buscador y los asistentes, y coincide con lo que marca el
                    JSON-LD. */}
                <div id={idPanel} role="region" aria-labelledby={idBoton} hidden={!abierta} className="px-5 pb-5">
                  <p className="leading-7 text-nimbus-muted">{respuesta}</p>
                  <button
                    type="button"
                    onClick={() => abrirAsistente(pregunta)}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-black text-nimbus-ink underline decoration-orange-300 underline-offset-4 transition hover:text-nimbus-orange"
                  >
                    <VisualIcon name="message-circle" className="size-4 text-nimbus-orange" />
                    {dictionary.faq.assistantCta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-lg border border-orange-100 bg-white p-6 md:flex md:items-center md:justify-between md:gap-8">
          <p className="text-xl font-black text-nimbus-ink">{dictionary.faq.ctaText}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <a
              href="#formulari"
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {dictionary.faq.studyCta}
            </a>
            <a
              href="#tarifes"
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              {dictionary.faq.plansCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
