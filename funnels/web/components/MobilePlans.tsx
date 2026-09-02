"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { MOBILE_PLANS, type MobilePlan } from "@/lib/plans";
import { DirectContractModal } from "./DirectContractModal";
import { VisualIcon } from "./VisualIcon";

/** Cada cuanto avanza solo, antes de que el usuario toque nada (ms). */
const AUTOPLAY_INTERVAL_MS = 5000;
/** Separacion entre tarjetas (px). */
const GAP_PX = 20;
/** Juegos de tarjetas renderizados. El del medio es el "real"; los otros dos
 * son copias que permiten el bucle sin que se vea el salto. */
const SETS = 3;
/** Pixeles de movimiento a partir de los cuales un clic se considera arrastre. */
const DRAG_CANCEL_CLICK_PX = 4;
/** Tiempo minimo entre dos avances con la rueda (ms). Evita que un giro
 * largo dispare veinte pasos seguidos y el carrusel se desboque. */
const WHEEL_COOLDOWN_MS = 320;
/** Por encima de este delta el giro se considera fuerte y avanza dos tarjetas. */
const WHEEL_STRONG_DELTA = 150;
/** A partir de estos pixeles el gesto es un arrastre y capturamos el puntero. */
const DRAG_CAPTURE_PX = 5;
/** Pixeles minimos de arrastre para que cuente como un avance. Un gesto de
 * arrastre siempre mueve una sola tarjeta, por larga que sea la tirada: asi
 * no se saltan tarifas sin querer. */
const DRAG_STEP_THRESHOLD_PX = 45;
/** Cuantas tarjetas a cada lado del centro van a tamano completo. */
const FULL_SIZE_DEPTH = 1;
/** Escala y opacidad de las tarjetas de fuera de la zona central. */
const OUTER_SCALE = 0.88;
const OUTER_OPACITY = 0.5;
function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

const DESKTOP_CARD = { width: 330, height: 430 };
const MOBILE_CARD = { width: 280, height: 470 };

export function MobilePlans() {
  const [selectedPlan, setSelectedPlan] = useState<MobilePlan | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isDragging = useRef(false);
  const dragMoved = useRef(0);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const snapRestoreTimer = useRef<number | null>(null);
  const hasCapture = useRef(false);
  const lastWheelAt = useRef(0);
  const { dictionary } = useI18n();

  const total = MOBILE_PLANS.length;
  const card = isMobile ? MOBILE_CARD : DESKTOP_CARD;
  const stepWidth = card.width + GAP_PX;
  const setWidth = stepWidth * total;

  useEffect(() => {
    function checkViewport() {
      setIsMobile(window.innerWidth < 768);
    }

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  /** Salta un juego entero de tarjetas sin que se note: durante el salto hay
   * que desactivar el snap y el scroll suave, o el navegador pelea contra el. */
  const jumpBy = useCallback((track: HTMLDivElement, delta: number) => {
    track.style.scrollSnapType = "none";
    track.style.scrollBehavior = "auto";
    track.scrollLeft += delta;

    // Si el salto ocurre a media pasada hay que correr tambien el origen del
    // gesto: si no, el siguiente pointermove devuelve el carril a la posicion
    // vieja y el arrastre se queda encallado justo en la costura del bucle.
    if (isDragging.current) {
      dragStartScroll.current += delta;
      return;
    }

    requestAnimationFrame(() => {
      track.style.scrollSnapType = "";
      track.style.scrollBehavior = "";
    });
  }, []);

  /** Dibuja el coverflow a partir de la posicion real del scroll. Se escribe
   * directo en el DOM en cada frame: pasar por el estado de React re-renderiza
   * todas las tarjetas y es justo lo que hace que se vea a saltos. La escala se
   * interpola, asi que una tarjeta a medio camino se dibuja a media escala. */
  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track || setWidth === 0) return;

    // Bucle: si nos hemos salido del juego central, saltamos al equivalente.
    if (track.scrollLeft < setWidth * 0.5) {
      jumpBy(track, setWidth);
      return;
    }
    if (track.scrollLeft > setWidth * 1.5) {
      jumpBy(track, -setWidth);
      return;
    }

    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let nearest: HTMLElement | null = null;
    let nearestDistance = Infinity;

    for (const element of cardRefs.current) {
      if (!element) continue;

      const elementCenter = element.offsetLeft + element.offsetWidth / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const depth = distance / stepWidth;
      const fade = clamp01(depth - FULL_SIZE_DEPTH);

      element.style.transform = `scale(${1 - (1 - OUTER_SCALE) * fade})`;
      element.style.opacity = `${1 - (1 - OUTER_OPACITY) * fade}`;

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = element;
      }
    }

    for (const element of cardRefs.current) {
      if (!element) continue;
      element.classList.toggle("border-nimbus-orange", element === nearest);
      element.classList.toggle("border-nimbus-line", element !== nearest);
    }
  }, [jumpBy, setWidth, stepWidth]);

  useEffect(() => {
    return () => {
      if (snapRestoreTimer.current) window.clearTimeout(snapRestoreTimer.current);
    };
  }, []);

  // Repintar si cambia el tamano de tarjeta al pasar a movil o escritorio.
  useEffect(() => {
    paint();
  }, [isMobile, paint]);

  // Posicion inicial: primera tarjeta del juego central.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || setWidth === 0) return;

    track.style.scrollBehavior = "auto";
    track.scrollLeft = setWidth;
    track.style.scrollBehavior = "";
    paint();
  }, [setWidth, paint]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [paint]);

  // Rueda del raton: solo mueve el carrusel si el puntero esta sobre la zona
  // de las tres tarjetas centrales. Fuera de ahi la pagina baja con normalidad,
  // que es la valvula de escape (con bucle infinito no hay extremo que suelte).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onWheel(event: WheelEvent) {
      if (!track) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const rect = track.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centralZoneHalfWidth = stepWidth * (FULL_SIZE_DEPTH + 0.5);
      if (Math.abs(event.clientX - centerX) > centralZoneHalfWidth) return;

      event.preventDefault();

      // Avance por pasos, no scroll libre: un giro normal mueve una tarjeta y
      // uno fuerte dos, con un tiempo minimo entre pasos. Asi se controla
      // cuanto avanza cada gesto en vez de depender de la inercia del raton.
      const now = performance.now();
      if (now - lastWheelAt.current < WHEEL_COOLDOWN_MS) return;
      lastWheelAt.current = now;

      setHasInteracted(true);
      const cards = Math.abs(event.deltaY) > WHEEL_STRONG_DELTA ? 2 : 1;
      track.scrollBy({ left: Math.sign(event.deltaY) * cards * stepWidth, behavior: "smooth" });
    }

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      track.removeEventListener("wheel", onWheel);
    };
  }, [stepWidth]);

  const scrollByCards = useCallback(
    (amount: number) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollBy({ left: amount * stepWidth, behavior: "smooth" });
    },
    [stepWidth],
  );

  // Gira solo hasta que el usuario toca algo: aqui se comparan precios y mover
  // la tarjeta mientras alguien decide molesta.
  useEffect(() => {
    if (hasInteracted || total <= 1) return;

    const intervalId = setInterval(() => scrollByCards(1), AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [hasInteracted, scrollByCards, total]);

  function step(direction: -1 | 1) {
    setHasInteracted(true);
    scrollByCards(direction);
  }

  // Arrastre (dedo o raton): el carril se mueve 1:1 con el gesto, asi que todas
  // las tarjetas se deslizan juntas y las escalas se recalculan en vivo. El
  // recorrido esta limitado a una tarjeta, de modo que por mucho que tires
  // nunca se salta ninguna: al soltar, engancha a la de al lado o vuelve.
  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;

    isDragging.current = true;
    dragMoved.current = 0;
    dragStartX.current = event.clientX;
    dragStartScroll.current = track.scrollLeft;
    setHasInteracted(true);

    // Un gesto encadenado puede pillar vivo el temporizador del anterior: si
    // salta a media pasada, devuelve el snap y el arrastre da un tiron seco.
    if (snapRestoreTimer.current) {
      window.clearTimeout(snapRestoreTimer.current);
      snapRestoreTimer.current = null;
    }

    // Sin esto el snap devuelve el carril a su sitio en cada pixel de arrastre.
    track.style.scrollSnapType = "none";
    track.style.scrollBehavior = "auto";

    hasCapture.current = false;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!isDragging.current || !track) return;

    const travelled = event.clientX - dragStartX.current;
    dragMoved.current = Math.abs(travelled);

    // Capturamos el puntero solo cuando ya hay arrastre de verdad. Capturar
    // desde el pointerdown desviaba el pointerup del boton de solicitar al
    // carril, y el click nunca llegaba a dispararse (solo con raton: en tactil
    // no capturamos y por eso ahi si funcionaba).
    if (!hasCapture.current && event.pointerType === "mouse" && dragMoved.current > DRAG_CAPTURE_PX) {
      event.currentTarget.setPointerCapture(event.pointerId);
      hasCapture.current = true;
    }

    // Tope de una tarjeta a cada lado. Mas alla el carril deja de seguir,
    // que es lo que impide saltarse tarifas con un gesto largo.
    const clamped = Math.max(-stepWidth, Math.min(stepWidth, travelled));
    track.scrollLeft = dragStartScroll.current - clamped;
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (hasCapture.current && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    hasCapture.current = false;

    const track = trackRef.current;
    if (!track) return;

    const travelled = event.clientX - dragStartX.current;
    const passedThreshold = Math.abs(travelled) >= DRAG_STEP_THRESHOLD_PX;
    const target = passedThreshold
      ? dragStartScroll.current + (travelled < 0 ? stepWidth : -stepWidth)
      : dragStartScroll.current;

    // Devolvemos el snap despues de colocar: si lo activamos antes, pelea
    // contra el desplazamiento animado.
    track.scrollTo({ left: target, behavior: "smooth" });
    snapRestoreTimer.current = window.setTimeout(() => {
      track.style.scrollBehavior = "";
      track.style.scrollSnapType = "";
      snapRestoreTimer.current = null;
    }, 400);
  }

  function openPlan(plan: MobilePlan) {
    if (dragMoved.current > DRAG_CANCEL_CLICK_PX) return;
    trackEvent("tarifa_movil_card_clicked", { plan_id: plan.id, plan_name: plan.name });
    trackEvent("contratacion_modal_opened", { plan_id: plan.id, plan_name: plan.name });
    setSelectedPlan(plan);
  }

  return (
    <section id="tarifes" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">{dictionary.plans.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {dictionary.plans.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">{dictionary.plans.text}</p>
          <p className="mt-5 inline-block rounded-lg bg-nimbus-orange px-5 py-3 text-base font-black text-white">
            {dictionary.plans.promoBadge}
          </p>
          <p className="mt-3 text-sm font-bold leading-6 text-nimbus-muted">{dictionary.plans.promoNote}</p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm font-bold text-nimbus-muted">
            <span className="h-px w-8 bg-nimbus-orange" aria-hidden="true" />
            {dictionary.plans.carouselHint}
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={dictionary.plans.scrollLeft}
              className="grid size-11 place-items-center rounded-full border border-nimbus-line bg-white text-nimbus-ink shadow-sm transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              <VisualIcon name="chevron-up" className="size-5 -rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={dictionary.plans.scrollRight}
              className="grid size-11 place-items-center rounded-full border border-nimbus-line bg-white text-nimbus-ink shadow-sm transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              <VisualIcon name="chevron-down" className="size-5 -rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* El carril desborda el ancho de contenido para que las laterales asomen */}
      <div className="relative left-1/2 mt-6 w-[100dvw] -translate-x-1/2">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDragStart={(event) => event.preventDefault()}
          className="flex snap-x snap-mandatory select-none overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            // pan-y: el dedo sigue moviendo la pagina en vertical, pero el
            // desplazamiento horizontal nativo queda desactivado para que lo
            // controlemos nosotros por pasos.
            touchAction: "pan-y",
            gap: GAP_PX,
            paddingInline: `calc(50% - ${card.width / 2}px)`,
            paddingBlock: 24,
          }}
        >
          {Array.from({ length: SETS }).flatMap((_, setIndex) =>
            MOBILE_PLANS.map((plan, index) => {
              const globalPosition = setIndex * total + index;
              const isClone = setIndex !== 1;

              return (
                <article
                  key={`${setIndex}-${plan.id}`}
                  ref={(element) => {
                    cardRefs.current[globalPosition] = element;
                  }}
                  aria-hidden={isClone}
                  className="flex shrink-0 snap-center flex-col rounded-lg border border-nimbus-line bg-white p-6 shadow-soft transition-colors duration-200"
                  style={{
                    width: card.width,
                    height: card.height,
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-xl font-black text-nimbus-ink">{plan.name}</h3>
                    <p className="mt-3 text-3xl font-black text-nimbus-orange">{plan.price}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-nimbus-orange">
                        <VisualIcon name="database" className="size-3.5" />
                        {plan.data}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-nimbus-soft px-3 py-1 text-xs font-black text-nimbus-muted">
                        <VisualIcon name="phone" className="size-3.5" />
                        {dictionary.plans.callsBadge}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-nimbus-muted">{dictionary.plans.description(plan.data)}</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-nimbus-muted">
                      {dictionary.plans.features.map((item, featureIndex) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-black text-nimbus-orange">
                            <PlanFeatureIcon index={featureIndex} />
                          </span>
                          <span className="leading-6">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => openPlan(plan)}
                    tabIndex={isClone ? -1 : undefined}
                    className="mt-5 w-full shrink-0 rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                  >
                    {dictionary.plans.cta}
                  </button>
                </article>
              );
            }),
          )}
        </div>
      </div>

      {selectedPlan ? <DirectContractModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} /> : null}
    </section>
  );
}

function PlanFeatureIcon({ index }: { index: number }) {
  if (index === 1) {
    return <VisualIcon name="shield-check" className="size-3.5" />;
  }

  if (index === 2) {
    return <VisualIcon name="database" className="size-3.5" />;
  }

  return <VisualIcon name="check-circle" className="size-3.5" />;
}
