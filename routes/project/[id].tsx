import {PageProps} from "$fresh/server.ts";
import ProjectDetails from "../../islands/ProjectDetails.tsx";
import {getProjectById} from "../../components/utils/api-client/clientApi.tsx";

export default async function ProjectById(props: PageProps) {
    const id = new URL(props.url).pathname.split('/').filter(Boolean)[1];
    const project = await getProjectById(id);
    const projectData = project.result;

    return (
        <main>
            <ProjectDetails project={projectData} />
        </main>
    );
}