import React from "react";
import { notFound } from 'next/navigation';
import { ContentSection } from "./ContentSection";
import { Banner } from "@/components/ui/Banner";
import { formatImageURL } from "@/lib/webData";
import { TextWithImage } from "../content-blocks/TextWithImage";
import { FeaturedPosts } from "../content-blocks/FeaturedPosts";
import { BannerImageColumnText } from "../content-blocks/BannerImageColumnText";
import { TextOnlyHero } from "../content-blocks/TextOnlyHero";
import { ResponsiveColumns } from "../content-blocks/ResponsiveColumns";
import { Quote } from "../content-blocks/Quote";
import { ColumnText } from "../content-blocks/ColumnText";
import { ColumnImages } from "../content-blocks/ColumnImages";
import { Video } from "../content-blocks/Video";
import { ImageSlider } from "../content-blocks/ImageSlider";
import { TeamMembers } from "../ui/TeamMembers";
import { encode } from 'html-entities';
import { getPlaiceholder } from "plaiceholder";

import { getBlogPostsByBlog } from "@/lib/blogData";

import { marked } from "marked";

import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
const md = markdownIt().use(markdownItAttrs);

import { stripHtml } from "string-strip-html";
import smartquotes from "smartquotes";
import { BlogMainPage } from "./Blog";
import { BlogPostBanner } from "../ui/BlogBanner";
import { RichText } from "../content-blocks/RichText";
import { SingleImage } from "../content-blocks/SingleImage";

export default async function getBase64(imageUrl) {
    try {
        const res = await fetch(imageUrl);

        if (!res.ok) {
            throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
        }

        const buffer = await res.arrayBuffer()
        const { base64 } = await getPlaiceholder(Buffer.from(buffer))
        //console.log(`base64: ${base64}`)
        return base64
    } catch (e) {
        if (e instanceof Error) console.log(e.stack)
    }
}

export const ContentBlocks = async ({ data, blogFilters }) => {
    const blocks = data.contentBlocks;
    const pageData = data.pageData;

    // pageLayoutParams: data.layoutParams, footerArgs, socialLinks
    //const { pageLayoutParams } = data;
    //const { footerArgs } = pageLayoutParams;

    // console.log('Social Links:', data.layoutParams.footerArgs.socialLinks);
    // console.log('additionalEmailAddresses:', data.globalSettings.additionalEmailAddresses); 

    const bannerVars = [
        'bannerTextPlacement',
        'bannerDisplayType',
        'socialLinks',
        'globalSettings',
        'bannerHeader',
        'bannerSubheader',
        'bannerCallToActionLink',
        'bannerCallToActionText',
        'bannerImage',
        'bannerBGVideo'
    ];

    if (pageData.pageType === 'page') {
        return (
            <>
                {
                    bannerVars.some((varName) => pageData[varName]) && (
                        <Banner
                            bannerTextPlacement={pageData.bannerTextPlacement}
                            bannerDisplayType={pageData.bannerDisplayType}
                            socialLinks={data.layoutParams.footerArgs?.socialLinks || []}
                            bannerHeader={pageData.bannerHeader}
                            bannerSubheader={pageData.bannerSubheader}
                            bannerCallToActionLink={pageData.bannerCallToActionLink}
                            bannerCallToActionText={pageData.bannerCallToActionText}
                            bannerImage={pageData?.bannerImage?.id ? formatImageURL(pageData.bannerImage) : null}
                            bannerImgAltTag={pageData?.bannerImage?.title ? encode(pageData.bannerImage.title) : ''}
                            bannerBGVideo={pageData?.bannerBGVideo?.id ? formatImageURL(pageData.bannerBGVideo) : null}
                            globalSettings={data.globalSettings}
                        />
                    )
                }

                {
                    blocks.map((block, index) => <ContentBlock key={index} block={block} />)
                }
            </>
        );

    } else if (pageData.pageType === 'blog') {
        const blogData = pageData.connectedBlog;
        const posts = await getBlogPostsByBlog(blogData.id);

        const blogButtons = blogData.blogCategories.map((category) => {
            return {
                categoryName: category.blogCategories_id.categoryName,
                buttonShortName: category.blogCategories_id.buttonShortName,
                slug: category.blogCategories_id.slug
            };
        });

        return (
            <>
                <Banner
                    bannerTextPlacement={`center`}
                    bannerHeader={blogData.blogName}
                    bannerSubheader={blogData.blogDescription}
                    blogButtons={blogButtons}
                    isBlog={true}
                />

                <BlogMainPage blogData={blogData} posts={posts} blogFilters={blogFilters} />

                {
                    blocks.map((block, index) => <ContentBlock key={index} block={block} />)
                }
            </>
        );
    } else if (pageData.pageType === 'blogPost') {
        // const bannerImage = pageData.bannerImage ? formatImageURL(pageData.bannerImage) : null;
        // const bannerBGVideo = pageData.bannerBGVideo ? formatImageURL(pageData.bannerBGVideo) : null;

        // // const myBlurDataUrl = await getBase64('http://localhost:3000/coffee.jpg')
        // let blurDataUrl;
        // if(bannerImage && bannerBGVideo) {
        //     blurDataUrl = await getBase64(bannerImage);
        // }

        return (
            <>
                <BlogPostBanner postData={pageData} />

                {
                    blocks.map((block, index) => <ContentBlock key={index} block={block} />)
                }
            </>
        );
    } else {
        notFound();
    }
};

const ContentBlock = async ({ block }) => {
    const collection = block.collection;
    const item = block.item;
    if (!collection || !item) return null;

    let text, posts, textBlocks, mainText, images, videoArgs, blurDataUrl;

    // console.log('item:', item);

    switch (collection) {
        case 'block_textOnly':
            const blockData = parseRichTextData(item);

            // const js = JSON.stringify(blockData, null, 2);
            return (
                <RichText content={blockData} placement={item.placement} padding={item.padding} />
            );

            break;
        case 'block_textWithImage':
            text = smartquotes(stripHtml(marked.parse(item.content), {
                ignoreTags: ['p', 'i', 'em', 'b', 'strong', 'ul', 'li']
            }).result);

            return <TextWithImage
                header={item.headerText}
                subheader={item.subheaderText}
                text={text}
                image={item.image.id ? formatImageURL(item.image) : null}
                width={item.image.width}
                height={item.image.height}
                alt={item.imageAltTag ? encode(item.imageAltTag) : encode(item.image.title)}
                imagePlacement={item.alignment === 'image_right' ? 'right' : 'left'}
                className={`py-4 my-6 mt-10 lg:my-16`}
            />;
            break;

        case 'block_singleImage':
            return <SingleImage
                image={item.image.id ? formatImageURL(item.image) : null}
                width={item.image.width}
                height={item.image.height}
                alt={item.imageAltTag ? encode(item.imageAltTag) : encode(item.image.title)}
            />

            break;

        case 'block_featuredPosts':

            posts = item.posts.map((item) => {
                const post = item.blogPosts_id;
                const urlSlug = `/${post.blog.urlSlug}/${post.urlSlug}`;
                return {
                    bannerImage: post.bannerImage?.id ? formatImageURL(post.bannerImage) : null,
                    postTeaser: post.postTeaser,
                    postTitle: post.postTitle,
                    postSubtitle: post.postSubtitle,
                    urlSlug: urlSlug,
                    hoverPreviewBGVideo: (post.hoverPreviewBGVideo) ? formatImageURL(post.hoverPreviewBGVideo) : null,
                };
            });

            return <FeaturedPosts
                headerText={item.headerText}
                linkToPage={item.linkToPage.urlSlug ? `/${item.linkToPage.urlSlug}` : null}
                buttonText={item.buttonText}
                posts={posts}
                template={item.template}
                standout={true}
            />;
            break;

        case 'block_bannerImageWithDetails':

            textBlocks = item.textBlocks.map((block) => {
                const text = smartquotes(stripHtml(marked.parse(block.content), {
                    ignoreTags: ['p', 'i', 'em', 'b', 'strong', 'ul', 'li']
                }).result);
                return { content: text };
            });

            return <BannerImageColumnText
                headerText={item.headerText}
                subheaderText={item.subheaderText}
                textBlocks={textBlocks}
                image={item.image.id ? formatImageURL(item.image) : null}
                imageAltTag={item?.imageAltTag ? encode(item.imageAltTag) : ''}
                buttonText={item.buttonText}
                buttonURL={item.buttonURL}
            />;
            break;

        case 'block_textOnlyHero':
            // headerText, mainText, buttonText, buttonURL, className

            const mdWithAttrs = md.render(item.mainText);

            // mainText = smartquotes(stripHtml(marked.parse(item.mainText), {
            //     ignoreTags: ['i', 'a', 'p', 'em', 'b', 'strong', 'ul', 'li']
            // }).result);

            mainText = mdWithAttrs;


            return <TextOnlyHero
                headerText={item.headerText}
                mainText={mainText}
                buttonText={item.buttonText}
                buttonURL={item.buttonURL}
                alignment={item.alignment}
                className=""
                containerHashValue={item.containerHashValue}
            />;
            break;

        case 'block_responsiveColumnText':
            textBlocks = item.textBlocks.map((block) => {
                const text = smartquotes(stripHtml(marked.parse(block.content), {
                    ignoreTags: ['p', 'h2', 'h3', 'i', 'em', 'b', 'strong', 'ul', 'li']
                }).result);
                return { content: text };
            });

            return <ResponsiveColumns
                headerText={item.headerText}
                subheaderText={item.subheaderText}
                textBlocks={textBlocks}
                buttonText={item.buttonText}
                buttonURL={item.buttonURL}
            />;
            break;

        case 'block_quoteBlock':
            return <Quote
                quoteText={item.quoteText}
                sourceAuthor={item.sourceAuthor}
                sourceOrg={item.sourceOrg}
                template={item.template}
            />;
            break;

        case 'block_columnText':
            textBlocks = item.columnText.map((block) => {
                const text = smartquotes(stripHtml(marked.parse(block.content), {
                    ignoreTags: ['p', 'i', 'em', 'b', 'strong', 'ul', 'li']
                }).result);
                return { content: text };
            });
            return <ColumnText
                headerText={item.headerText}
                columnText={textBlocks}
                columnSize={item.columnSize}
                collapseLongContentOnMobile={item.collapseLongContentOnMobile}
                standout={true}
            />;

        case 'block_ColumnImages':
            images = item.columnImages.map((image) => {
                const img = image.directus_files_id;
                return {
                    src: formatImageURL(img),
                    alt: '',
                    width: img.width,
                    height: img.height
                };
            });
            return <ColumnImages
                headerText={item.headerText}
                columnImages={images}
                columnSize={item.columnSize}
                className={item.className}
            />;

        case 'block_video':
            // videoSrc, posterImage, blurDataURL, title, captionText
            // let blurDataUrl;

            const videoURL = item.video.id ? formatImageURL(item.video) : null;
            const posterImageURL = item.posterImage.id ? formatImageURL(item.posterImage) : null;

            // if(videoURL && posterImageURL) {
            //     blurDataUrl = await getBase64(posterImageURL);
            // }

            videoArgs = {
                videoSrc: videoURL,
                posterImage: posterImageURL,
                title: item.title,
                captionText: item.captionText
            };
            return <Video {...videoArgs} />

        case 'block_imageSlider':
            let galleryDescription = smartquotes(stripHtml(marked.parse(item.galleryDescription), {
                ignoreTags: ['p', 'i', 'em', 'b', 'strong', 'ul', 'li', 'br']
            }).result);
            let sliderArgs = {
                galleryTitle: item.galleryTitle,
                galleryDescription: galleryDescription,
                images: item.images.map((image) => {
                    const img = image.imageSliderImages_id.image;
                    if (img.width && img.height && (img.filesize < 15000000)) {
                        return {
                            image: formatImageURL(img, 'gallery-images'),
                            width: img.width,
                            height: img.height,
                            filesize: img.filesize,
                            imageAltTag: image.imageSliderImages_id.imageAltTag ? 
                                encode(image.imageSliderImages_id.imageAltTag) : (image.imageSliderImages_id.imageTitle ? encode(image.imageSliderImages_id.imageTitle) : ''),
                        };
                    }
                })
            };

            // console.log('sliderArgs:', sliderArgs);

            return <ImageSlider {...sliderArgs} />

        case 'block_teamMembers':
            return <TeamMembers teamMembers={item.teamMembers} headerText={item.headerText} />

        default:
            const formattedJson = JSON.stringify(block, null, 2);
            return (
                <ContentSection>
                    <section className={`section-padded`}>
                        <h3>{block.collection}</h3>
                        <pre className="text-xs">
                            <code>
                                {formattedJson}
                            </code>
                        </pre>
                    </section>
                </ContentSection>
            );
    }
};

const parseRichTextData = (data) => {
    const blocks = data.text.blocks;
    const text = blocks.map((block) => {
        return {
            id: block.id,
            type: block.type,
            data: block.data
        };
    });

    return text;
};

const sampleData = {
    "item": {
        "__typename": "block_textOnly",
        "id": "bf48f0d2-2000-4aa4-9185-66e8974e839e",
        "text": {
            "time": 1737656152540,
            "blocks": [
                {
                    "id": "cujRuVKryY",
                    "data": {
                        "text": "Carnegie",
                        "level": 2
                    },
                    "type": "header"
                },
                {
                    "id": "EkS0xF2mO-",
                    "data": {
                        "text": "Carnegie Science Center’s 7500 sf permanent gallery, Mars: The Next Giant Leap, sends visitors on a 300-million-mile journey to discover how space exploration and the latest thinking about how to sustain life on another planet can improve our lives on Earth today. Seven highly-integrated and interactive media experiences reveal the visions, challenges, and solutions of a Martian society, highlighting what it takes to create an equitable future no matter what planet we live on."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.29.1"
        }
    }
}