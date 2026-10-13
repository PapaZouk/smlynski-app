# ADR 0006: SEO-friendly slug URLs instead of MongoDB IDs

## Status

Accepted

## Context

The old Fresh app used MongoDB ObjectId-based detail URLs: `/project/65f3...` and `/offer/65f3...`. These are unreadable, bad for SEO, and leak internal database identifiers. The new content model (ADR 0004) uses string `slug` fields on every project and offer.

## Decision

- Detail pages are addressed by **kebab-case slugs**: `/projects/<slug>` and `/offer/<slug>`, generated via Next.js `generateStaticParams` from the typed content modules.
- Slug rules (documented in the content modules): must be unique, kebab-case, and it becomes the page address.
- **Old ID-based URLs cannot be mapped to slugs automatically** — the site now serves placeholder content with no relation to the old database IDs. If the owner later provides an ID→slug mapping, **redirects can be added in `vercel.json`** to preserve old inbound links (follow-up; not done now).

## Alternatives considered

- **Keep ID-based URLs** — rejected: unreadable, SEO-hostile, and exposes internal identifiers.
- **Auto-generate redirects from the old API** — not possible: placeholder content has no link to the old Mongo documents; requires owner input (see follow-up above).

## Consequences

- Clean, shareable, SEO-friendly URLs from day one.
- Slugs are a public contract: changing a slug changes the URL — treat slugs as stable once published.
- Until an ID→slug mapping is provided, any old inbound links to `/project/<id>` or `/offer/<id>` will 404 (mitigated by the not-found page).
