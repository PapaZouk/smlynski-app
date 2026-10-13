"use client";

import Link from "next/link";
import { useConsent } from "./ConsentProvider";

/**
 * Bottom cookie banner shown until a decision is made.
 *
 * The long inline privacy policy of the old app was replaced with a link to
 * a dedicated /polityka-prywatnosci page (better for SEO, easier to keep
 * up to date). See docs/adr/0010-consent-analytics-maps.md.
 */
export function CookieBanner() {
  const { isPending, accept, reject } = useConsent();

  if (!isPending) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Informacja o plikach cookie"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-lg border border-ink-700 bg-ink-950/95 p-5 text-paper shadow-2xl backdrop-blur sm:inset-x-6"
    >
      <p className="text-sm leading-relaxed text-paper/90">
        Ta strona używa plików cookie. Niezbędne zapamiętują Twój wybór i zapewniają
        prawidłowe działanie strony. Za Twoją zgodą korzystamy również ze statystycznych
        (Google Analytics). Więcej szczegółów znajdziesz w{" "}
        <Link
          href="/polityka-cookies"
          className="text-gold-300 underline underline-offset-4 hover:text-gold-400"
        >
          polityce plików cookie
        </Link>{" "}
        oraz{" "}
        <Link
          href="/polityka-prywatnosci"
          className="text-gold-300 underline underline-offset-4 hover:text-gold-400"
        >
          polityce prywatności
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={accept}
          className="min-h-11 rounded-md bg-gold-500 px-5 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
        >
          Akceptuję wszystkie
        </button>
        <button
          type="button"
          onClick={reject}
          className="min-h-11 rounded-md border border-ink-600 px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink-800"
        >
          Tylko niezbędne
        </button>
      </div>
    </div>
  );
}
