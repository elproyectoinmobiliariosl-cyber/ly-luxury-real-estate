import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    title: dict.invest.title,
    description: dict.invest.body,
    alternates: buildAlternates("/invest", l),
    openGraph: { title: dict.invest.title, description: dict.invest.body },
  };
}

export default async function InvestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <section className="relative overflow-hidden bg-noir py-28 text-ivory">
      <Image
        src="/images/villa-dubai.jpg"
        alt="Modern luxury villa, Dubai"
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-noir/80 via-noir/95 to-noir" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="eyebrow text-brass-soft">{dict.invest.kicker}</p>
          <h1 className="mt-2 text-3xl lg:text-4xl">{dict.invest.title}</h1>
        </div>
        <div className="flex flex-col justify-center gap-6">
          <p className="text-ivory/70">{dict.invest.body}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${l}/developments`}
              className="w-fit bg-ivory px-7 py-3 text-xs uppercase tracking-[0.14em] text-noir transition hover:bg-brass-soft"
            >
              {dict.hero.ctaSecondary}
            </Link>
            <Link
              href={`/${l}/contact`}
              className="w-fit border border-ivory/30 px-7 py-3 text-xs uppercase tracking-[0.14em] transition hover:border-ivory"
            >
              {dict.invest.cta}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-20 max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 border-t border-ivory/10 pt-12 lg:grid-cols-3">
          {dict.why.points.map((p) => (
            <div key={p.title}>
              <div className="font-display text-lg">{p.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-ivory/60">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
