import { RichText, sampleContent } from "./RichText";

export default {
    component: RichText,
    title: 'Content Blocks/Rich Text',
    tags: ['!autodocs'],
    parameters: {
        layout: 'centered',
        paddings: {
            values: [
                { name: 'Small', value: '16px' },
                { name: 'Medium', value: '32px' },
                { name: 'Large', value: '64px' },
            ],
            default: 'Medium',
        },
    },
    globals: {
        backgrounds: { value: 'light' },
    },
};

export const Default = {
    args: {
        content: sampleContent,
    }
};

