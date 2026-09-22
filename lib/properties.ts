import { Locale } from "./i18n";
import propertiesData from "@/data/properties.json";
import { COMING_SOON_COUNTRY_NAMES } from "./geography";
import type { Dictionary } from "./dictionaries";

// Properties are synced from Airtable ("Ly Luxury - International" base,
// table "Biens") into this static JSON snapshot — the site is a static
// export with no server, so property pages are generated at build time
// from whatever is in this file. Re-run the sync (ask Claude to "mettre
// à jour les biens du site") whenever records change in Airtable, then
// rebuild + redeploy for new/updated property pages to go live.
//
// Only records with a non-empty `slug` produce a live page — that field
// is what becomes the URL (lyluxuryrealestate.com/{locale}/properties/{slug}).
//
// Photos: Airtable's attachment URLs are temporary signed links, not
// permanent — the sync step must download each photo and save it under
// /public/images/properties/{slug}/ so `photos` below holds local paths
// that survive the static export, not raw Airtable URLs.

export interface PropertyRecord {
  id: string;
  slug: string;
  reference: string;
  condition?: string; // Neuf / Bien neuf / Seconde main (Airtable "Condition" field)
  category: string; // Villa / Appartement / Maison / Penthouse / Finca / Résidentiel
  listingType: string; // Vente / Location vacance / Location longue durée / Location hivernale
  status: string; // Disponible / Vendu / Loué / Réservé
  price: number | null;
  currency: string;
  bedrooms: number | null;
  bathrooms: number | null;
  surface: number | null;
  land: number | null;
  country: string;
  sector: string;
  city: string;
  zone: string;
  projectName?: string; // Airtable "Nom_Projet" — shared across units of the same development (e.g. "Suku Residences"). Empty for a standalone, non-programme listing.
  promoter?: string; // Airtable "Promoteur"
  datePublication?: string;
  photos: string[];
  titles: Partial<Record<Locale, string>>;
  descriptions: Partial<Record<Locale, string>>;
  features: Partial<Record<Locale, string[]>>;
}

export const properties: PropertyRecord[] = propertiesData as PropertyRecord[];

// Only properties with a slug (and therefore a real URL) are ever shown or
// routed to — an incomplete Airtable record simply doesn't appear yet.
export const liveProperties = properties.filter((p) => p.slug);

export function getAllSlugs(): string[] {
  return liveProperties.map((p) => p.slug);
}

export function getPropertyBySlug(slug: string): PropertyRecord | undefined {
  return liveProperties.find((p) => p.slug === slug);
}

const statusKey = (status: string): "available" | "sold" | "rented" | "reserved" => {
  switch (status) {
    case "Vendu":
      return "sold";
    case "Loué":
      return "rented";
    case "Réservé":
      return "reserved";
    default:
      return "available";
  }
};

// Maps the raw country label as stored in Airtable's "Pays" field to the
// site's own geography slug, so property groupings can reuse the same
// translated country names as the Destinations pages.
const countrySlugByLabel: Record<string, string> = {
  "España": "spain",
  "Espagne": "spain",
  "Émirats Arabes Unis": "uae",
  "Bali": "bali",
  "Portugal": "portugal",
  "France": "france",
  "Thaïlande": "thailand",
  "États-Unis": "usa",
};

export function countrySlugFor(rawCountry: string): string | undefined {
  return countrySlugByLabel[rawCountry];
}

// Translated display name for a raw Airtable country value — same logic the
// Destinations pages use (live countries pull from dict.destinations.items,
// not-yet-live ones from COMING_SOON_COUNTRY_NAMES), shared here so the
// homepage search bar and the Properties filters read identical labels.
export function countryLabelFor(rawCountry: string, locale: Locale, dict: Dictionary): string {
  const slug = countrySlugFor(rawCountry);
  if (!slug) return rawCountry;
  const live = dict.destinations.items.find((i) => i.slug === slug);
  if (live) return live.name;
  return COMING_SOON_COUNTRY_NAMES[slug]?.[locale] ?? rawCountry;
}

// Raw Airtable "Categorie" values translated for the filter dropdown. Kept
// as a small static map (not full dictionary entries) since there are only
// a handful of property categories in use — same caveat as the rest of the
// non-FR/EN copy: a native-speaker proofread pass is still pending.
const categoryLabels: Record<string, Partial<Record<Locale, string>>> = {
  Villa: {
    en: "Villa", fr: "Villa", es: "Villa", nl: "Villa", de: "Villa",
    sr: "Vila", hr: "Vila", ru: "Вилла", bg: "Вила",
  },
  Appartement: {
    en: "Apartment", fr: "Appartement", es: "Apartamento", nl: "Appartement", de: "Wohnung",
    sr: "Stan", hr: "Stan", ru: "Квартира", bg: "Апартамент",
  },
  Maison: {
    en: "House", fr: "Maison", es: "Casa", nl: "Huis", de: "Haus",
    sr: "Kuća", hr: "Kuća", ru: "Дом", bg: "Къща",
  },
  Penthouse: {
    en: "Penthouse", fr: "Penthouse", es: "Ático", nl: "Penthouse", de: "Penthouse",
    sr: "Penthaus", hr: "Penthouse", ru: "Пентхаус", bg: "Пентхаус",
  },
  Finca: {
    en: "Finca", fr: "Finca", es: "Finca", nl: "Finca", de: "Finca",
    sr: "Finca", hr: "Finca", ru: "Финка", bg: "Финка",
  },
  Résidentiel: {
    en: "Residential", fr: "Résidentiel", es: "Residencial", nl: "Residentieel", de: "Wohnobjekt",
    sr: "Stambeni objekat", hr: "Stambeni objekt", ru: "Жилая недвижимость", bg: "Жилищен имот",
  },
};

export function categoryLabelFor(rawCategory: string, locale: Locale): string {
  return categoryLabels[rawCategory]?.[locale] ?? rawCategory;
}

// Airtable "Condition" field (Neuf / Bien neuf / Seconde main).
const conditionLabels: Record<string, Partial<Record<Locale, string>>> = {
  Neuf: {
    en: "New", fr: "Neuf", es: "Nuevo", nl: "Nieuw", de: "Neu",
    sr: "Novo", hr: "Novo", ru: "Новое", bg: "Ново",
  },
  "Bien neuf": {
    en: "New build", fr: "Bien neuf", es: "Obra nueva", nl: "Nieuwbouw", de: "Neubau",
    sr: "Novogradnja", hr: "Novogradnja", ru: "Новостройка", bg: "Ново строителство",
  },
  "Seconde main": {
    en: "Resale", fr: "Seconde main", es: "Segunda mano", nl: "Tweedehands", de: "Bestandsimmobilie",
    sr: "Polovna nekretnina", hr: "Rabljena nekretnina", ru: "Вторичное жильё", bg: "Втора употреба",
  },
};

export function conditionLabelFor(rawCondition: string, locale: Locale): string {
  return conditionLabels[rawCondition]?.[locale] ?? rawCondition;
}

// Static, indicative EUR conversion used ONLY to compare/sort/filter prices
// across currencies internally (e.g. a EUR budget filter matching a
// USD-priced villa) — never shown to a client as a real exchange rate. Per
// project rules, real displayed conversions must be clearly marked
// "indicative" and checked periodically; this table should be refreshed the
// same way.
const EUR_RATE_INDICATIVE: Record<string, number> = {
  EUR: 1,
  USD: 0.92,
  GBP: 1.17,
  AED: 0.25,
};

export function priceInEURIndicative(price: number, currency: string): number {
  return price * (EUR_RATE_INDICATIVE[currency] ?? 1);
}

// Maps the raw Airtable "Ville" / "Secteur" labels to the matching slug in
// lib/geography.ts, so a destination page (region or city) can list the
// real properties located there. Bali properties store their neighbourhood
// (Uluwatu, Canggu…) in both Ville and Secteur — geography.ts treats those
// as top-level "regions" with no cities underneath, same as Dubai/Abu Dhabi.
// Spain properties (once any exist) use Secteur for the Costa
// Blanca/Cálida region and Ville for the actual town.
const placeSlugByLabel: Record<string, string> = {
  "Dubaï": "dubai",
  "Abu Dhabi": "abu-dhabi",
  Uluwatu: "uluwatu",
  Canggu: "canggu",
  Ubud: "ubud",
  Seminyak: "seminyak",
  "Costa Blanca": "costa-blanca",
  "Costa Cálida": "costa-calida",
  Torrevieja: "torrevieja",
  "Orihuela Costa": "orihuela-costa",
  "Guardamar del Segura": "guardamar-del-segura",
  Algorfa: "algorfa",
  Alicante: "alicante",
  "San Javier": "san-javier",
  "La Manga del Mar Menor": "la-manga-del-mar-menor",
  "Los Alcázares": "los-alcazares",
  Murcia: "murcia",
};

export function placeSlugFor(rawLabel: string): string | undefined {
  return placeSlugByLabel[rawLabel];
}

// Every live property located at a given destinations.ts place (region or
// city), matched on whichever of Ville/Secteur carries that place's name —
// see placeSlugByLabel above for why both are checked.
export function propertiesForPlace(placeSlug: string): PropertyRecord[] {
  return liveProperties.filter(
    (p) => placeSlugFor(p.city) === placeSlug || placeSlugFor(p.sector) === placeSlug
  );
}

export function distinctCountries(props: PropertyRecord[]): string[] {
  return Array.from(new Set(props.map((p) => p.country).filter(Boolean)));
}

export function distinctCategories(props: PropertyRecord[]): string[] {
  return Array.from(new Set(props.map((p) => p.category).filter(Boolean)));
}

export function propertyStatusLabel(
  status: string,
  labels: { available: string; sold: string; rented: string; reserved: string }
): string {
  return labels[statusKey(status)];
}
