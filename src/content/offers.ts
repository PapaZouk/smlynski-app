import type { Offer } from "@/lib/types";

/**
 * Lista usług w ofercie.
 *
 * Jak dodać nową ofertę:
 * 1. Skopiuj wpis poniżej i uzupełnij dane.
 * 2. `slug` musi być unikalny i w formacie kebab-case — posłuży jako adres
 *    strony (/offer/{slug}).
 * 3. Grafikę włóż do `public/images/offers/{slug}.jpg` i wpisz ścieżkę.
 *    `image: null` = placeholder (docs/adr/0005-media-placeholders.md).
 *
 * Wpisy oznaczone komentarzem `PRZYKŁAD` to tymczasowe dane — zastąp je
 * prawdziwymi treściami z smlynski-api.
 */

export const offers: Offer[] = [
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    slug: "szpachlowanie-agregatem",
    title: "Szpachlowanie agregatem",
    summary: "Szybkie i równomierne szpachlowanie dużych powierzchni agregatem.",
    image: null,
    details: [
      "Szpachlowanie agregatem pozwala na szybkie przygotowanie ścian i sufitów pod malowanie — nawet na dużych powierzchniach.",
      "Usługa obejmuje przygotowanie podłoża, nałożenie masy szpachlowej oraz szlifowanie do gładkości.",
      "Technika ta skraca czas prac w porównaniu z tradycyjnym szpachlowaniem ręcznym i zapewnia równomierną powierzchnię.",
    ],
  },
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    slug: "malowanie-scian",
    title: "Malowanie ścian i sufitów",
    summary: "Malowanie mieszkań i domów — przygotowanie powierzchni w cenie.",
    image: null,
    details: [
      "Oferujemy malowanie ścian, sufitów i elementów stolarki. Prace obejmują zabezpieczenie pomieszczeń, gruntowanie oraz dwukrotne malowanie.",
      "Korzystamy z farb renomowanych producentów, dobieranych do rodzaju pomieszczenia (m.in. farby zmywalne do kuchni i łazienek).",
    ],
  },
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    slug: "remont-lazienek",
    title: "Kompleksowy remont łazienek",
    summary: "Od demontażu po wykończenie — pełna obsługa remontu łazienki.",
    image: null,
    details: [
      "Realizujemy kompleksowe remonty łazienek: demontaż, instalacje, hydroizolację, ułożenie płytek oraz montaż armatury i mebli.",
      "Zapewniamy materiałoznawstwo — pomagamy w doborze płytek, ceramiki i wyposażenia dopasowanego do budżetu.",
    ],
  },
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    slug: "ukladanie-paneli",
    title: "Układanie paneli podłogowych",
    summary: "Panelowanie mieszkań z listwami przypodłogowymi.",
    image: null,
    details: [
      "Układamy panele podłogowe na przygotowanym podłożu, wraz z folią i podkładem podłogowym.",
      "W cenie montaż listew przypodłogowych oraz docinanie paneli przy drzwiach i niszach.",
    ],
  },
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    slug: "sufity-zawieszane",
    title: "Sufity zawieszane",
    summary: "Zabudowy sufitów podwieszanych z oświetleniem LED.",
    image: null,
    details: [
      "Montaż sufitów podwieszanych z płyt GK lub z listwowych systemów zabudowy, w tym przygotowanie stelaży i instalacji oświetleniowej.",
      "Sufity podwieszane pozwalają ukryć instalacje i nierówności stropu, a także poprawić akustykę pomieszczenia.",
    ],
  },
  // PRZYKŁAD — zastąp prawdziwymi danymi.
  {
    slug: "scianki-dzialowe",
    title: "Budowa ścianek działowych",
    summary: "Zabudowy wnętrz — ścianki działowe z karton-gipsu.",
    image: null,
    details: [
      "Budujemy ścianki działowe z płyty GK na profilach stalowych, z izolacją akustyczną według potrzeb.",
      "Usługa obejmuje również przygotowanie otworów drzwiowych i okiennych oraz wykończenie powierzchni.",
    ],
  },
];
