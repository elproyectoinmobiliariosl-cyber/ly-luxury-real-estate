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
    title: dict.consultation.title,
    description: dict.pages.contact.intro,
    alternates: buildAlternates("/contact", l),
    openGraph: { title: dict.consultation.title, description: dict.pages.contact.intro },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const people = dict.founders.people;

  return (
    <section className="mx-auto max-w-5xl px-6 py-28 lg:px-10">
      <p className="eyebrow text-brass-soft">{dict.consultation.kicker}</p>
      <h1 className="mt-2 max-w-2xl text-3xl lg:text-4xl">{dict.consultation.title}</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{dict.pages.contact.intro}</p>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        {people.map((person) => (
          <div key={person.name} className="border-t border-line pt-6">
            <div className="font-display text-xl">{person.name}</div>
            <p className="mt-1 text-sm text-ink-soft">{person.role}</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href={`tel:${person.phone.replace(/\s+/g, "")}`} className="text-brass hover:text-brass-soft">
                {person.phone}
              </a>
              <a
                href={`https://wa.me/${person.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass hover:text-brass-soft"
              >
                {dict.consultation.whatsapp}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-line pt-6">
        <div className="eyebrow mb-2">Email</div>
        <a href={`mailto:${dict.footer.email}`} className="text-lg text-brass hover:text-brass-soft">
          {dict.footer.email}
        </a>
      </div>
    </section>
  );
}
