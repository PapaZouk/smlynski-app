type CompanyContactAddressProps = {
  companyAddress: {
    contactStreet: string;
    contactZip: string;
    contactCity: string;
    contactPhone: string;
    contactEmail: string;
  };
};

export function CompanyContactAddress({ companyAddress }: CompanyContactAddressProps) {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Company Address</h1>
      <address className="not-italic text-lg text-gray-700">
        <p className="mb-4">
          <span className="font-medium">Street:</span> {companyAddress.contactStreet}
        </p>
        <p className="mb-4">
          <span className="font-medium">ZIP Code:</span> {companyAddress.contactZip}
        </p>
        <p className="mb-4">
          <span className="font-medium">City:</span> {companyAddress.contactCity}
        </p>
        <p className="mb-4">
          <span className="font-medium">Phone:</span> {companyAddress.contactPhone}
        </p>
        <p className="mb-4">
          <span className="font-medium">Email:</span> {companyAddress.contactEmail}
        </p>
      </address>
    </div>
  );
}