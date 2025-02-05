import { Signal, useSignal } from "@preact/signals";
import {useConsent} from "../components/context/ConsentProvider.tsx";

type CookiePopupProps = {
  companyInfo: {
    companyName: string;
    companyEmail: string;
  }
}

export default function CookiePopup({ companyInfo }: CookiePopupProps) {
  const showPopup: Signal<boolean> = useSignal(true);
  const extendedPolicy: Signal<boolean> = useSignal(false);
  const {hasConsent, setConsent} = useConsent();

  const handleAccept = (): void => {
    globalThis.document.cookie = "cookie-consent=true; max-age=31536000; Secure; SameSite=Lax;";
    setConsent(true);
  };

  const handleReject = (): void => {
    setConsent(false);
    globalThis.document.cookie = "cookie-consent=false; max-age=15552000; Secure; SameSite=Lax;";
    showPopup.value = false;
  };

  return (
    <>
      {showPopup.value && !hasConsent() && (
        <div class="fixed bottom-60 sm:bottom-50 left-5 right-5 max-w-3xl mx-auto bg-gray-800 bg-opacity-80 text-center
                     text-white p-4 sm:p-10 rounded-lg flex flex-wrap gap-5 justify-center items-center z-50
                     md:bottom-[20%] md:left-20 md:right-20">
          <span class="text-sm md:text-base">
            Na naszej stronie internetowej używamy plików cookie w celu
            zapewnienia jej prawidłowego działania, dostosowywania treści do
            Twoich preferencji, analizowania ruchu oraz poprawy komfortu
            korzystania z serwisu. Pliki cookie pozwalają nam także lepiej
            zrozumieć, w jaki sposób korzystasz z naszej strony, dzięki czemu
            możemy ją stale udoskonalać. Kontynuując korzystanie z witryny,
            wyrażasz zgodę na wykorzystanie plików cookie zgodnie z naszą
            polityką dotyczącą plików cookie. Więcej informacji znajdziesz w naszej <button
              onClick={() => extendedPolicy.value = !extendedPolicy.value} class="text-blue-200 underline hover:text-blue-300">polityce prywatności</button>.
          </span>
          {extendedPolicy.value && (
              <>
                <div class="p-6 max-w-4xl mx-auto h-64 overflow-y-auto">
                  <h1 class="text-3xl font-bold mb-4">Polityka prywatności</h1>
                  <p class="mb-4"><strong>Strona:</strong> {companyInfo.companyName}</p>

                  <h2 class="text-2xl font-semibold mb-2">1. Informacje ogólne</h2>
                  <p class="mb-4">Strona internetowa "{companyInfo.companyName}" (dalej: "Strona")
                    szanuje prywatność
                    użytkowników oraz dokłada wszelkich starań, aby zapewnić bezpieczeństwo danych przetwarzanych
                    podczas
                    korzystania ze Strony. Niniejsza polityka prywatności określa, jakie dane są zbierane, w jaki sposób
                    są
                    wykorzystywane oraz jakie prawa przysługują użytkownikom.</p>

                  <h3 class="text-2xl font-semibold mb-2">2. Administrator danych osobowych</h3>
                  <p class="mb-4">Administratorem danych osobowych zbieranych za pośrednictwem Strony jest Sebastian
                    Młyński, prowadzący
                    działalność gospodarczą pod nazwą "Sebastian Młyński - Usługi Remontowo-Budowlane". W sprawach
                    związanych z polityką prywatności można kontaktować się pod adresem e-mail: <a
                            href={`mailto:${companyInfo.companyEmail}`} class="text-blue-500">{companyInfo.companyEmail}</a>.</p>

                  <h3 class="text-2xl font-semibold mb-2">3. Zakres zbieranych danych</h3>
                  <p class="mb-4">Strona zbiera wyłącznie dane dotyczące ruchu użytkowników, w tym:</p>
                  <ul class="list-disc list-inside mb-4">
                    <li>Adresy IP odwiedzających.</li>
                    <li>Dane dotyczące urządzenia i przeglądarki internetowej (np. rodzaj urządzenia, rozdzielczość
                      ekranu,
                      wersja przeglądarki).
                    </li>
                    <li>Informacje o aktywności na stronie, takie jak odwiedzane podstrony, czas spędzony na stronie
                      oraz
                      sposób nawigacji.
                    </li>
                  </ul>
                  <p class="mb-4">Dane te są zbierane w sposób anonimowy i nie pozwalają na bezpośrednią identyfikację
                    użytkownika.</p>

                  <h3 class="text-2xl font-semibold mb-2">4. Cel przetwarzania danych</h3>
                  <p class="mb-4">Zebrane dane są wykorzystywane wyłącznie w celu:</p>
                  <ul class="list-disc list-inside mb-4">
                    <li>Analizy ruchu na stronie w celu jej optymalizacji.</li>
                    <li>Dostosowania treści i funkcjonalności Strony do potrzeb użytkowników.</li>
                    <li>Utrzymania prawidłowego działania Strony.</li>
                  </ul>

                  <h3 class="text-2xl font-semibold mb-2">5. Pliki cookie</h3>
                  <p class="mb-4">Strona wykorzystuje pliki cookie, które są niewielkimi plikami tekstowymi
                    przechowywanymi na urządzeniu
                    użytkownika.</p>
                  <p class="mb-4">Pliki cookie służą do:</p>
                  <ul class="list-disc list-inside mb-4">
                    <li>Zbierania danych statystycznych o ruchu użytkowników (np. za pomocą narzędzi takich jak Google
                      Analytics).
                    </li>
                    <li>Zapewnienia poprawnego funkcjonowania Strony.</li>
                  </ul>
                  <p class="mb-4">Użytkownik może zarządzać ustawieniami plików cookie w swojej przeglądarce
                    internetowej. Więcej
                    informacji na temat plików cookie można znaleźć na stronie <a
                        href="https://pl.wikipedia.org/wiki/HTTP_cookie" class="text-blue-500">Wikipedia</a>.
                  </p>

                  <h3 class="text-2xl font-semibold mb-2">6. Podstawa prawna przetwarzania danych</h3>
                  <p class="mb-4">Przetwarzanie danych odbywa się na podstawie uzasadnionego interesu administratora,
                    jakim jest analiza
                    ruchu i optymalizacja Strony zgodnie z art. 6 ust. 1 lit. f) RODO.</p>

                  <h3 class="text-2xl font-semibold mb-2">7. Prawa użytkowników</h3>
                  <p class="mb-4">Każdemu użytkownikowi przysługują następujące prawa:</p>
                  <ul class="list-disc list-inside mb-4">
                    <li>Prawo dostępu do danych, które zostały o nim zebrane.</li>
                    <li>Prawo do ograniczenia przetwarzania danych.</li>
                    <li>Prawo do sprzeciwu wobec przetwarzania danych.</li>
                    <li>Prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO), jeśli użytkownik
                      uzna, że jego dane są przetwarzane niezgodnie z prawem.
                    </li>
                  </ul>

                  <h3 class="text-2xl font-semibold mb-2">8. Przechowywanie danych</h3>
                  <p class="mb-4">Dane o ruchu na Stronie są przechowywane przez okres niezbędny do realizacji celów
                    analitycznych,
                    optymalizacyjnych oraz utrzymania poprawnego działania Strony.</p>

                  <h3 class="text-2xl font-semibold mb-2">9. Zmiany w polityce prywatności</h3>
                  <p class="mb-4">Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce prywatności.
                    Wszelkie aktualizacje
                    będą publikowane na Stronie.</p>

                  <h3 class="text-2xl font-semibold mb-2">10. Kontakt</h3>
                  <p class="mb-4">Wszelkie pytania dotyczące polityki prywatności można kierować na adres e-mail: <a
                      href={`mailto:${companyInfo.companyEmail}`} class="text-blue-500">{companyInfo.companyEmail}</a>.</p>
                  <p class="mb-4">Dziękujemy za zaufanie i zapraszamy do korzystania z naszej Strony!</p>
                </div>
              </>
          )}
          <button
              onClick={handleAccept}
              class="bg-green-600 text-white border-none py-2 px-4 rounded cursor-pointer text-sm md:text-base"
          >
            Zaakceptuj
          </button>
          <button
              onClick={handleReject}
              class="bg-gray-700 text-white border-none py-2 px-4 rounded cursor-pointer text-sm md:text-base"
          >
            Odrzuć
          </button>
        </div>
      )}
    </>
  );
}