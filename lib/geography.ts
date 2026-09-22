import { Locale } from "./i18n";

// The full destination tree: Country -> Region (optional) -> City/Area.
// Place names (regions, cities) are kept in their local spelling across all
// locales — this matches how international real estate sites usually treat
// proper place names, and avoids mistranslating small towns. Country-level
// display names ARE translated (see COUNTRY_NAMES / dict.destinations.items).
//
// "live" countries have real content (LY is actually active there or has
// real photography). Non-live countries are shown as "coming soon" so the
// network can visibly grow without implying a presence that doesn't exist
// yet — see project rule: never present LY as active somewhere it isn't.

export interface GeoPlace {
  slug: string;
  name: string;
  image?: string;
}

export interface GeoRegion extends GeoPlace {
  cities?: GeoPlace[];
}

export interface GeoCountry extends GeoPlace {
  live: boolean;
  regions?: GeoRegion[];
}

export const geography: GeoCountry[] = [
  {
    slug: "spain",
    name: "Spain",
    live: true,
    image: "/images/villa-spain-exterior.jpg",
    regions: [
      {
        slug: "costa-blanca",
        name: "Costa Blanca",
        image: "/images/villa-spain-terrace.jpg",
        cities: [
          { slug: "torrevieja", name: "Torrevieja" },
          { slug: "orihuela-costa", name: "Orihuela Costa" },
          { slug: "guardamar-del-segura", name: "Guardamar del Segura" },
          { slug: "algorfa", name: "Algorfa" },
          { slug: "alicante", name: "Alicante" },
        ],
      },
      {
        slug: "costa-calida",
        name: "Costa Cálida",
        image: "/images/villa-spain-interior.jpg",
        cities: [
          { slug: "san-javier", name: "San Javier" },
          { slug: "la-manga-del-mar-menor", name: "La Manga del Mar Menor" },
          { slug: "los-alcazares", name: "Los Alcázares" },
          { slug: "murcia", name: "Murcia" },
        ],
      },
    ],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    live: true,
    image: "/images/villa-dubai.jpg",
    regions: [
      {
        slug: "dubai",
        name: "Dubai",
        image: "/images/villa-dubai.jpg",
      },
      {
        slug: "abu-dhabi",
        name: "Abu Dhabi",
        // No dedicated Abu Dhabi photography yet even though a real listing
        // (River Cove Residences) is published there — its own photos live
        // only in Airtable's temporary attachment URLs, out of reach of this
        // build. Swap in a real one once downloaded/committed.
      },
    ],
  },
  {
    slug: "bali",
    name: "Bali",
    live: true,
    image: "/images/hero-bali.jpg",
    regions: [
      { slug: "seminyak", name: "Seminyak" }, // No live listing there yet — needs real photography.
      { slug: "ubud", name: "Ubud", image: "/images/destinations/bali-ubud.webp" },
      { slug: "canggu", name: "Canggu", image: "/images/destinations/bali-canggu.webp" },
      { slug: "uluwatu", name: "Uluwatu", image: "/images/destinations/bali-uluwatu.webp" },
    ],
  },
  { slug: "portugal", name: "Portugal", live: false },
  { slug: "france", name: "France", live: false },
  { slug: "thailand", name: "Thailand", live: false },
  { slug: "usa", name: "United States", live: false },
];

// Translated display names for countries that don't yet have a full entry
// in dict.destinations.items (which already carries native translations for
// Spain / UAE / Bali). Kept separate so dictionaries.ts doesn't balloon with
// countries that have no live content yet.
export const COMING_SOON_COUNTRY_NAMES: Record<string, Record<Locale, string>> = {
  portugal: {
    en: "Portugal", fr: "Portugal", es: "Portugal", nl: "Portugal", de: "Portugal",
    sr: "Portugalija", hr: "Portugal", ru: "Португалия", bg: "Португалия",
  },
  france: {
    en: "France", fr: "France", es: "Francia", nl: "Frankrijk", de: "Frankreich",
    sr: "Francuska", hr: "Francuska", ru: "Франция", bg: "Франция",
  },
  thailand: {
    en: "Thailand", fr: "Thaïlande", es: "Tailandia", nl: "Thailand", de: "Thailand",
    sr: "Tajland", hr: "Tajland", ru: "Таиланд", bg: "Тайланд",
  },
  usa: {
    en: "United States", fr: "États-Unis", es: "Estados Unidos", nl: "Verenigde Staten", de: "USA",
    sr: "SAD", hr: "SAD", ru: "США", bg: "САЩ",
  },
};

export function findCountry(slug: string): GeoCountry | undefined {
  return geography.find((c) => c.slug === slug);
}

export function findRegion(country: GeoCountry, slug: string): GeoRegion | undefined {
  return country.regions?.find((r) => r.slug === slug);
}

export function findCity(region: GeoRegion, slug: string): GeoPlace | undefined {
  return region.cities?.find((c) => c.slug === slug);
}
