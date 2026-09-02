"use client";

import { useEffect, useRef, useState } from "react";
import { VisualIcon } from "@/components/VisualIcon";
import type { BusinessContent } from "@/lib/business";

type ServiceItem = BusinessContent["services"]["items"][number];

const SIZE = 620;
const CENTER = SIZE / 2;
const RADIUS = 230;
const CARD_WIDTH = 150;
const HUB_SIZE = 142;
/** Milisegundos por vuelta completa. Gira siempre en bucle salvo cuando el
 * raton esta encima o hay una tarjeta abierta. */
const DURATION_MS = 120000;

function baseAngleFor(index: number, total: number) {
  return -90 + (360 / total) * index;
}

/**
 * Rueda animada de servicios para /empreses/.
 *
 * - Gira en bucle continuo (translate calculado con requestAnimationFrame,
 *   redondeado a cuarto de pixel). Solo icono + titulo mientras gira.
 * - Al poner el raton por encima de la rueda, se PARA (asi si alguien
 *   quiere leer un titulo con calma, esta quieto y nitido).
 * - Al hacer clic en una tarjeta, se abre en grande con el titulo Y el
 *   texto completo (que en la vista en miniatura no se muestra, solo aqui,
 *   porque aqui esta siempre estatico - nunca se ve borroso). El resto de
 *   la rueda queda difuminado detras. Se cierra con la X o tocando fuera,
 *   y la rueda sigue parada hasta que el raton sale de la zona.
 *
 * IMPORTANTE: el `transform` de lineas y tarjetas NO vive en el `style` de
 * React (JSX) - lo pone este efecto, escribiendo directo en el DOM via
 * ref, para que React nunca lo reescriba en un re-render ajeno a la rueda.
 * El tiempo pausado se descuenta del calculo (`totalPausedMs`) para que al
 * reanudar seguya exactamente desde donde se quedo, sin saltos.
 *
 * Solo se muestra en pantallas grandes (`hidden lg:block`); en movil se usa
 * la cuadricula estatica de siempre (con el texto descriptivo completo),
 * que el componente que la llama renderiza en paralelo con `lg:hidden`.
 */
export function ServicesWheel({ items, hubLabel }: { items: ServiceItem[]; hubLabel: string }) {
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const isPaused = isHovering || expandedIndex !== null;
  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    let frameId: number;
    const start = performance.now();
    let totalPausedMs = 0;
    let pauseStartedAt: number | null = null;

    function tick(now: number) {
      if (isPausedRef.current) {
        if (pauseStartedAt === null) pauseStartedAt = now;
        frameId = requestAnimationFrame(tick);
        return;
      }
      if (pauseStartedAt !== null) {
        totalPausedMs += now - pauseStartedAt;
        pauseStartedAt = null;
      }

      const elapsed = now - start - totalPausedMs;
      const progress = (elapsed % DURATION_MS) / DURATION_MS;
      const rotation = progress * 360;

      items.forEach((_, index) => {
        const angle = baseAngleFor(index, items.length) + rotation;
        const rad = (angle * Math.PI) / 180;
        const x = Math.round(RADIUS * Math.cos(rad) * 4) / 4;
        const y = Math.round(RADIUS * Math.sin(rad) * 4) / 4;

        const line = lineRefs.current[index];
        if (line) line.style.transform = `rotate(${angle}deg)`;

        const card = cardRefs.current[index];
        if (card) card.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      });

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [items]);

  const expandedItem = expandedIndex !== null ? items[expandedIndex] : null;

  return (
    <div
      className="relative mx-auto hidden lg:block"
      style={{ width: SIZE, height: SIZE }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0">
        {items.map((item, index) => (
          <div key={item.title}>
            <div
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className="absolute"
              style={{
                left: CENTER,
                top: CENTER,
                width: RADIUS,
                height: 2,
                backgroundColor: "rgba(234, 106, 30, 0.5)",
                transformOrigin: "0 50%",
              }}
            />
            <button
              type="button"
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => setExpandedIndex(index)}
              className="absolute cursor-pointer text-left"
              style={{ left: CENTER, top: CENTER, width: CARD_WIDTH, willChange: "transform" }}
            >
              <div
                className="rounded-lg border-2 border-nimbus-orange bg-nimbus-ink p-4 text-center shadow-soft transition hover:scale-105"
                style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
              >
                <span className="mx-auto mb-2 grid size-10 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                  <VisualIcon name={item.icon} className="size-5" />
                </span>
                <p className="font-black text-white">{item.title}</p>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div
        className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-nimbus-orange bg-nimbus-orange p-4 text-center shadow-soft"
        style={{ width: HUB_SIZE, height: HUB_SIZE }}
      >
        <VisualIcon name="building" className="size-7 text-white" />
        <p className="mt-1.5 text-base font-black leading-tight text-white">{hubLabel}</p>
      </div>

      {expandedItem ? (
        <div className="absolute inset-0 z-20 grid place-items-center rounded-full">
          <button
            type="button"
            onClick={() => setExpandedIndex(null)}
            aria-label="Tancar"
            className="absolute -inset-16 bg-white/90 backdrop-blur-md"
          />
          <div className="relative z-10 w-80 max-w-[85%] rounded-lg border-2 border-nimbus-orange bg-nimbus-ink p-6 text-center shadow-soft">
            <button
              type="button"
              onClick={() => setExpandedIndex(null)}
              aria-label="Tancar"
              className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <VisualIcon name="x" className="size-4" />
            </button>
            <span className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
              <VisualIcon name={expandedItem.icon} className="size-6" />
            </span>
            <p className="text-lg font-black text-white">{expandedItem.title}</p>
            <p className="mt-3 text-sm leading-6 text-white">{expandedItem.text}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
