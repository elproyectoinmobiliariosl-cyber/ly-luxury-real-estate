import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, Locale } from "@/lib/i18n";
import { Dictionary, getDictionary } from "@/lib/dictionaries";
import {
  geography,
  COMING_SOON_COUNTRY_NAMES,
  findCountry,
  findRegion,
  findCity,
  GeoCountry,
  GeoRegion,
  GeoPlace,
} from "@/lib/geography";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/lib/seo";
import { propertiesForPlace } from "@/lib/properties";

function formatPrice(price: number, currency: string, locale: Locale) {
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

export function generateStaticParams() {
  const params: { country: string; path: string[] }[] = [];
  for (const country of geography) {
    params.push({ country: country.slug, path: [] });
    for (const region of country.regions ?? []) {
      params.push({ country: country.slug, path: [region.slug] });
      for (const city of region.cities ?? []) {
        params.push({ country: country.slug, path: [region.slug, city.slug] });
      }
    }
  }
  return params;
}

function countryDisplayName(dict: Dictionary, l: Locale, country: GeoCountry) {
  const live = dict.destinations.items.find((i) => i.slug === country.slug);
  return live ? live.name : COMING_SOON_COUNTRY_NAMES[country.slug]?.[l] ?? country.name;
}

// Mirrors the page component's own branching (country → region-list →
// city-list → leaf place) so every level of the destinations tree gets a
// distinct, accurate title/description instead of inheriting the parent's.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string; path?: string[] }>;
}): Promise<Metadata> {
  const { locale, country: countrySlug, path = [] } = await params;
  if (!isLocale(locale)) return {};
  const l = locale as Locale;
  const dict = getDictionary(l);

  const country = findCountry(countrySlug);
  if (!country) return {};
  const countryName = countryDisplayName(dict, l, country);
  const pathSuffix = `/destinations/${[country.slug, ...path].join("/")}`;
  const describe = (place: string) => dict.pages.destinations.placeTemplate.replace("{place}", place);

  if (!country.live || path.length === 0) {
    return {
      title: countryName,
      description: describe(countryName),
      alternates: buildAlternates(pathSuffix, l),
      openGraph: { title: countryName, description: describe(countryName), images: country.image ? [country.image] : undefined },
    };
  }

  const region = findRegion(country, path[0]);
  if (!region) return { title: countryName, alternates: buildAlternates(pathSuffix, l) };

  const place: GeoPlace | undefined = path.length === 2 ? findCity(region, path[1]) : region;
  const placeName = place?.name ?? region.name;
  const image = place?.image ?? region.image ?? country.image;

  return {
    title: `${placeName} — ${countryName}`,
    description: describe(placeName),
    alternates: buildAlternates(pathSuffix, l),
    openGraph: { title: placeName, description: describe(placeName), images: image ? [image] : undefined },
  };
}

function Hero({ image, kicker, title, subtitle }: { image?: string; kicker: string; title: string; subtitle?: string }) {
  return (
    <section className="relative flex h-[50vh] min-h-[360px] items-end overflow-hidden">
      {image ? (
        <>
          <Image src={image} alt={title} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/10" />
        </>
      ) : (
        <div className="photo-placeholder absolute inset-0" data-label={title} />
      )}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
        <p className="eyebrow text-brass-soft">{kicker}</p>
        <h1 className="mt-2 text-4xl text-ivory lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-lg text-sm text-ivory/70">{subtitle}</p>}
      </div>
    </section>
  );
}

function PlaceCardGrid({
  places,
  basePath,
  locale,
}: {
  places: GeoPlace[];
  basePath: string;
  locale: Locale;
}) {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((p) => (
        <Link key={p.slug} href={`/${locale}${basePath}/${p.slug}`} className="group block">
          <div className="relative aspect-[4/5] overflow-hidden">
            {p.image ? (
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="photo-placeholder h-full w-full" data-label={p.name} />
            )}
          </div>
          <div className="mt-4 font-display text-lg">{p.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default async function DestinationCatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; country: string; path?: string[] }>;
}) {
  const { locale, country: countrySlug, path = [] } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  const country = findCountry(countrySlug);
  if (!country) notFound();
  const countryName = countryDisplayName(dict, l, country);

  // Country not yet live: a single "coming soon" page, nothing deeper.
  if (!country.live) {
    if (path.length > 0) notFound();
    return (
      <>
        <Hero image={country.image} kicker={dict.destinations.kicker} title={countryName} />
        <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
          <p className="text-sm leading-relaxed text-ink-soft">{dict.destinations.comingSoon}</p>
          <Link
            href={`/${l}/contact`}
            className="mt-8 inline-block bg-noir px-7 py-3 text-xs uppercase tracking-[0.14em] text-ivory transition hover:bg-noir-soft"
          >
            {dict.consultation.cta}
          </Link>
        </section>
      </>
    );
  }

  // /destinations/[country] — list regions.
  if (path.length === 0) {
    const liveMeta = dict.destinations.items.find((i) => i.slug === country.slug);
    return (
      <>
        <Hero image={country.image} kicker={dict.destinations.kicker} title={countryName} subtitle={liveMeta?.tag} />
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="eyebrow">{dict.destinations.title}</p>
          <PlaceCardGrid
            places={country.regions ?? []}
            basePath={`/destinations/${country.slug}`}
            locale={l}
          />
        </section>
      </>
    );
  }

  if (path.length > 2) notFound();
  const region = findRegion(country, path[0]);
  if (!region) notFound();

  // /destinations/[country]/[region] where the region has its own cities —
  // list those cities.
  if (path.length === 1 && region.cities && region.cities.length > 0) {
    return (
      <>
        <Hero image={region.image ?? country.image} kicker={countryName} title={region.name} />
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="eyebrow">{dict.destinations.title}</p>
          <PlaceCardGrid
            places={region.cities}
            basePath={`/destinations/${country.slug}/${region.slug}`}
            locale={l}
          />
        </section>
      </>
    );
  }

  // Leaf: either a region with no further cities (e.g. Dubai, Abu Dhabi,
  // Bali's areas) or a specific city within a region (e.g. Torrevieja).
  let place: GeoPlace | undefined = region;
  let breadcrumb = countryName;
  if (path.length === 2) {
    place = findCity(region, path[1]);
    if (!place) notFound();
    breadcrumb = `${countryName} · ${region.name}`;
  }
  if (!place) notFound();

  const placeProperties = propertiesForPlace(place.slug);

  return (
    <>
      <Hero image={place.image ?? region.image ?? country.image} kicker={breadcrumb} title={place.name} />
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="eyebrow">{dict.featured.kicker}</p>
        <h2 className="mt-2 text-3xl lg:text-4xl">{dict.featured.title}</h2>
        {placeProperties.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeProperties.map((p) => {
              const title = p.titles[l] ?? p.titles.en ?? p.reference;
              const photo = p.photos[0];
              return (
                <Link key={p.id} href={`/${l}/properties/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="photo-placeholder h-full w-full" data-label={title} />
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <div>
                      <div className="text-sm text-ink-soft">{place.name}</div>
                      <div className="font-display text-lg">{title}</div>
                    </div>
                    <div className="shrink-0 text-sm text-brass">
                      {p.price !== null ? formatPrice(p.price, p.currency, l) : dict.property.priceOnRequest}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-6 text-sm text-ink-soft">{dict.featured.empty}</p>
        )}

        <div className="mt-12">
          <Link
            href={`/${l}/contact`}
            className="inline-block bg-noir px-7 py-3 text-xs uppercase tracking-[0.14em] text-ivory transition hover:bg-noir-soft"
          >
            {dict.consultation.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
