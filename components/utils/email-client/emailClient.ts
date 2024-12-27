import emailjs from "npm:@emailjs/browser";

type EmailClientProps = {
  request: {
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

    const {
      from,
      email,
      phone,
      preferredContactMethod,
      detailsSquareMeters,
      detailsBuildingType,
      detailsBuildingAge,
      detailsBuildingFloor,
      detailsRooms,
      detailsLift,
      detailsPreferredStartDate,
      detailsMediaElectricity,
      detailsMediaWater,
      message,
    } = request;

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
      preferredContactMethod: preferredContactMethod
        ? preferredContactMethod
        : "Brak",
      squareMeters: detailsSquareMeters,
      buildingType: detailsBuildingType,
      buildingAge: detailsBuildingAge,
      buildingFloor: detailsBuildingFloor,
      rooms: detailsRooms,
      lift: detailsLift ? "Tak" : "Nie",
      preferredStartDate: detailsPreferredStartDate !== ""
        ? detailsPreferredStartDate
        : "Nieokreślona",
      mediaElectricity: detailsMediaElectricity ? "Tak" : "Nie",
      mediaWater: detailsMediaWater ? "Tak" : "Nie",
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
