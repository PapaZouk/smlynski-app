import { isValidRequestOrigin } from "../../../components/utils/isValidRequestOrigin.ts";
import { getAllProjects } from "../../../components/utils/api-client/clientApi.tsx";

export const handler = async (req: Request) => {
  console.log("Requesting all projects");
  if (!isValidRequestOrigin(req)) {
    console.log("Invalid request origin");
    return new Response(null, {
      status: 302,
      headers: {
        location: "/",
      },
    });
  }

  try {
    const cacheTimeout: string | undefined = Deno.env.get("CACHE_EXPIRY_VALUE") ||
        "3600";
    const projects = await getAllProjects(cacheTimeout);
    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (_error) {
    console.log("Error fetching projects");
    return new Response("Error fetching projects", { status: 500 });
  }
};
