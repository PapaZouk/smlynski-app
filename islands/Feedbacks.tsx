import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import FeedbackTile from "../components/FeedbackTile.tsx";
import { Feedback } from "../components/utils/api-client/types/Feedback.ts";

type FeedbacksProps = {
  initialFeedbacks: Feedback[];
};

export default function Feedbacks({ initialFeedbacks }: FeedbacksProps) {
  const feedbacks: Signal = useSignal(initialFeedbacks);
  const currentIndex: Signal<number> = useSignal(0);

  useEffect(() => {
    if (feedbacks.value.result.length > 3) {
      const interval = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % feedbacks.value.result.length;
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [feedbacks.value.result.length]);

  const displayedFeedbacks = feedbacks.value.result.length > 3
      ? [
        ...feedbacks.value.result.slice(currentIndex.value, currentIndex.value + 3),
        ...feedbacks.value.result.slice(0, Math.max(0, 3 - (feedbacks.value.result.length - currentIndex.value)))
      ]
      : feedbacks.value.result;

  return (
      <div
          className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8 relative"
          style={{marginBottom: "200px"}}
      >
        <h1 className="text-4xl font-bold mb-10 text-center text-white">
          Opinie naszych klientów
        </h1>
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-8 justify-center transition-transform duration-500 ease-in-out">
            <ul className="flex flex-col md:flex-row gap-8">
              {displayedFeedbacks.map((feedback: Feedback) => (
                  <FeedbackTile key={feedback._id} feedback={feedback}/>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}