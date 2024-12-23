import {PageProps} from "$fresh/server.ts";
import {getOfferById} from "../../components/utils/api-client/clientApi.tsx";
import OfferDetails from "../../islands/OfferDetails.tsx";

export default async function OfferById(props: PageProps) {
    const id = new URL(props.url).pathname.split('/').filter(Boolean)[1];
    const offer = await getOfferById(id);
    const offerData = offer.result;

    return (
        <main>
            <OfferDetails offer={offerData} />
        </main>
    );
}