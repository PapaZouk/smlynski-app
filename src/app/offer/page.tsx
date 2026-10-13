import { offers } from "@/content/offers";
import { OfferGrid } from "@/components/sections/OfferGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/offer",
  title: "Oferta",
  description:
    "Zakres usług firmy Sebastian Młyński: szpachlowanie agregatem, malowanie, remonty łazienek, układanie paneli, sufity i ścianki działowe.",
});

/** Offer listing page. Data is statically imported at build. */
export default function OfferPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-extrabold text-ink-900 sm:text-5xl">
          Zapoznaj się z naszą ofertą
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-700">
          Oferujemy pełen zakres prac remontowych i wykończeniowych — od pojedynczych
          usług po kompleksowe realizacje. Kliknij &bdquo;Zobacz więcej&rdquo;, aby
          poznać szczegóły.
        </p>
      </div>
      <div className="mt-12">
        <OfferGrid offers={offers} />
      </div>
    </div>
  );
}
