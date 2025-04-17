import { BannerImageColumnText } from "./BannerImageColumnText";

export default {
    title: "Content Blocks/Banner Image with Details",
    component: BannerImageColumnText,
    parameters: {
        layout: 'fullscreen',
        paddings: {
            values: [
                { name: 'Small', value: '16px' },
                { name: 'Medium', value: '32px' },
                { name: 'Large', value: '64px' },
            ],
            default: 'Small',
        },
    },
    globals: {
        backgrounds: { value: 'light' },
    },
}

export const Default = {
    args: {
        image: 'https://rlmg-website-2025.vercel.app/storybook-imgs/Hero_Image.jpg',
        //image: 'http://localhost:3000/storybook-imgs/Hero_Image.jpg',
        headerText: 'Header Text',
        subheaderText: 'Subheader Text',
        buttonText: 'Learn About Our Process',
        buttonURL: '/',
        textBlocks: [
            { content: '<p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus.</p>' },
            {
                content: '<ul><li>Item 1 is longer</li><li>Item 2</li><li>Item 3</li></ul>'
            },
            {
                content: '<ul><li>Item 1 is longer too</li><li>Item 2</li><li>Item 3</li></ul>'
            },
        ]
    }
};