# Documentation

This directory holds the project documentation for the marketing website of
Sebastian Młyński — Usługi Remontowo-Budowlane.

## [adr/](adr/) — Architecture Decision Records

`docs/adr/` contains the Architecture Decision Records (ADRs) for the rewrite
from Deno Fresh to Next.js, listed in chronological order (numbered `0001`–`0010`).
Each record documents one decision in a standard lightweight format: **Status**,
**Context**, **Decision**, and **Consequences** (plus alternatives considered
where relevant). Read them in order to understand how and why the current
architecture — static Next.js export on Vercel with typed TypeScript content,
slug URLs, EmailJS forms, and consent-gated analytics — came to be.
