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
    title: dict.developments.title,
    description: dict.pages.developments.intro,
    alternates: buildAlternates("/developments", l),
    openGraph: { title: dict.developments.title, description: dict.pages.developments.intro },
  };
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

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col overflow-hidden bg-ivory-dim">
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
                  <Link href={`/${l}/contact`} className="text-brass hover:text-brass-soft">
                    {dict.hero.ctaPrimary} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink-soft">{dict.developments.empty}</p>
        <p className="mt-1 text-xs text-ink-soft/70">{dict.developments.disclaimer}</p>
      </section>
    </>
  );
}
