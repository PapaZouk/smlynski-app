import { defineConfig } from "vitepress";

/**
 * Local documentation server for the project's markdown docs (ADRs).
 * Runs only on demand via `npm run docs:dev` — never built or deployed
 * with the Next.js site. Source files under docs/adr/ are served as-is.
 */
export default defineConfig({
  lang: "pl",
  title: "Sebastian Młyński — Dokumentacja",
  description:
    "Dokumentacja techniczna witryny: decyzje architektoniczne (ADR) z rewrite na Next.js i późniejszych ulepszeń.",
  cleanUrls: true,
  lastUpdated: true,
  // docs/README.md is repo-facing (kept untouched); it is not part of the
  // docs site — excluding it also prevents a route collision with index.md.
  srcExclude: ["README.md"],

  themeConfig: {
    nav: [
      { text: "Start", link: "/" },
      { text: "ADR", link: "/adr/0001-tech-stack-nextjs" },
    ],

    sidebar: [
      {
        text: "Rewrite z Deno Fresh",
        items: [
          {
            text: "0001 — Next.js 16 + React 19 + TypeScript",
            link: "/adr/0001-tech-stack-nextjs",
          },
          { text: "0002 — Node.js LTS zamiast Deno", link: "/adr/0002-runtime-node" },
          {
            text: "0003 — Statyczny eksport na Vercel",
            link: "/adr/0003-static-export-vercel",
          },
          {
            text: "0004 — Model treści w TypeScript",
            link: "/adr/0004-static-content-model",
          },
          { text: "0005 — Placeholdery mediów", link: "/adr/0005-media-placeholders" },
          { text: "0006 — Slugi URL zamiast ID", link: "/adr/0006-slug-urls" },
          { text: "0007 — Formularz przez EmailJS", link: "/adr/0007-contact-emailjs" },
          {
            text: "0008 — System designu (industrialny + złoto)",
            link: "/adr/0008-design-system",
          },
          { text: "0009 — Modernizacja wzorców", link: "/adr/0009-modernization" },
          {
            text: "0010 — Zgoda cookie, prywatność, Maps",
            link: "/adr/0010-consent-analytics-maps",
          },
        ],
      },
      {
        text: "Ulepszenia po rewrite",
        items: [
          {
            text: "0011 — Potrójny pipeline obrazów (WebP)",
            link: "/adr/0011-image-pipeline",
          },
          {
            text: "0012 — Nagłówki bezpieczeństwa (CSP)",
            link: "/adr/0012-security-headers",
          },
          {
            text: "0013 — Ochrona formularza przed spamem",
            link: "/adr/0013-spam-protection",
          },
          { text: "0014 — Testy i telemetria", link: "/adr/0014-testing-telemetry" },
        ],
      },
    ],

    search: { provider: "local" },

    outline: { level: [2, 3] },

    docFooter: { prev: "Poprzedni", next: "Następny" },

    darkModeSwitchLabel: "Motyw",
    sidebarMenuLabel: "Menu",
    returnToTopLabel: "Wróć na górę",
  },
});
