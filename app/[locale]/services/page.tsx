import type { Metadata } from "next";
import { isLocale, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
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
    title: dict.services.title,
    description: dict.pages.services.intro,
    alternates: buildAlternates("/services", l),
    openGraph: { title: dict.services.title, description: dict.pages.services.intro },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <p className="eyebrow">{dict.services.kicker}</p>
      <h1 className="mt-2 max-w-2xl text-3xl lg:text-4xl">{dict.services.title}</h1>
      <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {dict.services.items.map((s) => (
          <div key={s} className="border-t border-brass/30 pt-4">
            <div className="text-sm">{s}</div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-champagne/40 px-8 py-10">
        <p className="eyebrow">{dict.network.kicker}</p>
        <h2 className="mt-2 text-2xl lg:text-3xl">{dict.network.title}</h2>
        <p className="mt-3 max-w-xl text-sm text-ink-soft">{dict.network.body}</p>
      </div>
    </section>
  );
}
