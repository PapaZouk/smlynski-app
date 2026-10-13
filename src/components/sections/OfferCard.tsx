import Link from "next/link";
import type { Offer } from "@/lib/types";
import { Media } from "@/components/ui/Media";

/** Card linking to an offer detail page. Server component — no client JS. */
export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-paper-dark bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-dark">
        <Media
          src={offer.image}
          alt={offer.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold text-ink-900">{offer.title}</h3>
        <p className="mt-3 line-clamp-3 flex-1 text-ink-700">{offer.summary}</p>
        <div className="mt-5">
          <Link
            href={`/offer/${offer.slug}`}
            className="inline-flex min-h-11 items-center rounded-md bg-ink-900 px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-gold-500 hover:text-ink-950"
          >
            Zobacz więcej
          </Link>
        </div>
      </div>
    </article>
  );
}
