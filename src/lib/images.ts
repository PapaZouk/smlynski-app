import imageManifest from "@/lib/image-manifest.json";

/** Absolute fallback placeholder served from /public. */
export const FALLBACK_IMAGE = "/images/placeholder.svg";

/** One entry of the build-time image manifest (scripts/optimize-images.mjs). */
export interface OptimizedImage {
  webp: string;
  width: number;
  height: number;
}

/** Resolve a content image path to something renderable.
 *
 * Returns the fallback placeholder when the path is missing/empty, or when a
 * file that used to come from the API has not been provided yet.
 * See docs/adr/0005-media-placeholders.md.
 */
export function resolveImage(src: string | null | undefined): string {
  if (!src || src.trim() === "") {
    return FALLBACK_IMAGE;
  }
  return src;
}

/**
 * Look up the WebP variant of an image path, if one was generated.
 *
 * The manifest is produced by `npm run optimize:images` (runs automatically
 * before dev/build). Unknown paths (placeholders, SVGs, small files) return
 * undefined and render as plain <img>.
 */
export function optimizedVariant(resolvedSrc: string): OptimizedImage | undefined {
  return imageManifest[resolvedSrc as keyof typeof imageManifest] as
    OptimizedImage | undefined;
}
