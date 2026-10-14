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
 * Wpisy poniżej pochodzą z smlynski-api (eksport `projects.json`).
 */

export const projects: Project[] = [
  {
    slug: "wykonczenie-wnetrza-mieszkania",
    title: "Wykończenie wnętrza mieszkania",
    summary:
      "Stylowe wnętrze z podłogą w jodełkę, eleganckimi sztukateriami i jasnym wykończeniem dla nowoczesnej estetyki.",
    location: "Trójmiasto",
    completedAt: "2024-06-11",
    details: [
      "Nowoczesna aranżacja wnętrza: przedstawiamy efekt starannie zrealizowanego projektu wnętrza, który łączy elegancję z funkcjonalnością.",
      "Podłoga: luksusowe panele ułożone w klasyczną jodełkę, dodające wnętrzu ponadczasowego charakteru.",
      "Ściany: subtelne sztukaterie i jasne kolory, które powiększają optycznie przestrzeń.",
      "Listwy sufitowe: eleganckie detale wykończeniowe nadające wnętrzu ekskluzywny wygląd.",
      "Oświetlenie: duże okno wpuszczające naturalne światło, podkreślające wyjątkową strukturę materiałów.",
      "Przestrzeń: funkcjonalny układ pomieszczeń zapewniający komfort i estetykę na najwyższym poziomie.",
      "Efekt końcowy: harmonia jasnych barw, starannie dobranych detali i wysokiej jakości materiałów tworzy wnętrze pełne stylu i klasy.",
    ],
    images: [
      "/images/projects/wykonczenie-wnetrza-mieszkania/1.jpg",
      "/images/projects/wykonczenie-wnetrza-mieszkania/2.jpg",
    ],
  },
  {
    slug: "realizacja-projektu-lazienki",
    title: "Realizacja projektu łazienki",
    summary:
      "Nowoczesna łazienka w eleganckim stylu – połączenie drewna i kamienia, podświetlane lustro, funkcjonalna umywalka i minimalistyczne rozwiązania. Komfort i estetyka w jednym!",
    location: "Trójmiasto",
    completedAt: "2024-01-23",
    details: [
      "Opis projektu łazienki: przedstawiamy efekt kompleksowego remontu łazienki, który łączy nowoczesny design z funkcjonalnością.",
      "Ściany: płytki o strukturze kamienia, nadające wnętrzu naturalny charakter.",
      "Wykończenie: panele drewniane w jodełkę nad umywalką, ocieplające przestrzeń.",
      "Lustro: okrągłe, podświetlane, zapewniające optymalne oświetlenie.",
      "Umywalka: nablatowa, osadzona na drewnianym blacie.",
      "Szafka: biała, minimalistyczna z pojemnymi szufladami.",
      "Armatura: ścienne baterie ukryte dla estetyki i łatwego czyszczenia.",
      "Prysznic: przestronna kabina prysznicowa ze szkłem, dodająca lekkości.",
      "Efekt końcowy: połączenie kamienia, drewna i nowoczesnych detali stworzyło elegancką, funkcjonalną przestrzeń, idealną do codziennego relaksu.",
    ],
    images: ["/images/projects/realizacja-projektu-lazienki/1.jpg"],
  },
  {
    slug: "eleganckie-schody-w-perfekcyjnym-wydaniu",
    title: "Eleganckie schody w perfekcyjnym wydaniu",
    summary:
      "Nowoczesne schody z drewnem i czarnymi detalami, elegancka forma, lekka konstrukcja i stylowe oświetlenie.",
    location: "Trójmiasto",
    completedAt: "2024-01-20",
    details: [
      "Nowoczesne schody w eleganckim stylu: prezentujemy wyjątkową realizację schodów, które łączą naturalne drewno z nowoczesnym, minimalistycznym designem. Solidna konstrukcja i starannie dobrane materiały sprawiają, że są nie tylko funkcjonalne, ale także estetyczne.",
      "Materiał: lite drewno o ciepłej barwie, zabezpieczone olejowaniem dla podkreślenia naturalnej struktury.",
      "Detal: czarna, stalowa konstrukcja malowana proszkowo, nadająca industrialnego charakteru.",
      "Balustrada: pionowe lamele drewniane, zapewniające lekkość i stabilność.",
      "Oświetlenie: kinkiety LED podkreślające strukturę drewna i tworzące nastrojowe światło.",
      "Funkcjonalność: ergonomiczny układ stopni gwarantujący komfort użytkowania.",
      "Efekt końcowy: nowoczesne schody, które harmonijnie łączą styl i funkcjonalność, idealnie komponując się z wnętrzem.",
    ],
    images: [
      "/images/projects/eleganckie-schody-w-perfekcyjnym-wydaniu/1.jpg",
      "/images/projects/eleganckie-schody-w-perfekcyjnym-wydaniu/2.jpg",
    ],
  },
  {
    slug: "taras-ogrodowy",
    title: "Taras ogrodowy",
    summary:
      "Elegancki taras z jasnych płytek ceramicznych, harmonijnie dopasowany do stylu domu i ogrodu.",
    location: "Trójmiasto",
    completedAt: "2020-05-13",
    details: [
      "Stylowy taras – elegancja i funkcjonalność: prezentujemy wyjątkowy taras, który łączy nowoczesny design z trwałymi i estetycznymi materiałami. Jego jasna, ceramiczna powierzchnia doskonale komponuje się z drewnianą stolarką okienną oraz elewacją budynku, tworząc spójną i harmonijną przestrzeń do wypoczynku.",
      "Materiał: duże, jasne płytki ceramiczne odporne na warunki atmosferyczne.",
      "Wykończenie: stylowe, kontrastowe listwy na krawędziach dla estetycznego efektu.",
      "Schody: solidne stopnie z precyzyjnym wykończeniem.",
      "Oświetlenie: subtelne kinkiety podkreślające elegancki charakter tarasu.",
      "Efekt końcowy: nowoczesny taras, który podkreśla styl domu i stanowi idealne miejsce do relaksu w otoczeniu natury.",
    ],
    images: [
      "/images/projects/taras-ogrodowy/1.jpg",
      "/images/projects/taras-ogrodowy/2.jpg",
    ],
  },
];
