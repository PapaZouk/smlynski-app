import { useEffect, useRef } from "preact/hooks";
import { Loader } from "https://cdn.skypack.dev/@googlemaps/js-api-loader";

declare const google: any;

type CompanyContactMapProps = {
    googleMap: {
        googleApiKey: string;
        position: {
            lat: number;
            lng: number;
        };
    }
}

export default function CompanyContactMap({ googleMap }: CompanyContactMapProps) {
    const mapRef = useRef(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: googleMap.googleApiKey,
            version: "weekly",
            authReferrerPolicy: "origin",
            language: "pl",
            region: "PL",
            channel: "",
            client: "",
            mapIds: [],
            nonce: "",
        });

        loader.load().then(() => {
            if (mapRef.current) {
                const map = new google.maps.Map(mapRef.current, {
                    center: { lat: googleMap.position.lat, lng: googleMap.position.lng },
                    zoom: 13,
                });

                new google.maps.Marker({
                    position: googleMap.position,
                    map: map,
                    title: 'Lokalizacja firmy',
                })
            }
        });
    }, [googleMap]);

    return <div className="mb-20" ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};
