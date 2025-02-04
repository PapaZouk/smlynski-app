import { PageProps } from "$fresh/server.ts";
import { isValidRequestOrigin } from "../../utils/isValidRequestOrigin.ts";
import { formatRouteParam } from "../../utils/formatRouteParam.ts";
import { getOfferById } from "../../../../components/utils/api-client/clientApi.tsx";

export const handler = async (req: Request, props: PageProps) => {
  console.log("Requesting offer details");
  if (!isValidRequestOrigin(req)) {
    console.log("Invalid request origin");
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
      },
    });
  }

  const id: string = formatRouteParam(props);

  if (!id) {
    console.log("Invalid id");
    return new Response(
      "Missing request ID",
      {
        status: 404,
      },
    );
  }

  try {
    const cacheTimeout: string | undefined = Deno.env.get("CACHE_TIMEOUT") ||
      "3600";
    const offer = await getOfferById(id, cacheTimeout);
    return new Response(JSON.stringify(offer), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (_error) {
    console.log("Failed to fetch offer details");
    return new Response(
      "Failed to fetch offer details",
      {
        status: 500,
      },
    );
  }
};
