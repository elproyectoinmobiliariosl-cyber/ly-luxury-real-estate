import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { conditionLabelFor, getAllSlugs, getPropertyBySlug, propertyStatusLabel } from "@/lib/properties";
import { notFound } from "next/navigation";
import { absoluteUrl, buildAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const l = locale as Locale;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  const title = property.titles[l] ?? property.titles.en ?? property.reference;
  const rawDescription = property.descriptions[l] ?? property.descriptions.en ?? title;
  const description = rawDescription.length > 300 ? `${rawDescription.slice(0, 297)}…` : rawDescription;
  const image = property.photos[0];

  return {
    title,
    description,
    alternates: buildAlternates(`/properties/${slug}`, l),
    openGraph: {
      title,
      description,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: image ? { images: [image] } : undefined,
  };
}

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

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const title = property.titles[l] ?? property.titles.en ?? property.reference;
  const description = property.descriptions[l] ?? property.descriptions.en ?? "";
  const features = property.features[l] ?? property.features.en ?? [];
  const locationLine = [property.city, property.sector, property.country].filter(Boolean).join(" · ");
  const mainPhoto = property.photos[0];

  // Structured data: a pending schema.org type, not a guaranteed Google rich
  // result today, but standard practice for real-estate listings and useful
  // for other search engines / AI crawlers reading the page semantically.
  // Never asserts a price when one isn't set (Airtable "price on request").
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: title,
    url: absoluteUrl(`/${l}/properties/${slug}`),
    description: description || undefined,
    image: property.photos.length > 0 ? property.photos : undefined,
    about: {
      "@type": "Accommodation",
      name: title,
      numberOfRooms: property.bedrooms ?? undefined,
      numberOfBathroomsTotal: property.bathrooms ?? undefined,
      floorSize:
        property.surface !== null
          ? { "@type": "QuantitativeValue", value: property.surface, unitCode: "MTK" }
          : undefined,
      address: {
        "@type": "PostalAddress",
        addressLocality: property.city || undefined,
        addressRegion: property.sector || undefined,
        addressCountry: property.country || undefined,
      },
    },
    ...(property.price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: property.price,
            priceCurrency: property.currency || "EUR",
            availability:
              property.status === "Vendu" || property.status === "Loué"
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative flex h-[55vh] min-h-[420px] items-end overflow-hidden">
        {mainPhoto ? (
          <>
            <Image src={mainPhoto} alt={title} fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/10" />
          </>
        ) : (
          <div className="photo-placeholder absolute inset-0" data-label={title} />
        )}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <p className="eyebrow text-brass-soft">{locationLine || dict.destinations.kicker}</p>
          <h1 className="mt-2 max-w-2xl text-3xl text-ivory lg:text-5xl">{title}</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.6fr_1fr] lg:px-10">
        <div>
          {property.photos.length > 1 && (
            <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {property.photos.slice(1).map((src, i) => (
                <div key={src + i} className="relative aspect-[4/3] overflow-hidden">
                  <Image src={src} alt={`${title} ${i + 2}`} fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {description && (
            <p className="max-w-2xl whitespace-pre-line text-sm leading-relaxed text-ink-soft">{description}</p>
          )}

          {features.length > 0 && (
            <div className="mt-10">
              <p className="eyebrow">{dict.why.kicker}</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink-soft sm:grid-cols-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1 w-1 shrink-0 bg-brass" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="h-fit border border-line p-8">
          <div className="font-display text-2xl text-brass">
            {formatPrice(property.price, property.currency, l, dict.property.priceOnRequest)}
          </div>
          <p className="mt-1 text-xs text-ink-soft/70">{dict.property.priceNote}</p>

          <dl className="mt-8 space-y-3 text-sm">
            {property.reference && (
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-ink-soft">{dict.property.reference}</dt>
                <dd>{property.reference}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-ink-soft">{dict.property.statusLabel}</dt>
              <dd>
                {propertyStatusLabel(property.status, dict.property.status)}
              </dd>
            </div>
            {property.condition && (
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-ink-soft">{dict.property.condition}</dt>
                <dd>{conditionLabelFor(property.condition, l)}</dd>
              </div>
            )}
            {property.bedrooms !== null && (
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-ink-soft">{dict.property.bedrooms}</dt>
                <dd>{property.bedrooms}</dd>
              </div>
            )}
            {property.bathrooms !== null && (
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-ink-soft">{dict.property.bathrooms}</dt>
                <dd>{property.bathrooms}</dd>
              </div>
            )}
            {property.surface !== null && (
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-ink-soft">{dict.property.surface}</dt>
                <dd>{property.surface} m²</dd>
              </div>
            )}
            {property.land !== null && (
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-ink-soft">{dict.property.land}</dt>
                <dd>{property.land} m²</dd>
              </div>
            )}
          </dl>

          <Link
            href={`/${l}/contact`}
            className="mt-8 block bg-noir px-7 py-3 text-center text-xs uppercase tracking-[0.14em] text-ivory transition hover:bg-noir-soft"
          >
            {dict.property.requestInfo}
          </Link>
          <Link href={`/${l}/properties`} className="mt-4 block text-center text-xs text-ink-soft hover:text-brass">
            ← {dict.property.backToProperties}
          </Link>
        </aside>
      </section>
    </>
  );
}
