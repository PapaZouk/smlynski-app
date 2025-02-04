import { useEffect, useState } from "preact/hooks";
import FeedbackTile from "../components/FeedbackTile.tsx";
import { Feedback } from "../components/utils/api-client/types/Feedback.ts";
import Loading from "../components/loader/Loading.tsx";

type FeedbacksProps = {
  headerContent: string;
  subHeaderContent?: string;
};

export default function Feedbacks(
  { headerContent, subHeaderContent }: FeedbacksProps,
) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchFeedbacks() {
      const response = await fetch("/api/feedbacks/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch feedbacks");
        return;
      }

      const responseBody = await response.json();
      const feedbacksResult = responseBody.result;
      setFeedbacks(feedbacksResult);
    }

    if (!feedbacks || feedbacks.length === 0) {
      fetchFeedbacks();
    }
  }, []);

  useEffect(() => {
    if (feedbacks.length > 3) {
      const interval = setInterval(() => {
        setCurrentIndex((currentIndex) =>
          (currentIndex + 1) % feedbacks.length
        );
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [feedbacks.length]);

  const displayedFeedbacks = feedbacks.length > 3
    ? [
      ...feedbacks.slice(
        currentIndex,
        currentIndex + 3,
      ),
      ...feedbacks.slice(
        0,
        Math.max(0, 3 - (feedbacks.length - currentIndex)),
      ),
    ]
    : feedbacks;

  if (!feedbacks || feedbacks.length === 0) {
    return <Loading />;
  }

  return (
    <div
      className="bg-gray-800 p-8 shadow-lg mb-8 relative"
      style={{ marginBottom: "200px" }}
    >
      <h1 className="text-4xl font-bold mb-10 text-center text-white">
        {headerContent}
      </h1>
      {subHeaderContent && (
        <h2 className="text-xl mb-10 mx-4 sm:mx-8 md:mx-20 px-4 sm:px-8 md:px-16 text-center text-white">
          {subHeaderContent}
        </h2>
      )}
      <div className="relative">
        <div className="flex flex-col md:flex-row gap-8 justify-center transition-transform duration-500 ease-in-out">
          <ul className="flex flex-col md:flex-row gap-8">
            {displayedFeedbacks.map((feedback: Feedback) => (
              <FeedbackTile key={feedback._id} feedback={feedback} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
