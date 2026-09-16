import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import { distinctCategories, distinctCountries, liveProperties } from "@/lib/properties";
import HeroSearch from "@/components/HeroSearch";
import { buildAlternates } from "@/lib/seo";

const DESTINATION_TEASER_IMAGES: Record<string, string> = {
  spain: "/images/villa-spain-interior.jpg",
  uae: "/images/villa-dubai.jpg",
  bali: "/images/hero-bali.jpg",
};

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
    title: dict.hero.headline,
    description: dict.hero.sub,
    alternates: buildAlternates("", l),
    openGraph: { title: dict.hero.headline, description: dict.hero.sub, images: ["/images/hero-bali.jpg"] },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <>
      {/* HERO */}
      <section className="relative flex h-[92vh] min-h-[640px] items-end overflow-hidden">
        <Image
          src="/images/hero-bali.jpg"
          alt="Luxury villa with infinity pool, Bali"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
          <p className="eyebrow text-brass-soft">{dict.hero.kicker}</p>
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-sable">{dict.hero.by}</p>
          <h1 className="max-w-3xl text-4xl leading-[1.05] text-ivory sm:text-5xl lg:text-6xl">
            {dict.hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/70">{dict.hero.sub}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${l}/properties`}
              className="bg-ivory px-7 py-3 text-xs uppercase tracking-[0.14em] text-noir transition hover:bg-brass-soft"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`/${l}/destinations`}
              className="border border-ivory/40 px-7 py-3 text-xs uppercase tracking-[0.14em] text-ivory transition hover:border-ivory"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>

          {/* Search bar */}
          <HeroSearch
            locale={l}
            dict={dict}
            countries={distinctCountries(liveProperties)}
            categories={distinctCategories(liveProperties)}
          />
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="eyebrow">{dict.featured.kicker}</p>
        <h2 className="mt-2 text-3xl lg:text-4xl">{dict.featured.title}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group">
              <div className="relative aspect-[4/5] photo-placeholder" data-label={`Property ${i}`} />
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <div className="text-sm text-ink-soft">Destination · Area</div>
                  <div className="font-display text-lg">Property Name</div>
                </div>
                <div className="text-sm text-brass">— €</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-soft">{dict.featured.empty}</p>
      </section>

      {/* EXCLUSIVE DEVELOPMENTS */}
      <section className="bg-ivory-dim py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">{dict.developments.kicker}</p>
          <h2 className="mt-2 text-3xl lg:text-4xl">{dict.developments.title}</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col overflow-hidden bg-white">
                <div className="relative aspect-[16/10] photo-placeholder" data-label={`Development ${i}`} />
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.1em] text-ink-soft">Destination</span>
                      <span className="border border-brass/40 px-2 py-1 text-[0.65rem] uppercase tracking-[0.1em] text-brass">
                        {dict.developments.status.comingSoon}
                      </span>
                    </div>
                    <div className="mt-2 font-display text-xl">Development Name</div>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="text-ink-soft">From — </span>
                    <Link href={`/${l}/developments`} className="text-brass hover:text-brass-soft">
                      {dict.hero.ctaPrimary} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-soft">{dict.developments.empty}</p>
          <p className="mt-1 text-xs text-ink-soft/70">{dict.developments.disclaimer}</p>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="eyebrow">{dict.destinations.kicker}</p>
        <h2 className="mt-2 text-3xl lg:text-4xl">{dict.destinations.title}</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {dict.destinations.items.map((d) => (
            <Link key={d.slug} href={`/${l}/destinations/${d.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={DESTINATION_TEASER_IMAGES[d.slug] ?? "/images/hero-bali.jpg"}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <div className="font-display text-xl">{d.name}</div>
                <div className="mt-1 text-sm text-ink-soft">{d.tag}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INVEST */}
      <section className="relative overflow-hidden bg-noir py-24 text-ivory">
        <Image
          src="/images/villa-dubai.jpg"
          alt="Modern luxury villa, Dubai"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/95 to-noir/70" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow text-brass-soft">{dict.invest.kicker}</p>
            <h2 className="mt-2 text-3xl lg:text-4xl">{dict.invest.title}</h2>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <p className="text-ivory/70">{dict.invest.body}</p>
            <Link
              href={`/${l}/invest`}
              className="w-fit border border-ivory/30 px-7 py-3 text-xs uppercase tracking-[0.14em] transition hover:border-ivory"
            >
              {dict.invest.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* WHY LY LUXURY */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="eyebrow">{dict.why.kicker}</p>
        <h2 className="mt-2 max-w-2xl text-3xl lg:text-4xl">{dict.why.title}</h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {dict.why.points.map((p) => (
            <div key={p.title} className="border-t border-line pt-6">
              <div className="font-display text-lg">{p.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="bg-noir py-24 text-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow text-brass-soft">{dict.founders.kicker}</p>
          <h2 className="mt-2 max-w-2xl text-3xl lg:text-4xl">{dict.founders.title}</h2>
          <p className="mt-4 max-w-xl text-sm text-ivory/60">{dict.founders.tagline}</p>

          <div className="mt-14 grid gap-12 sm:grid-cols-2">
            {dict.founders.people.map((person) => (
              <div key={person.name} className="flex flex-col gap-6 sm:flex-row">
                <div className="h-40 w-32 shrink-0 overflow-hidden bg-noir-soft sm:h-48 sm:w-36">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    width={320}
                    height={420}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-display text-2xl">{person.name}</div>
                  <p className="mt-1 text-sm leading-relaxed text-brass-soft">{person.role}</p>
                  <a
                    href={`tel:${person.phone.replace(/\s+/g, "")}`}
                    className="mt-4 block text-sm text-ivory/70 hover:text-ivory"
                  >
                    {person.phone}
                  </a>
                  <p className="mt-2 text-xs uppercase tracking-[0.1em] text-ivory/40">
                    {person.languages.join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-14 text-xs uppercase tracking-[0.18em] text-ivory/40">{dict.founders.motto}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-champagne/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">{dict.services.kicker}</p>
          <h2 className="mt-2 text-3xl lg:text-4xl">{dict.services.title}</h2>
          <div className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {dict.services.items.map((s) => (
              <div key={s} className="border-t border-brass/30 pt-3 text-sm">
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="eyebrow">{dict.network.kicker}</p>
        <h2 className="mt-2 text-3xl lg:text-4xl">{dict.network.title}</h2>
        <p className="mt-4 max-w-xl text-sm text-ink-soft">{dict.network.body}</p>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex h-20 items-center justify-center border border-line text-xs uppercase tracking-[0.1em] text-ink-soft/60">
              Developer logo
            </div>
          ))}
        </div>
      </section>

      {/* PRIVATE CONSULTATION */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/villa-consultation.jpg"
          alt="Luxury villa terrace at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-noir/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center text-ivory">
          <p className="eyebrow text-brass-soft">{dict.consultation.kicker}</p>
          <h2 className="mt-2 text-3xl lg:text-4xl">{dict.consultation.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-ivory/70">{dict.consultation.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${l}/contact`}
              className="bg-ivory px-7 py-3 text-xs uppercase tracking-[0.14em] text-noir transition hover:bg-brass-soft"
            >
              {dict.consultation.cta}
            </Link>
            <a
              href="https://wa.me/34612272438"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ivory/40 px-7 py-3 text-xs uppercase tracking-[0.14em] transition hover:border-ivory"
            >
              {dict.consultation.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
