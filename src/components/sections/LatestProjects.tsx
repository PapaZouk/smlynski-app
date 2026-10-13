import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

/** "Latest projects" home section — the 6 most recent, sorted by date. */
export function LatestProjects() {
  const latest = [...projects]
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .slice(0, 6);

  return (
    <section
      aria-labelledby="latest-projects-heading"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="latest-projects-heading"
          className="text-3xl font-extrabold text-ink-900 sm:text-4xl"
        >
          Nasze najnowsze realizacje
        </h2>
        <p className="mt-4 text-lg text-ink-700">
          Sprawdź, co ostatnio kończyliśmy w Gdańsku, Gdyni i okolicach.
        </p>
      </div>
      <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((project) => (
          <li key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
