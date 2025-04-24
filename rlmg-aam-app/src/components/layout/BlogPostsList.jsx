'use client';

import React, { useContext } from "react";
import { BlogFilterContext } from "@/app/blogFilterContext";
import { AnimatePresence, motion } from "framer-motion";
import { FeaturedPosts } from "../content-blocks/FeaturedPosts";
import { ContentSection } from "./ContentSection";
import { FaCircleExclamation } from "react-icons/fa6";

const formatImageURL = (image, presetKey) => {
    return `${process.env.NEXT_PUBLIC_FILES_BASE_URL}/${image.id}/${encodeURIComponent(image.filename_download)}${presetKey ? `?key=${presetKey}` : ''}`;
};

const formatVideoURL = (video) => {
    return `${process.env.NEXT_PUBLIC_VIDEO_BASE_URL}/${video.id}/${encodeURIComponent(video.filename_download)}`;
};

export const BlogPostsList = ({ blogData, categoryName, slug, posts, blogFilters }) => {
    const { filter } = useContext(BlogFilterContext);

    const transition = { duration: 1, ease: [.25, .1, .25, 1] };
    const variants = {
        hidden: { filter: "blur(10px)", transform: "translateY(2rem)", opacity: 0 },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    };

    let allPosts = [], topicFilter;

    if (blogFilters && blogFilters?.topic && blogFilters?.value) {
        topicFilter = `${blogFilters.topic}: ${blogFilters.value}`;
    }

    if (posts.length > 0) {
        allPosts = posts.map((post) => {
            return {
                postTitle: post.postTitle,
                postSubtitle: post.postSubtitle,
                postTeaser: post.postTeaser,
                urlSlug: `/${blogData.urlSlug}/${post.urlSlug}`,
                bannerImage: (post.bannerImage) ? formatImageURL(post.bannerImage) : null, // formatImageURL(post.bannerImage),
                hoverPreviewBGVideo: (post.hoverPreviewBGVideo) ? formatVideoURL(post.hoverPreviewBGVideo) : null,
            };
        });
    }

    return (
        <>
            <AnimatePresence>
                {(filter === slug) && (
                    <motion.div initial={variants.hidden} animate={variants.visible} transition={transition} className="">
                        {posts.length === 0 ? (
                            <ContentSection>
                                <div className={`section-padded mt-12 mb-10 lg:mb-16`}>
                                    <h2 className="text-lgr md:text-xl lg:text-2xl">{categoryName}</h2>
                                    <div className="alert mt-8">
                                        <FaCircleExclamation className="w-6 h-6" />

                                        {topicFilter && (
                                            <span>No posts found for <span className="badge">{topicFilter}</span> in <span className="badge">{categoryName}</span></span>
                                        )}

                                        {!topicFilter && (
                                            <span>No posts found for in <span className="badge">{categoryName}</span></span>
                                        )}
                                    </div>
                                </div>
                            </ContentSection>
                        ) : (
                            <FeaturedPosts headerText={categoryName} posts={allPosts} className={`mt-12 mb-10 lg:mb-16`} disableAnimations={true} />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};