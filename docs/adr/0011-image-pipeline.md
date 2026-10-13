# ADR 0011: Build-time image pipeline (sharp → WebP)

## Status

Accepted

## Context

The static export sets `images.unoptimized: true` (ADR 0003), so Next.js serves original files untouched. The migrated `hero-image.jpg` alone was **6.8 MB** — unacceptable for LCP and mobile data. The owner will later provide real photos of varying sizes, so the site needs an automatic optimization step that runs on every build without manual work.

## Decision

- **`scripts/optimize-images.mjs`** runs automatically via `predev` and at the head of `npm run build`. It scans `public/images/` for raster files (jpg/jpeg/png) **≥ 100 KB** and generates WebP variants (**quality 75, max 1920 px wide, EXIF orientation baked in** via `sharp.rotate()`) into **`public/optimized/images/…`**.
- The script writes a manifest to **`src/lib/image-manifest.json`** mapping each source path to its WebP path + intrinsic dimensions.
- **`public/optimized/` and the manifest are gitignored** and regenerated on every dev/build run. This deliberately separates _generated_ files from _user-provided_ source images — dropping a real photo into `public/images/` can never be accidentally ignored by a `.webp` pattern.
- **`Media.tsx` and `Lightbox.tsx` wrap images in `<picture>`** with a `type="image/webp"` `<source>`; the original file remains the `<img>` fallback for legacy browsers.
- **Priority images (LCP) preload the WebP**, not the original: when a manifest entry exists, `Media` suppresses `next/image`'s own `priority` preload (which would fetch the multi-MB original) and emits its own `<link rel="preload" as="image" type="image/webp">` while keeping `loading="eager"` + `fetchpriority="high"` on the `<img>`.
- The pipeline is **incremental** (mtime-based skip, warm runs ≈ 7 ms) and **removes orphaned WebP files** whose source was deleted.

Measured effect: hero 6.8 MB → 349 KB WebP (−95 %), project cover 463 KB → 58 KB.

## Alternatives considered

- **`next/image` loader with a custom loader function** — rejected: the export already disables optimization; fighting the framework for `<picture>` control adds complexity for no gain.
- **Next's built-in image optimization (`images.unoptimized: false`)** — rejected: requires a server runtime / Vercel image CDN dependency, breaking the pure-static guarantee (ADR 0003).
- **Client-side WebP conversion** — rejected: pointless CPU cost in the browser; the original must ship anyway.
- **Committing generated WebP files** — rejected: bloats the repo and risks merge noise; regeneration is cheap and deterministic.

## Consequences

- Every build regenerates the pipeline outputs; a fresh clone needs no manual steps (`predev`/`build` handle it).
- Photos larger than 1920 px are downscaled — owners should not expect full-resolution downloads from the site (by design; originals can be shared directly if needed).
- Files below the 100 KB threshold (e.g. the 48 KB logo) are served as-is — no `<picture>` wrapper.
- The ADR 0003 `images.unoptimized` trade-off is now fully contained in the pipeline + `Media`/`Lightbox`.
