// Locale configuration for LY Luxury Real Estate.
// All 9 languages spoken across the founding team are live routes.
// EN, FR are fully bespoke. ES, NL, DE, SR, HR, RU, BG currently carry
// professionally-worded copy for the hero/founders/footer (sourced from
// Letisia's own marketing materials) with the remaining UI strings
// machine-translated as a v1 — flag these for a native-speaker pass
// before heavy paid traffic is sent to those locales.

export const locales = [
  "en",
  "fr",
  "es",
  "nl",
  "de",
  "sr",
  "hr",
  "ru",
  "bg",
] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
  nl: "NL",
  de: "DE",
  sr: "SR",
  hr: "HR",
  ru: "RU",
  bg: "BG",
};

// Full language names, written in the language itself, for the language
// switcher — so a visitor recognizes their own language regardless of
// which locale they're currently reading.
export const localeNativeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  nl: "Nederlands",
  de: "Deutsch",
  sr: "Srpski",
  hr: "Hrvatski",
  ru: "Русский",
  bg: "Български",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
