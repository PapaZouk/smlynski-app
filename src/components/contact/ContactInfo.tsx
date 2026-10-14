import { siteConfig } from "@/content/site";

/** Company address card. Purely presentational — renders statically. */
export function ContactInfo() {
  const { contact } = siteConfig;

  return (
    <div className="rounded-lg border border-paper-dark bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-ink-900">Dane firmy</h2>
      <address className="mt-4 space-y-3 not-italic text-ink-700">
        <p className="font-medium text-ink-900">{siteConfig.legalName}</p>
        <p>
          {contact.street}
          <br />
          {contact.postalCode} {contact.city}
        </p>
        <p>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="underline-offset-4 hover:text-gold-600 hover:underline"
          >
            {contact.phone}
          </a>
        </p>
        <p>
          <a
            href={`mailto:${contact.email}`}
            className="underline-offset-4 hover:text-gold-600 hover:underline"
          >
            {contact.email}
          </a>
        </p>
      </address>
      <div className="mt-6 border-t border-paper-dark pt-4 text-sm text-ink-600">
        <p className="font-semibold text-ink-800">Obsługiwany obszar</p>
        <p className="mt-1">{siteConfig.serviceArea.join(" · ")} i okolice</p>
      </div>
    </div>
  );
}
