# ADR 0003: Fully static export deployed to Vercel, no CI pipeline

## Status

Accepted

## Context

The site is a marketing website with no server-side logic (contact form goes through EmailJS in the browser). The old app deployed to Deno Deploy via a GitHub Actions workflow. For the rewrite the owner wanted the simplest possible deployment story with no server runtime.

## Decision

- Build Next.js as a **fully static export**: `output: "export"` in `next.config.ts`. `npm run build` produces plain HTML/CSS/JS in `out/`, verified by `npm run check:assets` running first (since extended to `optimize:images && check:content`, see ADR 0004 amendment and ADR 0011).
- Deploy via **Vercel's git integration only**: pushing to `master` triggers a production deploy. There is **no GitHub Actions CI at all** — a deliberate choice to rely on Vercel's build checks alone.
- **Images are served unoptimized** (`images.unoptimized: true`) because the static export cannot run the Next.js image optimization server. The `<Media>` component centralizes this so the trade-off can be revisited in one place.
- Metadata routes (`sitemap.ts`, `robots.ts`) declare `export const dynamic = "force-static"` so they are prerendered correctly under `output: "export"`.

## Alternatives considered

- **Vercel serverless functions / ISR / SSR** — rejected: would require a server runtime and lose the simplicity of hosting a folder of static files.
- **Keep GitHub Actions CI** — rejected in favor of Vercel's own build checks; adding a separate CI was judged redundant for a solo-maintained static site. (Follow-up: if PRs start bypassing Vercel checks, a minimal CI can be reintroduced.)

## Consequences

- No server code is possible anywhere in the app (no route handlers, no middleware, no server actions).
- Image optimization (WebP conversion, resizing) must be handled manually via pre-sized files under `public/` — acceptable for a small marketing site.
- `npm run preview` (`npx serve out`) can serve the exact production output locally.
- Deployment configuration is entirely in Vercel's UI + `next.config.ts`; there is no deploy workflow file to maintain.
