# Sebastian Młyński — Usługi Remontowo-Budowlane

Static marketing website for a Polish construction/renovation company serving the
Trójmiasto area (Gdańsk / Gdynia / Rumia / Wejherowo). The site is fully static —
HTML/CSS/JS exported at build time — with no server runtime.

Architecture decisions made during the rewrite are recorded in
[`docs/adr/`](docs/adr/).

Legal pages ship with the site and are linked from the footer, the consent
banner, and the sitemap: [`/polityka-prywatnosci`](src/app/polityka-prywatnosci/page.tsx)
(privacy) and [`/polityka-cookies`](src/app/polityka-cookies/page.tsx) (exact
cookie inventory).

## Tech stack

| Layer           | Choice                                                       |
| --------------- | ------------------------------------------------------------ |
| Framework       | Next.js 16 (App Router), static export (`output: "export"`)  |
| UI              | React 19, TypeScript (strict)                                |
| Styling         | Tailwind CSS 4.3 (CSS-first `@theme` tokens)                 |
| Fonts           | Archivo (display) + Inter (body) via `next/font/google`      |
| Runtime         | Node.js LTS (`.nvmrc` = 24, `engines.node >= 22.18`)         |
| Package manager | npm                                                          |
| Hosting         | Vercel (git integration, static export)                      |
| Forms           | EmailJS (`@emailjs/browser`, browser-side) + spam heuristics |
| Analytics       | Google Analytics 4 (Consent Mode v2) + Vercel Analytics      |
| Media           | sharp build-time WebP pipeline (ADR 0011)                    |
| Tests           | Playwright smoke suite, local-only (ADR 0014)                |

## Requirements

- **Node.js >= 22.18** — with [nvm](https://github.com/nvm-sh/nvm), `nvm use` picks up `.nvmrc` (24).
- **npm** (bundled with Node).

## Commands

```bash
npm install             # install dependencies
npm run dev             # dev server (http://localhost:3000); auto-runs optimize:images first
npm run build           # optimize:images + check:content + next build → static export in out/
npm run preview         # serve the production build (out/) locally
npm run lint            # ESLint
npm run format          # Prettier (write); use npm run format:check to verify
npm run check:content   # validate content modules + referenced image files
npm run optimize:images # regenerate WebP variants under public/optimized/ (rarely needed manually)
npm run test:e2e        # build, then run the Playwright smoke suite against out/ (local only)
```

The first `npm run test:e2e` needs a one-time `npx playwright install chromium`.
A husky pre-commit hook runs Prettier + ESLint on staged files automatically.

## Editing content

All content lives in typed TypeScript modules under [`src/content/`](src/content/).
There is **no runtime API** — edit a file, commit, push, and Vercel redeploys.

| File           | What it holds                                        |
| -------------- | ---------------------------------------------------- |
| `site.ts`      | Company details, navigation, contact data            |
| `projects.ts`  | Portfolio projects (realizacje) → `/projects/<slug>` |
| `offers.ts`    | Service offers → `/offer/<slug>`                     |
| `feedbacks.ts` | Customer testimonials                                |

Entries currently marked with a **`PRZYKŁAD`** comment are sample data — replace
them with the real content from the old API.

**Adding a project** (`projects.ts`): copy an existing entry. The `slug` must be
unique and kebab-case — it becomes the page address `/projects/<slug>`. Set
`location`, `completedAt` (ISO `YYYY-MM-DD`), `summary`, and `details` (array of
paragraphs). Put images under `public/images/projects/<slug>/` and reference them
in `images` (first entry is the cover); an empty array renders the placeholder.

**Adding an offer** (`offers.ts`): copy an entry, use a unique kebab-case `slug`
(→ `/offer/<slug>`), fill `title`, `summary`, `details`. Cover image goes in
`public/images/offers/<slug>.jpg` and is referenced via `image`; `image: null`
renders the placeholder.

**Adding a feedback** (`feedbacks.ts`): copy an entry and set a unique `id`
(e.g. `"opinia-3"`) plus `name`, optional `surname`/`company`, and `message`.

All of the above rules (unique kebab-case slugs, ISO `YYYY-MM-DD` dates,
non-blank required fields, unique feedback ids, referenced files existing)
are **enforced at build time** by `scripts/check-content.mjs` — a mistake
fails `npm run build` with a message naming the offending entry.

## Adding images

Images live under [`public/images/`](public/images/) and are referenced by
root-relative path:

```
public/images/
├── projects/<slug>/1.jpg   # project galleries (cover = first image)
├── offers/<slug>.jpg       # offer cover images
├── placeholder.svg         # branded fallback rendered by <Media>
└── …                       # shared assets (hero, logos, etc.)
```

- Empty/`null` image references render the branded placeholder via
  `src/components/ui/Media.tsx` — the site never shows broken images.
- **Automatic WebP optimization (ADR 0011):** files ≥ 100 KB are converted at
  build time (sharp, quality 75, max 1920 px) into `public/optimized/` and served
  via `<picture>` with the original as legacy fallback. Generated files are
  gitignored — just drop the original into `public/images/` and the pipeline
  handles the rest on the next dev/build run.
- `npm run build` runs `scripts/check-content.mjs` first and **fails the build**
  if a referenced file is missing under `public/` (alongside other content
  validation — unique slugs, valid dates, non-blank fields).
- Keep source photos reasonably sized; the pipeline downsizes for the web but
  does not compress below its thresholds.

## Environment variables

Copy `.env.example` to `.env.local` and fill in values. All keys are
`NEXT_PUBLIC_*` (public, baked into the client bundle) — never put secrets here.

| Variable                          | Purpose                                               | When unset                |
| --------------------------------- | ----------------------------------------------------- | ------------------------- |
| `NEXT_PUBLIC_GA_ID`               | Google Analytics measurement id (e.g. `G-XXXXXXXXXX`) | Analytics not loaded      |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`  | EmailJS public key (contact form)                     | Contact form unusable     |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  | EmailJS service id                                    | Contact form unusable     |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template id                                   | Contact form unusable     |
| `NEXT_PUBLIC_GMAPS_API_KEY`       | Google Maps API key (contact page map)                | Styled map fallback shown |

## Deployment

- Connect the repository to **Vercel**; pushing to `master` triggers a production
  deploy. There is no separate CI pipeline — Vercel's build checks are relied on alone.
- The build is a **fully static export** (`output: "export"` in `next.config.ts`):
  no server functions, route handlers, or SSR. Everything dynamic (forms,
  analytics consent, maps) runs in the browser.

### Domain setup (www.smlynski.pl)

The canonical host is **`https://www.smlynski.pl`** (the `siteUrl` constant in
`src/content/site.ts`). One-time setup in the Vercel dashboard:

1. Add **both** domains to the project: `www.smlynski.pl` and the apex
   `smlynski.pl` (Settings → Domains).
2. Set `www.smlynski.pl` as the **primary** domain — Vercel then 308-redirects
   the apex to `www` automatically at the edge. (Next.js `redirects()` does not
   run under `output: "export"`, so this must be done in Vercel, not in code.)
3. Point DNS at Vercel: a **CNAME** record `www` → `cname.vercel-dns.com`, and
   an **A/ALIAS** record for the apex → Vercel's apex IPs (Vercel shows the
   exact values during domain setup).
4. After the first deploy, verify: apex `smlynski.pl` 308-redirects to
   `https://www.smlynski.pl`, `<link rel="canonical">` on every page matches
   the `www` host, and `/sitemap.xml` + `/robots.txt` list the `www` URLs.
5. Set the environment variables from `.env.example` in Vercel (Settings →
   Environment Variables) — all optional, with graceful fallbacks when missing.

### Security headers

`vercel.json` applies the CSP and security headers at the edge (ADR 0012) — no
configuration needed beyond the file being committed. Any future third-party
origin must be added to its CSP allowlist there.

## Decision log

See [`docs/adr/`](docs/adr/) for the Architecture Decision Records documenting
why the site was moved from Deno Fresh to Next.js, the static content model,
slug URLs, EmailJS, the design system, and more — including the post-rewrite
enhancements: the WebP image pipeline (0011), edge security headers (0012),
contact-form spam protection (0013), and the local testing/telemetry
strategy (0014).
