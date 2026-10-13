# ADR 0001: Next.js 16 (App Router) + React 19 + TypeScript strict on npm

## Status

Accepted

## Context

The previous site was built on Deno Fresh 1.7 with Preact and Tailwind 3. The rewrite needed a mainstream, well-supported framework with static export capability, first-class SEO tooling (metadata, sitemap, robots), and a large hiring/ecosystem pool. The old stack (Fresh + Preact) has a comparatively small ecosystem and ties the project to the Deno runtime.

## Decision

Adopt the following stack:

- **Next.js 16** with the **App Router** — chosen over the legacy Pages Router for the Metadata API, `generateStaticParams` for pre-rendered detail pages, route conventions, and forward compatibility with the Next.js roadmap.
- **React 19** — current stable React, required by Next.js 16.
- **TypeScript in strict mode** — typed content modules and components; no `any`-driven data flow.
- **npm** as the package manager (standard `package.json` + `package-lock.json`).

## Alternatives considered

- **Next.js Pages Router** — rejected: legacy model, no route-level metadata helpers, and Next.js investment is focused on the App Router.
- **Staying on Deno Fresh** — rejected: small ecosystem, runtime lock-in, and weaker static-export/SEO ergonomics for a marketing site.

## Consequences

- The site gets per-page SEO metadata, `sitemap.ts`/`robots.ts`, and static generation out of the box.
- The codebase moves from Preact to React 19 — all components are rewritten (no Fresh islands).
- Team uses mainstream tooling (npm, ESLint 9, Prettier) instead of `deno lint`/`deno fmt`.
- Next.js version must stay within the 16.x line expected by this config; upgrades should be routine via npm.
