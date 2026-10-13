# ADR 0013: Contact-form spam protection (honeypot + time-trap)

## Status

Accepted

## Context

The contact form sends email directly from the browser via EmailJS (ADR 0007) — there is no server that could rate-limit, run a captcha challenge, or apply IP reputation. Naive bots nonetheless crawl `mailto:`/`tel:`-bearing pages and submit every form they find. Turnstile/hCaptcha were explicitly out of scope (owner's choice: no third-party captcha UX on a small local-business site).

## Decision

Two client-side heuristics, both applied **before** any EmailJS call:

- **Honeypot** — an extra `website` input rendered inside an `aria-hidden`, off-screen wrapper (`position: absolute; left: -9999px`). Deliberately **not `display:none`**: many bots skip `display:none` fields when probing for traps. Humans never see or fill it (screen-reader and keyboard users are excluded via `aria-hidden`/`tabIndex={-1}`/`autoComplete="off"`).
- **Time-trap** — the form records its mount time; a submit arriving **< 3 s** after mount is considered bot-driven (no human fills the 15-field form that fast).
- **Both paths fake a successful send** (status `sent`, form reset, nothing sent via EmailJS) so bots cannot probe which check tripped them and adapt.

The honeypot value is never included in the EmailJS template params (`toTemplateParams` builds an explicit object, no spread).

## Alternatives considered

- **Cloudflare Turnstile / hCaptcha** — rejected: third-party widget, extra script origin, visual friction; owner explicitly declined.
- **EmailJS built-in rate limiting only** — insufficient alone: `limitRate` throttles per-browser-id, which trivially-distributed bots bypass; kept as an additional layer, not the only one.
- **Honeypot with `display: none`** — rejected: widely detected by modern bots, which then simply leave the field empty.
- **Rejecting suspicious submits with an error** — rejected: tells the bot it was caught; faking success wastes bot effort instead.
- **Time-trap threshold tuning** — 3 s chosen against a 15-field form; revisit (lower) only if the owner reports legitimate users being blocked (unlikely).

## Consequences

- Protection is heuristic, not cryptographic — a determined human-spam operation can still get through; acceptable risk for a low-traffic contact form, and the cost of false negatives is one unwanted email.
- The 3 s threshold starts at the **form mount**, not first keystroke — a user who loads the page and reads before filling is unaffected; only sub-3 s submits are dropped.
- Removing or renaming the honeypot field requires touching both the JSX and `FormData`/`handleSubmit`; the Playwright suite pins the field's name, position, and non-`display:none` styling.
