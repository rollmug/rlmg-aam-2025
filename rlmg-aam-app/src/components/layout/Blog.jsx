import React from "react";
import { BlogPostsList } from "./BlogPostsList";
import { ContentSection } from "./ContentSection"
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";

const simplifyCategories = (categories) => {
    return categories.map((category) => {
        return {
            id: category.blogCategories_id.id,
            name: category.blogCategories_id.categoryName,
            slug: category.blogCategories_id.slug,
            buttonShortName: category.blogCategories_id.buttonShortName,
        };
    });
};

const getPostsByCategory = (posts, category) => {
    return posts.filter((post) => {
        return post.categories.some((postCategory) => {
            return postCategory.blogCategories_id.slug === category.slug;
        });
    });
};

const filterPostsByCustomData = (posts, dataLabel, contentOption) => {
    const safeDataLabel = makeUrlSafe(dataLabel);
    const safeContentOption = makeUrlSafe(contentOption);

    return posts.filter((post) => {
        return post.customData && post.customData.some((data) => {
            return makeUrlSafe(data.dataLabel) === safeDataLabel && data.dataContent.some((content) => makeUrlSafe(content.contentOption) === safeContentOption);
        });
    });
};

export const BlogMainPage = ({ blogData, posts, blogFilters }) => {
    const blogCategories = blogData.blogCategories;
    // const categories = simplifyCategories(blogCategories);
    // console.log('categories:', categories);
    // console.log('posts:', posts);

    // console.log('blogData:', blogData);
    // console.log('blogFilters:', blogFilters); // topic value

    // filterPostsByCustomData
    if (blogFilters && blogFilters?.topic && blogFilters?.value) {
        posts = filterPostsByCustomData(posts, blogFilters.topic, blogFilters.value);
        // console.log('Filtered posts:', posts);
    }

    return (
        <>
            {(blogFilters && blogFilters?.topic && blogFilters?.value) && (
                <ContentSection>
                    <div className={`section-padded`}>
                        <Link href={`/${blogData.urlSlug}`} className="inline-block">
                            <div className="badge badge-accent flex flex-row gap-2 justify-center items-center">
                                <IoMdCloseCircle />
                                <span>{blogFilters.topic}: {blogFilters.value}</span>
                            </div>
                        </Link>
                    </div>
                </ContentSection>
            )}

            {blogCategories.map((category, index) => {
                const categoryName = category.blogCategories_id.categoryName;
                const slug = category.blogCategories_id.slug;
                const categoryPosts = getPostsByCategory(posts, category.blogCategories_id);
                // console.log(`Category "${categoryName}":`, categoryPosts);

                return (
                    <BlogPostsList key={index} blogData={blogData} slug={slug} categoryName={categoryName} posts={categoryPosts} blogFilters={blogFilters} />
                );
            })}
        </>
    );
}

function makeUrlSafe(string) {
    return string
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-/ ]/g, '') // Remove special characters except slashes
        .replace(/\//g, '-') // Replace slashes with hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
}