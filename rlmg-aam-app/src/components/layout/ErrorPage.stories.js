import { ErrorPage } from "./ErrorPage";
import RLMG from '../../stories/assets/rlmg-logo.png';

const navItems = [
    { text: "About Us", url: "/demo/about" },
    { text: "Our Work", url: "/demo/work" },
    { text: "Our Team", url: "/demo/team" },
    { text: "Careers", url: "/demo/careers" },
    { text: "Contact", url: "/demo/contact" },
];

const footerArgs = {
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
        { text: "Blog", url: "/" },
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

const pageLayoutParams = {
    orgName: 'RLMG',
    logoImg: RLMG,
    navItems: navItems,
    footerArgs: footerArgs
};

export default {
    title: 'Layout/ErrorPage',
    component: ErrorPage,
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
}

export const Error404 = {
    args: {
        pageLayoutParams: pageLayoutParams,
        headerText: "404: Page Not Found",
        mainText: "<p>Welcome to area code 404. This is no man’s land.</p><p>Let’s get you back to civilization: use the navigation at the top of the page, or click the button below.</p>",
        buttonText: "Go back",
        buttonURL: "/",
        className: "error-page",
    }
};

export const ServerError = {
    args: {
        pageLayoutParams: pageLayoutParams,
        headerText: "500 Error",
        mainText: "<p>Something broke. We’re on it.</p>",
        buttonText: "Go back",
        buttonURL: "/",
        className: "error-page",
    }
};