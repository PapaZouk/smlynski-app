import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";

type CompanyContactFormProps = {
  formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  emailSent: boolean;
  handleChange: (e: createElement.JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>) => void;
  handleSubmit: (e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>) => void;
};

export default function CompanyContactForm({ formData, emailSent, handleChange, handleSubmit }: CompanyContactFormProps) {
  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg w-full max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Skontaktuj się z nami</h1>
      <div className="mb-6">
        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Twoje imię</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg bg-gray-50"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Twój Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg bg-gray-50"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Twój numer telefonu</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg bg-gray-50"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-lg font-medium text-gray-700">Wiadomość</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-2 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg bg-gray-50"
        />
      </div>
      <button type="submit" className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-medium text-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Wyślij
      </button>
      {emailSent && <div className="mt-6 text-green-600 text-center">
        <p>Wiadomość wysłana!</p>
      </div>}
    </form>
  );
}