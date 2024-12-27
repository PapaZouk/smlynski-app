import { useState } from "preact/hooks";
import { createElement } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
import { EmailClient } from "../components/utils/email-client/emailClient.ts";
import CompanyContactForm from "../components/contact/CompanyContactForm.tsx";

type CompanyContactProps = {
  emailClientConfig: {
    publicKey: string;
    serviceID: string;
    templateID: string;
  };
};

type EmailRequest = {
  from: string;
  email: string;
  phone: string;
  preferredContactMethod?: string;
  detailsSquareMeters: number;
  detailsBuildingType: string;
  detailsBuildingAge: string;
  detailsBuildingFloor?: number;
  detailsRooms?: number;
  detailsLift: boolean;
  detailsPreferredStartDate: string;
  detailsMediaElectricity: boolean;
  detailsMediaWater: boolean;
  message: string;
};

export default function CompanyContact(
  { emailClientConfig }: CompanyContactProps,
) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredContactMethod: "Brak",
    detailsSquareMeters: 0,
    detailsBuildingType: "",
    detailsBuildingAge: "",
    detailsBuildingFloor: 0,
    detailsRooms: 0,
    detailsLift: false,
    detailsPreferredStartDate: "",
    detailsMediaElectricity: false,
    detailsMediaWater: false,
    message: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const handleChange = (
      e: createElement.JSX.TargetedEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
          Event
      >,
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  const handleSubmit = async (
    e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();

    const request: EmailRequest = {
      from: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferredContactMethod: formData.preferredContactMethod,
      detailsSquareMeters: formData.detailsSquareMeters,
      detailsBuildingType: formData.detailsBuildingType,
      detailsBuildingAge: formData.detailsBuildingAge,
      detailsBuildingFloor: formData.detailsBuildingFloor,
      detailsRooms: formData.detailsRooms,
      detailsLift: formData.detailsLift,
      detailsPreferredStartDate:
        formData.detailsPreferredStartDate.split("T")[0],
      detailsMediaElectricity: formData.detailsMediaElectricity,
      detailsMediaWater: formData.detailsMediaWater,
      message: formData.message,
    };

    if (request.from && request.message) {
      try {
        await EmailClient({ request, clientConfig: emailClientConfig });
        setEmailSent(true);
        console.log(`Email sent successfully from: ${formData.email}`);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    } else {
      console.error("Name and message are required");
    }

    setTimeout(() => {
      setEmailSent(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredContactMethod: "Brak",
        detailsSquareMeters: 0,
        detailsBuildingType: "",
        detailsBuildingAge: "",
        detailsBuildingFloor: 0,
        detailsRooms: 0,
        detailsLift: false,
        detailsPreferredStartDate: "",
        detailsMediaElectricity: false,
        detailsMediaWater: false,
        message: "",
      });
    }, 2000);
  };

  return (
    <CompanyContactForm
      formData={formData}
      emailSent={emailSent}
      popupOpened={isPopupOpened}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handlePopup={handlePopup}
    />
  );
}