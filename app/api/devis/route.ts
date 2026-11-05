import { Resend } from "resend";
import site from "@/data/site.json";
import { devisMessage, parseDevis } from "@/lib/devis";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";

// Demande de devis (chignon, permanente, carte cadeau, couleur) → e-mails via Resend :
//  1. au salon (en français, suivi de la version anglaise si le client a écrit en anglais), photo d'inspiration en pièce jointe ;
//  2. confirmation au client dans sa langue, s'il a donné son e-mail, avec un bouton « Appeler le salon ».
// Variables (Vercel → Settings → Environment Variables) :
//   RESEND_API_KEY        clé Resend
//   DEVIS_NOTIFY_EMAIL    adresse du salon qui reçoit les demandes
//   RESEND_FROM           expéditeur sur un domaine vérifié, ex. « L'Atelier Caron <rdv@latelier-caron.fr> »
// Tant que ces variables manquent, la réponse indique notified: false et le site invite le client à appeler.

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const html = (text: string, callLabel: string) =>
  `<div style="background:#F8F5F0;padding:32px 24px"><div style="max-width:560px;margin:0 auto;font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#1E1C1A"><div style="font-size:13px;letter-spacing:.32em;color:#1E1C1A;margin-bottom:4px">L'ATELIER CARON</div><div style="font-size:11px;letter-spacing:.2em;color:#57514A;margin-bottom:24px">coiffure · barbier · Amiens</div><div style="white-space:pre-wrap">${escapeHtml(text).replace(/\*(.+?)\*/g, '<strong style="font-size:18px">$1</strong>')}</div><p style="margin:28px 0 0"><a href="tel:${site.phoneIntl}" style="display:inline-block;background:#1E1C1A;color:#F8F5F0;text-decoration:none;padding:12px 26px;border-radius:999px;font-family:Arial,sans-serif;font-size:13px;letter-spacing:.14em;text-transform:uppercase">${escapeHtml(callLabel)} · ${site.phone}</a></p></div></div>`;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const lang: Locale = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "fr";
  const q = parseDevis(body.data);
  if (!q) return Response.json({ ok: false }, { status: 400 });
  const fr = getDict("fr");
  const d = getDict(lang);

  const key = process.env.RESEND_API_KEY;
  const to = process.env.DEVIS_NOTIFY_EMAIL ?? site.email ?? undefined;
  if (!key || !to) return Response.json({ ok: true, notified: false, confirmed: false });

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM ?? "L'Atelier Caron <onboarding@resend.dev>";
  const frText = devisMessage(q, "fr", fr);
  const text = lang === "fr" ? frText : `${frText}\n\n— EN —\n\n${devisMessage(q, lang, d)}`;
  const subject = `${fr.devis.email_.subject} · ${fr.devis.services[q.service]} · ${q.name}${q.date ? ` · ${q.date}` : ""}`;
  const attachments = q.photo ? [{ filename: `inspiration.${q.photo.slice(11, q.photo.indexOf(";")).replace("jpeg", "jpg")}`, content: q.photo.split(",")[1] }] : undefined;

  let notified = false;
  let confirmed = false;
  try {
    const r = await resend.emails.send({ from, to, replyTo: q.email || undefined, subject, html: html(text, fr.devis.email_.call), text, attachments });
    notified = !r.error;
  } catch {}

  if (q.email) {
    const e = d.devis.email_;
    const msg = `${fill(e.confirmIntro, { name: q.name })}\n\n${devisMessage(q, lang, d)}\n\n${e.confirmOutro}`;
    try {
      const r = await resend.emails.send({ from, to: q.email, replyTo: to, subject: e.confirmSubject, html: html(msg, e.call), text: msg });
      confirmed = !r.error;
    } catch {}
  }
  return Response.json({ ok: true, notified, confirmed });
}
