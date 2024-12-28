import LatestProjects from "../islands/LatestProjects.tsx";
import HeroHeader from "../islands/HeroHeader.tsx";
import Feedbacks from "../islands/Feedbacks.tsx";
import {
  getAllFeedbacks,
  getAllProjects,
} from "../components/utils/api-client/clientApi.tsx";
import { clearCache } from "../components/utils/cache/cache.ts";

clearCache();

export default async function Home() {
  const cacheTimeout: string | undefined = Deno.env.get("CACHE_EXPIRY_VALUE") ||
    "3600000";
  const companyName = Deno.env.get("COMPANY_NAME") || "Company Name";
  const companySubtitle = Deno.env.get("COMPANY_SUBTITLE") || null;

  const initialFeedbacks = await getAllFeedbacks(cacheTimeout);
  const initialProjects = await getAllProjects(cacheTimeout);

  return (
    <div>
      <HeroHeader companyName={companyName} companySubtitle={companySubtitle} />
      <LatestProjects initialProjects={initialProjects} />
      <Feedbacks initialFeedbacks={initialFeedbacks} headerContent={"Opinie naszych klientów"}/>
    </div>
  );
}
