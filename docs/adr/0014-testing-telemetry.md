# ADR 0014: Testing & telemetry — local Playwright smoke suite, Vercel Analytics

## Status

Accepted

## Context

The site ships as a static export; Vercel's production build is the only automated gate. That build must stay fast and hermetic — installing browsers or running an e2e suite inside it risks flakiness and long cold starts with no incremental value (the same checks run locally). Separately, the owner wants basic traffic/performance visibility without adding a consent burden.

## Decision

- **Local Playwright smoke suite** (`tests/e2e/smoke.spec.ts` + `playwright.config.ts`):
  - Serves the **real build artifact** `out/` with a pinned `serve` on port 4173 — tests exercise exactly what Vercel ships.
  - **Never runs on Vercel**: `npm run test:e2e` = `build && playwright test`, invoked manually. Chromium requires a one-time `npx playwright install chromium`.
  - ~25 tests target _structure and invariants_, not sample strings (content is meant to be replaced): nav integrity, canonical/sitemap/robots host rules, JSON-LD parsing, detail-page navigation, 404s, WebP `<picture>` + preload assertions, form fields, click-to-call, consent persistence, Consent Mode v2 `dataLayer` assertions (self-skipping when GA is unconfigured), honeypot shape, cookies page.
- **Vercel Analytics + Vercel Speed Insights** (`@vercel/analytics`, `@vercel/speed-insights`) in the root layout, **outside** `ConsentProvider`: both are **cookieless** first-party telemetry and require no consent under the GDPR analysis; documented on `/polityka-cookies`.

## Alternatives considered

- **Playwright in the Vercel build** — rejected: browser install + run time on every deploy; a flaky browser would block otherwise-good content deploys; no preview environment benefit for a static site.
- **Vitest/unit tests for content** — superseded: `scripts/check-content.mjs` (build-time validation, ADR 0004 amendment) covers the same ground with clearer, build-blocking errors and zero test-runner config.
- **Cypress** — rejected: heavier install and slower local startup for a suite this small.
- **Skipping telemetry entirely** — rejected: the owner wants traffic insight; Vercel's cookieless mode keeps it consent-free.

## Consequences

- The smoke suite is only as fresh as the last local run — it is a _developer_ tool, not a deploy gate; the deploy gate remains `npm run build` (image pipeline + content validation + export, ADRs 0004/0011).
- Playwright artifacts (`test-results/`, `playwright-report/`) are gitignored.
- Because GA assertions self-skip without `NEXT_PUBLIC_GA_ID`, the Consent Mode v2 dataLayer checks only exercise locally when the owner configures GA in `.env.local`; the always-on assertion is "GA absent when unconfigured".
- If the site ever adds a cookie-setting vendor, the consent banner/`/polityka-cookies` inventory and this ADR must be updated together.
