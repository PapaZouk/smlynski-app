"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Sticky top navigation.
 *
 * Single source of truth for links (siteConfig.nav) — desktop and mobile
 * menus render from the same array, unlike the old app where links were
 * hardcoded twice. See docs/adr/0009-modernization.md.
 */
export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  /** tel: link for click-to-call; whitespace stripped from the display number. */
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

  const linkClass = (href: string) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      pathname === href
        ? "bg-ink-800 text-gold-300"
        : "text-paper/80 hover:bg-ink-800 hover:text-paper",
    );

  return (
    <header className="sticky top-0 z-40 bg-ink-950/95 backdrop-blur">
      <nav
        aria-label="Nawigacja główna"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={`${siteConfig.companyName} — strona główna`}
          >
            <Image
              src="/images/logo-white.png"
              alt=""
              width={120}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <div className="hidden items-center gap-1 sm:flex">
            {siteConfig.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={phoneHref}
              className="ml-3 inline-flex min-h-10 items-center gap-2 rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
              aria-label={`Zadzwoń: ${siteConfig.contact.phone}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                  clipRule="evenodd"
                />
              </svg>
              Zadzwoń
            </a>
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            <a
              href={phoneHref}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gold-400 hover:bg-ink-800"
              aria-label={`Zadzwoń: ${siteConfig.contact.phone}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-paper hover:bg-ink-800"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={cn("space-y-1 pb-3 sm:hidden", isMenuOpen ? "block" : "hidden")}
        >
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn("block", linkClass(link.href))}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
