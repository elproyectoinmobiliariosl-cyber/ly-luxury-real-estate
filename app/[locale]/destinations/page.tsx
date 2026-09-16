import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { geography, COMING_SOON_COUNTRY_NAMES } from "@/lib/geography";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/lib/seo";

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
    title: dict.destinations.title,
    description: dict.pages.destinations.intro,
    alternates: buildAlternates("/destinations", l),
    openGraph: { title: dict.destinations.title, description: dict.pages.destinations.intro },
  };
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <p className="eyebrow">{dict.destinations.kicker}</p>
      <h1 className="mt-2 max-w-2xl text-3xl lg:text-4xl">{dict.destinations.title}</h1>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {geography.map((country) => {
          const live = dict.destinations.items.find((i) => i.slug === country.slug);
          const name = live ? live.name : COMING_SOON_COUNTRY_NAMES[country.slug]?.[l] ?? country.name;
          const tag = live ? live.tag : dict.destinations.comingSoon;

          return (
            <Link key={country.slug} href={`/${l}/destinations/${country.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden">
                {country.image ? (
                  <Image
                    src={country.image}
                    alt={name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className={`object-cover transition duration-500 group-hover:scale-105 ${
                      country.live ? "" : "grayscale opacity-60"
                    }`}
                  />
                ) : (
                  <div className="photo-placeholder h-full w-full" data-label={name} />
                )}
              </div>
              <div className="mt-4">
                <div className="font-display text-xl">{name}</div>
                <div className="mt-1 text-sm text-ink-soft">{tag}</div>
                {!country.live && (
                  <div className="mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-brass">
                    {dict.developments.status.comingSoon}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
