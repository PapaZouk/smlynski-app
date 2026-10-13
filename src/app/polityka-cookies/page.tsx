import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/polityka-cookies",
  title: "Polityka plików cookie",
  description:
    "Polityka plików cookie strony internetowej — jakie pliki cookie wykorzystujemy, po co i jak zarządzać zgodą.",
});

/**
 * Cookie policy — kept separate from the privacy policy (better SEO, each
 * page answers one question). Documents the exact cookie inventory of this
 * site; keep in sync with ConsentProvider and Analytics when either changes.
 */
export default function CookiesPolicyPage() {
  const { legalName, contact } = siteConfig;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="text-4xl font-extrabold text-ink-900">Polityka plików cookie</h1>
      <p className="mt-2 text-ink-600">Strona: {legalName}</p>

      <div className="mt-10 space-y-8 text-ink-700">
        <Section title="1. Czym są pliki cookie">
          Pliki cookie to niewielkie pliki tekstowe zapisywane na urządzeniu użytkownika
          podczas odwiedzin strony. Pozwalają stronie zapamiętać niektóre informacje o
          użytkowniku i jego wizycie.
        </Section>

        <Section title="2. Jakie pliki cookie wykorzystujemy">
          <p>Na naszej stronie stosowane są następujące pliki cookie:</p>
          <ul className="mt-3 list-disc space-y-3 pl-6">
            <li>
              <strong className="text-ink-900">
                <code className="rounded bg-ink-200 px-1">cookie-consent</code>
              </strong>{" "}
              — nasz własny plik cookie. Zapisuje Twój wybór z banera cookie (akceptacja
              lub odrzucenie), abyśmy nie pytali Cię o to przy każdej wizycie. Czas
              przechowywania: <strong>1 rok</strong> przy akceptacji,{" "}
              <strong>180 dni</strong> przy odrzuceniu. Niezbędny do funkcjonowania
              mechanizmu zgody.
            </li>
            <li>
              <strong className="text-ink-900">
                <code className="rounded bg-ink-200 px-1">_ga</code>,{" "}
                <code className="rounded bg-ink-200 px-1">_ga_*</code>
              </strong>{" "}
              — pliki cookie Google Analytics 4. Służą do anonimowej statystyki
              odwiedzin (liczba wizyt, odwiedzane podstrony, czas na stronie).
              Zapisywane są <strong>wyłącznie po wyrażeniu zgody</strong> w banerze
              cookie. Czas przechowywania: <strong>13 miesięcy</strong>.
            </li>
          </ul>
          <p className="mt-3">
            Narzędzia Vercel Analytics i Vercel Speed Insights, z których korzystamy do
            pomiaru wydajności strony, działają w trybie bez ciasteczek (cookieless) —
            nie zapisują plików cookie na Twoim urządzeniu i nie wymagają zgody.
          </p>
        </Section>

        <Section title="3. Zarządzanie zgodą">
          <p>Przy pierwszej wizycie wyświetla się baner z pytaniem o zgodę. Możesz:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong className="text-ink-900">zaakceptować</strong> — wtedy włączamy
              pełne statystyki Google Analytics (pliki cookie{" "}
              <code className="rounded bg-ink-200 px-1">_ga</code>,{" "}
              <code className="rounded bg-ink-200 px-1">_ga_*</code>), lub
            </li>
            <li>
              <strong className="text-ink-900">odrzucić</strong> — wtedy Google
              Analytics nie zapisuje plików cookie, a my nie mierzymy ruchu w ten
              sposób.
            </li>
          </ul>
          <p className="mt-3">
            Swobodę decyzji zapewnia Google Consent Mode v2: skrypt Analytics jest
            ładowany z domyślnym stanem „odmowa” dla wszystkich kategorii danych.
            Dopiero Twoja akceptacja zmienia stan na „zgoda” dla statystyki
            (analytics_storage). Do czasu akceptacji wysyłane są wyłącznie anonimowe,
            nieidentyfikujące pings bez zapisu na urządzeniu.
          </p>
          <p className="mt-3">
            Zgodę możesz wycofać w dowolnym momencie, kasując pliki cookie tej strony w
            ustawieniach przeglądarki — baner cookie wyświetli się ponownie przy
            kolejnej wizycie.
          </p>
        </Section>

        <Section title="4. Pliki cookie podmiotów trzecich">
          <p>
            Poza opisanymi plikami cookie strona może ładować zasoby podmiotów trzecich
            (Google Maps na stronie kontaktowej). Dostawca tych zasobów może stosować
            własne pliki cookie zgodnie z własną polityką prywatności. Mapa Google nie
            jest ładowana przed Twoją interakcją ze stroną kontaktową.
          </p>
        </Section>

        <Section title="5. Konfiguracja przeglądarki">
          <p>
            Możesz także usunąć lub zablokować pliki cookie bezpośrednio w ustawieniach
            swojej przeglądarki (Chrome, Firefox, Safari, Edge). Szczegółowe instrukcje
            znajdziesz w dokumentacji swojej przeglądarki. Blokada wszystkich plików
            cookie może wpłynąć na niektóre funkcje strony.
          </p>
        </Section>

        <Section title="6. Kontakt">
          Wszelkie pytania dotyczące plików cookie można kierować na adres e-mail:{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-gold-600 underline underline-offset-4"
          >
            {contact.email}
          </a>
          .
        </Section>

        <p className="text-sm text-ink-600">
          Więcej informacji o ochronie danych osobowych znajduje się w{" "}
          <a
            href="/polityka-prywatnosci"
            className="text-gold-600 underline underline-offset-4"
          >
            polityce prywatności
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-ink-900">{title}</h2>
      <div className="mt-2 leading-relaxed">{children}</div>
    </section>
  );
}
