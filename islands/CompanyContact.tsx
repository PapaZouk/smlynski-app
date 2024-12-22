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

export default function CompanyContact({ emailClientConfig }: CompanyContactProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [emailSent, setEmailSent] = useState(false);

    const handleChange = (e: createElement.JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const { name, value } = target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: createElement.JSX.TargetedEvent<HTMLFormElement, Event>) => {
        e.preventDefault();

        const request = {
            from: formData.name,
            email: formData.email,
            phone: formData.phone,
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
                message: "",
            });
        }, 2000);
    };

    return (
        <CompanyContactForm
            formData={formData}
            emailSent={emailSent}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}