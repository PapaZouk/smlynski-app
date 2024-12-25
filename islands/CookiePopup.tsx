import {Signal, useSignal} from "@preact/signals";
import {useConsent} from "./ConsentProvider.tsx";

export default function CookiePopup() {
    const showPopup: Signal<boolean> = useSignal(true);
    const consent = useConsent();

    const handleAccept = (): void => {
        globalThis.document.cookie = "cookie-consent=true; max-age=31536000";
        consent.value = true;
    };

    const handleReject = (): void => {
        consent.value = false;
        showPopup.value = false;
    }

    return (
        <>
            {showPopup.value && (
                <div
                    class="fixed bottom-[40%] left-20 right-20 max-w-3xl mx-auto bg-gray-800 bg-opacity-80 text-center text-white p-4 rounded-lg flex flex-wrap gap-5 justify-center items-center z-50">
                    <span>
                        Na naszej stronie internetowej używamy plików cookie w celu zapewnienia jej prawidłowego działania,
                        dostosowywania treści do Twoich preferencji, analizowania ruchu oraz poprawy komfortu korzystania z
                        serwisu. Pliki cookie pozwalają nam także lepiej zrozumieć, w jaki sposób korzystasz z naszej strony,
                        dzięki czemu możemy ją stale udoskonalać. Kontynuując korzystanie z witryny, wyrażasz zgodę na
                        wykorzystanie plików cookie zgodnie z naszą polityką dotyczącą plików cookie.
                        Więcej informacji znajdziesz w naszej polityce prywatności.
                    </span>
                    <button
                        onClick={handleAccept}
                        class="bg-green-600 text-white border-none py-2 px-4 rounded cursor-pointer"
                    >
                        Zaakceptuj
                    </button>
                    <button
                        onClick={handleReject}
                        class="bg-gray-700 text-white border-none py-2 px-4 rounded cursor-pointer"
                    >
                        Odrzuć
                    </button>
                </div>
            )}
        </>
    );
}