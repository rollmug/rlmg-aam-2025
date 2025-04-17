import { Navbar } from "./Navbar";

import RLMG from '../../stories/assets/rlmg-logo.png';

export default {
    title: 'UI Elements/Navbar',
    component: Navbar,
    tags: ['!autodocs'],
    args: {
        img: RLMG,
        orgName: 'RLMG',
        fixed: false
    },
    parameters: {
        layout: 'centered',
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

export const Navigation = {
    args: {
        img: RLMG,
        orgName: 'RLMG',
        email: 'hello@rlmg.com',
        contactPageSettings: {
            contactPageSlug: '/contact',
            contactPageButtonText: 'Contact Us'
        },
        fixed: true,
        listItems: [
            { text: 'About Us', url: { pathname: './', query: { path: '/story/ui-elements-navbar--navigation' } } },
            { text: 'Our Work', url: { pathname: './', query: { path: '/story/ui-elements-navbar--navigation' } } },
            { text: 'Our Team', url: { pathname: './', query: { path: '/story/ui-elements-navbar--navigation' } } },
            { text: 'Careers', url: { pathname: './', query: { path: '/story/ui-elements-navbar--navigation' } } },
            { text: 'Contact Us', url: { pathname: './', query: { path: '/story/ui-elements-navbar--navigation' } } },
        ],
    }
};