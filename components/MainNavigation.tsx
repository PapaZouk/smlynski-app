import { createElement } from "preact";

export default function MainNavigation() {
  const handleHomeClick = (
    event: createElement.JSX.TargetedMouseEvent<HTMLAnchorElement>,
  ): void => {
    console.log("Home clicked", event.currentTarget.href);
  };

  const handleLinkClick = (
    event: createElement.JSX.TargetedMouseEvent<HTMLAnchorElement>,
  ) => {
    console.log("Link clicked", event.currentTarget.href);
  };

  return (
      <nav class="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-center">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                    className="block size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                    className="hidden size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
              <div className="flex shrink-0 items-center">
                <img
                    className="h-10 w-auto"
                    src="/images/logo.png"
                    alt="Sebastian Młyński Usługi Remontowo-Budowlane"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                      href="#"
                      className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      aria-current="page"
                  >
                    Strona główna
                  </a>
                  <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    O nas
                  </a>
                  <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Nasze realizacje
                  </a>
                  <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Oferta
                  </a>
                  <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Kontakt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
               aria-current="page"
            >
              Stronga główna
            </a>
            <a href="#"
               className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              O nas
            </a>
            <a href="#"
               className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Nasze realizacje
            </a>
            <a href="#"
               className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Oferta
            </a>
            <a href="#"
               className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Kontakt
            </a>
          </div>
        </div>
      </nav>
  );
}