"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/components/providers";
import { ChevronIcon, CloseIcon } from "@/components/icons";
import { fill } from "@/lib/i18n";
import type { L10n } from "@/lib/locales";

type Pair = { id: string; tag: string; before: string; after: string; title: L10n; by: string | null };

/** Curseur de comparaison avant / après (clavier : flèches, comme un curseur natif). */
export function BeforeAfter({ pairs }: { pairs: Pair[] }) {
  const { lang, d } = useLocale();
  const [i, setI] = useState(0);
  const [pos, setPos] = useState(50);
  const p = pairs[i];

  return (
    <div>
      <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden bg-paper-deep select-none">
        <Image src={p.after} alt={`${d.ba.after} : ${p.title[lang]}`} fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={p.before} alt={`${d.ba.before} : ${p.title[lang]}`} fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-paper" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-1/2 place-items-center rounded-full border border-paper bg-ink/35 text-paper backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
        <span className="pointer-events-none absolute top-4 left-4 bg-paper/90 px-2.5 py-1 text-[0.6875rem] tracking-[0.2em] uppercase">{d.ba.before}</span>
        <span className="pointer-events-none absolute top-4 right-4 bg-paper/90 px-2.5 py-1 text-[0.6875rem] tracking-[0.2em] uppercase">{d.ba.after}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={fill(d.ba.slider, { title: p.title[lang] })}
          className="ba-range absolute inset-0 size-full opacity-0"
        />
      </div>
      <p className="mt-4 text-center font-display text-[1.35rem]">
        {p.title[lang]}
        {p.by && <span className="text-muted"> · {p.by === "zoe" ? "Zoé" : "Quentin"}</span>}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label={d.ba.title}>
        {pairs.map((x, k) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={k === i}
            aria-label={x.title[lang]}
            onClick={() => {
              setI(k);
              setPos(50);
            }}
            className={`relative size-14 overflow-hidden transition-opacity sm:size-16 ${k === i ? "opacity-100 outline outline-1 outline-offset-2 outline-ink" : "opacity-60 hover:opacity-100"}`}
          >
            <Image src={x.after} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

type Item = { src: string; tags: string[]; alt: L10n; w: number; h: number };
const FILTERS = ["all", "femme", "degrade", "balayage", "barbe"] as const;

/** Galerie filtrable (femme, dégradé, balayage, barbe) avec agrandissement. */
export function Gallery({ items }: { items: Item[] }) {
  const { lang, d } = useLocale();
  const reduce = useReducedMotion();
  const [f, setF] = useState<(typeof FILTERS)[number]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = items.filter((x) => f === "all" || x.tags.includes(f));

  const go = useCallback((delta: number) => setOpen((o) => (o === null ? o : (o + delta + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, go]);

  const current = open === null ? null : shown[open];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={d.ba.filterLabel}>
        {FILTERS.map((k) => (
          <button key={k} type="button" className="chip" aria-pressed={f === k} onClick={() => setF(k)}>
            {d.ba.filters[k]}
          </button>
        ))}
      </div>

      <motion.ul layout={!reduce} className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        <AnimatePresence initial={false}>
          {shown.map((x, k) => (
            <motion.li
              key={x.src}
              layout={!reduce}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <button type="button" onClick={() => setOpen(k)} className="shine group block w-full bg-paper-deep" aria-label={fill(d.ba.open, { alt: x.alt[lang] })}>
                <Image src={x.src} alt={x.alt[lang]} width={x.w} height={x.h} sizes="(min-width: 1024px) 22vw, (min-width: 768px) 31vw, 48vw" className="h-auto w-full" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt[lang]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 grid place-items-center overscroll-contain bg-ink/95 p-4"
            onClick={() => setOpen(null)}
          >
            <figure className="relative max-h-full" onClick={(e) => e.stopPropagation()}>
              <Image src={current.src} alt={current.alt[lang]} width={current.w} height={current.h} sizes="100vw" className="max-h-[82vh] w-auto object-contain" />
              <figcaption className="mt-3 text-center text-[0.875rem] text-paper/75">{current.alt[lang]}</figcaption>
            </figure>
            <button type="button" autoFocus onClick={() => setOpen(null)} aria-label={d.ba.close} className="absolute top-3 right-3 grid size-12 place-items-center text-paper">
              <CloseIcon className="size-6" />
            </button>
            <button type="button" onClick={(e) => (e.stopPropagation(), go(-1))} aria-label={d.ba.prev} className="absolute left-2 grid size-12 place-items-center text-paper">
              <ChevronIcon className="size-6 rotate-180" />
            </button>
            <button type="button" onClick={(e) => (e.stopPropagation(), go(1))} aria-label={d.ba.next} className="absolute right-2 grid size-12 place-items-center text-paper">
              <ChevronIcon className="size-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Carte Google Maps chargée seulement à la demande (pas de cookie tiers par défaut). */
export function MapEmbed({ src, title, label, note, address }: { src: string; title: string; label: string; note: string; address: string }) {
  const [on, setOn] = useState(false);
  if (on) return <iframe src={src} title={title} className="absolute inset-0 size-full border-0 grayscale-[35%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />;
  return (
    <div className="absolute inset-0 grid place-items-center border border-paper/15 bg-paper/[0.04] p-6 text-center">
      <div>
        <p className="font-display text-[1.5rem] text-paper">{address}</p>
        <button type="button" onClick={() => setOn(true)} className="btn-line on-dark mt-6">
          {label}
        </button>
        <p className="mt-3 text-[0.8125rem] text-paper/60">{note}</p>
      </div>
    </div>
  );
}
