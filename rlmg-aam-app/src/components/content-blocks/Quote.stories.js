import { Quote } from "./Quote";

export default {
    title: "Content Blocks/Quote",
    component: Quote,
    parameters: {
        layout: 'fullscreen',
        paddings: {
            values: [
                { name: 'None', value: '0px' },
            ],
            default: 'None',
        },
    },
    globals: {
        backgrounds: { value: 'light' },
    },
}

export const Dark = {
    args: {
        quoteText: 'We are so very grateful for helping us change how and what we interpret and share…We’ve learned so much throughout this process. Thank you for guiding, teaching, and patience as we navigated a pandemic, staff changes, and funding concerns. The result is amazing.',
        sourceAuthor: 'Joan Mumert',
        sourceOrg: 'York History Center',
        template: 'dark'
    }
};

export const Light = {
    args: {
        quoteText: 'We are so very grateful for helping us change how and what we interpret and share…We’ve learned so much throughout this process. Thank you for guiding, teaching, and patience as we navigated a pandemic, staff changes, and funding concerns. The result is amazing.',
        sourceAuthor: 'Joan Mumert',
        sourceOrg: 'York History Center',
        template: 'light'
    }
};