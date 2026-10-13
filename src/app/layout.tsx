import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { siteConfig } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ConsentProvider } from "@/components/layout/ConsentProvider";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/layout/Analytics";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://smlynski.pl"),
  title: {
    default: `${siteConfig.companyName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description:
    "Usługi remontowo-budowlane w Trójmieście: szpachlowanie agregatem, malowanie, remonty łazienek, układanie paneli i zabudowy z karton-gipsu.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: siteConfig.companyName,
  },
};

/** LocalBusiness structured data for search engines. */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: siteConfig.legalName,
  description:
    "Usługi remontowo-budowlane: szpachlowanie agregatem, malowanie, remonty łazienek, układanie paneli, zabudowy z karton-gipsu.",
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
  areaServed: ["Gdańsk", "Gdynia", "Rumia", "Wejherowo"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${inter.variable} ${archivo.variable}`}>
      <body className="flex min-h-svh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <ConsentProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CookieBanner />
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
