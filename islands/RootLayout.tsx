import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import MainNavigation from "./MainNavigation.tsx";
import { useConsent } from "./ConsentProvider.tsx";
import CookiePopup from "./CookiePopup.tsx";

type RootLayoutProps = {
    children: h.JSX.Element;
    gaTrackId: string;
    companyInfo: {
        companyName: string;
        companyEmail: string;
    }
}

export default function RootLayout({ children, gaTrackId, companyInfo }: RootLayoutProps) {
    const consent = useConsent();

    useEffect(() => {
        if (consent.value) {
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
        }
    }, [consent.value, gaTrackId]);

    return (
        <div>
            <header>
                <MainNavigation />
            </header>
            <main>
                {children}
            </main>
            {!consent.value && (
                <CookiePopup companyInfo={companyInfo} />
            )}
        </div>
    )
}