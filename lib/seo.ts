import { Locale, locales, defaultLocale } from "./i18n";

// Canonical production domain. Connected to Netlify on 16/09 — used as the
// single source of truth for every absolute URL the site emits (canonical
// links, hreflang alternates, sitemap, OG/Twitter images, JSON-LD).
export const SITE_URL = "https://lyluxuryrealestate.com";

export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`.replace(/\/$/, "") || SITE_URL;
}

// Builds the `alternates` metadata field (canonical + hreflang for every
// locale + x-default) for a given page, identified by its path WITHOUT the
// locale prefix — e.g. "" for the homepage, "/properties/villa-ubud-bali"
// for a property page. Every localized version of a page must point at the
// same pathSuffix for hreflang to be correct, which holds site-wide here
// since routing is a flat /{locale}/... mirror across all 9 languages.
export function buildAlternates(pathSuffix: string, locale: Locale) {
  const suffix = pathSuffix === "" ? "" : pathSuffix.startsWith("/") ? pathSuffix : `/${pathSuffix}`;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = absoluteUrl(`/${l}${suffix}`);
  }
  languages["x-default"] = absoluteUrl(`/${defaultLocale}${suffix}`);

  return {
    canonical: absoluteUrl(`/${locale}${suffix}`),
    languages,
  };
}

// OG locale codes (og:locale wants underscore + region, not our bare
// language codes). Regions are a reasonable default per language, not a
// claim about where each visitor is.
export const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  nl: "nl_NL",
  de: "de_DE",
  sr: "sr_RS",
  hr: "hr_HR",
  ru: "ru_RU",
  bg: "bg_BG",
};

// Fallback OG/Twitter image when a page has no photo of its own (most
// destination and utility pages). A real property photo is used instead
// wherever one exists (see the property detail page's generateMetadata).
export const DEFAULT_OG_IMAGE = "/images/hero-bali.jpg";
