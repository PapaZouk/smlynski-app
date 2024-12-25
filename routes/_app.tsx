import {type PageProps} from "$fresh/server.ts";
import RootLayout from "../islands/RootLayout.tsx";
import {Head} from "$fresh/src/runtime/head.ts";
import Footer from "../islands/Footer.tsx";
import {ConsentContextProvider} from "../islands/ConsentProvider.tsx";

export default function App({ Component }: PageProps) {
  const pageTitle = Deno.env.get("COMPANY_NAME") || "";
  const footerSetup = {
    facebookUrl: Deno.env.get("FACEBOOK_URL") || "",
    companyName: pageTitle,
  };
  const GA_ID = Deno.env.get("GOOGLE_ANALYTICS_TRACKING_ID") || "";

  return (
    <html>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <body>
        <ConsentContextProvider>
          <RootLayout gaTrackId={GA_ID}>
            <Component />
          </RootLayout>
        </ConsentContextProvider>

        <Footer footerSetup={footerSetup} />
      </body>
    </html>
  );
}
