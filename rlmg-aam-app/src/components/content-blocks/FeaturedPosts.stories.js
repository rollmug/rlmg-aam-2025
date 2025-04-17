import { FeaturedPosts } from "./FeaturedPosts";

export default {
    title: 'Content Blocks/Featured Posts',
    component: FeaturedPosts,
    //tags: ['!autodocs'],
    parameters: {
        layout: 'fullscreen',
        paddings: {
            values: [
                { name: 'None', value: '0' },
            ],
            default: 'None',
        },
    },
    args: {
        headerText: 'Featured Projects',
        linkToPage: '/',
        buttonText: 'See All Projects',
        disableAnimations:false,
        posts: [
            {
                postTitle: 'Post Title',
                postSubtitle: 'Subtitle',
                postTeaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.',
                urlSlug: { pathname: './', query: { path: '/story/content-blocks-featured-posts--with-background' } },
                bannerImage: 'https://rlmg-website-2025.vercel.app/storybook-imgs/Featured-1.jpg',
                hoverPreviewBGVideo: 'https://manage.rlmg.com/assets/a717514a-9d5c-4767-9732-928ad65943b3/test-SSAB_gif_250207.mp4'
            },
            {
                postTitle: 'Post Title',
                postSubtitle: 'Subtitle',
                postTeaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.',
                urlSlug: { pathname: './', query: { path: '/story/content-blocks-featured-posts--with-background' } },
                bannerImage: 'https://rlmg-website-2025.vercel.app/storybook-imgs/Featured-2.jpg',
            },
        ],
    },
    globals: {
        backgrounds: { value: 'light' },
    },
}

export const Default = {
    args: {
        standout: false
    }
}

export const WithBackground = {
    args: {
        standout: true
    }
}