import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Testimonials } from "@/components/sections/Testimonials";
import { feedbacks } from "@/content/feedbacks";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "O firmie Sebastian Młyński — Usługi Remontowo-Budowlane. Działamy od 2018 roku na terenie Gdańska, Gdyni, Rumi i Wejherowa.",
};

/** About page — company intro over a photo hero. */
export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 py-20 sm:py-28">
        <Image
          src="/images/about-office-desk.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl rounded-lg bg-ink-950/60 p-8 backdrop-blur-sm">
            <h1 className="text-4xl font-extrabold text-paper sm:text-5xl">O nas</h1>
            <p className="mt-6 text-lg leading-relaxed text-paper/80">
              Działamy na rynku od 2018 roku. Główny zakres naszej działalności to
              szpachlowanie agregatem, malowanie mieszkań, kompleksowy remont łazienek,
              układanie paneli podłogowych i listew przypodłogowych, budowa ścianek
              działowych, sufitów zawieszanych i inne prace wykończeniowe.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              Teren działania firmy to Gdańsk, Gdynia, Rumia i Wejherowo. Skontaktuj
              się, a otrzymasz wycenę, która będzie godna Twojej uwagi.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-gold-500 px-8 py-3 font-semibold text-ink-950 transition-colors hover:bg-gold-400"
            >
              Skontaktuj się z nami
            </Link>
          </div>
        </div>
      </section>

      <Testimonials
        feedbacks={feedbacks}
        header="Opinie naszych klientów"
        subheader="Cenimy opinie naszych klientów, dlatego zawsze staramy się dostosować do ich potrzeb. Poniżej znajdziesz opinie osób, które skorzystały z naszych usług."
      />
    </>
  );
}
