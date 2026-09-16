import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HtmlLangSync from "@/components/HtmlLangSync";
import { OG_LOCALE_MAP } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Sets og:locale for whichever language this branch of the site is in. Each
// page's own generateMetadata supplies title/description/alternates — this
// only adds the piece that's constant per-locale, and Next shallow-merges
// openGraph fields from layout + page together.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const l = locale as Locale;
  return {
    openGraph: { locale: OG_LOCALE_MAP[l] },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);

  return (
    <>
      <HtmlLangSync locale={locale as Locale} />
      <Header locale={locale as Locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
    </>
  );
}
