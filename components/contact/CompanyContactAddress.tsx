type CompanyContactAddressProps = {
  companyAddress: {
    contactStreet: string;
    contactZip: string;
    contactCity: string;
    contactPhone: string;
    contactEmail: string;
  };
};

export function CompanyContactAddress(
  { companyAddress }: CompanyContactAddressProps,
) {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg w-full sm:max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        Nasz adres
      </h1>
      <address className="not-italic text-sm sm:text-base text-gray-700">
        <p className="mb-4">{companyAddress.contactStreet}</p>
        <p className="mb-4">{companyAddress.contactZip}</p>
        <p className="mb-4">{companyAddress.contactCity}</p>
        <p className="mb-4">{companyAddress.contactPhone}</p>
        <p className="mb-4">{companyAddress.contactEmail}</p>
      </address>
    </div>
  );
}
