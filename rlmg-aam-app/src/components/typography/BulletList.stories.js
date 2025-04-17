import { BulletList } from "./BulletList";

export default {
    title: 'Typography/BulletList',
    component: BulletList,
    tags: ['!autodocs'],
    args: {
        listItems: [
            { text: 'Strategy & Concept' },
            { text: 'Design Development & Prototyping' },
            { text: 'Interactive Media' },
            { text: 'Film & Linear Media' },
            { text: 'Immersive Environments' },
            { text: 'Project Management' },
        ],
        title: 'Our Capabilities',
        textSize: 'normal',
        columns: 1,
        spacing: 'normal',
    },
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

export const Bullets = {
    args: {
        bullets: true,
    }
}

export const Plain = {
    args: {
        bullets: false,
    }
}

export const WithLinks = {
    args: {
        bullets: false,
        title: null,
        spacing: 'loose',
        textSize: 'small',
        listItems: [
            { text: 'Home', url: '/' },
            { text: 'About Us', url: '/' },
            { text: 'Our Work', url: '/' },
            { text: 'Our Team', url: '/' },
            { text: 'Careers', url: '/' },
            { text: 'Contact Us', url: '/' },
        ],
    }
}

export const IntoColumns = {
    args: {
        bullets: false,
        title: null,
        spacing: 'loose',
        textSize: 'small',
        listItems: [
            { text: 'Home', url: '/' },
            { text: 'About Us', url: '/' },
            { text: 'Our Work', url: '/' },
            { text: 'Our Team', url: '/' },
            { text: 'Careers', url: '/' },
            { text: 'Contact Us', url: '/' },
            { text: 'Blog', url: '/' },
        ],
        columns: 2,
    }
}

export const LongListColumns = {
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        bullets: false,
        title: null,
        spacing: 'loose',
        textSize: 'small',
        listItems: [
            { text: 'Home', url: '/' },
            { text: 'About Us', url: '/' },
            { text: 'Our Work', url: '/' },
            { text: 'Our Team', url: '/' },
            { text: 'Careers', url: '/' },
            { text: 'Contact Us', url: '/' },
            { text: 'Blog', url: '/' },
            { text: 'Press', url: '/' },
            { text: 'Privacy Policy', url: '/' },
            { text: 'Terms of Use', url: '/' },
            { text: 'Accessibility', url: '/' },
            { text: 'Sitemap', url: '/' },
        ],
        columns: 3,
    }
}

export const ColumnsOnMobile = {
    args: {
        bullets: false,
        title: null,
        spacing: 'loose',
        textSize: 'small',
        listItems: [
            { text: 'Home', url: '/' },
            { text: 'About Us', url: '/' },
            { text: 'Our Work', url: '/' },
            { text: 'Our Team', url: '/' },
            { text: 'Careers', url: '/' },
            { text: 'Contact Us', url: '/' },
            { text: 'Blog', url: '/' },
        ],
        columns: 2,
        columnsOnMobile: true,
    }
}