import Link from "next/link";

/** Custom 404 page — ported from the old routes/_404.tsx with new styling. */
export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center bg-ink-950 px-4 py-20 text-center">
      <p className="text-sm font-semibold tracking-widest text-gold-400 uppercase">
        Błąd 404
      </p>
      <h1 className="mt-4 text-4xl font-extrabold text-paper sm:text-5xl">
        Nie znaleziono strony
      </h1>
      <p className="mt-4 max-w-md text-lg text-paper/70">
        Nie martw się — nawet najlepszym zdarza się zgubić drogę.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 items-center justify-center rounded-md bg-gold-500 px-8 py-3 font-semibold text-ink-950 transition-colors hover:bg-gold-400"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
