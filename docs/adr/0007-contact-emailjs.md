# ADR 0007: Contact form via browser-side EmailJS

## Status

Accepted

## Context

The site must remain a fully static export (ADR 0003) with no server runtime, but it still needs a working contact form. The old Fresh app handled the form server-side.

## Decision

Keep **EmailJS**, called **browser-side** via the `@emailjs/browser` npm package. Public keys come from environment variables:

- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`

(see `.env.example`). The browser sends the email directly to EmailJS — no server code is involved. This is precisely why the site can be a pure static export with zero server functions.

## Alternatives considered

- **Vercel serverless function as a form proxy** — rejected: would break the "static export only" decision and add a server runtime, API routes, and a service to maintain for a single contact form.

## Consequences

- The contact form works on a purely static site.
- All EmailJS keys are public (`NEXT_PUBLIC_*` is baked into the client bundle) — they must be EmailJS _public_ keys, and the EmailJS account should have domain restrictions configured (follow-up in the EmailJS dashboard, not in code).
- If EmailJS limits are exceeded or the service is dropped, the fallback is adding a serverless proxy (explicitly rejected for now).
