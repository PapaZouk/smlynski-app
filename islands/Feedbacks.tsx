import { Signal, useSignal } from "@preact/signals";
import { useEffect } from 'preact/hooks';
import FeedbackTile from "../components/FeedbackTile.tsx";
import { Feedback } from "../components/utils/api-client/types/Feedback.ts";

type FeedbacksProps = {
  initialFeedbacks: Feedback[];
};

export default function Feedbacks({ initialFeedbacks }: FeedbacksProps) {
  const feedbacks: Signal = useSignal(initialFeedbacks);
  const currentIndex: Signal<number> = useSignal(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % feedbacks.value.result.length;
    }, 6000);

    return () => clearInterval(interval);
  }, [feedbacks.value.result.length]);

  return (
      <div
          className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8 relative"
          style={{marginBottom: "200px", height: "300px"}}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Opinie naszych klientów
        </h1>
        <div className="relative h-full">
          {feedbacks.value.result.map((feedback: Feedback, index: number) => (
              <ul
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentIndex.value ? "opacity-100" : "opacity-0"
                  }`}
              >
                <FeedbackTile feedback={feedback}/>
              </ul>
          ))}
        </div>
      </div>
  );
}