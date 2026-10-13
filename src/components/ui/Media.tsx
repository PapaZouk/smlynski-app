import Image from "next/image";
import { resolveImage } from "@/lib/images";

interface MediaProps {
  /** Image path under /public, or null/undefined to render the placeholder. */
  src: string | null | undefined;
  alt: string;
  /** Fill the parent container (position: absolute) instead of intrinsic sizing. */
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Centralized image component.
 *
 * Renders the branded placeholder whenever a real asset is missing (e.g.
 * media still to be provided from the old API). All image handling goes
 * through here so the static-export trade-offs live in one place.
 * See docs/adr/0005-media-placeholders.md.
 */
export function Media({
  src,
  alt,
  fill = false,
  className,
  sizes,
  priority = false,
}: MediaProps) {
  return (
    <Image
      src={resolveImage(src)}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
