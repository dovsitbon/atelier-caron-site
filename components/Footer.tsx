import Link from "next/link";
import site from "@/data/site.json";
import type { Dict, Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { Logo } from "@/components/Logo";
import { Hours } from "@/components/Hours";
import { FacebookIcon, InstagramIcon } from "@/components/icons";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const f = d.footer;
  return (
    <footer className="bg-ink pb-28 text-paper/85 lg:pb-0">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.1fr_1fr] lg:px-10 lg:py-20">
        <div>
          <Logo className="items-start text-paper [&>span:last-child]:text-paper/60" />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-paper/70">{f.tagline}</p>
        </div>
        <div>
          <p className="eyebrow !text-wood">{f.contact}</p>
          <address className="mt-4 text-[0.9375rem] leading-relaxed not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
            <br />
            <a href={`tel:${site.phoneIntl}`} className="mt-3 inline-block hover:text-paper">
              {site.phone}
            </a>
          </address>
          <p className="mt-3 text-[0.875rem] text-paper/60">{d.infos.paymentText}</p>
        </div>
        <div>
          <p className="eyebrow !text-wood">{f.hours}</p>
          <Hours lang={lang} d={d} className="mt-4 text-[0.9375rem]" dim="text-paper/50" />
        </div>
        <div>
          <p className="eyebrow !text-wood">{f.follow}</p>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            <li>
              <a href={site.booking} target="_blank" rel="noopener" className="hover:text-paper">
                {f.book}
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-paper">
                <InstagramIcon /> Instagram
              </a>
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-paper">
                <FacebookIcon /> Facebook
              </a>
            </li>
            <li>
              <Link href={href(lang, "devis")} className="hover:text-paper">
                {f.devis}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-4 border-t border-paper/15 px-5 py-6 text-[0.8125rem] text-paper/60 sm:px-8 lg:px-10">
        <p>
          © {new Date().getFullYear()} {site.name}. {f.rights}
        </p>
        <Link href={href(lang, "legal")} className="hover:text-paper">
          {f.legal}
        </Link>
      </div>
    </footer>
  );
}
