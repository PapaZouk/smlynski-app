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
  /**
   * Cities served, nominative case — single source for structured data
   * (areaServed), meta-description tags and the "Obsługiwany obszar" label.
   * Prose that needs grammatical cases (e.g. "na terenie Gdańska…")
   * keeps its own hand-written wording.
   */
  serviceArea: string[];
  /** Office geo coordinates — JSON-LD `geo` and the contact-page map center. */
  map: {
    lat: number;
    lng: number;
  };
  socials: {
    facebook: string;
    /**
     * Temporary toggle — set to `true` to show the Facebook link again.
     * While `false` the URL is kept but never rendered or linked.
     */
    facebookEnabled: boolean;
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
    street: "ul. Jarzębinowa 26",
    postalCode: "84-217",
    city: "Jeleńska Huta",
    phone: "+48 578 716 169",
    email: "remonty.mlynski@gmail.com",
  },
  // Tricity area served by the company (structured data + labels).
  serviceArea: ["Gdańsk", "Gdynia", "Sopot", "Rumia", "Wejherowo"],
  map: {
    // Actual coordinates of the company office.
    lat: 54.44680289387105,
    lng: 18.222905583946716,
  },
  socials: {
    // TODO: uzupełnić prawdziwy adres profilu na Facebooku.
    facebook: "https://www.facebook.com/",
    // Wyłączone tymczasowo — ustawić na true, aby przywrócić link do Facebooka.
    facebookEnabled: false,
  },
};
