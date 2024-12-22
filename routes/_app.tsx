import { type PageProps } from "$fresh/server.ts";
import RootLayout from "../islands/RootLayout.tsx";
import { Head } from "$fresh/src/runtime/head.ts";
import Footer from "../components/Footer.tsx";

export default function App({ Component }: PageProps) {
  return (
      <html>
      <Head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>smlynski-app</title>
          <link rel="stylesheet" href="/styles.css"/>
      </Head>
      <body>
      <RootLayout>
          <Component/>
      </RootLayout>
      <Footer />
      </body>
      </html>
  );
}
