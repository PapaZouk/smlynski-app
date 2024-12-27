import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import Popup from "../popups/Popup.tsx";

type CompanyContactFormProps = {
  formData: {
    name: string;
    email: string;
    phone: string;
    preferredContactMethod: string;
    detailsSquareMeters: number;
    detailsBuildingType: string;
    detailsBuildingAge: string;
    detailsBuildingFloor: number;
    detailsRooms: number;
    detailsLift: boolean;
    detailsPreferredStartDate: string;
    detailsMediaElectricity: boolean;
    detailsMediaWater: boolean;
    message: string;
  };
  emailSent: boolean;
  popupOpened: boolean;
  handleChange: (
    e: createElement.JSX.TargetedEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
      Event
    >,
  ) => void;
  handleSubmit: (
    e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => void;
  handlePopup: () => void;
};

export default function CompanyContactForm(
  { formData, emailSent, popupOpened, handleChange, handleSubmit, handlePopup }:
    CompanyContactFormProps,
) {
  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        Skontaktuj się z nami
      </h1>
      <h2 className="text-lg mt-4 mb-8 text-center text-gray-800">
        Podaj nam swoje dane kontaktowe oraz informacje o projekcie, nad którym
        chcesz, abyśmy pracowali, a my skontaktujemy się z Tobą w celu omówienia
        szczegółów.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Dane kontaktowe</h2>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-700"
            >
              Twoje imię i nazwisko
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-lg bg-gray-50"
              pattern="[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]{2,}"
              minLength={2}
              maxLength={50}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Twój Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-lg bg-gray-50"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-base font-medium text-gray-700"
            >
              Twój numer telefonu
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="\+?[0-9\s\-]{9,15}"
              placeholder="np. +48 123 456 789"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-lg bg-gray-50"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="preferredContactMethod"
              className="block text-base font-medium text-gray-700"
            >
              Preferowana forma kontaktu
            </label>
            <select
              id="preferredContactMethod"
              name="preferredContactMethod"
              value={formData.preferredContactMethod}
              onChange={handleChange}
              className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-lg bg-gray-50"
            >
              <option value="email">Email</option>
              <option value="phone">Telefon</option>
              <option value="none">Brak</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-base font-medium text-gray-700"
            >
              Wiadomość
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              pattern="[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s\.\,\!\?\-\(\)]{10,}"
              minLength={10}
              maxLength={1000}
              placeholder={"Opisz nam swój projekt..."}
              className="mt-2 p-2 block w-full min-h-[100px] sm:min-h-[200px] md:min-h-[300px]
              lg:min-h-[320px] rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-lg bg-gray-50"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Informacje dodatkowe</h2>
          <div className="mb-6">
            <label
              htmlFor="detailsSquareMeters"
              className="block text-base font-medium text-gray-700"
            >
              Powierzchnia do remontu (m2)
            </label>
            <input
              type="number"
              id="detailsSquareMeters"
              name="detailsSquareMeters"
              pattern={"[0-9]{1,}"}
              className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-lg bg-gray-50"
              value={formData.detailsSquareMeters}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="detailsBuildingType"
              className="block text-base font-medium text-gray-700"
            >
              Rodzaj budynku
            </label>
            <input
              type="text"
              id="detailsBuildingType"
              name="detailsBuildingType"
              pattern={"[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\\s\\-\\,]{2,}"}
              minLength={2}
              maxLength={70}
              placeholder={"np. dom jednorodzinny, blok mieszkalny"}
              className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
               focus:ring-indigo-500 sm:text-lg bg-gray-50"
              value={formData.detailsBuildingType}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="detailsBuildingAge"
              className="block text-base font-medium text-gray-700"
            >
              Wiek budynku
            </label>
            <input
              type="text"
              id="detailsBuildingAge"
              name="detailsBuildingAge"
              pattern={"[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\\s\\-\\,]{1,}"}
              minLength={1}
              maxLength={70}
              placeholder={"np. 10 lat lub rok budowy"}
              className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-lg bg-gray-50"
              value={formData.detailsBuildingAge}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="detailsBuildingFloor"
              className="block text-base font-medium text-gray-700"
            >
              Piętro budynku
            </label>
            <input
              type="number"
              id="detailsBuildingFloor"
              name="detailsBuildingFloor"
              pattern={"[0-9]{1,}"}
              className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-lg bg-gray-50"
              value={formData.detailsBuildingFloor}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="detailsRooms"
              className="block text-base font-medium text-gray-700"
            >
              Ilość pokoi
            </label>
            <input
              type="number"
              id="detailsRooms"
              name="detailsRooms"
              pattern={"[0-9]{1,}"}
              className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-lg bg-gray-50"
              value={formData.detailsRooms}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="detailsLift"
              className="block text-base font-medium text-gray-700"
            >
              Czy w budynku jest winda?
            </label>
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                id="detailsLift"
                name="detailsLift"
                checked={formData.detailsLift}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500
                focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Tak</span>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-4">Dostępność mediów</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="detailsMediaElectricity"
                  name="detailsMediaElectricity"
                  checked={formData.detailsMediaElectricity}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500
                  focus:ring-indigo-500"
                />
                <label
                  htmlFor="detailsMediaElectricity"
                  className="ml-2 text-base font-medium text-gray-700"
                >
                  Prąd
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="detailsMediaWater"
                  name="detailsMediaWater"
                  checked={formData.detailsMediaWater}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500
                  focus:ring-indigo-500"
                />
                <label
                  htmlFor="detailsMediaWater"
                  className="ml-2 text-base font-medium text-gray-700"
                >
                  Woda
                </label>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="detailsPreferredStartDate"
              className="block text-base font-medium text-gray-700"
            >
              Preferowana data rozpoczęcia prac
            </label>
            <input
              type="date"
              id="detailsPreferredStartDate"
              name="detailsPreferredStartDate"
              value={formData.detailsPreferredStartDate}
              onChange={handleChange}
              className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-lg bg-gray-50"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 mt-10 px-6 rounded-lg bg-indigo-600 text-white font-medium text-lg shadow-md
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Wyślij
      </button>
      {emailSent && !popupOpened && (
        <div className="mt-6 text-green-600 text-center">
          <Popup onClose={handlePopup}>
            <p>
              Wiadomość wysłana! Proszę czekać na odpowiedź.
            </p>
          </Popup>
        </div>
      )}
    </form>
  );
}
