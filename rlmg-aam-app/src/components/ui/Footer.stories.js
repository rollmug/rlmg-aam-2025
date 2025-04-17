import { Footer } from "./Footer";

import RLMG from '../../stories/assets/rlmg-logo.png';

export default {
    title: 'UI Elements/Footer',
    component: Footer,
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

export const Default = {
    args: {
        logoImg: RLMG,
        orgName: 'RLMG',
        address: '70 Coolidge Hill Road, Watertown, MA 02472',
        email: 'hello@rlmg.com',
        listItems: [
            { text: 'Home', url: '/' },
            { text: 'About Us', url: '/' },
            { text: 'Our Work', url: '/' },
            { text: 'Our Team', url: '/' },
            { text: 'Careers', url: '/' },
            { text: 'Contact Us', url: '/' },
        ],
        socialLinks: [
            {
                platform: 'linkedin',
                displayText: 'LinkedIn',
                url: 'https://www.linkedin.com/company/richard-lewis-media-group',
            },
            {
                platform: 'facebook',
                displayText: 'Facebook',
                url: 'https://www.facebook.com/pages/Richard-Lewis-Media-Group/176549829058538',
            },
            {
                platform: 'instagram',
                displayText: 'Instagram',
                url: 'https://www.instagram.com/rlmg_media/',
            },
            {
                platform: 'twitter',
                displayText: 'Twitter',
                url: 'https://twitter.com/rlmgmedia',
            }
        ],
    }
}