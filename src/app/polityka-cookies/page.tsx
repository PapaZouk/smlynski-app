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
 * page answers one question). Written in plain language for site visitors;
 * keep in sync with ConsentProvider, CookieBanner and Analytics when any of
 * them changes.
 */
export default function CookiesPolicyPage() {
  const { legalName, contact } = siteConfig;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="text-4xl font-extrabold text-ink-900">Polityka plików cookie</h1>
      <p className="mt-2 text-ink-600">Strona: {legalName}</p>

      <div className="mt-10 space-y-8 text-ink-700">
        <Section title="1. Czym są pliki cookie">
          Pliki cookie to małe pliki, które strona zapisuje na Twoim urządzeniu
          (komputerze, tablecie, telefonie). Dzięki nim strona „pamięta” niektóre
          informacje, na przykład Twój wybór zgody, i może działać poprawnie.
        </Section>

        <Section title="2. Jakie pliki cookie stosujemy">
          <p>Na naszej stronie używamy tylko dwóch rodzajów plików cookie:</p>
          <ul className="mt-3 list-disc space-y-3 pl-6">
            <li>
              <strong className="text-ink-900">Niezbędne</strong> — zapamiętują Twój
              wybór z banera cookie (czy zaakceptowałeś, czy odrzuciłeś dodatkowe
              pliki), żebyśmy nie pytali Cię o to przy każdej wizycie. Bez nich baner
              wyświetlałby się non stop. Zapisujemy je na <strong>1 rok</strong>, jeśli
              zaakceptujesz, lub na <strong>180 dni</strong>, jeśli odrzucisz. Te pliki
              cookie zawsze są aktywne — nie wymagają zgody, bo bez nich strona nie może
              zapamiętać Twojej decyzji.
            </li>
            <li>
              <strong className="text-ink-900">Statystyczne (Google Analytics)</strong>{" "}
              — pomagają nam dowiedzieć się, ile osób odwiedza stronę, które podstrony
              są najchętniej oglądane i jak długo trwają wizyty. Dane są zbierane
              anonimowo i służą wyłącznie do rozwoju strony. Te pliki cookie zapisujemy{" "}
              <strong>wyłącznie wtedy, gdy wyrazisz na to zgodę</strong> w banerze
              cookie. Przechowujemy je przez maximum <strong>13 miesięcy</strong>.
            </li>
          </ul>
          <p className="mt-3">
            Narzędzia, którymi mierzymy szybkość działania strony, nie zapisują na Twoim
            urządzeniu żadnych plików cookie ani danych osobowych, dlatego nie wymagają
            Twojej zgody.
          </p>
        </Section>

        <Section title="3. Twój wybór i jego zmiana">
          <p>
            Przy pierwszej wizycie wyświetla się baner z pytaniem o zgodę. Do wyboru
            masz:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong className="text-ink-900">„Akceptuję wszystkie”</strong> — zgadzasz
              się na wszystkie pliki cookie, w tym statystyczne,
            </li>
            <li>
              <strong className="text-ink-900">„Tylko niezbędne”</strong> — korzystasz
              ze strony bez plików statystycznych. Strona działa wtedy tak samo dobrze —
              tracimy jedynie wiedzę o statystykach odwiedzin.
            </li>
          </ul>
          <p className="mt-3">
            Po podjęciu decyzji baner nie wyświetla się ponownie. Zmienisz ją w dowolnym
            momencie, usuwając pliki cookie tej strony w ustawieniach przeglądarki —
            baner pojawi się wtedy przy następnej wizycie. Decyzja sama wygasa po roku
            (przy akceptacji) lub po 180 dniach (przy odrzuceniu) i wtedy również pytamy
            od nowa.
          </p>
        </Section>

        <Section title="4. Usługi zewnętrzne">
          <p>
            Na stronie kontaktowej wyświetlamy mapę dostarczaną przez Google. Po
            otwarciu tej strony Google może zapisać własne pliki cookie lub zbierać dane
            zgodnie z własną polityką prywatności. Mapa nie jest ładowana, dopóki nie
            wejdziesz na stronę kontaktową.
          </p>
        </Section>

        <Section title="5. Zarządzanie plikami cookie w przeglądarce">
          <p>
            Pliki cookie możesz także usuwać lub blokować bezpośrednio w ustawieniach
            swojej przeglądarki (Chrome, Firefox, Safari, Edge). Szczegółowe instrukcje
            znajdziesz w pomocy swojej przeglądarki. Pamiętaj, że zablokowanie
            wszystkich plików cookie — także niezbędnych — może sprawić, że część strony
            nie będzie działać poprawnie.
          </p>
        </Section>

        <Section title="6. Kontakt">
          <p>
            Masz pytania dotyczące plików cookie lub danych osobowych? Napisz do nas:{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-gold-600 underline underline-offset-4"
            >
              {contact.email}
            </a>
            .
          </p>
        </Section>

        <p className="text-sm text-ink-600">
          Więcej informacji o tym, jak dbamy o Twoje dane osobowe, znajduje się w{" "}
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
