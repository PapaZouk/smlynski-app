import { fromByteArray } from "npm:base64-js";
import {Project} from "./utils/api-client/types/Project.ts";

type ProjectProp = {
  project: Project;
};

export default function ProjectTile({ project }: ProjectProp) {
  let imageSrc = "";

  if (project.images) {
    imageSrc = `data:${project.images[0].contentType};base64,${fromByteArray(
      new Uint8Array(project.images[0].data.data)
    )}`;
  }

  return (
    <li className="bg-white shadow-md rounded-lg overflow-hidden mb-10 flex flex-col h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
        <div className="flex justify-between text-gray-600 text-sm mt-2">
          <span>{new Date(project.date).toLocaleDateString()}</span>
          <span>{project.localization}</span>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <p className="text-gray-700 h-24 overflow-hidden">{project.description}</p>
        <div className="mt-4">
          {imageSrc && (
            <img
              className="w-full h-48 object-cover rounded-md"
              src={imageSrc}
              alt={project.name}
            />
          )}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => globalThis.location.href = `/project/${project._id}`}
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Czytaj więcej
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}