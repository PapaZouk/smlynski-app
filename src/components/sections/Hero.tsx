import Link from "next/link";
import { Media } from "@/components/ui/Media";

/**
 * Home page hero — in-flow section (min-h with svh), no fixed positioning
 * hacks. Replace the background image by dropping a file at
 * /images/hero.jpg in public/images/. See docs/adr/0005-media-placeholders.md.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-ink-950">
      <Media
        src="/images/hero-image.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      {/* Gold-tinted gradient tying the photo into the palette. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/20"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-gold-400 uppercase">
            Usługi remontowo-budowlane · Trójmiasto
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-paper text-balance sm:text-6xl">
            Remonty i wykończenia
            <span className="block text-gold-400">z solidnym wykonaniem</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">
            Szpachlowanie agregatem, malowanie, kompleksowe remonty łazienek, układanie
            paneli i zabudowy z karton-gipsu. Działamy na terenie Gdańska, Gdyni, Rumi i
            Wejherowa.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold-500 px-8 py-3 font-semibold text-ink-950 transition-colors hover:bg-gold-400"
            >
              Poproś o wycenę
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-paper/30 px-8 py-3 font-semibold text-paper transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              Zobacz realizacje
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
