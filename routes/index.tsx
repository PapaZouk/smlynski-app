import LatestProjects from "../islands/pages/LatestProjects.tsx";
import HeroHeader from "../islands/layout/HeroHeader.tsx";
import Feedbacks from "../islands/pages/Feedbacks.tsx";
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
