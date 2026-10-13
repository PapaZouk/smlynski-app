---
layout: home

hero:
  name: "Dokumentacja projektu"
  text: "Sebastian Młyński — strona www"
  tagline: "Decyzje architektoniczne (ADR) z rewrite z Deno Fresh na statyczny Next.js i późniejszych ulepszeń."
---

# Lista dokumentów

Wszystkie poniższe dokumenty to Architecture Decision Records (ADR) — po jednym
na decyzję, w formacie Status / Kontekst / Decyzja / Konsekwencje.

## Rewrite z Deno Fresh

- [0001 — Next.js 16 (App Router) + React 19 + TypeScript strict](/adr/0001-tech-stack-nextjs) — nowy stack technologiczny
- [0002 — Node.js LTS zamiast Deno](/adr/0002-runtime-node) — porzucenie Deno na rzecz Node.js + npm
- [0003 — W pełni statyczny eksport na Vercel](/adr/0003-static-export-vercel) — bez CI i bez runtime'u serwera
- [0004 — Statyczny model treści w TypeScript](/adr/0004-static-content-model) — typowane moduły w `src/content/` zamiast API
- [0005 — Placeholdery mediów + weryfikacja zasobów](/adr/0005-media-placeholders) — brak łamania się obrazków, budowanie blokujące przy brakach
- [0006 — Przyjazne SEO slugi URL zamiast ID](/adr/0006-slug-urls) — `/projects/<slug>` zamiast identyfikatorów Mongo
- [0007 — Formularz kontaktowy przez EmailJS](/adr/0007-contact-emailjs) — wysyłka z przeglądarki, zero backendu
- [0008 — System designu „nowoczesny industrialny + złoto”](/adr/0008-design-system) — tokeny Tailwind v4, spójny wygląd
- [0009 — Modernizacja przestarzałych wzorców](/adr/0009-modernization) — porządkowanie kodu w stylu Fresh
- [0010 — Zgoda cookie, osobna polityka prywatności, nowy loader Maps](/adr/0010-consent-analytics-maps) — RODO i integracje zewnętrzne

## Ulepszenia po rewrite

- [0011 — Potrójny pipeline obrazów (sharp → WebP)](/adr/0011-image-pipeline) — automatyczna optymalizacja zdjęć na etapie budowania
- [0012 — Nagłówki bezpieczeństwa na krawędzi (CSP)](/adr/0012-security-headers) — polityka bezpieczeństwa treści w `vercel.json`
- [0013 — Ochrona formularza przed spamem](/adr/0013-spam-protection) — honeypot + pułapka czasowa zamiast captchy
- [0014 — Testy i telemetria](/adr/0014-testing-telemetry) — lokalna suita Playwright, cookieless Vercel Analytics

Część ADR (0004, 0005, 0010) zawiera sekcje z poprawkami opisujące, jak
pierwotne decyzje zostały później doprecyzowane.

Opis projektu, komendy i instrukcja wdrożenia pozostają w
[README.md repozytorium](https://github.com/PapaZouk/smlynski-app).
