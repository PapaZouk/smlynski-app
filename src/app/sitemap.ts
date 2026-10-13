import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { offers } from "@/content/offers";
import { siteConfig } from "@/content/site";

// NOTE: replace with the production domain once it is known.
const BASE_URL = "https://smlynski.pl";

// Required for `output: "export"` — metadata routes must be fully static.
export const dynamic = "force-static";

/** Static sitemap generated from the content modules at build time. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = siteConfig.nav.map((link) => ({
    url: `${BASE_URL}${link.href}`,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.7,
  }));

  const projectPages = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.completedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const offerPages = offers.map((offer) => ({
    url: `${BASE_URL}/offer/${offer.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...projectPages,
    ...offerPages,
    {
      url: `${BASE_URL}/polityka-prywatnosci`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
