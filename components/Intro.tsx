"use client";

import { useEffect, useState } from "react";
import { Scissors } from "@/components/icons";

const KEY = "atelier-caron-intro";

/**
 * Ouverture (1,5 s) : ciseaux qui s'ouvrent et se ferment, une mèche qui tombe, le nom, puis fondu.
 * Rendue côté serveur et animée en CSS (aucune attente du JavaScript) ; masquée d'office si déjà vue
 * dans la session ou si l'utilisateur préfère réduire les animations (script en tête de page).
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const t = setTimeout(() => setGone(true), 1550);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="intro-curtain grid place-items-center" aria-hidden="true">
      <div className="flex flex-col items-center text-ink">
        <div className="relative h-24 w-16">
          <svg viewBox="0 0 48 48" className="intro-scissors absolute inset-0 size-full" fill="none" stroke="currentColor" strokeWidth={0.9} strokeLinecap="round" strokeLinejoin="round">
            <Scissors />
          </svg>
          {/* La mèche coupée */}
          <svg viewBox="0 0 40 40" className="intro-lock absolute top-[18%] left-[64%] h-9 w-9 text-wood" fill="none" stroke="currentColor" strokeWidth={0.9} strokeLinecap="round">
            <path d="M6 4c4 6 3 12 7 18s9 8 10 14" />
            <path d="M10 3c3 6 3 11 6 17s8 9 9 15" />
            <path d="M14 3c2 5 3 10 6 15s6 8 7 13" />
          </svg>
        </div>
        <p className="intro-fade mt-6 font-display text-[1.5rem] tracking-[0.34em] ps-[0.34em]" style={{ ["--d" as string]: "0.72s" }}>
          L&rsquo;ATELIER CARON
        </p>
        <p className="intro-fade mt-2 text-[0.625rem] tracking-[0.32em] ps-[0.32em] text-muted" style={{ ["--d" as string]: "0.86s" }}>
          coiffure · barbier · Amiens
        </p>
      </div>
      <button
        type="button"
        onClick={() => setGone(true)}
        className="absolute right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] px-3 py-2 text-[0.6875rem] tracking-[0.2em] uppercase text-muted hover:text-ink"
      >
        {skipLabel}
      </button>
    </div>
  );
}
