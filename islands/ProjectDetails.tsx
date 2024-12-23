import { Signal, useSignal } from "@preact/signals";
import { Project } from "../components/utils/api-client/types/Project.ts";
import { fromByteArray } from "npm:base64-js";
import { ImageDocument } from "../components/utils/api-client/types/ImageDocument.ts";
import { formatText } from "../components/utils/text-formatter/formatter.ts";

type ProjectDetailsProps = {
  project: Project;
};

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const isImagePopupOpen: Signal = useSignal<boolean>(false);
  const selectedImage: Signal = useSignal<string>("");

  const handleImageClick = (image: string): void => {
    selectedImage.value = image;
    isImagePopupOpen.value = true;
  };

  const formattedDescription = formatText(project.details);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center mb-60">
      <main className="max-w-5xl w-full p-6 text-center">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            {project.name}
          </h1>
        </header>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              Szczegóły realizacji
            </h2>
            <div className="mt-4 text-gray-600 space-y-2">
              <p>
                <strong className="text-gray-900">Miejsce:</strong>{" "}
                {project.localization}
              </p>
              <p>
                <strong className="text-gray-900">Data:</strong>{" "}
                {new Date(project.date).toLocaleDateString()}
              </p>
            </div>
            {formattedDescription && (
              <div className="mt-6 p-6">
                <div dangerouslySetInnerHTML={{ __html: formattedDescription }}>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Zdjęcia z realizacji
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((image: ImageDocument) => (
                <img
                  key={image.fileName}
                  className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
                  src={`data:${image.contentType};base64,${
                    fromByteArray(new Uint8Array(image.data.data))
                  }`}
                  alt={image.fileName}
                  onClick={() =>
                    handleImageClick(
                      `data:${image.contentType};base64,${
                        fromByteArray(new Uint8Array(image.data.data))
                      }`,
                    )}
                />
              ))}
            </div>
          </div>
          <button
            className="px-4 py-2 mb-4 mt-8 bg-blue-500 text-white rounded-md hover:bg-gray-600"
            onClick={() => globalThis.history.back()}
          >
            Wróć
          </button>
        </div>

        {isImagePopupOpen.value && selectedImage.value && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
            onClick={() => (isImagePopupOpen.value = false)}
          >
            <img
              src={selectedImage.value}
              alt="Selected Project Image"
              className="max-w-3xl max-h-screen rounded-lg shadow-lg transition-transform hover:scale-105"
            />
            <button
              className="absolute top-6 right-6 text-white text-2xl"
              onClick={() => (isImagePopupOpen.value = false)}
            >
              &times;
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
