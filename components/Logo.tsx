import { CrossedTools } from "@/components/icons";

/**
 * Logo typographique provisoire (le salon n'a pas encore de logo dessiné) :
 * « L'ATELIER CARON » en capitales fines, « coiffure · barbier · Amiens » en petit, ciseaux et coupe-choux croisés.
 * Pour le remplacer : déposer le vrai logo en SVG dans public/logo.svg et l'afficher ici.
 */
export function Logo({ className = "", line = true, mark = true }: { className?: string; line?: boolean; mark?: boolean }) {
  return (
    <span translate="no" className={`inline-flex flex-col items-center leading-none ${className}`}>
      {mark && <CrossedTools className="mb-1.5 size-7 lg:size-8" strokeWidth={1} />}
      <span className="font-display text-[1.05rem] font-normal tracking-[0.34em] whitespace-nowrap ps-[0.34em] lg:text-[1.3rem]">L&rsquo;ATELIER CARON</span>
      {line && <span className="mt-1.5 text-[0.5625rem] tracking-[0.32em] whitespace-nowrap ps-[0.32em] text-muted lg:text-[0.625rem]">coiffure · barbier · Amiens</span>}
    </span>
  );
}
