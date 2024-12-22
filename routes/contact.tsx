import { CompanyContactAddress } from "../components/contact/CompanyContactAddress.tsx";
import CompanyContact from "../islands/CompanyContact.tsx";
import CompanyContactMap from "../islands/CompanyContactMap.tsx";

export default function ContactPage() {
  const initialCompanyAddress = {
    contactStreet: Deno.env.get("COMPANY_ADDRESS_STREET") || "",
    contactZip: Deno.env.get("COMPANY_ADDRESS_POSTAL_CODE") || "",
    contactCity: Deno.env.get("COMPANY_ADDRESS_CITY") || "",
    contactPhone: Deno.env.get("COMPANY_PHONE_NUMBER") || "",
    contactEmail: Deno.env.get("COMPANY_EMAIL") || "",
  };

  const emailClientConfig = {
    publicKey: Deno.env.get("EMAILJS_PUBLIC_KEY") || "",
    serviceID: Deno.env.get("EMAILJS_SERVICE_ID") || "",
    templateID: Deno.env.get("EMAILJS_TEMPLATE_ID") || "",
  };

  const mapProps = {
    googleApiKey: Deno.env.get("GOOGLE_MAPS_API_KEY") || "",
    position: {
      lat: parseFloat(Deno.env.get("COMPANY_LAT") || "0"),
      lng: parseFloat(Deno.env.get("COMPANY_LNG") || "0"),
    },
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-12" style={{ marginBottom: "150px" }}>
      <CompanyContactAddress companyAddress={initialCompanyAddress} />
      <CompanyContact emailClientConfig={emailClientConfig} />
      <CompanyContactMap googleMap={mapProps} />
    </div>
  );
}