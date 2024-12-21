export default function Footer() {
    return (
        <footer class="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
            <div class="container mx-auto px-4">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <div class="mb-2 md:mb-0">
                        <img src='/images/logo.png' alt="Logo" class="h-20 w-auto" />
                    </div>

                    {/* Navigation Links */}
                    <div class="flex space-x-4 mb-2 md:mb-0">
                        <a href="/" class="hover:underline">
                            Strona główna
                        </a>
                        <a href="/about" class="hover:underline">
                            O nas
                        </a>
                        <a href="/contact" class="hover:underline">
                            Kontakt
                        </a>
                    </div>

                    <div class="flex space-x-4">
                        <a href="#" class="hover:text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                class="w-5 h-5"
                            >
                                <path d="M16 8a8 8 0 1 0-9.25 7.875v-5.563h-1.688V8h1.688V6.188c0-1.662 1.021-2.574 2.487-2.574.712 0 1.323.053 1.5.077v1.737h-.847c-.945 0-1.13.45-1.13 1.11V8h1.912l-.25 2.312h-1.662V15.875A8 8 0 0 0 16 8z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="mt-4 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Sebastian Młyński. Usługi Remontowo-Budowlane.
                </div>
            </div>
        </footer>
    );
}
