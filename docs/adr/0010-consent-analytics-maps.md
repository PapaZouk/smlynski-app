# ADR 0010: Consent-gated analytics, standalone privacy page, modern Maps loader

## Status

Accepted

## Context

The old site loaded analytics unconditionally and embedded a long privacy policy inside the cookie-consent popup. GDPR compliance must be preserved on the new static site, and all third-party integrations must work without a server.

## Decision

- **Google Analytics loads only after cookie consent** (GDPR preserved). The consent flag is stored in a **`cookie-consent` cookie** and read via React's **`useSyncExternalStore`** — no setState-in-effect, so returning visitors see **no banner flash**. GA measurement id via `NEXT_PUBLIC_GA_ID`; the `Analytics` component renders nothing when the variable is unset.
- The **long privacy policy** extracted from the old cookie popup becomes a **standalone `/polityka-prywatnosci` page**; the consent banner links to it.
- **Google Maps** uses the modern **`@googlemaps/js-api-loader` functional API** (`setOptions` + `importLibrary`) instead of the deprecated callback/global pattern. Key via `NEXT_PUBLIC_GMAPS_API_KEY`; when unset, the map renders a **styled fallback** with setup instructions.
- All third-party keys use the **`NEXT_PUBLIC_*` env approach** (inlined into the static bundle at build time) — consistent with the static export (ADR 0003); see `.env.example`.

## Alternatives considered

- **Consent via React state (`useEffect` + `setState`)** — rejected: causes a visible banner flash for returning visitors on every page load; `useSyncExternalStore` reads the cookie during render instead.
- **Server-side analytics proxy** — rejected: incompatible with the static export.
- **Keep the privacy policy inside the cookie popup** — rejected: long legal text in a popup is poor UX and hard to link to; a dedicated page is indexable and shareable.

## Consequences

- No scripts from Google are sent to users who did not consent; with env vars unset, the site makes no Google calls at all.
- Deployments must set `NEXT_PUBLIC_GA_ID`, EmailJS keys, and `NEXT_PUBLIC_GMAPS_API_KEY` in Vercel (or `.env.local` locally) — all optional, with graceful fallbacks when missing.
- The privacy page lives in the app (`src/app/polityka-prywatnosci/`) and must be kept in sync with the actual services used (GA, EmailJS, Maps) — follow-up whenever integrations change.

## Amendment (enhancement batch, 2025)

The first bullet above ("GA loads only after cookie consent") is **superseded by Google Consent Mode v2**: the gtag script now **always loads** (when `NEXT_PUBLIC_GA_ID` is set) with `ad_storage`/`ad_user_data`/`ad_personalization`/`analytics_storage` all **denied by default**. Until the user accepts, GA sends only cookieless, non-identifying pings and writes no cookies; accepting fires `gtag('consent','update',{analytics_storage:'granted'})`. The privacy outcome the original decision targeted — no tracking storage without consent — is preserved, now in Google's recommended form. The `useSyncExternalStore` cookie mechanism and the no-banner-flash behavior are unchanged.

Additionally, a standalone **`/polityka-cookies`** page now documents the exact cookie inventory (`cookie-consent` 1y/180d, `_ga`/`_ga_*` 13-month post-consent, Vercel Analytics/Speed Insights cookieless), linked from the consent banner, footer, privacy §5, and the sitemap. Vercel Analytics + Speed Insights were added outside `ConsentProvider` because they are cookieless (ADR 0014); third-party origins used by GA/Maps/EmailJS are constrained by the CSP in ADR 0012.
