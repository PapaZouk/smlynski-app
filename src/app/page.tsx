import { Hero } from "@/components/sections/Hero";
import { LatestProjects } from "@/components/sections/LatestProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { feedbacks } from "@/content/feedbacks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LatestProjects />
      <Testimonials
        feedbacks={feedbacks}
        header="Opinie naszych klientów"
        subheader="Cenimy opinie naszych klientów — poniżej wybrane opinie osób, które skorzystały z naszych usług."
      />
    </>
  );
}
