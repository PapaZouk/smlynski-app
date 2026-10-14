import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { siteConfig } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ConsentProvider } from "@/components/layout/ConsentProvider";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/layout/Analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { absoluteUrl, businessId, DEFAULT_OG_IMAGE } from "@/lib/seo";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

/** Google Search Console token — supplied per environment (see .env.example). */
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.companyName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description:
    "Usługi remontowo-budowlane w Trójmieście: szpachlowanie agregatem, malowanie, remonty łazienek, układanie paneli i zabudowy z karton-gipsu.",
  // Browser/app icons. favicon.ico also lives at public/ for the implicit
  // /favicon.ico request; these tags make the rest explicit.
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: siteConfig.companyName,
    // Fallback card for pages that do not use pageMetadata (e.g. 404).
    images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

/** LocalBusiness structured data for search engines. */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": businessId,
  name: siteConfig.legalName,
  description:
    "Usługi remontowo-budowlane: szpachlowanie agregatem, malowanie, remonty łazienek, układanie paneli, zabudowy z karton-gipsu.",
  url: absoluteUrl("/"),
  logo: absoluteUrl("/apple-touch-icon.png"),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.street,
    postalCode: siteConfig.contact.postalCode,
    addressLocality: siteConfig.contact.city,
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.map.lat,
    longitude: siteConfig.map.lng,
  },
  areaServed: siteConfig.serviceArea.map((name) => ({ "@type": "City", name })),
  // Exposed only while the feature toggle is on (siteConfig.socials).
  ...(siteConfig.socials.facebookEnabled
    ? { sameAs: [siteConfig.socials.facebook] }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${inter.variable} ${archivo.variable}`}>
      <body className="flex min-h-svh flex-col">
        <JsonLd data={localBusinessJsonLd} />
        <ConsentProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CookieBanner />
          <Analytics />
        </ConsentProvider>
        {/* Cookieless first-party telemetry — always on, no consent needed
            (see docs/adr/0014-testing-and-telemetry.md and the cookie
            policy page). Kept outside ConsentProvider on purpose. */}
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
