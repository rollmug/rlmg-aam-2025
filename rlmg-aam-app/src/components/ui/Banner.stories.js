import { Banner } from "./Banner";
import { BlogFilterProvider } from "../../app/blogFilterContext";

import testImg from '../../stories/assets/test-bg-image.jpg';
const videoLoop = 'https://rlmg-website-2025.vercel.app/videos/WebLoop_opt_241218_1280-optimized.mp4';

export default {
    title: 'UI Elements/Banner',
    component: Banner,
    tags: ['!autodocs'],
    parameters: {
        layout: 'fullscreen',
        paddings: {
            values: [
                { name: 'None', value: '0' },
            ],
            default: 'None',
        },
    },
    globals: {
        backgrounds: { value: 'light' },
    },
}

export const TextBanner = {
    args: {
        bannerTextPlacement: 'bottom',
        bannerHeader: 'Banner Header',
        bannerSubheader: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
        bannerCallToActionLink: './',
        bannerCallToActionText: 'Learn More'
    }
};

export const BannerImage = {
    args: {
        bannerTextPlacement: 'top',
        bannerHeader: 'Banner Header',
        bannerSubheader: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
        bannerCallToActionLink: './',
        bannerCallToActionText: 'Learn More',
        bannerImage: testImg,
    }
};

export const bannerBGVideo = {
    args: {
        bannerTextPlacement: 'top',
        bannerHeader: 'Banner Header',
        bannerSubheader: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
        bannerCallToActionLink: './',
        bannerCallToActionText: 'Learn More',
        bannerImage: testImg,
        bannerBGVideo: videoLoop
    }
};
export const BlogBanner = {
    args: {
        bannerTextPlacement: 'center',
        isBlog: true,
        bannerHeader: 'Banner Header',
        bannerSubheader: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
        categoryLabel: 'Project Type',
        blogButtons: [
            { categoryName: 'Featured', slug: 'featured' },
            { categoryName: 'Museum', slug: 'museum' },
            { categoryName: 'Brand Experiences', slug: 'brand-experiences' },
            { categoryName: 'Web/Mobile', slug: 'web-mobile' },
            { categoryName: 'Experiential', slug: 'experiential' },
        ]
    },
    decorators: [
        (Story) => (
            <BlogFilterProvider>
                <Story />
            </BlogFilterProvider>
        )
    ],
};