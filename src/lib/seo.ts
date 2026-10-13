import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/** Build an absolute URL on the canonical host for a root-relative path. */
export function absoluteUrl(path: string = "/"): string {
  return new URL(path, siteConfig.siteUrl).toString();
}

interface PageMetadataInput {
  /** Root-relative path of the page, e.g. "/projects/moj-slug". */
  path: string;
  /** Page title; omit to inherit the layout's default (home page). */
  title?: string;
  description: string;
  /** Optional social-share image path under /public. */
  ogImage?: string;
}

/**
 * Per-page metadata with canonical URL and OpenGraph URL.
 *
 * Every indexable page should use this so canonicals stay consistent with
 * the sitemap (see docs/adr/0017-seo-canonicals.md).
 */
export function pageMetadata({
  path,
  title,
  description,
  ogImage,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      ...(title ? { title } : {}),
      description,
      ...(ogImage ? { images: [{ url: absoluteUrl(ogImage) }] } : {}),
    },
  };
}
