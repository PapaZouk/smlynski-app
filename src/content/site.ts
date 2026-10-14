/**
 * Site-wide configuration — company details, navigation and contact data.
 *
 * This file replaces the many Deno.env variables of the old app. Everything
 * here is public, non-secret data baked into the static build. Secret keys
 * (EmailJS, Google Maps, Analytics) come from NEXT_PUBLIC_* env vars —
 * see .env.example.
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface SiteConfig {
  /**
   * Production origin including www — the canonical host.
   * Apex (smlynski.pl) redirects here at the Vercel edge (see README).
   */
  siteUrl: string;
  companyName: string;
  /** Short slogan used in the <title> and meta descriptions. */
  tagline: string;
  /** Full legal/company description for the footer and JSON-LD. */
  legalName: string;
  nav: NavLink[];
  contact: {
    street: string;
    postalCode: string;
    city: string;
    phone: string;
    email: string;
  };
  /** Map center coordinates (Tricity area). */
  map: {
    lat: number;
    lng: number;
  };
  socials: {
    facebook: string;
  };
}

export const siteConfig: SiteConfig = {
  siteUrl: "https://www.smlynski.pl",
  companyName: "Sebastian Młyński",
  tagline: "Usługi Remontowo-Budowlane",
  legalName: "Sebastian Młyński - Usługi Remontowo-Budowlane",
  nav: [
    { href: "/", label: "Strona główna" },
    { href: "/about", label: "O nas" },
    { href: "/projects", label: "Nasze realizacje" },
    { href: "/offer", label: "Oferta" },
    { href: "/contact", label: "Kontakt" },
  ],
  contact: {
    // TODO: uzupełnij danymi firmy (dostępne w poprzedniej wersji przez env)
    street: "ul. Przykładowa 1",
    postalCode: "80-000",
    city: "Wejherowo",
    phone: "+48 578 716 169",
    email: "kontakt@example.com",
  },
  map: {
    // Gdańsk coordinates as a sensible default for the Tricity area.
    lat: 54.352,
    lng: 18.6466,
  },
  socials: {
    // TODO: uzupełnić prawdziwy adres profilu na Facebooku.
    facebook: "https://www.facebook.com/",
  },
};
