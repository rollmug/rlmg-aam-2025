import { Paragraph } from "./Paragraph";

export default {
    title: 'Typography/Paragraph',
    component: Paragraph,
    tags: ['!autodocs'],
    parameters: {
        layout: 'centered',
        paddings: {
            values: [
                { name: 'Small', value: '16px' },
                { name: 'Medium', value: '32px' },
                { name: 'Large', value: '64px' },
            ],
            default: 'Large',
        },
    },
    
    globals: {
        backgrounds: { value: 'light' },
    },
}

export const Normal = {

};