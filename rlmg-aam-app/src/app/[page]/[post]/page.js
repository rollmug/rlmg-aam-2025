import React from "react";
import { notFound } from 'next/navigation';
import { formatBlogPostData } from "@/lib/blogData"; // getBlogPostByID, getPostBySlug, 
import { PageLayout } from "@/components/layout/PageLayout";
import { ContentBlocks } from "@/components/layout/ContentBlocks";

export async function generateMetadata({ params }) {
    let data;
    // const page = (await params).page;
    const post = (await params).post;

    try {
        data = await formatBlogPostData(post);
        // console.log('data:', data);
    } catch (error) {
        console.error('Error fetching page data:', error);
        data = { metaData: {} }; // Fallback data
    }
    return data.metaData;
}

export default async function BlogPost({ params }) {
    const page = (await params).page;
    const post = (await params).post;
    const data = await formatBlogPostData(post, page);
    // console.log('data:', data);

    if (data.error) {
        notFound();
    }

    const published = data.pageData.published;

    if (!published) {
        notFound();
    }

    return (
        <PageLayout {...data.layoutParams}>

            <ContentBlocks data={data} />

        </PageLayout>
    );
}