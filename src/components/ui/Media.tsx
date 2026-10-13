import Image from "next/image";
import { optimizedVariant, resolveImage } from "@/lib/images";

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
 * - Renders the branded placeholder whenever a real asset is missing (e.g.
 *   media still to be provided from the old API).
 * - Wraps the image in <picture> with a build-time-generated WebP source
 *   when one exists (see scripts/optimize-images.mjs); the original file is
 *   the fallback for legacy browsers.
 *
 * All image handling goes through here so the static-export trade-offs live
 * in one place. See docs/adr/0005-media-placeholders.md and
 * docs/adr/0011-image-pipeline.md.
 */
export function Media({
  src,
  alt,
  fill = false,
  className,
  sizes,
  priority = false,
}: MediaProps) {
  const resolved = resolveImage(src);
  const optimized = optimizedVariant(resolved);

  // When a WebP variant exists we preload THAT instead of the original:
  // next/image's own `priority` preload would otherwise fetch the large
  // source file in parallel with the WebP the <picture> actually selects.
  const img = (
    <Image
      src={resolved}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority && !optimized}
      loading={priority && optimized ? "eager" : undefined}
      fetchPriority={priority && optimized ? "high" : undefined}
      className={className}
    />
  );

  if (!optimized) {
    return img;
  }

  return (
    <>
      {priority && (
        <link rel="preload" as="image" href={optimized.webp} type="image/webp" />
      )}
      <picture>
        <source
          srcSet={optimized.webp}
          type="image/webp"
          sizes={fill ? sizes : undefined}
        />
        {img}
      </picture>
    </>
  );
}
