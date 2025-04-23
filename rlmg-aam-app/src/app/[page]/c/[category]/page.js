import React from "react";
import { notFound } from 'next/navigation';
import { formatPageData } from "@/lib/webData";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContentBlocks } from "@/components/layout/ContentBlocks";
import { BlogFilterProvider, BlogTopicProvider } from "@/app/blogFilterContext";

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export async function generateMetadata({ params }) {
    let data;
    const page = (await params).page;
    const post = (await params).post;
    try {
        data = await formatPageData(page);
        // data = await formatBlogPostData(post);
    } catch (error) {
        console.error('Error fetching page data:', error);
        data = { metaData: {} }; // Fallback data
    }
    return data.metaData;
}

export default async function BlogCategory({ params }) {
    const page = (await params).page;
    const category = (await params).category;
    const data = await formatPageData(page);

    const blogFilters = {
        category: category.trim().toLowerCase(),
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