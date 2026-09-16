import type { Metadata } from "next";
import { isLocale, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { liveProperties } from "@/lib/properties";
import { notFound } from "next/navigation";
import PropertiesFilters from "@/components/PropertiesFilters";
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
    title: dict.featured.title,
    description: dict.pages.properties.intro,
    alternates: buildAlternates("/properties", l),
    openGraph: { title: dict.featured.title, description: dict.pages.properties.intro },
  };
}

export default async function PropertiesPage({
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
      <p className="eyebrow">{dict.featured.kicker}</p>
      <h1 className="mt-2 max-w-2xl text-3xl lg:text-4xl">{dict.featured.title}</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{dict.pages.properties.intro}</p>

      {liveProperties.length > 0 ? (
        <div className="mt-12">
          <PropertiesFilters properties={liveProperties} l={l} dict={dict} />
        </div>
      ) : (
        <>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
          <p className="mt-10 text-sm text-ink-soft">{dict.featured.empty}</p>
        </>
      )}
    </section>
  );
}
