# ADR 0002: Run on Node.js LTS (drop Deno entirely)

## Status

Accepted

## Context

The old app ran on Deno and used Deno-specific conventions throughout: URL import specifiers (esm.sh, deno.land, jsr, npm:), `Deno.env`, `deno task`, `deno.json`, `dev.ts`/`main.ts` entrypoints, and a Deno Deploy GitHub Actions workflow. The target platform (Vercel) builds and runs Node.js natively; keeping Deno would mean maintaining a second runtime story for zero benefit on a static site.

## Decision

Migrate the runtime to **Node.js LTS** and remove Deno completely:

- Pin the local/dev Node version via **`.nvmrc` = 24**; enforce **`engines.node >= 22`** in `package.json`.
- Use **npm** with standard `package.json` scripts (`dev`, `build`, `lint`, `format`, `preview`, `check:assets` — since renamed to `check:content`, see ADR 0004 amendment) instead of `deno task`.
- Use `process.env` / `NEXT_PUBLIC_*` environment variables instead of `Deno.env`.
- Use ESLint 9 (`eslint-config-next` + `eslint-config-prettier`) and Prettier instead of `deno lint` / `deno fmt`.
- Pin **TypeScript to 5.9.x** — latest stable with maximum tooling compatibility.
- Delete all Deno/Fresh artifacts: `routes/`, `islands/`, `components/`, `static/` (moved to `public/`), `config.ts`, `deno.json`, `dev.ts`, `main.ts`, `fresh.config.ts`, `fresh.gen.ts`, `tailwind.config.ts`, `.github/workflows/deploy.yml`.

## Alternatives considered

- **Deno with Node compatibility layer** — rejected: still requires Deno locally and in CI, for no runtime advantage on a fully static site.
- **Bun** — rejected: less mature on Vercel builds and smaller team familiarity; Node LTS is the safe default.

## Consequences

- One runtime everywhere (local, Vercel builds); no Deno-specific configuration to maintain.
- No URL-based imports — all dependencies come from `node_modules` via npm.
- Anyone working on the repo must have Node >= 22 (`nvm use` picks up `.nvmrc`).
