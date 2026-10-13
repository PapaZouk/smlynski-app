# ADR 0004: Static content model — typed TypeScript modules in src/content/

## Status

Accepted

## Context

The old site fetched all content at runtime from a private API ("smlynski-api") protected by a bearer token. That API is going away, and for the rewrite the owner chose **placeholder content** to be replaced later with real data from the old API. A runtime API is no longer wanted: the site must build to static files with no network dependencies.

## Decision

Content lives in **typed TypeScript modules** under `src/content/`:

- `site.ts` — company details, navigation, contact data (replaces the old `Deno.env` config).
- `projects.ts` — renovation references (`projects: Project[]`).
- `offers.ts` — service offers.
- `feedbacks.ts` — customer testimonials.

Each module exports a typed array (types in `src/lib/types.ts`), and every temporary entry is marked with a clearly-commented **`PRZYKŁAD`** (example) comment. The owner replaces these sample entries with real data from the old API. TypeScript gives compile-time validation of the content shape for free.

## Alternatives considered

- **Keep the runtime API** — rejected: the owner wants no runtime dependency; the site must be a pure static export.
- **MDX content files** — rejected: overkill for a handful of structured entries; would add a content-build layer without buying authoring ergonomics the owner needs.
- **JSON data files** — rejected: no type checking or inline documentation; TS modules allow co-located comments (e.g. "how to add a project") and full IDE support.

## Consequences

- Content edits are code edits: change a file, commit, push — Vercel rebuilds and deploys.
- No API keys, tokens, or network calls at build or run time.
- Slugs in `projects.ts`/`offers.ts` drive the generated detail-page URLs (see ADR 0006).
- Until the owner replaces the `PRZYKŁAD` entries, the site shows sample data.

## Amendment (enhancement batch, 2025)

The "TypeScript gives compile-time validation for free" claim above covers only the _shape_ of the data. A build-time validator now enforces what `tsc` cannot express: **`scripts/check-content.mjs`** (supersedes the old `check-assets.mjs`) runs before every build, imports the real content modules (Node ≥ 22.18 native type-stripping), and **fails the build** on: non-kebab-case or duplicate slugs, non-real or future `completedAt` dates, blank required fields, empty `details`, unique-violating feedback `id`s, non-`https`/trailing-slash `siteUrl`, duplicate nav hrefs, and any `/images/…` reference whose file is missing under `public/`. This closes the gap between "compiles" and "correct" for hand-edited content — see ADR 0014 for why this is a script rather than a test runner.
