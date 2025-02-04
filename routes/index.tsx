import LatestProjects from "../islands/LatestProjects.tsx";
import HeroHeader from "../islands/HeroHeader.tsx";
import Feedbacks from "../islands/Feedbacks.tsx";
import { clearCache } from "../components/utils/cache/cache.ts";

setInterval(clearCache, 1000 * 60 * 60 * 24);

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <LatestProjects />
      <Feedbacks headerContent={"Opinie naszych klientów"} />
    </div>
  );
}
