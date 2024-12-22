import emailjs from "npm:@emailjs/browser";

type EmailClientProps = {
  request: {
    from: string;
    email: string;
    phone: string;
    message: string;
  };
  clientConfig: {
    publicKey: string;
    serviceID: string;
    templateID: string;
  };
};

async function EmailClient({ request, clientConfig }: EmailClientProps) {
  try {
    const serviceID = clientConfig.serviceID;
    const templateID = clientConfig.templateID;

    const options = {
      publicKey: clientConfig.publicKey,
    };

    const { from, email, phone, message } = request;

    emailjs.init({
      publicKey: options.publicKey,
      limitRate: {
        throttle: 10000,
        id: serviceID,
      },
    });

    const templateParams = {
      from_name: from,
      email: email,
      phone: phone,
      message: message,
    };

    return await emailjs.send(
        serviceID,
        templateID,
        templateParams,
    );
  } catch (error) {
    console.error("EmailClient error:", error);
  }
}

export { EmailClient };
