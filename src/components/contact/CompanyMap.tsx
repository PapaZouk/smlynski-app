"use client";

import { useEffect, useRef } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { siteConfig } from "@/content/site";

const API_KEY = process.env.NEXT_PUBLIC_GMAPS_API_KEY;

/**
 * Google Maps embed with a marker on the company location.
 *
 * Uses the modern functional loader API (setOptions + importLibrary).
 * Renders a styled fallback block when NEXT_PUBLIC_GMAPS_API_KEY is not
 * configured (e.g. local dev without secrets).
 */
export function CompanyMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!API_KEY || !mapRef.current) {
      return;
    }

    let cancelled = false;

    setOptions({
      key: API_KEY,
      language: "pl",
      region: "PL",
    });

    (async () => {
      const { Map: GoogleMap } = await importLibrary("maps");
      const { Marker } = await importLibrary("marker");
      if (cancelled || !mapRef.current) {
        return;
      }
      const map = new GoogleMap(mapRef.current, {
        center: siteConfig.map,
        zoom: 13,
      });
      new Marker({
        position: siteConfig.map,
        map,
        title: "Lokalizacja firmy",
      });
    })().catch((error) => console.error("Google Maps failed to load:", error));

    return () => {
      cancelled = true;
    };
  }, []);

  if (!API_KEY) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-ink-600 bg-paper-dark text-center text-ink-600">
        <div>
          <p className="font-medium">Mapa firmy</p>
          <p className="mt-1 text-sm">
            Skonfiguruj NEXT_PUBLIC_GMAPS_API_KEY, aby wyświetlić mapę.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      aria-label="Mapa lokalizacji firmy"
      className="h-[400px] w-full rounded-lg"
    />
  );
}
