import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { offers } from "@/content/offers";
import { formatDate } from "@/lib/format";
import { Gallery } from "@/components/sections/Gallery";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

/** All project pages are pre-rendered at build time from the content module. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) {
    return {};
  }
  return pageMetadata({
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.summary,
    ogImage: project.images[0],
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedOffer = project.relatedOffer
    ? offers.find((entry) => entry.slug === project.relatedOffer)
    : undefined;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Strona główna", path: "/" },
          { name: "Nasze realizacje", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <nav aria-label="Okruszki" className="text-sm text-ink-600">
        <Link
          href="/"
          className="underline-offset-4 hover:text-gold-600 hover:underline"
        >
          Strona główna
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <Link
          href="/projects"
          className="underline-offset-4 hover:text-gold-600 hover:underline"
        >
          Nasze realizacje
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <span className="text-ink-800">{project.title}</span>
      </nav>

      <header className="mt-6">
        <h1 className="text-4xl font-extrabold text-ink-900 sm:text-5xl">
          {project.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-ink-600">
          <span className="inline-flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                clipRule="evenodd"
              />
            </svg>
            {project.location}
          </span>
          <time
            dateTime={project.completedAt}
            className="inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 17 6.75v8.5A2.75 2.75 0 0 1 14.25 18H5.75A2.75 2.75 0 0 1 3 15.25v-8.5A2.75 2.75 0 0 1 5.75 4H6V2.75A.75.75 0 0 1 6.75 2Zm0 3.5h8.5a1.25 1.25 0 0 1 1.25 1.25v6.25a1.25 1.25 0 0 1-1.25 1.25h-8.5a1.25 1.25 0 0 1-1.25-1.25V6.75A1.25 1.25 0 0 1 5.75 5.5Z"
                clipRule="evenodd"
              />
            </svg>
            {formatDate(project.completedAt)}
          </time>
        </div>
      </header>

      <section aria-labelledby="details-heading" className="mt-10">
        <h2 id="details-heading" className="text-2xl font-bold text-ink-900">
          Szczegóły realizacji
        </h2>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-700">
          {project.details.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="gallery-heading" className="mt-12">
        <h2 id="gallery-heading" className="text-2xl font-bold text-ink-900">
          Zdjęcia z realizacji
        </h2>
        <div className="mt-4">
          <Gallery images={project.images} projectTitle={project.title} />
        </div>
      </section>

      {relatedOffer && (
        <p className="mt-10 text-ink-600">
          Powiązana usługa:{" "}
          <Link
            href={`/offer/${relatedOffer.slug}`}
            className="font-semibold text-gold-700 underline-offset-4 hover:underline"
          >
            {relatedOffer.title}
          </Link>
        </p>
      )}

      <div className="mt-12">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center rounded-md border border-ink-300 px-5 py-2 font-semibold text-ink-800 transition-colors hover:border-gold-500 hover:text-gold-600"
        >
          ← Wróć do realizacji
        </Link>
      </div>
    </div>
  );
}
