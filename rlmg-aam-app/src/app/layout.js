import { Nunito_Sans } from "next/font/google";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { getGlobalSettings, getPageById, getNavigationSettings } from "@/lib/webData";
import { DataProvider } from "./dataProvider";
import "./globals.css";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito'
});

export default async function RootLayout({ children }) {
  const globalSettings = await getGlobalSettings();
  const navigation = await getNavigationSettings();
  const homePage = globalSettings.homePage.key;
  const pageData = await getPageById(homePage);

  // console.log('homePage', homePage);
  // console.log('pageData', pageData);

  const data = {
    globalSettings,
    navigation,
    homePage: pageData
  };

  return (
    <html lang="en" data-theme="light">
      <body className={`${nunitoSans.className} antialiased`}>
        <ApolloWrapper>
          <DataProvider data={data}>
            {children}
          </DataProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}