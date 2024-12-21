import LatestProjects from "../islands/LatestProjects.tsx";
import HeroHeader from "../islands/HeroHeader.tsx";
import Feedbacks from "../islands/Feedbacks.tsx";
import {getAllFeedbacks, getAllProjects} from "../components/utils/api-client/clientApi.tsx";
import {clearCache} from "../components/utils/cache/cache.ts";

clearCache();

export default async function Home() {
  const initialFeedbacks = await getAllFeedbacks();
  const initialProjects = await getAllProjects();

  return (
    <div>
      <HeroHeader />
      <LatestProjects initialProjects={initialProjects} />
      <Feedbacks initialFeedbacks={initialFeedbacks} />
    </div>
  );
}
