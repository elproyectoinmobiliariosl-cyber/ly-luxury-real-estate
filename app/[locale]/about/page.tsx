import type { Metadata } from "next";
import Image from "next/image";
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
    title: dict.founders.title,
    description: dict.pages.about.intro,
    alternates: buildAlternates("/about", l),
    openGraph: { title: dict.founders.title, description: dict.pages.about.intro },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <p className="eyebrow">{dict.founders.kicker}</p>
        <h1 className="mt-2 max-w-2xl text-3xl lg:text-4xl">{dict.founders.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">{dict.pages.about.intro}</p>
      </section>

      <section className="bg-noir py-24 text-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mt-0 max-w-xl text-sm text-ivory/60">{dict.founders.tagline}</p>

          <div className="mt-14 grid gap-12 sm:grid-cols-2">
            {dict.founders.people.map((person) => (
              <div key={person.name} className="flex flex-col gap-6 sm:flex-row">
                <div className="h-48 w-36 shrink-0 overflow-hidden bg-noir-soft sm:h-56 sm:w-40">
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
    </>
  );
}
