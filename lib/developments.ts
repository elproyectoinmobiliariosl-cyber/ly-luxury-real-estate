import { liveProperties, PropertyRecord } from "./properties";

// A "development" groups every unit configuration (Airtable record) that
// shares the same Nom_Projet — e.g. Suku Residences' 2/3/4-bedroom villas
// become one development with three units, while a standalone listing with
// no Nom_Projet (Villa Ubud) never appears here and stays a plain property.
//
// Grouping key is the raw projectName string (case-sensitive, as typed in
// Airtable) — keep spelling consistent there so two records meant to be the
// same development don't split into two cards.

export interface Development {
  slug: string;
  name: string;
  promoter: string;
  country: string;
  city: string;
  sector: string;
  units: PropertyRecord[];
  photos: string[];
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

export function getDevelopments(): Development[] {
  const groups = new Map<string, PropertyRecord[]>();
  for (const p of liveProperties) {
    const key = p.projectName?.trim();
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  }

  return Array.from(groups.entries())
    .map(([name, units]) => {
      const first = units[0];
      return {
        slug: slugify(name),
        name,
        promoter: first.promoter ?? "",
        country: first.country,
        city: first.city,
        sector: first.sector,
        units,
        photos: Array.from(new Set(units.flatMap((u) => u.photos))),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getDevelopmentBySlug(slug: string): Development | undefined {
  return getDevelopments().find((d) => d.slug === slug);
}

export interface FromPrice {
  price: number;
  currency: string;
}

export function developmentFromPrice(dev: Development): FromPrice | null {
  const priced = dev.units.filter((u): u is PropertyRecord & { price: number } => u.price !== null);
  if (priced.length === 0) return null;
  const min = priced.reduce((a, b) => (a.price < b.price ? a : b));
  return { price: min.price, currency: min.currency };
}

export type DevelopmentAvailability = "available" | "limited" | "reserved" | "soldOut";

// "Disponible" units vs. the rest (Réservé / Vendu / Loué). A development
// reads as fully available only if every one of its units is; "reserved" is
// used as the general not-fully-sold-out-but-nothing-open fallback since a
// mixed Réservé/Vendu development isn't quite "sold out" either.
export function developmentAvailability(dev: Development): DevelopmentAvailability {
  const total = dev.units.length;
  const available = dev.units.filter((u) => u.status === "Disponible").length;
  if (available === total) return "available";
  if (available > 0) return "limited";
  const allGone = dev.units.every((u) => u.status === "Vendu" || u.status === "Loué");
  return allGone ? "soldOut" : "reserved";
}
