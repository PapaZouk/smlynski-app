import { Feedback } from "./utils/api-client/types/Feedback.ts";
import { FaBuilding } from "https://esm.sh/react-icons/fa";

type FeedbackProp = {
    feedback: Feedback;
}

export default function FeedbackTile({ feedback }: FeedbackProp) {
    return (
        <li className="bg-blue-100 shadow-md rounded-lg p-6 mb-6 border-l-4 border-blue-500 w-80 flex flex-col justify-between">
            <p className="text-blue-800 mb-2 text-base">{feedback.message}</p>
            <div>
                <p className="font-bold text-blue-900 text-xl">
                    {feedback.name} {feedback.surname ? feedback.surname : ""}
                </p>
                {feedback.company && (
                    <p className="text-blue-600 text-sm flex items-center">
                        <FaBuilding size={50} color="blue"/>
                        {feedback.company}
                    </p>
                )}
            </div>
        </li>
    );
}