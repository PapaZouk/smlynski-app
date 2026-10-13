"use client";

import { useCallback, useEffect, useState } from "react";
import type { Feedback } from "@/lib/types";
import { cn } from "@/lib/cn";

interface TestimonialsProps {
  feedbacks: Feedback[];
  header: string;
  subheader?: string;
}

const ROTATION_INTERVAL_MS = 7000;

/**
 * Testimonials carousel.
 *
 * Desktop shows 3 cards, mobile 1. Rotation pauses on hover/focus and for
 * users with prefers-reduced-motion (see globals.css). Manual controls let
 * users step through testimonials.
 */
export function Testimonials({ feedbacks, header, subheader }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () =>
      setVisibleCount(window.matchMedia("(min-width: 768px)").matches ? 3 : 1);
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const next = useCallback(
    () => setIndex((current) => (current + 1) % feedbacks.length),
    [feedbacks.length],
  );

  useEffect(() => {
    if (isPaused || feedbacks.length <= visibleCount) {
      return;
    }
    const interval = setInterval(next, ROTATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isPaused, feedbacks.length, visibleCount, next]);

  if (feedbacks.length === 0) {
    return null;
  }

  const visible = Array.from(
    { length: Math.min(visibleCount, feedbacks.length) },
    (_, offset) => feedbacks[(index + offset) % feedbacks.length],
  );

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-ink-950 py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="testimonials-heading"
            className="text-3xl font-extrabold text-paper sm:text-4xl"
          >
            {header}
          </h2>
          {subheader && <p className="mt-4 text-lg text-paper/70">{subheader}</p>}
        </div>

        <ul aria-live="polite" className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {visible.map((feedback, offset) => (
            <li
              key={`${feedback.id}-${offset}`}
              className="flex flex-col justify-between rounded-lg border-l-4 border-gold-500 bg-ink-800 p-6"
            >
              <p className="text-paper/90">{feedback.message}</p>
              <div className="mt-4">
                <p className="font-semibold text-gold-300">
                  {feedback.name} {feedback.surname}
                </p>
                {feedback.company && (
                  <p className="mt-1 flex items-center gap-2 text-sm text-paper/60">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 16a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4Zm5-1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1Zm1-4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feedback.company}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        {feedbacks.length > visibleCount && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Poprzednie opinie"
              onClick={() =>
                setIndex(
                  (current) => (current - 1 + feedbacks.length) % feedbacks.length,
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 text-paper transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Następne opinie"
              onClick={next}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 text-paper transition-colors hover:border-gold-400 hover:text-gold-300",
              )}
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
