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
 * hardcoded twice. See docs/adr/0008-modernization.md.
 */
export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-paper hover:bg-ink-800 sm:hidden"
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
