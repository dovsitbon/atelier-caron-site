"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import site from "@/data/site.json";
import { useLocale } from "@/components/providers";
import { PhoneIcon } from "@/components/icons";
import { devisMessage, emailOk, LENGTHS, phoneOk, SERVICES, serviceFromQuery, type Devis } from "@/lib/devis";

/** Réduit la photo d'inspiration dans le navigateur (JPEG, 1200 px max) avant l'envoi. */
async function shrink(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const im = new Image();
    im.src = url;
    await im.decode();
    const k = Math.min(1, 1200 / Math.max(im.width, im.height));
    const c = document.createElement("canvas");
    c.width = Math.round(im.width * k);
    c.height = Math.round(im.height * k);
    c.getContext("2d")!.drawImage(im, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.82);
  } finally {
    URL.revokeObjectURL(url);
  }
}

type Errors = Partial<Record<"service" | "name" | "phone" | "email", string>>;

export function DevisForm() {
  const { lang, d } = useLocale();
  const f = d.devis;
  const params = useSearchParams();
  const [data, setData] = useState<Devis>(() => ({
    service: serviceFromQuery(params.get("prestation")) as Devis["service"],
    date: "",
    length: "",
    name: "",
    phone: "",
    email: "",
    message: "",
    photo: "",
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState<null | { notified: boolean; confirmed: boolean }>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const set = <K extends keyof Devis>(k: K, v: Devis[K]) => setData((x) => ({ ...x, [k]: v }));

  const validate = () => {
    const e: Errors = {};
    if (!data.service) e.service = f.errors.service;
    if (!data.name.trim()) e.name = f.errors.name;
    if (!phoneOk(data.phone)) e.phone = f.errors.phone;
    if (!emailOk(data.email.trim())) e.email = f.errors.email;
    setErrors(e);
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    const first = Object.keys(e)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    try {
      const r = await fetch("/api/devis", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lang, data: { ...data, email: data.email.trim() } }) });
      const j = (await r.json()) as { ok: boolean; notified?: boolean; confirmed?: boolean };
      if (!j.ok) throw new Error();
      setDone({ notified: !!j.notified, confirmed: !!j.confirmed });
      setState("idle");
      window.scrollTo({ top: 0 });
    } catch {
      setState("error");
    }
  };

  if (done) {
    return (
      <div className="fade-in border border-line bg-paper-deep/60 p-7 sm:p-10" role="status">
        <h2 className="display text-[2rem]">{done.notified ? f.done.title : f.done.fallbackTitle}</h2>
        <p className="mt-4 text-muted">{done.notified ? f.done.text : f.done.fallbackText}</p>
        {done.notified && done.confirmed && <p className="mt-2 text-muted">{f.done.copy}</p>}
        {!done.notified && <pre className="mt-6 border-l border-wood ps-4 font-body text-[0.9375rem] whitespace-pre-wrap">{devisMessage(data, lang, d).replace(/\*/g, "")}</pre>}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`tel:${site.phoneIntl}`} className="btn-solid">
            <PhoneIcon /> {f.done.call}
          </a>
          <button
            type="button"
            className="btn-line text-ink"
            onClick={() => {
              setDone(null);
              setData((x) => ({ ...x, service: "" as Devis["service"], date: "", length: "", message: "", photo: "" }));
            }}
          >
            {f.done.again}
          </button>
        </div>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-2 text-[0.875rem] text-terracotta-ink">
        {errors[k]}
      </p>
    ) : null;
  const req = <span className="text-[0.8125rem] text-muted"> ({f.required})</span>;
  const opt = <span className="text-[0.8125rem] text-muted"> ({f.optional})</span>;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-7">
      <div>
        <label htmlFor="service" className="label">
          {f.service}
          {req}
        </label>
        <select id="service" name="service" className="field" value={data.service} onChange={(e) => set("service", e.target.value as Devis["service"])} aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-err" : undefined}>
          <option value="">{f.servicePick}</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {f.services[s]}
            </option>
          ))}
        </select>
        {err("service")}
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="label">
            {f.date}
            {opt}
          </label>
          <input id="date" name="date" type="date" min={today} className="field" value={data.date} onChange={(e) => set("date", e.target.value)} aria-describedby="date-hint" />
          <p id="date-hint" className="mt-2 text-[0.8125rem] text-muted">
            {f.dateHint}
          </p>
        </div>
        <fieldset>
          <legend className="label">
            {f.length}
            {opt}
          </legend>
          <div className="flex flex-wrap gap-2">
            {LENGTHS.map((l) => (
              <label key={l} className="chip">
                <input type="radio" name="length" value={l} checked={data.length === l} onChange={() => set("length", l)} className="sr-only" />
                {f.lengths[l]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            {f.name}
            {req}
          </label>
          <input id="name" name="name" autoComplete="name" className="field" value={data.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="phone" className="label">
            {f.phone}
            {req}
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field" value={data.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
          {err("phone")}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="label">
          {f.email}
          {opt}
        </label>
        <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} className="field" value={data.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : "email-hint"} />
        {errors.email ? (
          err("email")
        ) : (
          <p id="email-hint" className="mt-2 text-[0.8125rem] text-muted">
            {f.emailHint}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="photo" className="label">
          {f.photo}
          {opt}
        </label>
        {data.photo ? (
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- aperçu local (data URL) */}
            <img src={data.photo} alt="" className="size-20 object-cover" />
            <button type="button" className="link-line text-[0.875rem]" onClick={() => set("photo", "")}>
              {f.photoRemove}
            </button>
          </div>
        ) : (
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="block w-full text-[0.9375rem] file:me-4 file:cursor-pointer file:rounded-full file:border file:border-ink file:bg-transparent file:px-5 file:py-2.5 file:text-[0.75rem] file:tracking-[0.16em] file:uppercase"
            aria-describedby="photo-hint"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) set("photo", await shrink(file));
            }}
          />
        )}
        <p id="photo-hint" className="mt-2 text-[0.8125rem] text-muted">
          {f.photoHint}
        </p>
      </div>

      <div>
        <label htmlFor="message" className="label">
          {f.message}
          {opt}
        </label>
        <textarea id="message" name="message" rows={4} className="field" placeholder={f.messagePh} value={data.message} onChange={(e) => set("message", e.target.value)} />
      </div>

      {state === "error" && (
        <p className="text-terracotta-ink" role="alert">
          {f.errors.network}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-solid" disabled={state === "sending"}>
          {state === "sending" ? f.sending : f.send}
        </button>
        <a href={`tel:${site.phoneIntl}`} className="inline-flex items-center gap-2 text-[0.9375rem] text-muted hover:text-ink">
          <PhoneIcon /> {site.phone}
        </a>
      </div>
    </form>
  );
}
