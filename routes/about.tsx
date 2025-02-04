import About from "../islands/About.tsx";
import Feedbacks from "../islands/Feedbacks.tsx";

export default function AboutPage() {
    return (
        <>
            <About />
            <Feedbacks
                headerContent={"Opinie naszych klientów"}
                subHeaderContent="Cenimy opinię naszych klientów, dlatego zawsze staramy się dostosować do ich potrzeb.
                Poniżej znajdziesz opinie naszych klientów, którzy skorzystali z naszych usług."
            />
        </>
);
}
