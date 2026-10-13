"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "./ConsentProvider";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    /** gtag stub — defined by the inline init script below. */
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4, wired up with Google Consent Mode v2.
 *
 * The gtag script ALWAYS loads (when GA is configured), but every consent
 * state defaults to "denied", so GA only fires cookieless pings until the
 * user accepts — then `analytics_storage` is granted and full measurement
 * begins. This is Google's recommended v2 pattern.
 *
 * If NEXT_PUBLIC_GA_ID is not configured the component renders nothing.
 * See docs/adr/0010-consent-analytics-maps.md.
 */
export function Analytics() {
  const { consent } = useConsent();

  // Reflect the user's choice to gtag whenever it changes. The stub defined
  // by the inline script queues this even if gtag.js has not executed yet.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) {
      return;
    }
    window.gtag(
      "consent",
      "update",
      consent === "accepted"
        ? { analytics_storage: "granted" }
        : { analytics_storage: "denied" },
    );
  }, [consent]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      {/* Consent Mode v2 defaults must be queued BEFORE the config call. */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
