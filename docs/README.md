# Documentation

This directory holds the project documentation for the marketing website of
Sebastian Młyński — Usługi Remontowo-Budowlane.

## [adr/](adr/) — Architecture Decision Records

`docs/adr/` contains the Architecture Decision Records (ADRs) for the rewrite
from Deno Fresh to Next.js, listed in chronological order (numbered `0001`–`0014`).
Each record documents one decision in a standard lightweight format: **Status**,
**Context**, **Decision**, and **Consequences** (plus alternatives considered
where relevant). Read them in order to understand how and why the current
architecture — static Next.js export on Vercel with typed TypeScript content,
slug URLs, EmailJS forms, and consent-gated analytics — came to be.

ADRs `0011`–`0014` cover the post-rewrite enhancement batch: the build-time
image pipeline (0011), edge-level security headers (0012), contact-form spam
protection (0013), and the local testing/telemetry strategy (0014). ADRs
`0004`, `0005`, and `0010` carry amendment sections describing how their
original decisions were later refined.
