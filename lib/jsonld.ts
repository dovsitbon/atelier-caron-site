import site from "@/data/site.json";
import horaires from "@/data/horaires.json";
import avis from "@/data/avis.json";
import prestations from "@/data/prestations.json";
import { getDict, type Locale } from "@/lib/i18n";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const BUSINESS_ID = `${site.url}/#salon`;

/** Schema.org HairSalon + BarberShop : adresse, horaires, note Planity datée, paiement espèces/chèque, offres et prix. */
export function businessJsonLd(lang: Locale) {
  const d = getDict(lang);
  const week = horaires.week as unknown as Record<string, [string, string][] | null>;
  const hours = Object.entries(week).flatMap(([day, ranges]) => (ranges ?? []).map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAYS[Number(day)], opens, closes })));
  const catalog = prestations.categories.map((c) => ({
    "@type": "OfferCatalog",
    name: c.title[lang],
    itemListElement: c.items.map((i) => {
      const p = i.price as { min?: number; max?: number; from?: number } | null;
      const price = p ? (p.from != null ? { minPrice: p.from } : p.min === p.max ? { price: p.min } : { minPrice: p.min, maxPrice: p.max }) : null;
      return {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: i.name[lang] },
        ...(price ? { priceSpecification: { "@type": "PriceSpecification", priceCurrency: "EUR", ...price } } : {}),
      };
    }),
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HairSalon", "BarberShop"],
        "@id": BUSINESS_ID,
        name: site.name,
        alternateName: ["L'atelier coiffure", "Atelier Caron"],
        description: d.meta.description,
        url: `${site.url}/${lang}`,
        image: [`${site.url}/og.jpg`, `${site.url}/media/salon/devanture-rue-jean-calvin.jpg`],
        logo: `${site.url}/logo.svg`,
        telephone: site.phoneIntl,
        foundingDate: String(site.foundingYear),
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Cheque",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          postalCode: site.address.postalCode,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
        hasMap: site.maps,
        openingHoursSpecification: hours,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: avis.planity.rating,
          reviewCount: avis.planity.count,
          bestRating: 5,
          worstRating: 1,
          description: `Planity, ${avis.checked}`,
        },
        employee: [
          { "@type": "Person", name: "Quentin", jobTitle: d.team.quentin.role },
          { "@type": "Person", name: "Zoé", jobTitle: d.team.zoe.role },
        ],
        potentialAction: { "@type": "ReserveAction", target: site.booking },
        hasOfferCatalog: { "@type": "OfferCatalog", name: d.prices.title, itemListElement: catalog },
        sameAs: [site.instagram, site.facebook, site.booking],
      },
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: ["fr", "en"], publisher: { "@id": BUSINESS_ID } },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
