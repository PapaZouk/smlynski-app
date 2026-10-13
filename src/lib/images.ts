/** Absolute fallback placeholder served from /public. */
export const FALLBACK_IMAGE = "/images/placeholder.svg";

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
