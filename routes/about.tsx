export default function AboutPage() {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 mb-20 sm:mb-50">
            <img
                src="/images/about-office-desk.jpeg"
                alt="Zdjęcie biurka roboczego"
                className="absolute inset-0 -z-10 w-full h-full object-cover object-right sm:scale-50 sm:translate-x-1/2 md:object-center md:scale-100 md:translate-x-0"
            />
            <div
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>
            <div
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                ></div>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 relative -top-16">
                <div className="mx-auto max-w-2xl lg:mx-0 bg-black bg-opacity-50 p-6 rounded-lg">
                    <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-7xl">
                        O nas
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
                        Działamy na rynku od 2018. Główny zakres naszej działalności to szpachlowanie (agregatem),
                        malowanie mieszkań, kompleksowy remont łazienek, układanie paneli podłogowych, listew
                        przypodłogowych, budowa ścianek działowych, sufitów zawieszanych, itp.
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
                        Teren działania firmy to Gdańsk, Gdynia, Rumia, Wejherowo. Skontaktuj się, a otrzymasz wycenę,
                        która będzie godna Twojej uwagi.
                    </p>
                    <div className="mt-8 flex flex-col items-center sm:flex-row sm:justify-start">
                        <a
                            href="/contact"
                            className="w-full sm:w-auto bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded hover:bg-blue-600 text-center"
                        >
                            Skontaktuj się z nami
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
