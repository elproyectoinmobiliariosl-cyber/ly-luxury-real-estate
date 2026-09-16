import Link from "next/link";
import { Dictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-line bg-noir text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <div className="font-display text-lg">LY LUXURY REAL ESTATE</div>
            <p className="mt-3 max-w-xs text-sm text-ivory/60">{dict.footer.tagline}</p>
          </div>
          <div>
            <div className="eyebrow mb-4">{dict.nav.destinations}</div>
            <ul className="space-y-2 text-sm text-ivory/70">
              {dict.destinations.items.map((d) => (
                <li key={d.slug}>
                  <Link href={`/${locale}/destinations/${d.slug}`} className="hover:text-brass-soft">
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4">{dict.nav.services}</div>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li><Link href={`/${locale}/properties`} className="hover:text-brass-soft">{dict.nav.properties}</Link></li>
              <li><Link href={`/${locale}/developments`} className="hover:text-brass-soft">{dict.nav.developments}</Link></li>
              <li><Link href={`/${locale}/invest`} className="hover:text-brass-soft">{dict.nav.invest}</Link></li>
              <li><Link href={`/${locale}/about`} className="hover:text-brass-soft">{dict.nav.about}</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>Letisia — +34 612 272 438</li>
              <li>Yana — +34 620 812 775</li>
              <li>
                <a href={`mailto:${dict.footer.email}`} className="hover:text-brass-soft">
                  {dict.footer.email}
                </a>
              </li>
              <li className="pt-1 text-xs text-ivory/50">{dict.footer.license}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} LY Luxury Real Estate by El Proyecto Inmobiliario. {dict.footer.rights}</span>
          <div className="flex gap-4">
            <Link href={`/${locale}/legal/privacy-policy`} className="hover:text-ivory">{dict.legal.privacyTitle}</Link>
            <Link href={`/${locale}/legal/legal-notice`} className="hover:text-ivory">{dict.legal.noticeTitle}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
