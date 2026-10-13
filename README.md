# Sebastian Młyński — Usługi Remontowo-Budowlane

Static marketing website for a Polish construction/renovation company serving the
Trójmiasto area (Gdańsk / Gdynia / Rumia / Wejherowo). The site is fully static —
HTML/CSS/JS exported at build time — with no server runtime.

Architecture decisions made during the rewrite are recorded in
[`docs/adr/`](docs/adr/).

## Tech stack

| Layer           | Choice                                                      |
| --------------- | ----------------------------------------------------------- |
| Framework       | Next.js 16 (App Router), static export (`output: "export"`) |
| UI              | React 19, TypeScript (strict)                               |
| Styling         | Tailwind CSS 4.3 (CSS-first `@theme` tokens)                |
| Fonts           | Archivo (display) + Inter (body) via `next/font/google`     |
| Runtime         | Node.js LTS (`.nvmrc` = 24, `engines.node >= 22`)           |
| Package manager | npm                                                         |
| Hosting         | Vercel (git integration, static export)                     |
| Forms           | EmailJS (`@emailjs/browser`, browser-side)                  |
| Analytics       | Google Analytics, loaded only after cookie consent          |

## Requirements

- **Node.js >= 22** — with [nvm](https://github.com/nvm-sh/nvm), `nvm use` picks up `.nvmrc` (24).
- **npm** (bundled with Node).

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (http://localhost:3000)
npm run build        # check:assets + next build → static export in out/
npm run preview      # serve the production build (out/) locally
npm run lint         # ESLint
npm run format       # Prettier (write); use npm run format:check to verify
npm run check:assets # verify every referenced image exists under public/
```

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
- `npm run build` runs `scripts/check-assets.mjs` first and **fails the build**
  if a referenced file is missing under `public/`.
- Images are served unoptimized (static export) — keep files reasonably sized.

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

## Decision log

See [`docs/adr/`](docs/adr/) for the Architecture Decision Records documenting
why the site was moved from Deno Fresh to Next.js, the static content model,
slug URLs, EmailJS, the design system, and more.
