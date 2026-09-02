"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { VisualIcon } from "@/components/VisualIcon";

/** Titulares de la seccion. Sin esto, se usan los del diccionario (cobertura movil). */
export type TestimonialsCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type SectionCta = {
  text: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

/** Cada cuanto gira el carrusel automaticamente (ms). */
const AUTOPLAY_INTERVAL_MS = 4500;
/** Duracion del giro. El texto solo queda nitido cuando la tarjeta esta
 * quieta, asi que el giro es corto y entre giro y giro hay reposo. */
const TRANSITION_MS = 600;

/** Lineas visibles del texto cuando la tarjeta esta plegada. */
const LINE_CLAMP = 6;
/** A partir de cuantos caracteres asumimos que el texto no cabe plegado
 * y hace falta ofrecer "Leer mas". */
const LONG_TEXT_THRESHOLD = 165;

/** Geometria del coverflow por posicion respecto a la tarjeta central. */
const DESKTOP_LAYOUT = {
  cardWidth: 300,
  cardHeight: 290,
  containerHeight: 360,
  expandedContainerHeight: 540,
  offsets: [0, 235, 405],
  scales: [1, 0.84, 0.64],
  blurs: [0, 0, 3],
  opacities: [1, 0.92, 0.45],
};

const MOBILE_LAYOUT = {
  cardWidth: 250,
  cardHeight: 300,
  containerHeight: 350,
  expandedContainerHeight: 520,
  offsets: [0, 175, 300],
  scales: [1, 0.82, 0.6],
  blurs: [0, 0, 3],
  opacities: [1, 0.85, 0.35],
};

/** Distancia circular con signo entre dos indices: cuantas posiciones hay
 * que girar el "tambor" desde el activo hasta el indice dado. */
function circularOffset(index: number, active: number, total: number) {
  let distance = index - active;
  if (distance > total / 2) distance -= total;
  if (distance < -total / 2) distance += total;
  return distance;
}

export function TestimonialsSection({ cta, content }: { cta?: SectionCta; content?: TestimonialsCopy }) {
  const { dictionary } = useI18n();
  const items = dictionary.testimonials.items;
  const total = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const layout = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;

  const copy: TestimonialsCopy = content ?? {
    eyebrow: dictionary.testimonials.eyebrow,
    title: dictionary.testimonials.title,
    subtitle: dictionary.testimonials.subtitle,
  };

  const banner: SectionCta = cta ?? {
    text: dictionary.testimonials.ctaText,
    primaryLabel: dictionary.testimonials.studyCta,
    primaryHref: "#formulari",
    secondaryLabel: dictionary.testimonials.plansCta,
    secondaryHref: "#tarifes",
  };

  useEffect(() => {
    function checkViewport() {
      setIsMobile(window.innerWidth < 768);
    }

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Bucle auto-reprogramado: cada giro programa el siguiente. Al depender de
  // activeIndex, un clic en una tarjeta lateral tambien reinicia la cuenta, y
  // el carrusel nunca se queda parado esperando a nada.
  useEffect(() => {
    if (total <= 1 || isExpanded) return;

    const timeoutId = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearTimeout(timeoutId);
  }, [activeIndex, total, isExpanded]);

  function goTo(index: number) {
    setIsExpanded(false);
    setActiveIndex(((index % total) + total) % total);
  }

  return (
    <section id="opinions" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">{copy.subtitle}</p>
        </div>

        <div
          className="relative mt-10 overflow-hidden"
          style={{
            height: isExpanded ? layout.expandedContainerHeight : layout.containerHeight,
            transition: `height ${TRANSITION_MS}ms ease`,
          }}
        >
          {items.map((item, index) => {
            const distance = circularOffset(index, activeIndex, total);
            const depth = Math.abs(distance);
            const isVisible = depth <= 2;
            const isActive = depth === 0;
            const side = Math.sign(distance);

            const offset = layout.offsets[Math.min(depth, 2)] * side;
            const scale = layout.scales[Math.min(depth, 2)];
            const blur = layout.blurs[Math.min(depth, 2)];
            const opacity = isVisible ? layout.opacities[depth] : 0;
            const isOpen = isActive && isExpanded;
            const isLongText = item.text.length > LONG_TEXT_THRESHOLD;

            return (
              <article
                key={`${item.name}-${item.text}`}
                onClick={() => !isActive && isVisible && goTo(index)}
                aria-hidden={!isVisible}
                className={`absolute left-1/2 top-1/2 flex flex-col rounded-lg border bg-white p-6 shadow-soft ${
                  isActive ? "border-nimbus-orange" : "border-nimbus-line"
                } ${!isActive && isVisible ? "cursor-pointer" : ""}`}
                style={{
                  width: layout.cardWidth,
                  height: isOpen ? "auto" : layout.cardHeight,
                  maxHeight: isOpen ? layout.expandedContainerHeight - 20 : undefined,
                  transform: `translate(-50%, -50%) translateX(${offset}px) scale(${scale})`,
                  filter: blur ? `blur(${blur}px)` : undefined,
                  opacity,
                  zIndex: 30 - depth,
                  pointerEvents: isVisible ? "auto" : "none",
                  transition: `transform ${TRANSITION_MS}ms ease, opacity ${TRANSITION_MS}ms ease, filter ${TRANSITION_MS}ms ease, height ${TRANSITION_MS}ms ease`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-nimbus-orange text-base font-black text-white">
                    {item.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-black text-nimbus-ink">{item.name}</p>
                    <p className="text-xs font-bold text-nimbus-muted">{dictionary.testimonials.sourceLabel}</p>
                  </div>
                </div>

                {item.rating ? (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex gap-0.5 text-nimbus-orange">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <VisualIcon
                          key={starIndex}
                          name="star"
                          className={`size-4 ${starIndex < item.rating! ? "" : "text-nimbus-line"}`}
                        />
                      ))}
                    </div>
                    {item.date ? <p className="text-xs text-nimbus-muted">{item.date}</p> : null}
                  </div>
                ) : null}

                <p
                  className="mt-4 flex-1 overflow-hidden text-sm leading-7 text-nimbus-muted"
                  style={
                    isOpen
                      ? undefined
                      : { display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: LINE_CLAMP }
                  }
                >
                  {item.text}
                </p>

                {isActive && isLongText ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsExpanded((current) => !current);
                    }}
                    className="mt-2 shrink-0 self-start text-sm font-black text-nimbus-orange transition hover:text-nimbus-orangeDark"
                  >
                    {isOpen ? dictionary.testimonials.readLess : dictionary.testimonials.readMore}
                  </button>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-6 rounded-lg border-l-4 border-nimbus-orange bg-orange-50 p-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xl font-black text-nimbus-ink">{banner.text}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <a
              href={banner.primaryHref}
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {banner.primaryLabel}
            </a>
            <a
              href={banner.secondaryHref}
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              {banner.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
