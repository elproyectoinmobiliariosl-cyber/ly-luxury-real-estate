import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/seo";

// Site-wide defaults. Every localized page overrides title/description via
// its own generateMetadata — this is the fallback plus the pieces that only
// need to be set once (metadataBase resolves every relative URL emitted
// below it, robots sets the sane default, icons are picked up from the
// app/icon.png|apple-icon.png|favicon.ico file convention automatically).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LY Luxury Real Estate by El Proyecto Inmobiliario",
    template: "%s | LY Luxury Real Estate",
  },
  description:
    "LY Luxury Real Estate by El Proyecto Inmobiliario — international luxury properties, new developments and investment opportunities in Spain, Dubai, Abu Dhabi and beyond.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    siteName: "LY Luxury Real Estate",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
};

// Sitewide Organization/RealEstateAgent structured data — one entity behind
// every page, regardless of locale. Only facts confirmed in the project
// brief are included (RAICV/API are El Proyecto Inmobiliario's own licence
// numbers, not asserted here as LY's own licence in any market other than
// Spain — see AGENTS/project rule against implying an unconfirmed licence).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "LY Luxury Real Estate",
  alternateName: "LY Luxury Real Estate by El Proyecto Inmobiliario",
  url: SITE_URL,
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  telephone: "+34612272438",
  email: "info@elproyectoinmobiliario.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Algorfa",
    addressRegion: "Alicante",
    addressCountry: "ES",
  },
  founder: [
    { "@type": "Person", name: "Letisia De Coster" },
    { "@type": "Person", name: "Yana" },
  ],
  knowsLanguage: ["fr", "nl", "en", "es", "de", "sr", "hr", "it"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
