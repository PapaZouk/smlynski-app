import { useEffect, useState } from "preact/hooks";
import { Offer } from "../../components/utils/api-client/types/Offer.ts";
import { fromByteArray } from "npm:base64-js";
import { formatText } from "../../components/utils/text-formatter/formatter.ts";
import Loading from "../../components/loader/Loading.tsx";

type OfferDetailsProps = {
  offerId: string;
};

export default function OfferDetails({ offerId }: OfferDetailsProps) {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [formattedOfferDetails, setFormattedOfferDetails] = useState<string>(
    "",
  );

  useEffect(() => {
    async function fetchOffer() {
      const response = await fetch(`/api/offers/details/${offerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch offer");
        return;
      }

      const responseBody = await response.json();
      const offer = responseBody.result;

      setImageSrc(
        `data:${offer.image.contentType};base64,${
          fromByteArray(new Uint8Array(offer.image.data.data))
        }`,
      );
      setFormattedOfferDetails(formatText(offer.details || ""));

      setOffer(offer);
    }

    if (!offer) {
      fetchOffer();
    }
  }, []);

  if (!offer) {
    return <Loading />;
  }

  return (
    <>
      {offer && (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center mb-60">
          <div className="relative w-full h-128 sm:h-96">
            <img
              src={imageSrc}
              alt={offer.title}
              className="w-full h-full object-cover"
            />
            <header className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
                {offer.title}
              </h1>
              <p className="mt-2 sm:mt-6 text-base px-4 sm:px-20 sm:text-xl text-white">
                {offer.description}
              </p>
            </header>
          </div>
          <main className="max-w-5xl w-full p-4 sm:p-6 text-center">
            <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
              <div className="text-left">
                {formattedOfferDetails && (
                  <div className="mt-4 sm:mt-6 p-4 sm:p-6">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formattedOfferDetails,
                      }}
                    >
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <a href="/contact" className="text-blue-500 hover:underline">
                <h2>Skontaktuj się z nami w celu umówienia spotkania</h2>
              </a>
            </div>

            <footer className="mt-8">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => globalThis.history.back()}
              >
                Wróć
              </button>
            </footer>
          </main>
        </div>
      )}
    </>
  );
}
