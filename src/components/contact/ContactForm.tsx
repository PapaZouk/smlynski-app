"use client";

import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredContactMethod: "email" | "phone" | "none";
  squareMeters: string;
  buildingType: string;
  buildingAge: string;
  buildingFloor: string;
  rooms: string;
  lift: boolean;
  preferredStartDate: string;
  mediaElectricity: boolean;
  mediaWater: boolean;
  message: string;
  /** Honeypot — humans never see or fill this (see below). */
  website: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  preferredContactMethod: "none",
  squareMeters: "",
  buildingType: "",
  buildingAge: "",
  buildingFloor: "",
  rooms: "",
  lift: false,
  preferredStartDate: "",
  mediaElectricity: false,
  mediaWater: false,
  message: "",
  website: "",
};

type SubmitStatus = "idle" | "sending" | "sent" | "error";

/**
 * Spam heuristics for a serverless static site (docs/adr/0013-spam-protection.md):
 * - honeypot: the "website" field is present but positioned off-screen and
 *   hidden from assistive tech — humans never fill it, dumb bots do.
 *   NB: NOT display:none, which many bots skip when hunting for traps.
 * - time-trap: no human fills a 15-field form in under MIN_FILL_MS; bots
 *   that submit instantly are rejected.
 * Both paths fake a successful send so bots cannot learn what tripped them.
 */
const MIN_FILL_MS = 3_000;

const inputClass =
  "mt-2 block w-full rounded-md border-ink-300 bg-paper p-3 text-ink-900 shadow-sm focus:border-gold-500 focus:ring-gold-500";

/** Build template params from form state (keeps the old EmailJS template keys). */
function toTemplateParams(data: FormData) {
  return {
    from_name: data.name,
    email: data.email,
    phone: data.phone,
    preferredContactMethod:
      data.preferredContactMethod === "phone"
        ? "Telefon"
        : data.preferredContactMethod === "email"
          ? "Email"
          : "Brak",
    squareMeters: data.squareMeters || "Niepodano",
    buildingType: data.buildingType || "Niepodano",
    buildingAge: data.buildingAge || "Niepodano",
    buildingFloor: data.buildingFloor || "Niepodano",
    rooms: data.rooms || "Niepodano",
    lift: data.lift ? "Tak" : "Nie",
    preferredStartDate: data.preferredStartDate || "Nieokreślona",
    mediaElectricity: data.mediaElectricity ? "Tak" : "Nie",
    mediaWater: data.mediaWater ? "Tak" : "Nie",
    message: data.message,
  };
}

/**
 * Contact form sending via EmailJS directly from the browser — no server
 * code, which keeps the site fully static. See docs/adr/0007-contact-emailjs.md.
 *
 * Configured via NEXT_PUBLIC_EMAILJS_* env vars (public keys by design).
 */
export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  /** When the form mounted — powers the time-trap (see MIN_FILL_MS). */
  const mountedAt = useRef<number>(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;
      setFormData((previous) => ({ ...previous, [name]: checked }));
      return;
    }
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Spam heuristics: honeypot filled, or submitted impossibly fast.
    // Fake success so bots cannot probe which check caught them.
    const filledHoneypot = formData.website.trim() !== "";
    const tooFast = Date.now() - mountedAt.current < MIN_FILL_MS;
    if (filledHoneypot || tooFast) {
      setStatus("sent");
      setFormData(initialFormData);
      return;
    }

    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, toTemplateParams(formData), {
        publicKey: PUBLIC_KEY,
        limitRate: { throttle: 10000, id: SERVICE_ID },
      });
      setStatus("sent");
      setFormData(initialFormData);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-lg border border-paper-dark bg-white p-6 shadow-sm sm:p-8"
      noValidate={false}
    >
      <h2 className="text-2xl font-bold text-ink-900">Skontaktuj się z nami</h2>
      <p className="mt-2 text-ink-700">
        Podaj dane kontaktowe oraz informacje o projekcie — odezwiemy się, aby omówić
        szczegóły i przygotować wycenę.
      </p>

      <fieldset className="mt-8">
        <legend className="text-lg font-semibold text-ink-900">Dane kontaktowe</legend>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Twoje imię i nazwisko" htmlFor="name" required>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              pattern="[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]{2,}"
              className={inputClass}
            />
          </Field>
          <Field label="Twój e-mail" htmlFor="email" required>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </Field>
          <Field label="Twój numer telefonu" htmlFor="phone">
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="\+?[0-9\s\-]{9,15}"
              placeholder="np. +48 123 456 789"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>
          <Field label="Preferowana forma kontaktu" htmlFor="preferredContactMethod">
            <select
              id="preferredContactMethod"
              name="preferredContactMethod"
              value={formData.preferredContactMethod}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="email">E-mail</option>
              <option value="phone">Telefon</option>
              <option value="none">Brak</option>
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field label="Wiadomość" htmlFor="message" required>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={1000}
                placeholder="Opisz nam swój projekt..."
                rows={6}
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="text-lg font-semibold text-ink-900">
          Informacje dodatkowe
        </legend>
        <p className="mt-1 text-sm text-ink-600">
          Te pola są opcjonalne — pomogą nam przygotować dokładniejszą wycenę.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Powierzchnia do remontu (m²)" htmlFor="squareMeters">
            <input
              type="number"
              id="squareMeters"
              name="squareMeters"
              value={formData.squareMeters}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={inputClass}
            />
          </Field>
          <Field label="Rodzaj budynku" htmlFor="buildingType">
            <input
              type="text"
              id="buildingType"
              name="buildingType"
              value={formData.buildingType}
              onChange={handleChange}
              minLength={2}
              maxLength={70}
              placeholder="np. dom jednorodzinny, blok mieszkalny"
              className={inputClass}
            />
          </Field>
          <Field label="Wiek budynku" htmlFor="buildingAge">
            <input
              type="text"
              id="buildingAge"
              name="buildingAge"
              value={formData.buildingAge}
              onChange={handleChange}
              maxLength={70}
              placeholder="np. 10 lat lub rok budowy"
              className={inputClass}
            />
          </Field>
          <Field label="Piętro budynku" htmlFor="buildingFloor">
            <input
              type="number"
              id="buildingFloor"
              name="buildingFloor"
              value={formData.buildingFloor}
              onChange={handleChange}
              min="0"
              max="100"
              className={inputClass}
            />
          </Field>
          <Field label="Liczba pokoi" htmlFor="rooms">
            <input
              type="number"
              id="rooms"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              min="0"
              max="100"
              className={inputClass}
            />
          </Field>
          <Field label="Preferowana data rozpoczęcia prac" htmlFor="preferredStartDate">
            <input
              type="date"
              id="preferredStartDate"
              name="preferredStartDate"
              value={formData.preferredStartDate}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>
          <div className="flex flex-col gap-4">
            <Checkbox
              id="lift"
              name="lift"
              checked={formData.lift}
              onChange={handleChange}
              label="W budynku jest winda"
            />
            <Checkbox
              id="mediaElectricity"
              name="mediaElectricity"
              checked={formData.mediaElectricity}
              onChange={handleChange}
              label="Dostępny prąd na miejscu"
            />
            <Checkbox
              id="mediaWater"
              name="mediaWater"
              checked={formData.mediaWater}
              onChange={handleChange}
              label="Dostępna woda na miejscu"
            />
          </div>
        </div>
      </fieldset>

      {/* Honeypot — off-screen, NOT display:none (bots skip display:none
          traps). aria-hidden + tabIndex=-1 keep it out of the a11y tree and
          keyboard order. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Strona www (nie wypełniaj)</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-gold-500 px-6 py-3 text-lg font-semibold text-ink-950 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Wysyłanie..." : "Wyślij"}
      </button>

      {status === "sent" && (
        <p
          role="status"
          className="mt-4 rounded-md bg-success/10 p-3 text-center font-medium text-success"
        >
          Wiadomość wysłana! Odpowiemy tak szybko, jak to możliwe.
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="mt-4 rounded-md bg-error/10 p-3 text-center font-medium text-error"
        >
          Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz do nas
          bezpośrednio na adres e-mail podany obok.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-800">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-error">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function Checkbox({
  id,
  name,
  checked,
  onChange,
  label,
}: {
  id: string;
  name: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 text-ink-800">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 rounded border-ink-300 text-gold-500 focus:ring-gold-500"
      />
      {label}
    </label>
  );
}
