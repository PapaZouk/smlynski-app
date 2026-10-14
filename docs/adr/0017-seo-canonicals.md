# ADR 0017: SEO canonicals, metadata baseline & structured data

## Status

Accepted

## Context

The site is the company's only customer-acquisition surface — its ranking in Polish search engines (Google, Bing) for Tricity renovation queries directly drives inbound leads. The static export (ADR 0003) prerenders every page, so the HTML head is fully under our control, but three problems had accumulated:

- **Canonical drift risk.** The apex domain 308-redirects to `www` at the Vercel edge; canonical URLs, OpenGraph URLs and the sitemap must all agree on that host or crawlers split ranking signals across duplicate URLs.
- **Silent metadata loss.** Next.js does not deep-merge the `openGraph` object between the root layout and pages — each page that called `pageMetadata()` replaced the whole object, dropping `og:type`, `og:locale` and `og:site_name` from every subpage. Pages without an `ogImage` shared on social networks with **no preview image at all**, and no `<link rel="icon">` was ever emitted (the favicon only loaded via the implicit browser request).
- **Thin structured data.** Only a bare `HomeAndConstructionBusiness` graph existed: no `@id`, no `url`/`logo`/`image`, no `sameAs`, string-only `areaServed`, no per-service schema, and breadcrumbs on detail pages omitted the `item` URL on the current level.

## Decision

- **`pageMetadata()` (src/lib/seo.ts) is the single entry point for per-page head metadata.** Every indexable page uses it, which guarantees by construction:
  - `alternates.canonical` and `og:url` resolve to the same `absoluteUrl()` the sitemap uses — canonicals cannot drift from `/sitemap.xml`;
  - the base OpenGraph fields (`type: website`, `locale: pl_PL`, `siteName`) travel with every page;
  - a **default 1200×630 social card** (`/og-default.jpg`) applies unless the page passes its own `ogImage` (offer/project pages keep their photos), with `twitter:card=summary_large_image`;
  - meta descriptions that name neither the region nor a served city get a Tricity tag appended within a 160-char budget (long offer summaries would otherwise bury any locality signal past the SERP truncation point).
- **Site-level assets live at `public/` root and are generated, not committed**: `scripts/generate-og-image.mjs` produces `og-default.jpg` + `apple-touch-icon.png` from `logo-white.png` (run via `predev`/`build`, gitignored — same convention as the WebP pipeline, ADR 0011). `site.webmanifest`, `favicon.ico` and the `icons`/`manifest` metadata entries live alongside.
- **One `HomeAndConstructionBusiness` node with a stable `@id`** (`…/#localbusiness`) declared in the root layout, carrying `url`, `logo`, `image`, `areaServed` as `City` entries built from `siteConfig.serviceArea`, and `sameAs` **only while `siteConfig.socials.facebookEnabled` is true**. Per-offer pages emit `Service` schema whose `provider` references that `@id` — services are tied to the business and the served area without duplicating the entity.
- **Breadcrumbs**: `BreadcrumbList` on detail pages (`/offer/[slug]`, `/projects/[slug]`) _and_ listing pages (`/offer`, `/projects`); every `ListItem` — including the current page — carries its `item` URL (Google's breadcrumb guidance), and the visible breadcrumb nav matches the schema (both start at "Strona główna").
- **Google Search Console verification** is build-time plumbing: `metadata.verification.google` reads `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; no tag is emitted while the variable is empty.
- **The office geo coordinates in `siteConfig.map` are the actual office address** and feed both JSON-LD `geo` and the contact map center — they are data, not a display default.

## Alternatives considered

- **Manual `metadata` export per page** — rejected: exactly the drift and omission class of bug this ADR fixes (it already dropped OpenGraph fields silently).
- **`next-seo` or similar package** — rejected: adds a dependency for what a 40-line helper covers; the Metadata API is first-party.
- **Separate location landing pages per city** — rejected by the business: one Tricity-wide offer, no per-city service distinction; ranking gains must come from on-page locality signals, structured data and internal links instead.
- **Committing the generated social images** — rejected: same reasoning as ADR 0011 (generated files never committed; regeneration is deterministic).
- **Dropping the stale `docs/adr/0017-seo-canonicals.md` reference in `src/lib/seo.ts` instead of writing this ADR** — rejected: the canonical/sitemap consistency rule is a real decision worth recording; the reference stays valid now.

## Consequences

- Adding an indexable page = call `pageMetadata()` + list it in `/sitemap.ts`; canonical, OG and Twitter tags follow automatically.
- A hand-designed social card can replace the generated one later by deleting the `generate:og` step (or the script call in `package.json`) — the file is then maintained manually.
- `serviceArea` in `src/content/site.ts` is the single source for structured-data cities, the contact-card area label and description tags; prose that needs grammatical cases stays hand-written.
- GSC stays inert until the token is provided in `.env.local`/Vercel env; sitemap submission remains a manual step in the GSC UI.
- `scripts/check-content.mjs` fails the build when `relatedOffer` on a project points at a non-existent offer slug, so internal links cannot rot silently.
