import {PageProps} from "$fresh/server.ts";
import ProjectDetails from "../../islands/pages/ProjectDetails.tsx";

export default function ProjectById(props: PageProps) {
    const id = new URL(props.url).pathname.split('/').filter(Boolean)[1];
    return (
        <main>
            <ProjectDetails projectId={id} />
        </main>
    );
}