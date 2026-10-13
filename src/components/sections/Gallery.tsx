"use client";

import { useState } from "react";
import { Media } from "@/components/ui/Media";
import { Lightbox } from "@/components/ui/Lightbox";
import { resolveImage } from "@/lib/images";

interface GalleryProps {
  images: string[];
  projectTitle: string;
}

/**
 * Project photo gallery with click-to-enlarge lightbox.
 * Renders a branded placeholder block when no images are provided yet.
 */
export function Gallery({ images, projectTitle }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-ink-600 bg-paper-dark p-12 text-center text-ink-600">
        <p className="font-medium">Galeria zdjęć wkrótce</p>
        <p className="mt-1 text-sm">
          Zdjęcia z tej realizacji zostaną dodane w najbliższym czasie.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Powiększ zdjęcie ${index + 1}: ${projectTitle}`}
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-paper-dark transition-transform hover:scale-[1.02]"
            >
              <Media
                src={image}
                alt={`${projectTitle} — zdjęcie ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {selected !== null && (
        <Lightbox
          src={resolveImage(images[selected])}
          alt={`${projectTitle} — zdjęcie ${selected + 1}`}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
