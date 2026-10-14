import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";

/** Site-wide footer. Purely presentational — renders statically. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <Link href="/" aria-label="Strona główna">
          <Image
            src="/images/logo-white.png"
            alt={`${siteConfig.companyName} — ${siteConfig.tagline}`}
            width={160}
            height={64}
            className="h-16 w-auto"
          />
        </Link>

        <nav
          aria-label="Nawigacja w stopce"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-paper/80 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {siteConfig.socials.facebookEnabled && (
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil na Facebooku"
              className="flex h-11 w-11 items-center justify-center rounded-full text-paper/80 transition-colors hover:bg-ink-800 hover:text-gold-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M16 8a8 8 0 1 0-9.25 7.875v-5.563h-1.688V8h1.688V6.188c0-1.662 1.021-2.574 2.487-2.574.712 0 1.323.053 1.5.077v1.737h-.847c-.945 0-1.13.45-1.13 1.11V8h1.912l-.25 2.312h-1.662V15.875A8 8 0 0 0 16 8z" />
              </svg>
            </a>
          </div>
        )}
      </div>

      <div className="border-t border-ink-800 py-4 text-center text-sm text-paper/60">
        © {year} {siteConfig.legalName} ·{" "}
        <Link
          href="/polityka-prywatnosci"
          className="underline-offset-4 hover:text-gold-300 hover:underline"
        >
          Polityka prywatności
        </Link>{" "}
        ·{" "}
        <Link
          href="/polityka-cookies"
          className="underline-offset-4 hover:text-gold-300 hover:underline"
        >
          Polityka plików cookie
        </Link>
      </div>
    </footer>
  );
}
