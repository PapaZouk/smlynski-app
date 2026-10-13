"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { optimizedVariant } from "@/lib/images";

interface LightboxProps {
  /** Already-resolved image path (see resolveImage). */
  src: string;
  alt: string;
  onClose: () => void;
}

/**
 * Full-screen image dialog with keyboard (Escape) and backdrop-close support.
 */
export function Lightbox({ src, alt, onClose }: LightboxProps) {
  const optimized = optimizedVariant(src);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Zamknij podgląd"
        onClick={onClose}
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink-800 text-2xl text-paper transition-colors hover:bg-gold-500 hover:text-ink-950"
      >
        ×
      </button>
      {/* <picture> with no <source> degrades to a plain <img>. */}
      <picture>
        {optimized && <source srcSet={optimized.webp} type="image/webp" />}
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1200}
          className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
          onClick={(event) => event.stopPropagation()}
        />
      </picture>
    </div>
  );
}
