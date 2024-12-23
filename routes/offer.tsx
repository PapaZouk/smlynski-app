import {getAllOffers} from "../components/utils/api-client/clientApi.tsx";
import Offers from "../islands/Offers.tsx";

export default async function OfferPage() {
    const cacheTimeout: string|undefined = Deno.env.get("CACHE_EXPIRY_VALUE") || "3600000";
    const initialOffers = await getAllOffers(cacheTimeout);

    return (
        <div>
            <Offers initialOffers={initialOffers} />
        </div>
    )
}