import React from "react";
import { notFound } from 'next/navigation';
import { formatPageData } from "@/lib/webData";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContentBlocks } from "@/components/layout/ContentBlocks";

export async function generateMetadata() {
    let data;
    try {
        data = await formatPageData();
    } catch (error) {
        console.error('Error fetching page data:', error);
        data = { metaData: {} }; // Fallback data
    }
    return data.metaData;
}

export default async function Home() {
    const data = await formatPageData();
    // console.log('data:', data);
    if(data.error) {
        if(data.code === '404' && data.layoutParams) {
            // handle it a little more gracefully
            const args = {
                pageLayoutParams: data.layoutParams,
                headerText: "404: Page Not Found",
                mainText: `<p>Welcome to area code 404. This is no man’s land.</p><p>Let’s get you back to civilization: use the navigation at the top of the page, or click the button below to go home.</p>`,
                buttonText: "Home",
                buttonURL: "/"
            }
            return (
                <ErrorPage {...args} />
            );
        } else {
            notFound();
        }
    }

    return (
        <PageLayout {...data.layoutParams}>
            <ContentBlocks data={data} />
        </PageLayout>
    )
}