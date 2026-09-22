import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/lib/seo";
import {
  getDevelopments,
  getDevelopmentBySlug,
  developmentFromPrice,
  developmentAvailability,
} from "@/lib/developments";
import { countryLabelFor, propertyStatusLabel } from "@/lib/properties";

export function generateStaticParams() {
  return getDevelopments().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const l = locale as Locale;
  const dev = getDevelopmentBySlug(slug);
  if (!dev) return {};
  const dict = getDictionary(l);
  const description = dev.units[0]?.descriptions[l] ?? dev.units[0]?.descriptions.en ?? dev.name;

  return {
    title: `${dev.name} — ${dict.developments.title}`,
    description: description.length > 300 ? `${description.slice(0, 297)}…` : description,
    alternates: buildAlternates(`/developments/${slug}`, l),
    openGraph: {
      title: dev.name,
      description,
      images: dev.photos[0] ? [{ url: dev.photos[0] }] : undefined,
    },
  };
}

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

export default async function DevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  const dev = getDevelopmentBySlug(slug);
  if (!dev) notFound();

  const from = developmentFromPrice(dev);
  const availability = developmentAvailability(dev);
  const destination = [dev.city, dev.sector, countryLabelFor(dev.country, l, dict)].filter(Boolean).join(" · ");
  const mainPhoto = dev.photos[0];
  const gallery = dev.photos.slice(1, 7);

  // Use the richest unit description available (longest one, in the current
  // locale where possible) as the development's intro copy — units of the
  // same programme carry largely overlapping developer copy.
  const introUnit = [...dev.units].sort(
    (a, b) => (b.descriptions[l] ?? b.descriptions.en ?? "").length - (a.descriptions[l] ?? a.descriptions.en ?? "").length
  )[0];
  const intro = introUnit?.descriptions[l] ?? introUnit?.descriptions.en ?? "";

  return (
    <>
      <section className="relative flex h-[55vh] min-h-[420px] items-end overflow-hidden">
        {mainPhoto ? (
          <>
            <Image src={mainPhoto} alt={dev.name} fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/10" />
          </>
        ) : (
          <div className="photo-placeholder absolute inset-0" data-label={dev.name} />
        )}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <p className="eyebrow text-brass-soft">{destination || dict.developments.kicker}</p>
          <h1 className="mt-2 max-w-2xl text-3xl text-ivory lg:text-5xl">{dev.name}</h1>
          {dev.promoter && <p className="mt-2 text-sm text-ivory/70">{dev.promoter}</p>}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.6fr_1fr] lg:px-10">
        <div>
          {gallery.length > 0 && (
            <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {gallery.map((src, i) => (
                <div key={src + i} className="relative aspect-[4/3] overflow-hidden">
                  <Image src={src} alt={`${dev.name} ${i + 2}`} fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {intro && <p className="max-w-2xl whitespace-pre-line text-sm leading-relaxed text-ink-soft">{intro}</p>}

          <div className="mt-14">
            <p className="eyebrow">{dict.developments.configurations}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {dev.units.map((unit) => {
                const title = unit.titles[l] ?? unit.titles.en ?? unit.reference;
                const photo = unit.photos[0];
                return (
                  <Link key={unit.id} href={`/${l}/properties/${unit.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden">
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
                    <div className="mt-3 flex items-baseline justify-between gap-3">
                      <div>
                        <div className="font-display text-base">{title}</div>
                        <div className="mt-1 text-xs text-ink-soft">
                          {propertyStatusLabel(unit.status, dict.property.status)}
                          {unit.bedrooms !== null ? ` · ${unit.bedrooms} ${dict.property.bedrooms.toLowerCase()}` : ""}
                          {unit.surface !== null ? ` · ${unit.surface} m²` : ""}
                        </div>
                      </div>
                      <div className="shrink-0 text-sm text-brass">
                        {unit.price !== null ? formatPrice(unit.price, unit.currency, l) : dict.property.priceOnRequest}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="h-fit border border-line p-8">
          <div className="font-display text-2xl text-brass">
            {from ? `${dict.property.priceFrom} ${formatPrice(from.price, from.currency, l)}` : dict.property.priceOnRequest}
          </div>
          <p className="mt-1 text-xs text-ink-soft/70">{dict.property.priceNote}</p>

          <dl className="mt-8 space-y-3 text-sm">
            {dev.promoter && (
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-ink-soft">{dict.developments.kicker}</dt>
                <dd>{dev.promoter}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-ink-soft">{dict.developments.title}</dt>
              <dd>{dict.developments.status[availability]}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-ink-soft">{dict.property.reference}</dt>
              <dd>{dev.units.length}</dd>
            </div>
          </dl>

          <Link
            href={`/${l}/contact`}
            className="mt-8 block bg-noir px-7 py-3 text-center text-xs uppercase tracking-[0.14em] text-ivory transition hover:bg-noir-soft"
          >
            {dict.property.requestInfo}
          </Link>
          <Link href={`/${l}/developments`} className="mt-4 block text-center text-xs text-ink-soft hover:text-brass">
            ← {dict.developments.title}
          </Link>
        </aside>
      </section>
    </>
  );
}
