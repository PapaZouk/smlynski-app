# ADR 0005: Media placeholders + build-time asset verification

## Status

Accepted

## Context

The old app embedded API images as base64 buffers inside server-rendered HTML. With content now static (ADR 0004) there is no API to supply images, so the owner chose placeholder content. We needed a scheme where missing images degrade gracefully in development but never ship broken silently to production.

## Decision

- Content references images **by path under `public/`** (e.g. `/images/projects/<slug>/1.jpg` for projects, `/images/offers/<slug>.jpg` for offers) or an **empty array / `null`** to mean "no image".
- `src/components/ui/Media.tsx` is the single image-rendering component. When a path is empty/null (or an image fails), it renders the branded **`public/images/placeholder.svg`** instead.
- **`scripts/check-assets.mjs`** runs before every build (`npm run build` = `npm run check:assets && next build`). It scans the content modules in `src/content/` for `/images/...` references and **fails the build** if any referenced file is missing under `public/`. Empty arrays/null are allowed by design; comments are stripped so doc examples are not treated as real references.
- Old assets were migrated from the Fresh `static/` directory to `public/` (e.g. `hero-image.jpg`, `about-office-desk.jpeg`, `logo-white.png`, `lazienka.jpg` reused as the cover of the sample bathroom project).

## Alternatives considered

- **Keep base64-embedded images** — rejected: bloats the HTML, incompatible with a static content model, and loses browser caching.
- **Silently fall back to placeholder on missing files** — rejected for production: it would hide broken content. The asset check makes a missing file a hard build error instead.

## Consequences

- Adding an image = drop the file under `public/images/...` and reference it in the content module; the build gate guarantees consistency.
- Authors may preview unfinished entries with empty image arrays — the site renders branded placeholders.
- The `images.unoptimized` trade-off from ADR 0003 is contained inside `Media.tsx`, so future changes happen in one place.
