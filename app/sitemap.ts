import type { MetadataRoute } from "next";
import { locales, Locale } from "@/lib/i18n";

// Static export requires every route to declare it has no request-time
// dependency — this file has none (everything below comes from static data).
export const dynamic = "force-static";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { getAllSlugs } from "@/lib/properties";
import { geography } from "@/lib/geography";

// Static pages that exist for every locale, each with a rough priority /
// change-frequency guess. Legal pages are deliberately excluded — they're
// noindex placeholders (see legal/[doc]/page.tsx) until real content exists.
const STATIC_PAGES: { suffix: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { suffix: "", priority: 1, changeFrequency: "weekly" },
  { suffix: "/properties", priority: 0.9, changeFrequency: "daily" },
  { suffix: "/developments", priority: 0.8, changeFrequency: "weekly" },
  { suffix: "/destinations", priority: 0.7, changeFrequency: "monthly" },
  { suffix: "/invest", priority: 0.6, changeFrequency: "monthly" },
  { suffix: "/services", priority: 0.6, changeFrequency: "monthly" },
  { suffix: "/about", priority: 0.5, changeFrequency: "monthly" },
  { suffix: "/contact", priority: 0.6, changeFrequency: "monthly" },
];

// Every destinations path that actually renders a page (mirrors the
// [[...path]] catch-all's own logic): every country gets a page; only LIVE
// countries go deeper into regions, and only regions with cities go one
// level deeper than that — a non-live country beyond its own page is a 404,
// so it must not appear here.
function destinationSuffixes(): string[] {
  const suffixes: string[] = [];
  for (const country of geography) {
    suffixes.push(`/destinations/${country.slug}`);
    if (!country.live) continue;
    for (const region of country.regions ?? []) {
      suffixes.push(`/destinations/${country.slug}/${region.slug}`);
      for (const city of region.cities ?? []) {
        suffixes.push(`/destinations/${country.slug}/${region.slug}/${city.slug}`);
      }
    }
  }
  return suffixes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const propertySuffixes = getAllSlugs().map((slug) => `/properties/${slug}`);
  const allSuffixes = [
    ...STATIC_PAGES.map((p) => p.suffix),
    ...propertySuffixes,
    ...destinationSuffixes(),
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const suffix of allSuffixes) {
    const staticMeta = STATIC_PAGES.find((p) => p.suffix === suffix);
    for (const locale of locales as readonly Locale[]) {
      const { languages } = buildAlternates(suffix, locale);
      entries.push({
        url: absoluteUrl(`/${locale}${suffix}`),
        lastModified: now,
        changeFrequency: staticMeta?.changeFrequency ?? (suffix.startsWith("/properties/") ? "weekly" : "monthly"),
        priority: staticMeta?.priority ?? (suffix.startsWith("/properties/") ? 0.85 : 0.4),
        alternates: { languages },
      });
    }
  }
  return entries;
}
