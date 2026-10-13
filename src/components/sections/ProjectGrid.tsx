"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { Pagination } from "@/components/ui/Pagination";

const PROJECTS_PER_PAGE = 4;

/**
 * Projects grid with client-side pagination.
 *
 * Receives already-sorted projects as props from the server page — no
 * fetching, no loading spinners (see docs/adr/0008-modernization.md).
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const start = (currentPage - 1) * PROJECTS_PER_PAGE;
  const visible = projects.slice(start, start + PROJECTS_PER_PAGE);

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {visible.map((project) => (
          <li key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-10"
      />
    </div>
  );
}
