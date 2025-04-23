import React from "react";
import { notFound } from 'next/navigation';
import { formatPageData } from "@/lib/webData";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContentBlocks } from "@/components/layout/ContentBlocks";

import { BlogFilterProvider } from "../blogFilterContext";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
    let data;
    const page = (await params).page
    try {
        data = await formatPageData(page);
    } catch (error) {
        console.error('Error fetching page data:', error);
        data = { metaData: {} }; // Fallback data
    }
    return data.metaData;
}

export default async function Page({ params }) {
    const page = (await params).page
    const data = await formatPageData(page);
    console.log('page:', page);
    // console.log('pageData:', data);

    if (data.error) {
        notFound();
    }

    const enabled = data.pageData.enabled;

    if (!enabled) {
        notFound();
    }

    return (
        <PageLayout {...data.layoutParams}>
            <BlogFilterProvider>
                <ContentBlocks data={data} />
            </BlogFilterProvider>
        </PageLayout>
    )
}