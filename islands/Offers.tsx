import { useSignal, Signal } from '@preact/signals';
import { Offer } from "../components/utils/api-client/types/Offer.ts";
import { fromByteArray } from "npm:base64-js";

type OffersProps = {
    initialOffers: Offer[];
}

export default function Offers({ initialOffers }: OffersProps) {
    const offers: Signal = useSignal<Offer[]>(initialOffers);
    const currentPage: Signal = useSignal<number>(1);
    const OFFERS_PER_PAGE = 8;

    let data: Offer[] = [];

    if (Array.isArray(offers.value.result) && offers.value.result.length !== 0) {
        data = offers.value.result;
    }

    const handlePageChange = (page: number) => {
        currentPage.value = page;
    };

    const indexOfLastOffer: number = currentPage.value * OFFERS_PER_PAGE;
    const indexOfFirstOffer: number = indexOfLastOffer - OFFERS_PER_PAGE;
    const totalPages: number = Math.ceil(data.length / OFFERS_PER_PAGE);
    const currentOffers: Offer[] = data.slice(indexOfFirstOffer, indexOfLastOffer);

    return (
        <div className="container mx-auto p-6 mb-60 sm:mb-40">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentOffers.map((offer: Offer, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                        <img
                            src={`data:${offer.image.contentType};base64,${fromByteArray(new Uint8Array(offer.image.data.data))}`}
                            alt={offer.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 pb-16">
                            <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                            <p className="text-gray-700 mb-4">{offer.description}</p>
                            <a href={offer._id} className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 absolute bottom-4 right-4">Zobacz więcej</a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center mb-26">
                {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 rounded mt-2 ${currentPage.value === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}