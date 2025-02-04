import { isValidRequestOrigin } from "../utils/isValidRequestOrigin.ts";
import { getAllOffers } from "../../../components/utils/api-client/clientApi.tsx";

export const handler = async (req: Request) => {
  console.log("Requesting all offers");
  if (!isValidRequestOrigin(req)) {
    return new Response(null, {
      status: 302,
        headers: {
            location: "/",
        },
    });
  }

  const cacheTimeout: string | undefined = Deno.env.get("CACHE_EXPIRY_VALUE") ||
    "3600";

  try {
    const initialOffers = await getAllOffers(cacheTimeout);
    return new Response(JSON.stringify(initialOffers), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (_error) {
    console.log("Error fetching offers");
    return new Response("Error fetching offers", { status: 500 });
  }
};
