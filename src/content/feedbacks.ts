import type { Feedback } from "@/lib/types";

/**
 * Opinie klientów.
 *
 * Jak dodać opinię: skopiuj wpis poniżej i uzupełnij pola.
 * `id` musi być unikalne (np. "opinia-1", "opinia-2", ...).
 *
 * Wpisy oznaczone komentarzem `PRZYKŁAD` to tymczasowe dane — zastąp je
 * prawdziwymi opiniami z smlynski-api.
 */

export const feedbacks: Feedback[] = [
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    id: "opinia-1",
    name: "Anna",
    surname: "Kowalska",
    message:
      "Bardzo solidna ekipa. Łazienka wykończona terminowo i z dbałością o szczegóły. Polecam!",
  },
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    id: "opinia-2",
    name: "Marek",
    surname: "Nowak",
    company: "Nowak Development",
    message:
      "Współpraca przy malowaniu całego piętra biurowca przebiegła sprawnie, czysto i bez opóźnień.",
  },
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    id: "opinia-3",
    name: "Katarzyna",
    surname: "Wiśniewska",
    message:
      "Szpachlowanie agregatem wyszło idealnie gładko. Różnica w czasie prac versus tradycyjna metoda jest ogromna.",
  },
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    id: "opinia-4",
    name: "Piotr",
    surname: "Zieliński",
    message:
      "Panele ułożone w dwa dni, wraz z listwami. Wszystko dokładnie tak, jak się umawialiśmy.",
  },
];
