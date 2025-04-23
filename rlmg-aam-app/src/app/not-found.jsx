//import Link from 'next/link'
import { headers } from 'next/headers';
import { formatPageData } from "@/lib/webData";
import { Error } from '@/components/ui/Error';
import { ErrorPage } from '@/components/layout/ErrorPage';

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export async function generateMetadata({ params }) {
    let data;
    try {
        data = await formatPageData();
    } catch (error) {
        console.error('Error fetching page data:', error);
        data = { metaData: {} }; // Fallback data
    }
    return data.metaData;
}

export default async function NotFound() {
    const data = await formatPageData();
    const headersList = await headers();
    const domain = headersList.get('host');

    if (data.error) {
        return (
            <div className='error-page w-full min-h-screen mx-auto pb-4 lg:pb-10 flex flex-col items-stretch justify-between'>
                <Error headerText="404: Page Not Found" mainText="The page you are looking for does not exist." buttonText="Go Home" buttonURL={`/`} />
            </div>
        )
    }

    const args = {
        pageLayoutParams: data.layoutParams,
        headerText: "404: Page Not Found",
        mainText: `<p>Welcome to area code 404. This is no man’s land.</p><p>Let’s get you back to civilization: use the navigation at the top of the page, or click the button below to go home.</p>`,
        buttonText: "Home",
        buttonURL: "/"
    }

    return (
       <ErrorPage {...args} />
    )
}