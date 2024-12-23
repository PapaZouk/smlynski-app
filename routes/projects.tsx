import {getAllProjects} from "../components/utils/api-client/clientApi.tsx";
import Projects from "../islands/Projects.tsx";
import {Project} from "../components/utils/api-client/types/Project.ts";

export default async function ProjectsPage() {
    const cacheTimeout: string|undefined = Deno.env.get("CACHE_EXPIRY_VALUE");
    const projects = (await getAllProjects(cacheTimeout)).result;

    const sortedProjects = projects.sort((a: Project, b: Project) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <div>
            <Projects initialProjects={sortedProjects} />
        </div>
    )
}