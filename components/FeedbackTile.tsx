import { Feedback } from "./utils/api-client/types/Feedback.ts";
import { FaBuilding } from "https://esm.sh/react-icons/fa";

type FeedbackProp = {
    feedback: Feedback;
}

export default function FeedbackTile({ feedback }: FeedbackProp) {
    return (
        <li className="bg-blue-100 shadow-md rounded-lg p-4 mb-4 border-l-4 border-blue-500 w-64">
            <p className="text-blue-800 mb-1 text-sm">{feedback.message}</p>
            <p className="font-bold text-blue-900 text-lg">
                {feedback.name} {feedback.surname ? feedback.surname : ""}
            </p>
            {feedback.company && (
                <p className="text-blue-600 text-xs flex items-center">
                    <FaBuilding size={50} color="blue" />
                    {feedback.company}
                </p>
            )}
        </li>
    );
}