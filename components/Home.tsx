import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import avis from "@/data/avis.json";
import prestations from "@/data/prestations.json";
import galerie from "@/data/galerie.json";
import avantApres from "@/data/avant-apres.json";
import horaires from "@/data/horaires.json";
import { fill, intlLocale, type Dict, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { img } from "@/lib/media";
import { durationLabel, priceLabel, upcomingClosures, type Price } from "@/lib/shop";
import { Reveal } from "@/components/Reveal";
import { OpenStatus } from "@/components/OpenStatus";
import { Hours } from "@/components/Hours";
import { ArrowIcon, CrossedTools, InstagramIcon, PhoneIcon, PinIcon, StarIcon } from "@/components/icons";
import { BeforeAfter, Gallery, MapEmbed } from "@/components/Interactive";

type P = { lang: Locale; d: Dict };

const Book = ({ children, className = "btn-solid" }: { children: React.ReactNode; className?: string }) => (
  <a href={site.booking} target="_blank" rel="noopener" className={className}>
    {children}
  </a>
);

const num = (n: number, lang: Locale) => new Intl.NumberFormat(intlLocale[lang], { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n);

/** Notes Planity et Google, près des boutons. */
export function Ratings({ lang, d, className = "" }: P & { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.875rem] ${className}`}>
      <a href={avis.planity.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-ink">
        <span className="flex text-terracotta" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className="size-3" />
          ))}
        </span>
        <span>
          <strong className="font-normal text-ink">{num(avis.planity.rating, lang)}/5</strong> {d.hero.ratingPlanity} ({fill(d.hero.reviews, { count: avis.planity.count })})
        </span>
      </a>
      <span aria-hidden="true" className="hidden text-line sm:inline">
        |
      </span>
      <span>
        <strong className="font-normal text-ink">{num(avis.google.rating, lang)}/5</strong> {d.hero.ratingGoogle} ({fill(d.hero.reviews, { count: avis.google.count })})
      </span>
    </div>
  );
}

function Hero({ lang, d }: P) {
  const h = d.hero;
  const a = img("/media/hero/balayage-blond-ondule.jpg");
  const b = img("/media/hero/degrade-texture-homme.jpg");
  return (
    <section className="relative mx-auto grid max-w-[90rem] grid-cols-[minmax(0,1fr)] lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <div className="order-2 flex flex-col justify-center px-5 pt-10 pb-14 sm:px-8 lg:order-1 lg:px-10 lg:py-16 xl:ps-16">
        <p className="eyebrow rise">{h.eyebrow}</p>
        <h1 className="display rise mt-6 text-[2.9rem] sm:text-[3.6rem] xl:text-[4.6rem]" style={{ animationDelay: "0.1s" }}>
          {h.title}
        </h1>
        <p className="lead rise mt-6 max-w-[34rem]" style={{ animationDelay: "0.2s" }}>
          {h.lead}
        </p>
        <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.3s" }}>
          <Book>{h.book}</Book>
          <Link href="#prix" className="btn-line text-ink">
            {h.prices}
          </Link>
        </div>
        <div className="rise mt-7 space-y-3 text-muted" style={{ animationDelay: "0.4s" }}>
          <Ratings lang={lang} d={d} />
          <OpenStatus className="text-[0.875rem]" />
        </div>
      </div>
      <div className="order-1 grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-2 sm:gap-3 lg:order-2 lg:py-0 lg:ps-0">
        <div className="relative aspect-[4/5] lg:aspect-auto">
          <Image src={a.src} alt={h.altFemme} fill priority sizes="(min-width: 1024px) 30vw, 56vw" className="object-cover" style={{ objectPosition: "50% 30%" }} />
        </div>
        <div className="relative aspect-[4/5] lg:mt-24 lg:aspect-auto">
          <Image src={b.src} alt={h.altHomme} fill priority sizes="(min-width: 1024px) 24vw, 44vw" className="object-cover" style={{ objectPosition: "50% 12%" }} />
        </div>
      </div>
    </section>
  );
}

function Tiles({ d }: P) {
  const t = d.tiles;
  const tiles = [
    { k: "femme", to: "#femme", src: "/media/femme/coupe-courte-boucles-profil.jpg" },
    { k: "homme", to: "#homme", src: "/media/homme-barbier/degrade-a-blanc-barbe.jpg" },
    { k: "enfants", to: "#enfants", src: null },
    { k: "couleur", to: "#couleur", src: "/media/couleur/balayage-blond-long.jpg" },
    { k: "chignons", to: "#devis", src: "/media/femme/chignon-mariage-fleurs.jpg" },
  ] as const;
  return (
    <section aria-labelledby="tiles-title" className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <Reveal className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="tiles-title" className="display mt-4 text-[2.4rem] sm:text-[3rem]">
            {t.title}
          </h2>
        </div>
      </Reveal>
      <ul className="snap-row -mx-5 mt-10 flex gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5 lg:gap-4">
        {tiles.map((x, i) => {
          const it = t.items[x.k];
          return (
            <Reveal as="li" key={x.k} delay={i * 0.08} className="w-[68vw] shrink-0 sm:w-auto">
              <Link href={x.to} className="group block">
                <div className="shine relative aspect-[4/5] bg-paper-deep">
                  {x.src ? (
                    <Image src={x.src} alt={it.alt} fill sizes="(min-width: 1024px) 18vw, (min-width: 640px) 31vw, 68vw" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-wood-soft text-ink/70">
                      <CrossedTools className="size-20" strokeWidth={0.7} />
                    </div>
                  )}
                </div>
                <h3 className="mt-4 flex items-center justify-between font-display text-[1.45rem]">
                  {it.title}
                  <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </h3>
                <p className="mt-1 text-[0.9375rem] text-muted">{it.text}</p>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

type Row = { id: string; name: Record<Locale, string>; detail: Record<Locale, string> | null; duration: number | null; price: Price; staff?: string; book: string };

function Prices({ lang, d }: P) {
  const p = d.prices;
  const photos: Record<string, string> = {
    homme: "/media/homme-barbier/degrade-barbe-profil.jpg",
    femme: "/media/femme/carre-flou-ondule.jpg",
    enfants: "",
    couleur: "/media/couleur/balayage-ondule-dos.jpg",
    devis: "/media/femme/chignon-tresse-mariage.jpg",
  };
  const date = new Intl.DateTimeFormat(intlLocale[lang], { day: "numeric", month: "long", year: "numeric" }).format(new Date(prestations.checked));
  return (
    <section id="prix" aria-labelledby="prix-title" className="bg-paper-deep">
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{p.eyebrow}</p>
          <h2 id="prix-title" className="display mt-4 text-[2.4rem] sm:text-[3rem]">
            {p.title}
          </h2>
          <p className="lead mt-5">{p.lead}</p>
          <p className="mt-4 inline-flex items-center gap-2 border-y border-line py-2 text-[0.9375rem]">{p.payment}</p>
        </Reveal>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {prestations.categories.map((c) => (
            <div key={c.id} id={c.id} className="grid scroll-mt-28 gap-6 py-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)] lg:gap-12 lg:py-14">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <h3 className="display text-[1.9rem] sm:text-[2.2rem]">{c.title[lang]}</h3>
                {photos[c.id] && (
                  <div className="relative mt-6 hidden aspect-[4/5] max-w-[16rem] lg:block">
                    <Image src={photos[c.id]} alt="" fill sizes="16rem" className="object-cover" />
                  </div>
                )}
              </div>
              <ul>
                {(c.items as Row[]).map((it) => {
                  const staff = it.staff === "quentin" ? "Quentin" : it.staff === "zoe" ? "Zoé" : null;
                  const name = it.name[lang];
                  return (
                    <li key={it.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-line/70 py-4 last:border-b-0 sm:grid-cols-[1fr_4.5rem_7rem_9.5rem]">
                      <div>
                        <p className="text-[1.0625rem] text-ink">{name}</p>
                        {it.detail && <p className="mt-0.5 text-[0.875rem] text-muted">{it.detail[lang]}</p>}
                      </div>
                      <p className="order-3 text-[0.875rem] text-muted tabular-nums sm:order-none sm:text-right">
                        <span className="sr-only">{p.duration} : </span>
                        {durationLabel(it.duration, lang)}
                      </p>
                      <p className="text-right font-display text-[1.3rem] whitespace-nowrap text-ink tabular-nums">
                        <span className="sr-only">{p.price} : </span>
                        {priceLabel(it.price, lang, { from: p.from, quote: p.quote })}
                      </p>
                      <div className="order-4 justify-self-end sm:order-none">
                        {it.book === "planity" && (
                          <a href={site.booking} target="_blank" rel="noopener" aria-label={fill(p.bookAria, { name: staff ? `${name} (${staff})` : name })} className="link-line inline-flex items-center gap-1.5 py-2 text-[0.75rem] tracking-[0.16em] uppercase">
                            {staff ? `${p.book} · ${staff}` : p.book}
                          </a>
                        )}
                        {it.book === "devis" && (
                          <Link href={`${href(lang, "devis")}?prestation=${encodeURIComponent(it.id)}`} aria-label={fill(p.askAria, { name })} className="link-line inline-flex items-center gap-1.5 py-2 text-[0.75rem] tracking-[0.16em] uppercase">
                            {p.ask}
                          </Link>
                        )}
                        {it.book === "phone" && (
                          <a href={`tel:${site.phoneIntl}`} className="link-line inline-flex items-center gap-1.5 py-2 text-[0.75rem] tracking-[0.16em] uppercase">
                            {p.call}
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[0.8125rem] text-muted">{fill(p.checked, { date })}</p>
      </div>
    </section>
  );
}

function Team({ lang, d }: P) {
  const t = d.team;
  const people = [
    { k: "quentin" as const, src: "/media/equipe/quentin-taille-de-barbe.jpg", pos: "70% 30%" },
    { k: "zoe" as const, src: "/media/equipe/zoe-au-travail.jpg", pos: "30% 30%" },
  ];
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="mx-auto max-w-[90rem] scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="equipe-title" className="display mt-4 text-[2.4rem] sm:text-[3rem]">
          {t.title}
        </h2>
        <p className="lead mt-5">{t.lead}</p>
      </Reveal>
      <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-8 lg:gap-16">
        {people.map((x, i) => {
          const m = t[x.k];
          return (
            <Reveal key={x.k} delay={i * 0.12} className="flex flex-col">
              <figure>
                <div className="relative aspect-[4/5] bg-paper-deep">
                  <Image src={x.src} alt={m.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" style={{ objectPosition: x.pos }} />
                </div>
                <figcaption className="mt-2 text-[0.75rem] text-muted">{t.photoNote}</figcaption>
              </figure>
              <h3 className="display mt-6 text-[2.4rem]">{m.name}</h3>
              <p className="eyebrow mt-2">{m.role}</p>
              <p className="mt-4 max-w-lg text-[1rem] leading-relaxed text-muted">{m.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {m.skills.map((s) => (
                  <li key={s} className="border border-line px-3 py-1 text-[0.8125rem]">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Book>{m.book}</Book>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-16">
        <Ratings lang={lang} d={d} className="justify-center text-muted" />
      </Reveal>
    </section>
  );
}

function Transformations({ d }: P) {
  const b = d.ba;
  const items = galerie.items.map((x) => {
    const s = img(x.src);
    return { ...x, w: s.width, h: s.height };
  });
  return (
    <section id="avant-apres" aria-labelledby="ba-title" className="bg-paper-deep">
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{b.eyebrow}</p>
            <h2 id="ba-title" className="display mt-4 text-[2.4rem] sm:text-[3rem]">
              {b.title}
            </h2>
            <p className="lead mt-5 max-w-md">{b.lead}</p>
            <div className="mt-8 hidden lg:block">
              <Book>{d.hero.book}</Book>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfter pairs={avantApres.items} />
          </Reveal>
        </div>

        <div className="mt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="display text-[2rem] sm:text-[2.4rem]">{b.galleryTitle}</h3>
            <a href={site.instagram} target="_blank" rel="noopener" className="link-line inline-flex items-center gap-2 text-[0.9375rem]">
              <InstagramIcon /> {b.instagram}
            </a>
          </Reveal>
          <div className="mt-8">
            <Gallery items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Ritual({ d }: P) {
  const r = d.ritual;
  return (
    <section aria-labelledby="rituel-title" className="mx-auto grid max-w-[90rem] items-center gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
      <Reveal className="relative aspect-[4/5] bg-paper-deep">
        <Image src="/media/homme-barbier/rituel-barbe-quentin.jpg" alt={r.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" style={{ objectPosition: "60% 40%" }} />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="eyebrow">{r.eyebrow}</p>
        <h2 id="rituel-title" className="display mt-4 text-[2.4rem] sm:text-[3rem]">
          {r.title}
        </h2>
        <p className="lead mt-6">{r.text}</p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {r.points.map((x, i) => (
            <li key={x} className="flex items-baseline gap-5 py-3.5">
              <span className="font-display text-[1.1rem] text-terracotta-ink tabular-nums">0{i + 1}</span>
              <span className="text-[1rem]">{x}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-display text-[1.35rem]">{r.price}</p>
        <div className="mt-7">
          <Book>{r.book}</Book>
        </div>
      </Reveal>
    </section>
  );
}

function Reviews({ lang, d }: P) {
  return (
    <section aria-label={d.reviews.eyebrow} className="border-y border-line">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:px-10 lg:py-20">
        {avis.quotes.map((q, i) => (
          <Reveal key={q.author} delay={i * 0.1}>
            <figure>
              <blockquote className="display text-[1.6rem] leading-snug sm:text-[1.9rem]">{lang === "fr" ? `« ${q.text[lang]} »` : `“${q.text[lang]}”`}</blockquote>
              <figcaption className="mt-4 text-[0.875rem] text-muted">
                {q.author} · {d.reviews.via}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Gift({ lang, d }: P) {
  const g = d.gift;
  return (
    <section aria-labelledby="cadeau-title" className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="grid items-center gap-10 border border-line bg-paper-deep/60 p-8 sm:p-12 md:grid-cols-[1.3fr_1fr] lg:p-16">
        <Reveal>
          <p className="eyebrow">{g.eyebrow}</p>
          <h2 id="cadeau-title" className="display mt-4 text-[2.2rem] sm:text-[2.7rem]">
            {g.title}
          </h2>
          <p className="lead mt-5 max-w-lg">{g.text}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3">
          <Link href={`${href(lang, "devis")}?prestation=carte-cadeau-femme`} className="flex items-center justify-between border-b border-line py-4 font-display text-[1.5rem] hover:text-terracotta-ink">
            {g.women} <ArrowIcon />
          </Link>
          <Link href={`${href(lang, "devis")}?prestation=carte-cadeau-homme`} className="flex items-center justify-between border-b border-line py-4 font-display text-[1.5rem] hover:text-terracotta-ink">
            {g.men} <ArrowIcon />
          </Link>
          <a href={`tel:${site.phoneIntl}`} className="mt-3 inline-flex items-center gap-2 text-[0.9375rem] text-muted hover:text-ink">
            <PhoneIcon /> {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Infos({ lang, d }: P) {
  const t = d.infos;
  const today = new Date().toISOString().slice(0, 10);
  const closures = upcomingClosures(today);
  return (
    <section id="infos" aria-labelledby="infos-title" className="scroll-mt-24 bg-ink text-paper">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
        <div>
          <Reveal>
            <p className="eyebrow !text-wood">{t.eyebrow}</p>
            <h2 id="infos-title" className="display mt-4 text-[2.4rem] sm:text-[3rem]">
              {t.title}
            </h2>
            <OpenStatus className="mt-5 text-[0.9375rem] text-paper/80" />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            <div>
              <h3 className="eyebrow !text-wood">{t.hours}</h3>
              <Hours lang={lang} d={d} className="mt-4 text-[0.9375rem]" dim="text-paper/50" />
              {!horaires.confirmed && <p className="mt-3 text-[0.75rem] text-paper/50">{t.hoursNote}</p>}
              {closures.length > 0 && (
                <div className="mt-4 text-[0.875rem] text-paper/70">
                  <p>{t.closures} :</p>
                  <ul className="mt-1">
                    {closures.map((c) => (
                      <li key={c.from}>
                        {new Intl.DateTimeFormat(intlLocale[lang], { weekday: "long", day: "numeric", month: "long" }).format(new Date(`${c.from}T12:00:00`))} · {c.label[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="eyebrow !text-wood">{t.address}</h3>
                <address className="mt-4 text-[0.9375rem] leading-relaxed not-italic">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </address>
                <a href={site.maps} target="_blank" rel="noopener" className="link-line mt-3 inline-flex items-center gap-2 text-[0.875rem]">
                  <PinIcon /> {t.directions}
                </a>
              </div>
              <div>
                <h3 className="eyebrow !text-wood">{t.phone}</h3>
                <a href={`tel:${site.phoneIntl}`} className="mt-4 inline-block font-display text-[1.6rem] hover:text-wood">
                  {site.phone}
                </a>
              </div>
              <div>
                <h3 className="eyebrow !text-wood">{t.payment}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed">{t.paymentText}</p>
              </div>
            </div>
            <div className="sm:col-span-2">
              <h3 className="eyebrow !text-wood">{t.access}</h3>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-paper/80">{t.accessText}</p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
            <Book className="btn-solid !bg-paper !text-ink !border-paper hover:!bg-wood hover:!border-wood">{d.nav.book}</Book>
            <a href={`tel:${site.phoneIntl}`} className="btn-line on-dark">
              <PhoneIcon /> {d.nav.call}
            </a>
          </Reveal>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[1fr_1fr]">
          <Reveal className="relative aspect-square lg:aspect-auto">
            <Image src="/media/salon/devanture-rue-jean-calvin.jpg" alt={t.storefrontAlt} fill sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-square lg:aspect-auto">
            <MapEmbed src={site.mapsEmbed} title={t.mapTitle} label={t.mapLoad} note={t.mapNote} address={`${site.address.street}, ${site.address.postalCode} ${site.address.city}`} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Faq({ d }: P) {
  const f = d.faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto grid max-w-[90rem] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-20 lg:px-10 lg:py-28">
      <Reveal>
        <p className="eyebrow">{f.eyebrow}</p>
        <h2 id="faq-title" className="display mt-4 text-[2.4rem] sm:text-[3rem]">
          {f.title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="divide-y divide-line border-y border-line">
          {f.items.map((q) => (
            <details key={q.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] [&::-webkit-details-marker]:hidden">
                {q.q}
                <span aria-hidden="true" className="relative size-3 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current after:transition-transform after:duration-500 group-open:after:scale-y-0" />
              </summary>
              <p className="pb-6 text-[0.9375rem] leading-relaxed text-muted">{q.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function HomePage(p: P) {
  return (
    <>
      <Hero {...p} />
      <Tiles {...p} />
      <Prices {...p} />
      <Team {...p} />
      <Transformations {...p} />
      <Ritual {...p} />
      <Reviews {...p} />
      <Gift {...p} />
      <Infos {...p} />
      <Faq {...p} />
    </>
  );
}
