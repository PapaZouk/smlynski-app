/** Shared content model types.
 *
 * Every page renders from these typed, statically-imported structures —
 * there is no runtime API. See docs/adr/0004-static-content-model.md.
 */

/** A portfolio project (realizacja). */
export interface Project {
  /** URL segment, e.g. "remont-lazienki-gdansk" → /projects/remont-lazienki-gdansk */
  slug: string;
  title: string;
  /** Short teaser shown on cards. */
  summary: string;
  /** Human readable location, e.g. "Gdańsk". */
  location: string;
  /** Completion date as an ISO string (YYYY-MM-DD). */
  completedAt: string;
  /** Detail page paragraphs. */
  details: string[];
  /** Image paths under /public; the first one is the cover. Empty = placeholder. */
  images: string[];
}

/** A service offer. */
export interface Offer {
  slug: string;
  title: string;
  /** Short teaser shown on cards. */
  summary: string;
  /** Cover image path under /public, or null to render the placeholder. */
  image: string | null;
  /** Detail page paragraphs. */
  details: string[];
}

/** A customer testimonial (opinia). */
export interface Feedback {
  /** Stable id used as React key. */
  id: string;
  name: string;
  surname?: string;
  company?: string;
  message: string;
}
