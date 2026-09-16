import type { Metadata } from "next";
import { isLocale, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/lib/seo";

const LEGAL_DOCS = ["privacy-policy", "legal-notice"] as const;

export function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ doc }));
}

// Placeholder legal content today (see dict.legal.placeholder) — noindex
// until Letisia has real Mentions légales / Politique de confidentialité
// text, so these pages don't get indexed with filler copy in the meantime.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isLocale(locale)) return {};
  if (!LEGAL_DOCS.includes(doc as (typeof LEGAL_DOCS)[number])) return {};
  const l = locale as Locale;
  const dict = getDictionary(l);
  const title = doc === "privacy-policy" ? dict.legal.privacyTitle : dict.legal.noticeTitle;
  return {
    title,
    alternates: buildAlternates(`/legal/${doc}`, l),
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale, doc } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  if (!LEGAL_DOCS.includes(doc as (typeof LEGAL_DOCS)[number])) notFound();
  const title = doc === "privacy-policy" ? dict.legal.privacyTitle : dict.legal.noticeTitle;

  return (
    <section className="mx-auto max-w-3xl px-6 py-28 lg:px-10">
      <h1 className="text-3xl lg:text-4xl">{title}</h1>
      <p className="mt-6 text-sm leading-relaxed text-ink-soft">{dict.legal.placeholder}</p>
      <p className="mt-2 text-sm text-ink-soft">
        <a href={`mailto:${dict.footer.email}`} className="text-brass hover:text-brass-soft">
          {dict.footer.email}
        </a>
      </p>
    </section>
  );
}
