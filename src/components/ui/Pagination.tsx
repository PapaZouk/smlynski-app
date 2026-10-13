"use client";

import { cn } from "@/lib/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Accessible pagination controls. Rendered inside a client component that
 * owns the grid state (e.g. ProjectGrid, OfferGrid).
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Paginacja"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <PaginationButton
        label="Poprzednia strona"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </PaginationButton>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={cn(
              "min-h-11 min-w-11 rounded-md px-3 py-2 font-medium transition-colors",
              page === currentPage
                ? "bg-gold-500 text-ink-950"
                : "bg-paper-dark text-ink-700 hover:bg-ink-800 hover:text-paper",
            )}
          >
            {page}
          </button>
        );
      })}
      <PaginationButton
        label="Następna strona"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </PaginationButton>
    </nav>
  );
}

function PaginationButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "min-h-11 min-w-11 rounded-md px-3 py-2 transition-colors",
        disabled
          ? "cursor-not-allowed bg-paper-dark text-ink-600/50"
          : "bg-paper-dark text-ink-700 hover:bg-ink-800 hover:text-paper",
      )}
    >
      {children}
    </button>
  );
}
