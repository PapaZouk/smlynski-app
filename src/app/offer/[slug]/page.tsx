import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { offers } from "@/content/offers";
import { Media } from "@/components/ui/Media";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";

interface OfferDetailProps {
  params: Promise<{ slug: string }>;
}

/** All offer pages are pre-rendered at build time from the content module. */
export function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({
  params,
}: OfferDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = offers.find((entry) => entry.slug === slug);
  if (!offer) {
    return {};
  }
  return pageMetadata({
    path: `/offer/${offer.slug}`,
    title: offer.title,
    description: offer.summary,
    ogImage: offer.image ?? undefined,
  });
}

export default async function OfferDetailPage({ params }: OfferDetailProps) {
  const { slug } = await params;
  const offer = offers.find((entry) => entry.slug === slug);

  if (!offer) {
    notFound();
  }

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Strona główna", path: "/" },
          { name: "Oferta", path: "/offer" },
          { name: offer.title },
        ])}
      />
      {/* Hero with cover image (or placeholder) and overlaid title. */}
      <section className="relative flex min-h-[40svh] items-center overflow-hidden bg-ink-950">
        <Media
          src={offer.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <nav aria-label="Okruszki" className="text-sm text-paper/70">
            <Link
              href="/offer"
              className="underline-offset-4 hover:text-gold-300 hover:underline"
            >
              Oferta
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-paper">{offer.title}</span>
          </nav>
          <h1 className="mt-4 text-4xl font-extrabold text-paper sm:text-5xl">
            {offer.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-paper/80">{offer.summary}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <article className="rounded-lg border border-paper-dark bg-white p-6 shadow-sm sm:p-10">
          <div className="space-y-5 text-lg leading-relaxed text-ink-700">
            {offer.details.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold-500 px-8 py-3 font-semibold text-ink-950 transition-colors hover:bg-gold-400"
          >
            Skontaktuj się w sprawie tej usługi
          </Link>
          <Link
            href="/offer"
            className="inline-flex min-h-11 items-center rounded-md border border-ink-300 px-5 py-2 font-semibold text-ink-800 transition-colors hover:border-gold-500 hover:text-gold-600"
          >
            ← Wróć do oferty
          </Link>
        </div>
      </div>
    </div>
  );
}
