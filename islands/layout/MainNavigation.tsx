import { useSignal, Signal } from "@preact/signals";

export default function MainNavigation() {
  const isMenuOpen: Signal<boolean> = useSignal(false);
  const currentPath = globalThis.location ? globalThis.location.pathname : "/";

  const handleMenuToggle = (): void => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  const handleLinkClick = (): void => {
    isMenuOpen.value = false;
  };

  const getLinkClass = (path: string): string => {
    return `rounded-md px-3 py-2 text-sm font-medium ${
      currentPath === path ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href='/'>
              <img
                  className="h-10 w-auto"
                  src="/images/logo.png"
                  alt="Sebastian Młyński Usługi Remontowo-Budowlane"
              />
            </a>
          </div>
          <div className="flex items-center sm:hidden">
            <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen.value}
              onClick={handleMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${isMenuOpen.value ? 'hidden' : 'block'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen.value ? 'block' : 'hidden'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="hidden sm:flex sm:justify-center sm:w-full">
            <div className="flex space-x-4">
              <a
                href="/"
                onClick={handleLinkClick}
                className={getLinkClass("/")}
                aria-current={currentPath === "/" ? "page" : undefined}
              >
                Strona główna
              </a>
              <a
                href="/about"
                onClick={handleLinkClick}
                className={getLinkClass("/about")}
                aria-current={currentPath === "/about" ? "page" : undefined}
              >
                O nas
              </a>
              <a
                href="/projects"
                onClick={handleLinkClick}
                className={getLinkClass("/projects")}
                aria-current={currentPath === "/projects" ? "page" : undefined}
              >
                Nasze realizacje
              </a>
              <a
                href="/offer"
                onClick={handleLinkClick}
                className={getLinkClass("/offer")}
                aria-current={currentPath === "/offer" ? "page" : undefined}
              >
                Oferta
              </a>
              <a
                href="/contact"
                onClick={handleLinkClick}
                className={getLinkClass("/contact")}
                aria-current={currentPath === "/contact" ? "page" : undefined}
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`sm:hidden ${isMenuOpen.value ? 'flex' : 'hidden'}`} id="mobile-menu">
        <div className="flex flex-col space-y-2 px-2 pb-3 pt-2">
          <a
            href="/"
            className={getLinkClass("/")}
            aria-current={currentPath === "/" ? "page" : undefined}
            onClick={handleLinkClick}
          >
            Strona główna
          </a>
          <a
            href="/about"
            className={getLinkClass("/about")}
            aria-current={currentPath === "/about" ? "page" : undefined}
            onClick={handleLinkClick}
          >
            O nas
          </a>
          <a
            href="/projects"
            className={getLinkClass("/projects")}
            aria-current={currentPath === "/projects" ? "page" : undefined}
            onClick={handleLinkClick}
          >
            Nasze realizacje
          </a>
          <a
            href="/offer"
            className={getLinkClass("/offer")}
            aria-current={currentPath === "/offer" ? "page" : undefined}
            onClick={handleLinkClick}
          >
            Oferta
          </a>
          <a
            href="/contact"
            className={getLinkClass("/contact")}
            aria-current={currentPath === "/contact" ? "page" : undefined}
            onClick={handleLinkClick}
          >
            Kontakt
          </a>
        </div>
      </div>
    </nav>
  );
}