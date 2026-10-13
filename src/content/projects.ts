import type { Project } from "@/lib/types";

/**
 * Lista realizacji (projektów).
 *
 * Jak dodać nowy projekt:
 * 1. Skopiuj jeden z wpisów poniżej i uzupełnij dane.
 * 2. `slug` musi być unikalny i w formacie kebab-case — posłuży jako adres
 *    strony (/projects/{slug}).
 * 3. Zdjęcia włóż do `public/images/projects/{slug}/` i wpisz ścieżkę
 *    np. "/images/projects/remont-lazienki-gdansk/1.jpg".
 *    Pusta tablica = placeholder (docs/adr/0005-media-placeholders.md).
 *
 * Wpisy oznaczone komentarzem `PRZYKŁAD` to tymczasowe dane — zastąp je
 * prawdziwymi treściami z smlynski-api.
 */

export const projects: Project[] = [
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    slug: "remont-lazienki-gdansk",
    title: "Kompleksowy remont łazienki",
    summary:
      "Pełen remont łazienki w bloku mieszkalnym: nowe płytki, armatura i instalacja.",
    location: "Gdańsk",
    completedAt: "2024-03-12",
    details: [
      "Zakres prac obejmował kompleksowy demontaż starego wyposażenia, przygotowanie podłoża oraz ułożenie nowych płytek ściennych i podłogowych.",
      "Została wymieniona instalacja wodno-kanalizacyjna, zamontowano nową armaturę, meble łazienkowe oraz oświetlenie LED.",
      "Realizacja została wykonana w uzgodnionym terminie, z pełnym posprzątaniem po zakończeniu prac.",
    ],
    // Istniejące zdjęcie z poprzedniej wersji strony.
    images: ["/images/projects/lazienka.jpg"],
  },
  // PRZYKŁAD — wpis bez zdjęć (wyświetli się placeholder).
  {
    slug: "malowanie-mieszkania-gdynia",
    title: "Malowanie mieszkania",
    summary: "Szpachlowanie agregatem i malowanie ścian w trzypokojowym mieszkaniu.",
    location: "Gdynia",
    completedAt: "2024-06-05",
    details: [
      "Prace obejmowały szpachlowanie agregatem, przygotowanie powierzchni oraz malowanie ścian i sufitów w całym mieszkaniu.",
      "Klient wybrał kolory z palety neutralnej — prace zostały wykonane w ciągu kilku dni roboczych.",
    ],
    images: [],
  },
  // PRZYKŁAD — wpis bez zdjęć (wyświetli się placeholder).
  {
    slug: "scianki-dzialowe-rumia",
    title: "Budowa ścianek działowych",
    summary: "Zabudowa poddasza: ścianki działowe z karton-gipsu i sufit podwieszany.",
    location: "Rumia",
    completedAt: "2024-09-20",
    details: [
      "Wykonano konstrukcji ścianek działowych z płyt GK, przygotowano stelaże pod zabudowę oraz zamontowano sufit podwieszany z oświetleniem punktowym.",
      "Wszystkie prace wykończeniowe zostały objęte gwarancją.",
    ],
    images: [],
  },
];
