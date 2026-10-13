# ADR 0012: Security headers via vercel.json (edge-level CSP)

## Status

Accepted

## Context

The site is a pure static export (`output: "export"`, ADR 0003). Next.js `headers()` and `redirects()` in `next.config.ts` **do not run** in this mode — they require a server middleware layer the export does not have. Security headers must therefore be applied at the platform edge. The site also loads a handful of third-party origins (GA4, Vercel telemetry, EmailJS, Google Maps) that a CSP must allowlist explicitly.

## Decision

- **`vercel.json`** defines `headers` applied to every route (`/(.*)`):
  - **Content-Security-Policy** (enforced, not report-only): `default-src 'self'` as the baseline, with an allowlist limited to the origins the site actually uses:
    - `script-src`: `'self' 'unsafe-inline'` + `https://www.googletagmanager.com` + `https://va.vercel-scripts.com` + `https://maps.googleapis.com`
    - `connect-src`: `'self'` + `https://api.emailjs.com` + GA endpoints + `https://vitals.vercel-insights.com` + Maps endpoints
    - `img-src`/`frame-src`/`style-src`/`font-src`: scoped to self + the same origins
    - `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, `form-action 'self'`
  - `Strict-Transport-Security` (2 years, includeSubDomains), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/geo/mic/payment/usb/display-capture denied), `Cross-Origin-Opener-Policy: same-origin`, `X-Permitted-Cross-Domain-Policies: none`.
- **`script-src` includes `'unsafe-inline'`** — a documented trade-off, not an oversight: Next.js App Router emits inline bootstrap scripts in the static HTML, and there is no nonce to attach under a pure export. The alternative (hashing every inline script) is brittle across Next upgrades and buys little given the site's origin allowlist.

## Alternatives considered

- **`headers()` in `next.config.ts`** — rejected: silently ignored under `output: "export"`.
- **A `_headers` file / platform UI only** — rejected: version-controlling headers in `vercel.json` keeps them reviewable and tied to the code.
- **Report-only CSP first** — rejected for now: the origin set is small and fully known; enforced immediately catches regressions in review.
- **Removing `'unsafe-inline'` via hashes/nonces** — rejected: brittle with Next's build output; revisit if the framework adds first-class nonce support for exports.

## Consequences

- Any new third-party origin (new embed, new analytics vendor) **must be added to `vercel.json`** or the browser will block it — a deliberate forcing function.
- Local `npm run dev`/`preview` do not apply these headers; they are enforced on Vercel only. Playwright smoke tests therefore do not exercise the CSP.
- HSTS without `preload` avoids an irreversible commitment; add the `preload` directive + list submission only if the owner opts in.
