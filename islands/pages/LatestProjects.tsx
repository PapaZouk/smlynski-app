import { useEffect, useState } from "preact/hooks";
import ProjectTile from "../../components/ProjectTile.tsx";
import { Project } from "../../components/utils/api-client/types/Project.ts";
import Loading from "../../components/loader/Loading.tsx";

export default function LatestProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch("/api/projects/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch projects");
        return;
      }

      const responseBody = await response.json();
      const projects = responseBody.result;
      setProjects(projects);
    }

    if (!projects || projects.length === 0) {
      fetchProjects();
    }
  }, []);

  let data: Project[] = [];

  if (
    Array.isArray(projects) && projects.length !== 0
  ) {
    data = projects.slice(0, 6);
  }

  if (!projects || projects.length === 0) {
    return <Loading />;
  }

  return (
    <div
      className="bg-gray-100 p-8 rounded-lg shadow-lg mb-8"
      style={{ marginTop: "500px" }}
    >
      <h1 className="text-4xl font-bold mb-20 text-center text-gray-800">
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
