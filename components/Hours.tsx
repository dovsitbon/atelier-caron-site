import type { Dict, Locale } from "@/lib/i18n";
import { hourLabel, weekRows } from "@/lib/shop";

/** Horaires de la semaine, du mardi au lundi (data/horaires.json). */
export function Hours({ lang, d, className = "", dim = "text-muted" }: { lang: Locale; d: Dict; className?: string; dim?: string }) {
  const rows = weekRows();
  // La semaine du salon commence le mardi : on met lundi et dimanche (fermés) à la fin.
  const ordered = [...rows.filter((r) => r.day >= 2), ...rows.filter((r) => r.day === 0 || r.day === 1)];
  return (
    <dl className={`grid grid-cols-[auto_1fr] gap-x-8 gap-y-1.5 ${className}`}>
      {ordered.map((r) => (
        <div key={r.day} className="contents">
          <dt className="capitalize">{d.days[r.day]}</dt>
          <dd className={`tabular-nums ${r.ranges ? "" : dim}`}>{r.ranges ? r.ranges.map(([a, b]) => `${hourLabel(a, lang)} – ${hourLabel(b, lang)}`).join(", ") : d.infos.closed}</dd>
        </div>
      ))}
    </dl>
  );
}
