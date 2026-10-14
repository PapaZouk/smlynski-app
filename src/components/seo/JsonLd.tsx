import { absoluteUrl } from "@/lib/seo";

/**
 * Renders structured data as a JSON-LD script tag.
 *
 * The payload is serialized with "<" escaped per the Next.js JSON-LD
 * guidance to prevent injection if content ever contains user-provided
 * strings. Server-only — do not import from client components.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * Breadcrumb structured data for detail and listing pages.
 *
 * `items` lists ancestors first, then the current page. Every item —
 * including the current one — should carry its `path`: Google's breadcrumb
 * guidance expects an `item` URL on each ListItem, and omitting it on the
 * last level weakens the signal.
 */
export function breadcrumbJsonLd(
  items: Array<{ name: string; path?: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}
