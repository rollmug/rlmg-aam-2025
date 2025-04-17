import { Video } from "./Video";

export default {
    component: Video,
    title: 'Content Blocks/Video',
    tags: ['!autodocs'],
    parameters: {
        layout: 'centered',
        paddings: {
            values: [
                { name: 'None', value: '0px' },
                { name: 'Medium', value: '32px' },
                { name: 'Large', value: '64px' },
            ],
            default: 'None',
        },
    },
    globals: {
        backgrounds: { value: 'light' },
    },
};

export const Default = {
    args: {
        videoSrc: "https://rlmg-website-2025.vercel.app/storybook-imgs/Carnegie.mp4",
        posterImage: "https://rlmg-website-2025.vercel.app/storybook-imgs/carnegie-poster.jpg",
        //blurDataURL: "https://images.unsplash.com/photo-1688745575427-4d2a3c7f8e9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "Carnegie",
        captionText: "Carnegie Science Center’s 7500 sf permanent gallery, Mars: The Next Giant Leap, sends visitors on a 300-million-mile journey to discover how space exploration and the latest thinking about how to sustain life on another planet can improve our lives on Earth today. Seven highly-integrated and interactive media experiences reveal the visions, challenges, and solutions of a Martian society, highlighting what it takes to create an equitable future no matter what planet we live on."
    }
};