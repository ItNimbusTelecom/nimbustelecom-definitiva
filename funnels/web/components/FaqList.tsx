"use client";

import { useId, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { VisualIcon } from "./VisualIcon";

/**
 * Lista de preguntas frecuentes en una sola columna, con el mismo aspecto
 * que la FAQ de Mobil (components/FAQSection.tsx): un bloque blanco con
 * separadores, la pregunta a la izquierda y el circulo naranja a la derecha.
 *
 * La usan Internet, Seguretat y las paginas de servicio de empreses. Antes
 * cada una tenia su propio FaqItem en dos columnas; se unifico para que todas
 * las FAQ de la web se vean igual.
 *
 * La respuesta se queda en el HTML y solo se oculta: asi la leen el buscador
 * y los asistentes, y coincide con el marcado FAQPage de cada pagina.
 */
export function FaqList({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
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

  return (
    <div className="mt-10 divide-y divide-nimbus-line overflow-hidden rounded-lg border border-nimbus-line bg-white">
      {items.map(([pregunta, respuesta], indice) => {
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
            <div id={idPanel} role="region" aria-labelledby={idBoton} hidden={!abierta} className="px-5 pb-5">
              <p className="leading-7 text-nimbus-muted">{respuesta}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
