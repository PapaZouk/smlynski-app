import About from "../islands/About.tsx";
import Feedbacks from "../islands/Feedbacks.tsx";
import {getAllFeedbacks} from "../components/utils/api-client/clientApi.tsx";

export default async function AboutPage() {
    const cacheTimeout = Deno.env.get('CACHE_EXPIRY_VALUE');
    const initialFeedbacks = await getAllFeedbacks(cacheTimeout);

    return (
        <>
            <About />
            <Feedbacks
                initialFeedbacks={initialFeedbacks}
                headerContent={"Opinie naszych klientów"}
                subHeaderContent="Cenimy opinię naszych klientów, dlatego zawsze staramy się dostosować do ich potrzeb.
                Poniżej znajdziesz opinie naszych klientów, którzy skorzystali z naszych usług."
            />
        </>
);
}
