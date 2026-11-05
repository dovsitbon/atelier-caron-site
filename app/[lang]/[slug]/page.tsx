import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import { getDict, isLocale, locales, ogLocale, type Locale } from "@/lib/i18n";
import { PAGES, pageOf } from "@/lib/routes";
import { DevisForm } from "@/components/DevisForm";
import { PhoneIcon } from "@/components/icons";

export function generateStaticParams() {
  return locales.flatMap((lang) => Object.values(PAGES).map((p) => ({ lang, slug: p[lang] })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const id = pageOf(lang, slug);
  if (!id) return {};
  const d = getDict(lang);
  const title = id === "devis" ? d.devis.metaTitle : `${d.legal.title} | ${site.name}`;
  const description = id === "devis" ? d.devis.metaDescription : d.legal.metaDescription;
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/${slug}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}/${PAGES[id][l]}`])), "x-default": `/fr/${PAGES[id].fr}` },
    },
    openGraph: { type: "website", url: `/${lang}/${slug}`, siteName: site.name, title, description, locale: ogLocale[lang], images: [{ url: "/og.jpg", width: 1200, height: 630, alt: d.meta.ogAlt }] },
    robots: id === "legal" ? { index: false, follow: true } : undefined,
  };
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const id = pageOf(lang as Locale, slug);
  if (!id) notFound();
  const d = getDict(lang);

  if (id === "legal") {
    return (
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <h1 className="display text-[2.6rem] sm:text-[3.2rem]">{d.legal.title}</h1>
        <div className="mt-10 space-y-8">
          {d.legal.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-[1.5rem]">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
            </section>
          ))}
        </div>
      </article>
    );
  }

  const f = d.devis;
  return (
    <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-10 lg:py-24">
      <div>
        <p className="eyebrow">{f.eyebrow}</p>
        <h1 className="display mt-4 text-[2.8rem] sm:text-[3.4rem]">{f.title}</h1>
        <p className="lead mt-6 max-w-md">{f.lead}</p>
        <a href={`tel:${site.phoneIntl}`} className="mt-8 inline-flex items-center gap-2 font-display text-[1.6rem] hover:text-terracotta-ink">
          <PhoneIcon className="size-5" /> {site.phone}
        </a>
        <p className="mt-3 text-[0.9375rem] text-muted">{d.infos.paymentText}</p>
      </div>
      <Suspense>
        <DevisForm />
      </Suspense>
    </div>
  );
}
