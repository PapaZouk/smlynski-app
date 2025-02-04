import { PageProps } from "$fresh/server.ts";
import { isValidRequestOrigin } from "../../../../components/utils/isValidRequestOrigin.ts";
import { formatRouteParam } from "../../../../components/utils/formatRouteParam.ts";
import { getProjectById } from "../../../../components/utils/api-client/clientApi.tsx";

export const handler = async (req: Request, props: PageProps) => {
  console.log("Requesting project details");
  if (!isValidRequestOrigin(req)) {
    console.log("Invalid request origin");
    return new Response(null, {
      status: 302,
      headers: {
        location: "/",
      },
    });
  }

  const id: string = formatRouteParam(props);

  if (!id) {
    return new Response(
      "Missing project ID",
      {
        status: 404,
      },
    );
  }

  try {
    const cacheTimeout: string | undefined =
      Deno.env.get("CACHE_EXPIRY_VALUE") ||
      "3600";
    const project = await getProjectById(id, cacheTimeout);
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (_error) {
    console.log("Failed to fetch project details");
    return new Response(
      "Failed to fetch project details",
      {
        status: 500,
      },
    );
  }
};
