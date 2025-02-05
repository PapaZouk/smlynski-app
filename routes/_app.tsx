import { type PageProps } from "$fresh/server.ts";
import RootLayout from "../islands/RootLayout.tsx";
import { Head } from "$fresh/src/runtime/head.ts";
import Footer from "../islands/Footer.tsx";
import { ConsentProvider } from "../components/context/ConsentProvider.tsx";
import PageHead from "../components/header/PageHead.tsx";

export default function App({ Component }: PageProps) {
  const pageTitle = Deno.env.get("COMPANY_NAME") || "";
  const pageSubtitle = Deno.env.get("COMPANY_SUBTITLE") || "";
  const companyEmail = Deno.env.get("COMPANY_EMAIL") || "";
  const footerSetup = {
    facebookUrl: Deno.env.get("FACEBOOK_URL") || "",
    companyName: pageTitle,
  };
  const GA_ID = Deno.env.get("GOOGLE_ANALYTICS_TRACKING_ID") || "";

  const companyInfo = {
    companyName: pageTitle,
    companyEmail: companyEmail,
  };

  return (
    <html>
      <PageHead />
      <body>
        <ConsentProvider>
          <RootLayout gaTrackId={GA_ID} companyInfo={companyInfo}>
            <Component />
          </RootLayout>
        </ConsentProvider>

        <Footer footerSetup={footerSetup} />
      </body>
    </html>
  );
}
