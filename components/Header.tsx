import Image from "next/image";
import Link from "next/link";
import { Dictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const nav: { href: string; label: string }[] = [
    { href: `/${locale}/properties`, label: dict.nav.properties },
    { href: `/${locale}/developments`, label: dict.nav.developments },
    { href: `/${locale}/destinations`, label: dict.nav.destinations },
    { href: `/${locale}/invest`, label: dict.nav.invest },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-noir/60 via-noir/20 to-transparent pb-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 lg:px-10">
        <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3 leading-tight">
          <Image
            src="/images/logo.jpg"
            alt="LY Luxury Real Estate"
            width={44}
            height={44}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-ivory/30"
            priority
          />
          <span className="hidden sm:block">
            <span className="block font-display text-lg tracking-wide text-ivory">
              LY LUXURY
            </span>
            <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-sable">
              by El Proyecto Inmobiliario
            </span>
          </span>
        </Link>

        <nav className="hidden flex-wrap justify-center gap-x-6 gap-y-1 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-xs uppercase tracking-[0.1em] text-ivory/90 transition hover:text-brass-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-5">
          <LanguageSwitcher locale={locale} />
          <MobileNav locale={locale} nav={nav} />
        </div>
      </div>
    </header>
  );
}
