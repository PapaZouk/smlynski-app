import type { MetadataRoute } from "next";

// NOTE: replace with the production domain once it is known.
const BASE_URL = "https://smlynski.pl";

// Required for `output: "export"` — metadata routes must be fully static.
export const dynamic = "force-static";

/** robots.txt for the static export. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
