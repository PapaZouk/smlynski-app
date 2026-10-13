import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { offers } from "@/content/offers";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

// Required for `output: "export"` — metadata routes must be fully static.
export const dynamic = "force-static";

/** Static sitemap generated from the content modules at build time. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = siteConfig.nav.map((link) => ({
    url: absoluteUrl(link.href),
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.7,
  }));

  const projectPages = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(project.completedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const offerPages = offers.map((offer) => ({
    url: absoluteUrl(`/offer/${offer.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...projectPages,
    ...offerPages,
    {
      url: absoluteUrl("/polityka-prywatnosci"),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: absoluteUrl("/polityka-cookies"),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
