import { useSignal, Signal } from "@preact/signals";
import ProjectTile from "../components/ProjectTile.tsx";
import { Project } from "../components/utils/api-client/types/Project.ts";

type LatestProjectsProps = {
  initialProjects: Project[];
};

export default function LatestProjects(
  { initialProjects }: LatestProjectsProps,
) {
  const projects: Signal = useSignal<Project[]>(initialProjects);

  let data: Project[] = [];

  if (Array.isArray(projects.value.result) && projects.value.result.length !== 0) {
    data = projects.value.result;
  }

  return (
    <div
      className="bg-gray-100 p-8 rounded-lg shadow-lg mb-8"
      style={{ marginTop: "500px" }}
    >
      <h1 className="text-3xl font-bold mb-20 text-center text-gray-800">
        Nasze najnowsze realizacje
      </h1>
      <ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((data: Project) => (
            <ProjectTile key={data._id} project={data} />
          ))}
        </div>
      </ul>
    </div>
  );
}
