'use client';

import React from "react";
import PropTypes from 'prop-types';
import { Button } from "../ui/Button";
import { ContentSection } from "../layout/ContentSection";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { encode } from 'html-entities';

import HoverVideoPlayer from 'react-hover-video-player';

export const FeaturedPosts = ({ headerText, linkToPage, buttonText, template, posts, className, standout = false, disableAnimations = false }) => {

    // console.log('posts:', posts);

    return (
        <>
            <ContentSection standout={standout} template={template} className={`featured-posts w-full ${standout ? 'with-standout' : ''}`}>
                <div className={`section-padded ${className}`}>
                    <div className="flex flex-row flex-wrap justify-start gap-0">
                        {/* <h2 className={`my-0 lg:w-1/2 order-1 text-lgr md:text-xl lg:text-2xl ${template === 'dark' ? 'text-white' : ''} `}>{headerText ? headerText : 'Featured Posts'}</h2> */}
                        <div className={`order-3 lg:order-2 lg:w-1/2 text-right`}>
                            {(buttonText && linkToPage) &&
                                <Link href={linkToPage}>
                                    <Button label={buttonText} className={``} />
                                </Link>
                            }
                        </div>
                        <div className="my-5 lg:my-8 !mb-0 order-2 lg:order-3 basis-full grid lg:grid-cols-3 grid-flow-row auto-rows-max gap-x-6 gap-y-12">
                            {posts.map((post, index) => (
                                <div key={index} className="flex flex-col lg:gap-0.5">
                                    <div className={`aspect-video flex justify-center items-center mb-2 lg:mb-4 w-full max-w-full`}>
                                        <FeaturedPost post={post} disableAnimations={disableAnimations} />
                                    </div>
                                    <Link href={post.urlSlug}><h3 className={`my-0 leading-tight ${template === 'dark' ? 'text-white' : ''} `}>{post.postTitle}</h3></Link>
                                    {/* <p className={`my-0 text-sm lg:text-base ${template === 'dark' ? 'text-white' : ''}`}>{post.postTeaser}</p> */}
                                    {post.postSubtitle && (
                                        <p className={`my-0 text-sm lg:text-base text-primary`}>{post.postSubtitle}</p>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ContentSection>
        </>
    );
}

const FeaturedPost = ({ post, disableAnimations }) => {
    const transition = { duration: 1, ease: [.25, .1, .25, 1], delay: .25 };
    const variants = {
        hidden: { filter: "blur(10px)", transform: "translateY(2rem)", opacity: 0 },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    };

    if (!post.bannerImage && disableAnimations) {
        return <Link href={post.urlSlug} className="relative w-full h-full">
            <div className="flex items-center justify-center w-full h-full bg-gray-100">No Image</div>
        </Link>;
    }

    if (!post.bannerImage) {
        return <AnimatePresence>
            <motion.div initial={variants.hidden} whileInView={variants.visible} transition={transition} className="relative w-full h-full">
                <Link href={post.urlSlug} className="absolute inset-0">
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">No Image</div>
                </Link>
            </motion.div>
        </AnimatePresence>;
    }

    if (post.hoverPreviewBGVideo && disableAnimations) {
        return (
            <Link href={post.urlSlug} className="relative w-full h-full">
                <HoverVideoPlayer
                    videoSrc={post.hoverPreviewBGVideo}
                    pausedOverlay={
                        <Image src={post.bannerImage} priority fill sizes="(max-width: 1024px) 100vw, 50vw" alt={encode(post.postTitle)} className={`object-cover`} />
                    }
                    className="w-full h-full"
                />
            </Link>
        )
    }

    if (post.hoverPreviewBGVideo) {
        return (
            <AnimatePresence>
                <motion.div initial={variants.hidden} whileInView={variants.visible} transition={transition} className="relative w-full h-full">
                    <Link href={post.urlSlug} className="absolute inset-0">
                        <HoverVideoPlayer
                            videoSrc={post.hoverPreviewBGVideo}
                            pausedOverlay={
                                <Image src={post.bannerImage} priority fill sizes="(max-width: 1024px) 100vw, 50vw" alt={encode(post.postTitle)} className={`object-cover`} />
                            }
                            className="w-full h-full"
                        />
                    </Link>
                </motion.div>
            </AnimatePresence>
        );
    }

    if (disableAnimations && post.bannerImage) {
        return (
            <div className="relative w-full h-full">
                <Link href={post.urlSlug} className="absolute inset-0">
                    <Image src={post.bannerImage} priority fill sizes="(max-width: 1024px) 100vw, 50vw" alt={encode(post.postTitle)} className={`object-cover`} />
                </Link>
            </div>
        );
    }

    return (
        <AnimatePresence>
            <motion.div initial={variants.hidden} whileInView={variants.visible} transition={transition} className="relative w-full h-full">
                <Link href={post.urlSlug} className="absolute inset-0">
                    <Image src={post.bannerImage} priority fill sizes="(max-width: 1024px) 100vw, 50vw" alt={encode(post.postTitle)} className={`object-cover`} />
                </Link>
            </motion.div>
        </AnimatePresence>
    );
}

FeaturedPosts.propTypes = {
    headerText: PropTypes.string,
    linkToPage: PropTypes.string,
    buttonText: PropTypes.string,
    posts: PropTypes.array,
    className: PropTypes.string,
}

FeaturedPosts.defaultProps = {
    headerText: 'Featured Projects',
    linkToPage: '/',
    buttonText: 'See All Projects',
    posts: [
        {
            postTitle: 'Post Title',
            postSubtitle: 'Subtitle',
            postTeaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.',
            urlSlug: '/',
            bannerImage: '',
        },
        {
            postTitle: 'Post Title',
            postSubtitle: 'Subtitle',
            postTeaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.',
            urlSlug: '/',
            bannerImage: '',
        },
    ],
}