# ADR 0009: Modernization — replacing outdated Fresh-era patterns

## Status

Accepted

## Context

The Fresh codebase carried patterns that were workarounds for its limitations or simply dated. The rewrite replaced each with the idiomatic Next.js/React approach rather than porting them verbatim.

## Decision

Replace the following patterns:

- **`location.href` buttons** → `next/link` client-side navigation.
- **Duplicated hardcoded desktop + mobile navigation** → a single `siteConfig.nav` source (from `src/content/site.ts`) rendered by both nav variants.
- **Duplicated pagination block (a copy-paste bug)** → one shared `Pagination` component (`src/components/ui/Pagination.tsx`).
- **`dangerouslySetInnerHTML` text formatting** → plain structured paragraph arrays in the content model — safe by construction (no raw HTML injection).
- **Fixed-position hero + `marginTop: 500px` / z-index hacks** → normal document flow with viewport-relative sections (`min-h-[85svh]`).
- **Full-screen loaders for data that is actually static** → removed entirely (there is nothing to wait for at runtime).
- **Testimonial auto-rotation** → respects `prefers-reduced-motion`.
- **Lightbox** → keyboard-accessible (Escape and backdrop click close it).
- **SEO plumbing** → per-page Metadata API, `sitemap.ts`, `robots.ts`; JSON-LD structured data planned (follow-up).
- Note: `sitemap.ts` and `robots.ts` need `export const dynamic = "force-static"` under `output: "export"`.

## Alternatives considered

- **Port the old patterns as-is** — rejected: would reintroduce layout fragility (magic offsets), duplicated sources of truth, and an XSS-prone HTML-in-text path for no benefit.

## Consequences

- Single sources of truth for nav and pagination; no known layout hacks remain.
- Content authors write plain text/paragraph arrays — no HTML knowledge required, no injection risk.
- Accessibility baseline improved (reduced motion, keyboard Lightbox).
- JSON-LD is listed as a follow-up, not yet implemented.
