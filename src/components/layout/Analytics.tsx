"use client";

import Script from "next/script";
import { useConsent } from "./ConsentProvider";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics, loaded only after the user consents.
 *
 * If NEXT_PUBLIC_GA_ID is not configured the component renders nothing.
 * See docs/adr/0009-consent-analytics.md.
 */
export function Analytics() {
  const { consent } = useConsent();

  if (!GA_MEASUREMENT_ID || consent !== "accepted") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
