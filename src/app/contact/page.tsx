import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { CompanyMap } from "@/components/contact/CompanyMap";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Kontakt",
  description:
    "Skontaktuj się z firmą Sebastian Młyński — Usługi Remontowo-Budowlane. Wycena remontu i wykończenia w Trójmieście.",
});

/** Contact page: address card + EmailJS form + map. */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-extrabold text-ink-900 sm:text-5xl">Kontakt</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-700">
          Opowiedz nam o swoim projekcie — odpowiemy z wyceną i propozycją terminu.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <ContactInfo />
        </div>
        <div className="md:col-span-2">
          <ContactForm />
        </div>
      </div>

      <div className="mt-12">
        <CompanyMap />
      </div>
    </div>
  );
}
