# ADR 0008: Design system — Tailwind v4 @theme tokens, "modern industrial + gold"

## Status

Accepted

## Context

The old site used a default Tailwind 3 setup. The rewrite gave the opportunity to define a deliberate brand look for a construction/renovation company: solid, craftsman-like, premium — not generic template aesthetics. Tailwind CSS 4.3 introduces a CSS-first configuration model (no `tailwind.config.ts`).

## Decision

Define the design system as **Tailwind v4 CSS-first `@theme` tokens** in `src/styles/globals.css`:

- **Palette — "modern industrial + gold"**:
  - `ink-950..ink-200` — a warm near-black scale for dark sections (industrial, heavy-material feel).
  - `paper` / `paper-dark` — warm off-white for light sections.
  - `gold-300..gold-700` — goldenrod accent, rooted in the brand color **#DAA520**; the single accent color.
  - `success` / `error` — semantic colors for form states.
- **Typography** via `next/font/google`:
  - **Archivo** — display/headings (`--font-display`).
  - **Inter** — body text (`--font-sans`).
- Global base styles (paper background, ink text, gold focus outline) live in `globals.css`.

## Alternatives considered

- **Keep Tailwind 3 + `tailwind.config.ts`** — rejected: the rewrite targets Tailwind 4, whose canonical configuration is CSS-first; a JS config would be a legacy path.
- **CSS-in-JS or hand-written CSS** — rejected: loses utility-class ergonomics the codebase already relies on.

## Consequences

- All colors/fonts are tokens — rebranding or palette tweaks happen in one file.
- No `tailwind.config.ts` exists; PostCSS (`@tailwindcss/postcss`) drives the build.
- Components must use token utilities (e.g. `bg-ink-950`, `text-gold-500`) instead of raw hex values, keeping the palette consistent.
