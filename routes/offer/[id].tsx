import { PageProps } from "$fresh/server.ts";
import OfferDetails from "../../islands/pages/OfferDetails.tsx";

export default function OfferById(props: PageProps) {
  const id = new URL(props.url).pathname.split("/").filter(Boolean)[1];
  return (
    <main>
      <OfferDetails offerId={id} />
    </main>
  );
}
