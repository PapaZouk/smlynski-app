import { useEffect, useState } from "preact/hooks";
import MainNavigation from "../MainNavigation.tsx";
import CookiePopup from "../CookiePopup.tsx";
import { useConsent } from "../../components/context/ConsentProvider.tsx";

type PageContentProps = {
  children: preact.ComponentChildren;
  gaTrackId: string;
  companyInfo: {
    companyName: string;
    companyEmail: string;
  };
};

export default function PageContent(
  { children, gaTrackId, companyInfo }: PageContentProps,
) {
  const [showCookiePopup, setShowCookiePopup] = useState<boolean>(false);
  const { hasConsent, hasRejected } = useConsent();

  useEffect(() => {
    if (hasConsent()) {
      const script = globalThis.document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaTrackId}`;
      globalThis.document.head.appendChild(script);

      const inlineScript = globalThis.document.createElement("script");
      inlineScript.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackId}');
            `;
      globalThis.document.head.appendChild(inlineScript);
      setShowCookiePopup(false);
    } else if (hasRejected) {
      setShowCookiePopup(false);
    } else {
      setShowCookiePopup(true);
    }
  }, [gaTrackId]);

  return (
    <>
      <header>
        <MainNavigation />
      </header>
      <main>
        {children}
      </main>
      {showCookiePopup && !hasRejected && <CookiePopup companyInfo={companyInfo} />}
    </>
  );
}
