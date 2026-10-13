import { projects } from "@/content/projects";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/projects",
  title: "Nasze realizacje",
  description:
    "Portfolio realizacji firmy Sebastian Młyński — remonty łazienek, malowanie, zabudowy i wykończenia w Trójmieście.",
});

/** Projects listing page. Data is statically imported and sorted at build. */
export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) =>
    b.completedAt.localeCompare(a.completedAt),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-extrabold text-ink-900 sm:text-5xl">
          Nasze realizacje
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-700">
          Realizujemy prace remontowe i wykończeniowe na terenie całego Trójmiasta — od
          pojedynczych pomieszczeń po kompleksowe wykończenia mieszkań. Poniżej wybór
          ostatnich zakończonych zleceń.
        </p>
      </div>
      <div className="mt-12">
        <ProjectGrid projects={sorted} />
      </div>
    </div>
  );
}
