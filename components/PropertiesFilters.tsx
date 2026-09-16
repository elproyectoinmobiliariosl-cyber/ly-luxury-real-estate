"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Dictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n";
import {
  PropertyRecord,
  categoryLabelFor,
  countryLabelFor,
  countrySlugFor,
  distinctCategories,
  distinctCountries,
  priceInEURIndicative,
  propertyStatusLabel,
} from "@/lib/properties";

function formatPrice(price: number | null, currency: string, locale: Locale, priceOnRequest: string) {
  if (price === null) return priceOnRequest;
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency || "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${price.toLocaleString(locale)} ${currency}`;
  }
}

function PropertyCard({ property, l, dict }: { property: PropertyRecord; l: Locale; dict: Dictionary }) {
  const title = property.titles[l] ?? property.titles.en ?? property.reference;
  const locationLine = [property.city, property.country].filter(Boolean).join(" · ");
  return (
    <Link href={`/${l}/properties/${property.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden">
        {property.photos[0] ? (
          <Image
            src={property.photos[0]}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="photo-placeholder h-full w-full" data-label={title} />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <div className="text-sm text-ink-soft">{locationLine}</div>
          <div className="font-display text-lg">{title}</div>
          <div className="text-xs text-ink-soft/70">{propertyStatusLabel(property.status, dict.property.status)}</div>
        </div>
        <div className="whitespace-nowrap text-sm text-brass">
          {formatPrice(property.price, property.currency, l, dict.property.priceOnRequest)}
        </div>
      </div>
    </Link>
  );
}

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];

function FiltersInner({ properties, l, dict }: { properties: PropertyRecord[]; l: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();

  const [country, setCountry] = useState(searchParams.get("country") ?? "");
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [priceMin, setPriceMin] = useState(searchParams.get("priceMin") ?? "");
  const [priceMax, setPriceMax] = useState(searchParams.get("priceMax") ?? "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") ?? "");

  const countries = useMemo(() => distinctCountries(properties), [properties]);
  const categories = useMemo(() => distinctCategories(properties), [properties]);

  const filtered = useMemo(() => {
    const min = priceMin ? Number(priceMin) : null;
    const max = priceMax ? Number(priceMax) : null;
    const minBeds = bedrooms ? Number(bedrooms) : null;

    return properties.filter((p) => {
      if (country && p.country !== country) return false;
      if (type && p.category !== type) return false;
      if (minBeds !== null && (p.bedrooms === null || p.bedrooms < minBeds)) return false;
      if ((min !== null || max !== null) && p.price !== null) {
        const eur = priceInEURIndicative(p.price, p.currency);
        if (min !== null && eur < min) return false;
        if (max !== null && eur > max) return false;
      }
      // A property with no price at all ("price on request") is kept unless
      // the visitor set a price filter — in that case we can't verify it
      // matches, so it's excluded rather than shown as a false positive.
      if ((min !== null || max !== null) && p.price === null) return false;
      return true;
    });
  }, [properties, country, type, priceMin, priceMax, bedrooms]);

  const groups = useMemo(() => {
    const map = new Map<string, PropertyRecord[]>();
    for (const property of filtered) {
      const key = property.country || "—";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(property);
    }
    return map;
  }, [filtered]);

  const reset = () => {
    setCountry("");
    setType("");
    setPriceMin("");
    setPriceMax("");
    setBedrooms("");
  };

  const hasActiveFilters = Boolean(country || type || priceMin || priceMax || bedrooms);

  const selectClass =
    "w-full border border-line bg-white px-3 py-2 text-sm text-ink focus:border-brass focus:outline-none";
  const labelClass = "mb-1 block text-[0.65rem] uppercase tracking-[0.12em] text-ink-soft";

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 border border-line bg-ivory-dim/60 p-6 sm:grid-cols-3 lg:grid-cols-6">
        <div>
          <label className={labelClass}>{dict.hero.searchDestination}</label>
          <select className={selectClass} value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">{dict.filters.allCountries}</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {countryLabelFor(c, l, dict)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>{dict.hero.searchType}</label>
          <select className={selectClass} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">{dict.filters.allTypes}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {categoryLabelFor(c, l)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>{dict.filters.min} (€)</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            className={selectClass}
            placeholder="0"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>{dict.filters.max} (€)</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            className={selectClass}
            placeholder="—"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>{dict.hero.searchBeds}</label>
          <select className={selectClass} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            <option value="">{dict.filters.anyBedrooms}</option>
            {BEDROOM_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={reset}
            disabled={!hasActiveFilters}
            className="w-full border border-line px-3 py-2 text-xs uppercase tracking-[0.1em] text-ink-soft transition hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:opacity-40"
          >
            {dict.filters.reset}
          </button>
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-soft">
        {(filtered.length === 1 ? dict.filters.resultsCountOne : dict.filters.resultsCountOther).replace(
          "{count}",
          String(filtered.length)
        )}
      </p>

      {filtered.length > 0 ? (
        Array.from(groups.entries()).map(([rawCountry, items]) => {
          const slug = countrySlugFor(rawCountry);
          return (
            <div key={rawCountry} className="mt-12 first:mt-10">
              <div className="flex items-baseline justify-between border-b border-line pb-3">
                <h2 className="font-display text-2xl">{countryLabelFor(rawCountry, l, dict)}</h2>
                {slug && (
                  <Link
                    href={`/${l}/destinations/${slug}`}
                    className="text-xs uppercase tracking-[0.14em] text-brass hover:text-noir"
                  >
                    {dict.destinations.title} →
                  </Link>
                )}
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((property) => (
                  <PropertyCard key={property.id} property={property} l={l} dict={dict} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <p className="mt-16 max-w-md text-sm text-ink-soft">{dict.filters.noResults}</p>
      )}
    </div>
  );
}

export default function PropertiesFilters({
  properties,
  l,
  dict,
}: {
  properties: PropertyRecord[];
  l: Locale;
  dict: Dictionary;
}) {
  return (
    <Suspense fallback={null}>
      <FiltersInner properties={properties} l={l} dict={dict} />
    </Suspense>
  );
}
