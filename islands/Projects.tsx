import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Project } from "../components/utils/api-client/types/Project.ts";
import { fromByteArray } from "npm:base64-js";
import ProjectTile from "../components/ProjectTile.tsx";

type ProjectsProps = {
  initialProjects: Project[];
};

export default function Projects({ initialProjects }: ProjectsProps) {
  const PROJECTS_PER_PAGE = 4;
  const currentSlide: Signal = useSignal<number>(0);
  const currentPage: Signal = useSignal<number>(1);

  const slideImages = initialProjects.map((project: Project) => {
    return `data:${project.images[0].contentType};base64,${
      fromByteArray(
        new Uint8Array(project.images[0].data.data),
      )
    }`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % slideImages.length;
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, slideImages.length]);

  const handlePageChange = (page: number) => {
    currentPage.value = page;
  };

  const indexOfLastProject = currentPage.value * PROJECTS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
  const totalPages = initialProjects
    ? Math.ceil(initialProjects.length / PROJECTS_PER_PAGE)
    : 0;
  const currentProjects = initialProjects?.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  return (
    <div className="mb-52 sm:mb-40">
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 mb-20 sm:mb-50">
        {slideImages.length > 0 && (
          <div className="absolute inset-0 -z-10 w-full h-full">
            {slideImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Hero Slide"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-10000 ease-in-out ${
                  currentSlide.value === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black bg-opacity-35"></div>
          </div>
        )}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 relative -top-16">
          <div className="mx-auto max-w-2xl lg:mx-0 bg-black bg-opacity-50 p-6 rounded-lg mt-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
              Nasze Projekty
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
              Nasza firma specjalizuje się w realizacji projektów budowlanych na
              terenie całego kraju. Realizujemy budowę zarówno budynków
              mieszkalnych, jak i przemysłowych, zapewniając kompleksową obsługę
              od projektu po przekazanie kluczy. Dołącz do grona naszych
              zadowolonych klientów i zrealizuj swoje marzenia o idealnym
              budynku z naszą pomocą!
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 px-4 sm:px-40 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project: Project, index: number) => (
          <div
            key={index}
            className="transform transition-transform duration-500 hover:scale-105"
          >
            <ProjectTile project={project} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded mt-2 ${
                currentPage.value === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
      </div>
      <div className="mt-6 flex justify-center">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded mt-2 ${
                currentPage.value === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}
