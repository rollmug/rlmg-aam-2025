import { BlogPostBanner, testData } from "./BlogBanner";

export default {
    component: BlogPostBanner,
    title: 'UI Elements/Blog Post Banner',
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
};

export const Default = {
    args: {
        postData: testData,
    }
};