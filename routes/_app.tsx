import { type PageProps } from "$fresh/server.ts";
import RootLayout from "../islands/RootLayout.tsx";
import { Head } from "$fresh/src/runtime/head.ts";
import Footer from "../islands/Footer.tsx";

export default function App({ Component }: PageProps) {
    const pageTitle = Deno.env.get("COMPANY_NAME") || '';
    const footerSetup = {
        facebookUrl: Deno.env.get("FACEBOOK_URL") || '',
        companyName: pageTitle,
    }

  return (
      <html>
      <Head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>{pageTitle}</title>
          <link rel="stylesheet" href="/styles.css"/>
      </Head>
      <body>
      <RootLayout>
          <Component/>
      </RootLayout>
      <Footer footerSetup={footerSetup}/>
      </body>
      </html>
  );
}
