import { Nunito_Sans } from "next/font/google";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { getGlobalSettings, getPageById, getNavigationSettings } from "@/lib/webData";
import { DataProvider } from "./dataProvider";
import "./globals.css";

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

// export const metadata = {
//   title: "RLMG 2025",
//   description: "New Website",
//   authors: [{ name: 'Dave Kobrenski' }, { name: 'RLMG', url: 'https://rlmg.com' }],
// };

// export async function generateMetadata({ params, searchParams }, parent) {
//   // read route params
//   const id = (await params).id

//   // fetch data
//   const product = await fetch(`https://.../${id}`).then((res) => res.json())

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }