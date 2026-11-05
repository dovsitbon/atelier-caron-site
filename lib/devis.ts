import type { Dict, Locale } from "@/lib/i18n";

export const SERVICES = ["chignon-mariage", "essai-chignon", "chignon", "permanente-femme", "permanente-homme", "carte-cadeau-femme", "carte-cadeau-homme", "couleur"] as const;
export type Service = (typeof SERVICES)[number];
export const LENGTHS = ["court", "mi-long", "long"] as const;

/** Prestation de data/prestations.json → choix du formulaire (lien « Demander » d'une ligne de prix). */
export function serviceFromQuery(q: string | null): Service | "" {
  if (!q) return "";
  if ((SERVICES as readonly string[]).includes(q)) return q as Service;
  if (q.startsWith("chignon-")) return "chignon";
  if (/balayage|meches|oxydation|semi|decoloration/.test(q)) return "couleur";
  return "";
}

export type Devis = {
  service: Service;
  date: string;
  length: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  photo: string; // data:image/jpeg;base64,… (réduite côté navigateur), ou vide
};

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const phoneOk = (p: string) => p.replace(/[^\d]/g, "").length >= 9;
export const emailOk = (e: string) => !e || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

export function parseDevis(raw: unknown): Devis | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const service = str(r.service, 40) as Service;
  if (!(SERVICES as readonly string[]).includes(service)) return null;
  const q: Devis = {
    service,
    date: /^\d{4}-\d{2}-\d{2}$/.test(str(r.date, 10)) ? str(r.date, 10) : "",
    length: (LENGTHS as readonly string[]).includes(str(r.length, 10)) ? str(r.length, 10) : "",
    name: str(r.name, 120),
    phone: str(r.phone, 30),
    email: str(r.email, 160),
    message: str(r.message, 1500),
    photo: typeof r.photo === "string" && /^data:image\/(jpeg|png|webp);base64,/.test(r.photo) && r.photo.length < 3_000_000 ? r.photo : "",
  };
  if (!q.name || !phoneOk(q.phone) || !emailOk(q.email)) return null;
  return q;
}

/** Récapitulatif lisible (e-mail au salon, confirmation client, écran de repli). */
export function devisMessage(q: Devis, lang: Locale, d: Dict) {
  const f = d.devis;
  const c = lang === "fr" ? " :" : ":";
  const date = q.date ? new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${q.date}T12:00:00`)) : "";
  const lines = [
    `*${f.services[q.service]}*`,
    date && `${f.date}${c} ${date}`,
    q.length && `${f.length}${c} ${f.lengths[q.length as keyof typeof f.lengths]}`,
    "",
    `${f.name}${c} ${q.name}`,
    `${f.phone}${c} ${q.phone}`,
    q.email && `${f.email}${c} ${q.email}`,
    q.message && `\n${f.message}${c}\n${q.message}`,
    q.photo && `\n${f.email_.photo}`,
  ];
  return lines
    .filter((l): l is string => typeof l === "string")
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
