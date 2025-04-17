import { ResponsiveColumns } from "./ResponsiveColumns";

export default {
    title: "Content Blocks/Responsive Columns",
    component: ResponsiveColumns,
    tags: ['!autodocs'],
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
        headerText: 'Header Text',
        subheaderText: 'Subheader Text',
        buttonText: 'Learn About Our Process',
        buttonURL: '/',
        textBlocks: [
            { content: '<p>RLMG is a digital design studio dedicated to story-driven, interactive, dynamic, immersive, and educational experiences for museums and public spaces. We make stories relevant and compelling to contemporary audiences through immersive, highly integrated, and interactive installations, transforming content into meaning and memory.</p><p>We are 37 strong: full-time thinkers, designers, and doers, utilizing our 15,000 square foot, light-filled brick studio in Watertown, MA to do the extensive prototyping that is at the heart of RLMG’s media development process. Over the past 12 years we have produced over 1000 digital media installations.</p>' },
            {
                content: '<h3>Our Capabilities</h3><ul><li>Item 1 is longer</li><li>Item 2</li><li>Item 3</li></ul>'
            }
        ]
    }
};