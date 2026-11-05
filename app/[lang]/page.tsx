import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { faqJsonLd } from "@/lib/jsonld";
import { HomePage } from "@/components/Home";

export const revalidate = 86400;

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(d.faq.items)) }} />
      <HomePage lang={lang} d={d} />
    </>
  );
}
