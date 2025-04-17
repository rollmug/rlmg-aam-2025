import { TextOnlyHero } from "./TextOnlyHero";

export default {
    title: 'Content Blocks/Text Only Hero',
    component: TextOnlyHero,
    // tags: ['!autodocs'],
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

export const Default = {
    args: {
        headerText: 'Let’s Connect!',
        mainText: `<p>Idea for a new project? Question about a new technology? Just want to chat? <strong>We would love to hear from you!</strong></p>`,
        buttonText: 'Work With Us',
        buttonURL: '/',
        className: '',
    }
}