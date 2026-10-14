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
 * Wpisy poniżej pochodzą z smlynski-api (eksport `offers.json`).
 */

export const offers: Offer[] = [
  {
    slug: "zabudowy-kartonowo-gipsowe",
    title: "Zabudowy kartonowo-gipsowe",
    summary:
      "Zabudowy kartonowo-gipsowe to idealne rozwiązanie do nowoczesnych i funkcjonalnych wnętrz. Oferujemy ścianki działowe, sufity podwieszane, wnęki i inne elementy dostosowane do Twoich potrzeb. Nasze zabudowy łączą trwałość, estetykę i precyzję wykonania. Zapewniamy szybki montaż oraz najwyższą jakość materiałów, tworząc przestrzeń, która spełni Twoje oczekiwania. Skontaktuj się z nami i zrealizuj swoją wizję!",
    image: "/images/offers/zabudowy-kartonowo-gipsowe.jpg",
    details: [
      "Zabudowy kartonowo-gipsowe to praktyczne i wszechstronne rozwiązanie, które pozwala na tworzenie estetycznych i funkcjonalnych przestrzeni w Twoim domu, biurze czy lokalu użytkowym.",
      "Specjalizujemy się w wykonywaniu:",
      "Ścianek działowych – Idealnych do podziału przestrzeni na nowe pomieszczenia.",
      "Sufitów podwieszanych – Estetycznych, z możliwością montażu oświetlenia punktowego.",
      "Wnęk i zabudów – Dostosowanych do Twoich potrzeb, np. na szafy czy półki.",
      "Nasza oferta łączy nowoczesne technologie, wysokiej jakości materiały oraz precyzję wykonania.",
      "Realizujemy projekty indywidualne, dopasowując zabudowy do stylu i funkcji wnętrza. Gwarantujemy szybki montaż, trwałość i estetykę. Wybierz nas, a stworzymy dla Ciebie przestrzeń, która zachwyca! Skontaktuj się już dziś i omów szczegóły swojego projektu!",
    ],
  },
  {
    slug: "remonty-lazienek",
    title: "Remonty łazienek",
    summary:
      "Specjalizujemy się w kompleksowych remontach łazienek, dostosowując każde zlecenie do indywidualnych potrzeb i oczekiwań klientów. Nasze usługi obejmują pełen zakres prac: od demontażu starych instalacji, przez modernizację systemów wodno-kanalizacyjnych i elektrycznych, po wykończenie z dbałością o najmniejsze detale.",
    image: "/images/offers/remonty-lazienek.jpg",
    details: [
      "Specjalizujemy się w kompleksowych remontach łazienek, zapewniając trwałość, estetykę i funkcjonalność na lata. Nasze usługi obejmują:",
      "Montaż płytek ceramicznych i gresowych – Precyzyjne układanie na ścianach i podłogach, z możliwością realizacji skomplikowanych wzorów.",
      "Instalacje wodno-kanalizacyjne i elektryczne – Nowoczesne rozwiązania zapewniające bezpieczeństwo i komfort użytkowania.",
      "Montaż armatury łazienkowej – Wanny, kabiny prysznicowe, umywalki i toalety zgodne z najnowszymi trendami.",
      "Wykończenie i aranżacja – Wybór mebli i dodatków, które podkreślą styl i funkcjonalność Twojej łazienki.",
      "Stosujemy nowoczesne technologie oraz wysokiej jakości materiały, zapewniając trwałość i odporność na wilgoć. Nasza oferta to połączenie estetyki, funkcjonalności i dbałości o każdy detal. Realizujemy projekty indywidualne, dopasowane do potrzeb klientów. Wybierz nas, a stworzymy łazienkę, która spełni Twoje marzenia!",
      "Skontaktuj się z nami, aby omówić szczegóły i uzyskać wycenę!",
    ],
  },
  {
    slug: "remonty-wnetrz-mieszkan-i-domow",
    title: "Remonty wnętrz mieszkań i domów",
    summary:
      "Oferujemy kompleksowe remonty wnętrz mieszkań i domów, w tym malowanie, układanie podłóg, zabudowy kartonowo-gipsowe, modernizację instalacji oraz wykończenie łazienek i kuchni. Gwarantujemy wysoką jakość materiałów, precyzję wykonania i dopasowanie do Twoich potrzeb. Tworzymy funkcjonalne i estetyczne przestrzenie, realizując projekty terminowo i w konkurencyjnych cenach",
    image: "/images/offers/remonty-wnetrz-mieszkan-i-domow.jpg",
    details: [
      "Realizujemy kompleksowe remonty wnętrz mieszkań i domów, tworząc przestrzenie łączące estetykę, funkcjonalność i trwałość. Nasza oferta obejmuje:",
      "Malowanie i tapetowanie – Staranne wykończenie ścian, szeroki wybór kolorów i wzorów.",
      "Układanie podłóg – Montaż paneli, desek, płytek czy wykładzin z precyzją i dbałością o detale.",
      "Instalacje elektryczne i hydrauliczne – Modernizacja zgodnie z obowiązującymi standardami.",
      "Zabudowy kartonowo-gipsowe – Ścianki działowe, sufity podwieszane, wnęki i inne rozwiązania.",
      "Wykończenie łazienek i kuchni – Wysokiej jakości materiały odporne na wilgoć i zabrudzenia.",
      "Stawiamy na nowoczesne technologie, trwałe materiały i precyzyjne wykonanie. Realizujemy zarówno drobne modernizacje, jak i kompleksowe projekty, dostosowując je do Twoich potrzeb. Gwarantujemy terminowość, profesjonalizm oraz atrakcyjne ceny. Skontaktuj się z nami, aby uzyskać wycenę i zrealizować remont swoich marzeń!",
    ],
  },
  {
    slug: "malowanie-mieszkan-i-domow",
    title: "Malowanie mieszkań i domów",
    summary:
      "Profesjonalne malowanie mieszkań i domów to nasza specjalność. Wykonujemy malowanie ścian, sufitów, drzwi oraz okien, używając farb wysokiej jakości. Dbamy o przygotowanie podłoża poprzez gruntowanie i naprawę powierzchni, a także oferujemy efekty dekoracyjne, takie jak struktury czy ombre. Zapewniamy trwałe i estetyczne wykończenie, dostosowane do indywidualnych potrzeb, z zachowaniem terminowości i precyzji.",
    image: "/images/offers/malowanie-mieszkan-i-domow.jpg",
    details: [
      "Realizujemy profesjonalne malowanie mieszkań i domów, tworząc estetyczne i odświeżone wnętrza. Nasza oferta obejmuje:",
      "Malowanie ścian i sufitów – Precyzyjne wykończenie w wybranym kolorze, z zastosowaniem farb wysokiej jakości.",
      "Przygotowanie podłoża – Wyrównywanie, gruntowanie oraz usuwanie starych powłok malarskich.",
      "Malowanie dekoracyjne – Efekty specjalne, takie jak ombre, struktury czy tynki dekoracyjne.",
      "Malowanie drzwi, okien i innych elementów – Z użyciem farb odpornych na ścieranie i uszkodzenia.",
      "Naprawa i renowacja powierzchni – Usuwanie pęknięć, odprysków i plam przed malowaniem.",
      "Pracujemy z wysokiej jakości materiałami, zapewniając trwałe i estetyczne wykończenie. Realizujemy zarówno drobne odświeżenia, jak i kompleksowe malowanie wnętrz, dostosowując się do indywidualnych potrzeb klientów.",
      "Postaw na naszą firmę, aby stworzyć wnętrze, które zachwyca wyglądem i trwałością. Skontaktuj się z nami, aby omówić szczegóły i uzyskać bezpłatną wycenę!",
    ],
  },
  {
    slug: "remonty-biur",
    title: "Remonty biur",
    summary:
      "Realizujemy remonty biur, oferując kompleksowe usługi, które obejmują prace wykończeniowe, zabudowy kartonowo-gipsowe, instalacje elektryczne i hydrauliczne oraz wykończenie kuchni i łazienek. Dostosowujemy przestrzeń biurową do indywidualnych potrzeb, tworząc funkcjonalne i estetyczne środowisko pracy. Gwarantujemy terminowość, profesjonalizm i wysoką jakość wykonania, minimalizując zakłócenia w codziennej pracy biura.",
    image: "/images/offers/remonty-biur.jpg",
    details: [
      "Realizujemy kompleksowe remonty biur, tworząc przestrzenie sprzyjające efektywnej pracy i komfortowi. Nasza oferta obejmuje:",
      "Prace wykończeniowe – Malowanie, tapetowanie, montaż wykładzin, paneli oraz płytek dopasowane do stylu biura.",
      "Zabudowy kartonowo-gipsowe – Ścianki działowe, sufity podwieszane, przestrzenie do przechowywania umożliwiające elastyczne aranżacje.",
      "Instalacje elektryczne i hydrauliczne – Modernizacja i montaż nowych instalacji zgodnie z wymaganiami biurowymi.",
      "Wykończenie kuchni i łazienek – Materiały odporne na wilgoć i zabrudzenia, zapewniające funkcjonalność i estetykę.",
      "Prace adaptacyjne – Zmiana układu przestrzeni biurowej, tworzenie open space lub prywatnych gabinetów.",
      "Stosujemy nowoczesne technologie i wysokiej jakości materiały, realizując projekty, które poprawiają komfort pracy i estetykę wnętrz. Dostosowujemy je do specyficznych potrzeb klientów, dbając o szybki czas realizacji i minimalizowanie zakłóceń w pracy. Wybierz naszą firmę, aby zrealizować remont biura sprzyjający efektywnej pracy.",
    ],
  },
  {
    slug: "ukladanie-paneli-podlogowych",
    title: "Układanie paneli podłogowych",
    summary:
      "Profesjonalnie układamy panele podłogowe, dopasowując je do stylu i funkcji pomieszczeń. Oferujemy szeroką gamę paneli w różnych kolorach i wzorach, zapewniając estetyczne i trwałe wykończenie podłogi. Nasze usługi obejmują precyzyjny montaż, gwarantując długotrwały efekt i satysfakcję z użytkowania.",
    image: "/images/offers/ukladanie-paneli-podlogowych.jpg",
    details: [
      "Oferujemy kompleksowe usługi układania paneli podłogowych, które nadadzą Twojemu wnętrzu estetyczny, funkcjonalny i trwały wygląd. Nasza oferta obejmuje:",
      "Wybór paneli – Szeroka gama paneli w różnych kolorach, wzorach i wykończeniach, dopasowanych do stylu wnętrza.",
      "Przygotowanie podłoża – Dbałość o odpowiednie przygotowanie powierzchni, zapewniając stabilność i trwałość podłogi.",
      "Montaż paneli – Precyzyjne układanie paneli z zachowaniem norm, co gwarantuje estetyczny i trwały efekt.",
      "Wykończenie – Zabezpieczenie krawędzi i montaż listew przypodłogowych, które dopełniają całość.",
      "Dzięki doświadczeniu i profesjonalnemu podejściu, nasze usługi zapewniają estetyczny wygląd i długotrwałą funkcjonalność. Zajmujemy się kompleksowym wykonaniem – od przygotowania podłoża po finalne wykończenie. Pracujemy z najwyższej jakości materiałami, zapewniając odporność na codzienne użytkowanie. Realizujemy projekty w mieszkaniach i domach, dostosowując je do indywidualnych potrzeb klienta. Gwarantujemy terminowość i fachowość, dbając o każdy detal.",
    ],
  },
  {
    slug: "adaptacja-poddaszy",
    title: "Adaptacja poddaszy",
    summary:
      "Zajmujemy się kompleksową adaptacją poddaszy, przekształcając nieużytkową przestrzeń w funkcjonalne i estetyczne pomieszczenia. Oferujemy pełne usługi – od oceny stanu technicznego, przez projektowanie, aż po wykończenie wnętrza. Dostosowujemy poddasze do Twoich potrzeb, tworząc przestrzeń, która idealnie pasuje do stylu i funkcji Twojego domu.",
    image: "/images/offers/adaptacja-poddaszy.jpg",
    details: [
      "Oferujemy kompleksową adaptację poddaszy, przekształcając je w funkcjonalne i estetyczne przestrzenie. Nasza oferta obejmuje:",
      "Ocena stanu technicznego – Sprawdzamy konstrukcję dachu, izolację oraz wentylację, by zapewnić bezpieczeństwo adaptacji.",
      "Projektowanie przestrzeni – Dopasowujemy układ pomieszczeń do Twoich potrzeb, tworząc komfortowe sypialnie, biura czy salony.",
      "Izolacja i ocieplenie – Stosujemy nowoczesne materiały, które zapewniają ciepło zimą i chłód latem, a także izolację akustyczną.",
      "Montaż instalacji – Wykonujemy niezbędne instalacje elektryczne, wodno-kanalizacyjne i wentylacyjne.",
      "Wykończenie wnętrz – Przeprowadzamy malowanie, układanie podłóg oraz montaż sufitów podwieszanych.",
      "Z nami przekształcisz poddasze w wygodną, estetyczną przestrzeń. Dbamy o każdy szczegół, oferując najwyższą jakość usług.",
    ],
  },
  {
    slug: "docieplanie-pomieszczen",
    title: "Docieplanie pomieszczeń",
    summary:
      "Profesjonalnie docieplamy pomieszczenia, zapewniając komfort i oszczędności energetyczne. Oferujemy kompleksowe usługi: od oceny stanu technicznego, przez zastosowanie nowoczesnych materiałów izolacyjnych, po precyzyjny montaż. Dzięki naszym rozwiązaniom zyskasz lepszą ochronę przed zimnem i hałasem, co przekłada się na niższe koszty ogrzewania oraz przyjemniejszą atmosferę w każdym pomieszczeniu.",
    image: "/images/offers/docieplanie-pomieszczen.jpg",
    details: [
      "Oferujemy kompleksowe usługi docieplania pomieszczeń, które poprawiają komfort życia, redukują hałas oraz obniżają koszty ogrzewania.",
      "Nasza oferta obejmuje:",
      "Ocena stanu technicznego – Przeprowadzamy szczegółową analizę istniejącej izolacji i stanu pomieszczenia, aby dobrać najlepsze rozwiązania.",
      "Izolacja termiczna – Zastosowanie nowoczesnych materiałów, które zapewniają optymalną ochronę przed utratą ciepła, poprawiając efektywność energetyczną.",
      "Izolacja akustyczna – Montaż materiałów redukujących hałas, co poprawia komfort akustyczny wewnątrz pomieszczenia.",
      "Montaż i wykończenie – Precyzyjne wykonanie izolacji, połączone z profesjonalnym wykończeniem, które daje estetyczny i trwały efekt.",
      "Dzięki wieloletniemu doświadczeniu oraz zastosowaniu wysokiej jakości materiałów, zapewniamy skuteczność naszych usług, a także oszczędności w dłuższej perspektywie czasowej. Dbamy o każdy szczegół, aby pomieszczenia były zarówno funkcjonalne, jak i komfortowe przez cały rok. Wybierając naszą firmę, inwestujesz w przestrzeń, która zapewni Ci ciepło i ciszę.",
    ],
  },
];
