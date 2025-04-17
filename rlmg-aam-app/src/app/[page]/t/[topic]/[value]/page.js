import React from "react";
import { notFound } from 'next/navigation';
import { formatPageData } from "@/lib/webData";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContentBlocks } from "@/components/layout/ContentBlocks";
import { BlogFilterProvider, BlogTopicProvider } from "@/app/blogFilterContext";

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

export default async function BlogFilter({ params }) {
    const page = (await params).page;
    const topic = (await params).topic;
    const value = (await params).value;
    const data = await formatPageData(page);

    const blogFilters = {
        topic: topic.trim().toLowerCase(),
        value: value.trim().toLowerCase()
    };

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
                <BlogTopicProvider data={blogFilters}>
                    <ContentBlocks data={data} blogFilters={blogFilters} />
                </BlogTopicProvider>
            </BlogFilterProvider>
        </PageLayout>
    )
}