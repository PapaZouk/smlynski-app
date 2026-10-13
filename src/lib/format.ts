/** Formatting helpers shared across pages. */

/** Format an ISO date (YYYY-MM-DD) for display, e.g. "12 marca 2024". */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
