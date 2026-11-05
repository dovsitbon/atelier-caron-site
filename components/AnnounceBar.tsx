"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import site from "@/data/site.json";
import { useLocale } from "@/components/providers";
import { CloseIcon } from "@/components/icons";
import { activeAnnouncement, parisNow } from "@/lib/shop";
import { href } from "@/lib/routes";

const KEY = "atelier-caron-annonce";

/** Bandeau d'infos pratiques (data/annonces.json : paiement en espèces ou chèque par défaut), qu'on peut fermer. */
export function AnnounceBar() {
  const { lang, d } = useLocale();
  const [a, setA] = useState<ReturnType<typeof activeAnnouncement> | null>(null);

  useEffect(() => {
    const next = activeAnnouncement(parisNow().iso);
    let closed = false;
    try {
      closed = localStorage.getItem(KEY) === next.id;
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage, lisible seulement après hydratation
    setA(closed ? null : next);
  }, []);

  if (!a) return null;

  const close = () => {
    try {
      localStorage.setItem(KEY, a.id);
    } catch {}
    setA(null);
  };

  const link = a.link as { label: Record<string, string>; to: string } | null;
  const to = !link ? null : link.to === "booking" ? site.booking : link.to === "devis" ? href(lang, "devis") : `${href(lang, "home")}${link.to}`;

  return (
    <div className="fade-in relative bg-ink text-paper">
      <p className="mx-auto max-w-6xl px-12 py-2.5 text-center text-[0.8125rem] leading-snug">
        {a.text[lang]}
        {link && to && (
          <>
            {" "}
            {to.startsWith("http") ? (
              <a href={to} target="_blank" rel="noopener" className="link-line ms-1 whitespace-nowrap">
                {link.label[lang]}
              </a>
            ) : (
              <Link href={to} className="link-line ms-1 whitespace-nowrap">
                {link.label[lang]}
              </Link>
            )}
          </>
        )}
      </p>
      <button type="button" onClick={close} aria-label={d.announce.close} className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center opacity-80 hover:opacity-100">
        <CloseIcon />
      </button>
    </div>
  );
}
