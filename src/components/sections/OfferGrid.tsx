"use client";

import { useState } from "react";
import type { Offer } from "@/lib/types";
import { OfferCard } from "./OfferCard";
import { Pagination } from "@/components/ui/Pagination";

const OFFERS_PER_PAGE = 6;

/** Offers grid with client-side pagination. Props come from the server page. */
export function OfferGrid({ offers }: { offers: Offer[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(offers.length / OFFERS_PER_PAGE);
  const start = (currentPage - 1) * OFFERS_PER_PAGE;
  const visible = offers.slice(start, start + OFFERS_PER_PAGE);

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((offer) => (
          <li key={offer.slug} className="h-full">
            <OfferCard offer={offer} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-10"
      />
    </div>
  );
}
