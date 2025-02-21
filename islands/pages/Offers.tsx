import { useEffect, useState } from "preact/hooks";
import { Offer } from "../../components/utils/api-client/types/Offer.ts";
import { fromByteArray } from "npm:base64-js";
import Loading from "../../components/loader/Loading.tsx";

export default function Offers() {
  const [initialOffers, setInitialOffers] = useState<Offer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const OFFERS_PER_PAGE = 6;

  const indexOfLastOffer: number = currentPage * OFFERS_PER_PAGE;
  const indexOfFirstOffer: number = indexOfLastOffer - OFFERS_PER_PAGE;
  const totalPages: number = Math.ceil(initialOffers.length / OFFERS_PER_PAGE);
  const currentOffers: Offer[] = initialOffers.slice(
    indexOfFirstOffer,
    indexOfLastOffer,
  );

  useEffect(() => {
    async function fetchOffers() {
      const response = await fetch("/api/offers/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return;
      }

      const responseBody = await response.json();
      setInitialOffers(responseBody.result);
    }

    if (!initialOffers || initialOffers.length === 0) {
      fetchOffers();
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!initialOffers || initialOffers.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 mt-8 sm:mt-16 sm:px-40 mb-64 sm:mb-42">
      <header className="mb-12 mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          Zapoznaj się z naszą ofertą
        </h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {currentOffers.map((offer: Offer, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden relative"
          >
            <img
              src={`data:${offer.image.contentType};base64,${
                fromByteArray(new Uint8Array(offer.image.data.data))
              }`}
              alt={offer.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 pb-16">
              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
              <p className="text-gray-700 mb-4">{offer.description}</p>
              <button
                onClick={() => globalThis.location.href = `/offer/${offer._id}`}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 absolute bottom-4 right-4"
              >
                Zobacz więcej
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center mb-26">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded mt-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
      </div>
      <div>
        {}
      </div>
    </div>
  );
}
