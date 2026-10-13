import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/polityka-prywatnosci",
  title: "Polityka prywatności",
  description: "Polityka prywatności strony internetowej firmy.",
});

/**
 * Privacy policy — previously an expandable block inside the cookie popup,
 * now a standalone page (better SEO, easier maintenance, single source).
 */
export default function PrivacyPolicyPage() {
  const { legalName, contact } = siteConfig;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="text-4xl font-extrabold text-ink-900">Polityka prywatności</h1>
      <p className="mt-2 text-ink-600">Strona: {legalName}</p>

      <div className="mt-10 space-y-8 text-ink-700">
        <Section title="1. Informacje ogólne">
          Strona internetowa „{legalName}” (dalej: „Strona”) szanuje prywatność
          użytkowników oraz dokłada wszelkich starań, aby zapewnić bezpieczeństwo danych
          przetwarzanych podczas korzystania ze Strony. Niniejsza polityka prywatności
          określa, jakie dane są zbierane, w jaki sposób są wykorzystywane oraz jakie
          prawa przysługują użytkownikom.
        </Section>

        <Section title="2. Administrator danych osobowych">
          Administratorem danych osobowych zbieranych za pośrednictwem Strony jest{" "}
          {legalName}. W sprawach związanych z polityką prywatności można kontaktować
          się pod adresem e-mail:{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-gold-600 underline underline-offset-4"
          >
            {contact.email}
          </a>
          .
        </Section>

        <Section title="3. Zakres zbieranych danych">
          <p>Strona zbiera wyłącznie dane dotyczące ruchu użytkowników, w tym:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>adresy IP odwiedzających,</li>
            <li>
              dane dotyczące urządzenia i przeglądarki internetowej (np. rodzaj
              urządzenia, rozdzielczość ekranu, wersja przeglądarki),
            </li>
            <li>
              informacje o aktywności na stronie, takie jak odwiedzane podstrony, czas
              spędzony na stronie oraz sposób nawigacji.
            </li>
          </ul>
          <p className="mt-2">
            Dane te są zbierane w sposób anonimowy i nie pozwalają na bezpośrednią
            identyfikację użytkownika.
          </p>
        </Section>

        <Section title="4. Cel przetwarzania danych">
          <p>Zebrane dane są wykorzystywane wyłącznie w celu:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>analizy ruchu na stronie w celu jej optymalizacji,</li>
            <li>
              dostosowania treści i funkcjonalności Strony do potrzeb użytkowników,
            </li>
            <li>utrzymania prawidłowego działania Strony.</li>
          </ul>
        </Section>

        <Section title="5. Pliki cookie">
          <p>
            Strona wykorzystuje pliki cookie — niewielkie pliki tekstowe przechowywane
            na urządzeniu użytkownika. Pliki cookie służą do:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              zbierania danych statystycznych o ruchu na stronie (np. za pomocą narzędzi
              takich jak Google Analytics),
            </li>
            <li>zapewnienia poprawnego funkcjonowania Strony.</li>
          </ul>
          <p className="mt-2">
            Użytkownik może zarządzać ustawieniami plików cookie w swojej przeglądarce
            internetowej. Narzędzia analityczne (Google Analytics) są uruchamiane
            wyłącznie po wyrażeniu zgody za pomocą banera cookie.
          </p>
          <p className="mt-2">
            Pełna lista wykorzystywanych plików cookie wraz z czasem ich przechowywania
            znajduje się w{" "}
            <a
              href="/polityka-cookies"
              className="text-gold-600 underline underline-offset-4"
            >
              polityce plików cookie
            </a>
            .
          </p>
        </Section>

        <Section title="6. Podstawa prawna przetwarzania danych">
          Przetwarzanie danych odbywa się na podstawie uzasadnionego interesu
          administratora, jakim jest analiza ruchu i optymalizacja Strony, zgodnie z
          art. 6 ust. 1 lit. f) RODO.
        </Section>

        <Section title="7. Prawa użytkowników">
          <p>Każdemu użytkownikowi przysługują następujące prawa:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>prawo dostępu do danych, które zostały o nim zebrane,</li>
            <li>prawo do ograniczenia przetwarzania danych,</li>
            <li>prawo do sprzeciwu wobec przetwarzania danych,</li>
            <li>
              prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
              (PUODO), jeśli użytkownik uzna, że jego dane są przetwarzane niezgodnie z
              prawem.
            </li>
          </ul>
        </Section>

        <Section title="8. Przechowywanie danych">
          Dane o ruchu na Stronie są przechowywane przez okres niezbędny do realizacji
          celów analitycznych, optymalizacyjnych oraz utrzymania poprawnego działania
          Strony.
        </Section>

        <Section title="9. Zmiany w polityce prywatności">
          Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce
          prywatności. Wszelkie aktualizacje będą publikowane na Stronie.
        </Section>

        <Section title="10. Kontakt">
          Wszelkie pytania dotyczące polityki prywatności można kierować na adres
          e-mail:{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-gold-600 underline underline-offset-4"
          >
            {contact.email}
          </a>
          .
        </Section>
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
