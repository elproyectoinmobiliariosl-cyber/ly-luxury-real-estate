import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/lib/seo";
import { getDevelopments, developmentFromPrice, developmentAvailability } from "@/lib/developments";
import { countryLabelFor } from "@/lib/properties";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const l = locale as Locale;
  const dict = getDictionary(l);
  return {
    title: dict.developments.title,
    description: dict.pages.developments.intro,
    alternates: buildAlternates("/developments", l),
    openGraph: { title: dict.developments.title, description: dict.pages.developments.intro },
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

export default async function DevelopmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const developments = getDevelopments();

  return (
    <>
      <section className="relative flex h-[46vh] min-h-[320px] items-end overflow-hidden">
        <Image
          src="/images/villa-development.jpg"
          alt="Contemporary new-build villa"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <p className="eyebrow text-brass-soft">{dict.developments.kicker}</p>
          <h1 className="mt-2 max-w-2xl text-3xl text-ivory lg:text-4xl">{dict.developments.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="max-w-xl text-sm leading-relaxed text-ink-soft">{dict.pages.developments.intro}</p>

        {developments.length > 0 ? (
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {developments.map((dev) => {
              const from = developmentFromPrice(dev);
              const availability = developmentAvailability(dev);
              const destination = [dev.city, countryLabelFor(dev.country, l, dict)].filter(Boolean).join(", ");
              const cover = dev.photos[0];
              return (
                <Link
                  key={dev.slug}
                  href={`/${l}/developments/${dev.slug}`}
                  className="group flex flex-col overflow-hidden bg-ivory-dim"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={dev.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="photo-placeholder h-full w-full" data-label={dev.name} />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.1em] text-ink-soft">
                          {destination || dict.destinations.kicker}
                        </span>
                        <span className="border border-brass/40 px-2 py-1 text-[0.65rem] uppercase tracking-[0.1em] text-brass">
                          {dict.developments.status[availability]}
                        </span>
                      </div>
                      <div className="mt-2 font-display text-xl">{dev.name}</div>
                      {dev.promoter && <div className="mt-1 text-xs text-ink-soft">{dev.promoter}</div>}
                    </div>
                    <div className="mt-6 flex items-center justify-between text-sm">
                      <span className="text-ink-soft">
                        {from ? `${dict.property.priceFrom} ${formatPrice(from.price, from.currency, l)}` : dict.property.priceOnRequest}
                      </span>
                      <span className="text-brass group-hover:text-brass-soft">{dict.hero.ctaPrimary} →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink-soft">{dict.developments.empty}</p>
        )}
        <p className="mt-10 text-xs text-ink-soft/70">{dict.developments.disclaimer}</p>
      </section>
    </>
  );
}
