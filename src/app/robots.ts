import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Required for `output: "export"` — metadata routes must be fully static.
export const dynamic = "force-static";

/** robots.txt for the static export. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
