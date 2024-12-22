import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div className="bg-[#020015FF] min-h-screen flex flex-col items-center justify-center">
        <div className="px-4 py-8 mx-auto mt-[-20%]">
          <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
            <h1 className="text-white mb-4">Nie znaleziono strony</h1>
            <p className="text-white mb-4">Nie martw się, nawet najlepszym zdarza się zgubić drogę.</p>
            <p>
              <img src="/images/not-found.png" style={{ width: "200px" }} alt="Not found" />
            </p>
            <a href="/" className="underline text-white">Wróć na stronę główną</a>
          </div>
        </div>
      </div>
    </>
  );
}