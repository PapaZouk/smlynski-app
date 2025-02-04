import { isValidRequestOrigin } from "../utils/isValidRequestOrigin.ts";
import { getAllFeedbacks } from "../../../components/utils/api-client/clientApi.tsx";

export const handler = async (req: Request) => {
  console.log("Requesting all feedbacks");
  if (!isValidRequestOrigin(req)) {
    console.log("Invalid request origin");
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
      },
    });
  }

  const cacheTimeout: string | undefined =
    Deno.env.get("CACHE_EXPIRY_TIMEOUT") || "3600";

  try {
    const feedbacks = await getAllFeedbacks(cacheTimeout);
    return new Response(JSON.stringify(feedbacks), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (_error) {
    return new Response(
      "Error fetching feedbacks",
      { status: 500 },
    );
  }
};
