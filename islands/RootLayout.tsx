import {h} from "preact";
import {ConsentProvider,} from "../components/context/ConsentProvider.tsx";
import PageContent from "./main/PageContent.tsx";

type RootLayoutProps = {
  children: h.JSX.Element;
  gaTrackId: string;
  companyInfo: {
    companyName: string;
    companyEmail: string;
  };
};

export default function RootLayout(
  { children, gaTrackId, companyInfo }: RootLayoutProps,
) {
  return (
    <ConsentProvider>
      <PageContent gaTrackId={gaTrackId} companyInfo={companyInfo}>
        {children}
      </PageContent>
    </ConsentProvider>
  );
}
