'use client';
import { PageLayout } from "@/components/layout/PageLayout";
import { Banner } from "@/components/ui/Banner";
import { ResponsiveColumns } from "@/components/content-blocks/ResponsiveColumns";
import { Quote } from "@/components/content-blocks/Quote";
import { TextWithImage } from "@/components/content-blocks/TextWithImage";
import { ColumnText } from "@/components/content-blocks/ColumnText";
import { TextOnlyHero } from "@/components/content-blocks/TextOnlyHero";

import RLMG from '../../../stories/assets/rlmg-logo.png';
const featureImg = '/storybook-imgs/Biomuseo_Panorama_2_2014.jpg';

const navItems = [
    { text: "About Us", url: "/demo/about" },
    { text: "Our Work", url: "/demo/work" },
    { text: "Our Team", url: "/demo/team" },
    { text: "Careers", url: "/demo/careers" },
    { text: "Contact", url: "/demo/contact" },
];

const responsiveColsData = {
    headerText: 'Who We Are',
    subheaderText: 'We are Design-Thinkers and Problem-Solvers.',
    // buttonText: 'Learn About Our Process',
    // buttonURL: '/',
    textBlocks: [
        { content: '<p>RLMG is a digital design studio dedicated to story-driven, interactive, dynamic, immersive, and educational experiences for museums and public spaces. We make stories relevant and compelling to contemporary audiences through immersive, highly integrated, and interactive installations, transforming content into meaning and memory.</p><p>We are 37 strong: full-time thinkers, designers, and doers, utilizing our 15,000 square foot, light-filled brick studio in Watertown, MA to do the extensive prototyping that is at the heart of RLMG’s media development process. Over the past 12 years we have produced over 1000 digital media installations.</p>' },
        {
            content: '<h3>Our Capabilities</h3><ul><li>Item 1 is longer</li><li>Item 2</li><li>Item 3</li></ul>'
        }
    ]
}

const eqColText = {
    standout: true,
    headerText: 'Our Clients',
    columnSize: 3,
    columnText: [
        { content: '<p>Dwight D. Eisenhower Presidential Library</p><p>Museum of Science and Curiosity</p><p>Moonshot Museum</p><p>Carnegie Science Center</p><p>The Sailing Museum</p><p>ComEd Visitor Center</p><p>Hurd Center, Baylor University</p><p>Idaho State Museum</p><p>Agua Caliente Cultural Museum</p><p>York County History Center</p><p>USGA Golf House and World Golf Hall of Fame</p><p>Montana Heritage Center</p><p>The Watershed</p><p>Rocky Mountain Elk Foundation Visitor Center</p><p>Museum of Utah</p>' },
        { content: '<p>Museum of Science and Curiosity</p><p>Dwight D. Eisenhower Presidential Library</p><p>Moonshot Museum</p><p>Carnegie Science Center</p><p>The Sailing Museum</p><p>ComEd Visitor Center</p><p>Hurd Center, Baylor University</p><p>Idaho State Museum</p><p>Agua Caliente Cultural Museum</p><p>York County History Center</p><p>USGA Golf House and World Golf Hall of Fame</p><p>Montana Heritage Center</p><p>Rocky Mountain Elk Foundation Visitor Center</p><p>Museum of Utah</p><p>The Watershed</p>' },
        { content: '<p>Carnegie Science Center</p><p>Museum of Science and Curiosity</p><p>Dwight D. Eisenhower Presidential Library</p><p>Moonshot Museum</p><p>The Sailing Museum</p><p>ComEd Visitor Center</p><p>Hurd Center, Baylor University</p><p>Idaho State Museum</p><p>Agua Caliente Cultural Museum</p><p>York County History Center</p>' },
    ]
}

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

const bannerArgs = {
    image: '/storybook-imgs/Hero_Image.jpg',
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

const quoteArgs = {
    quoteText: 'We are so very grateful for helping us change how and what we interpret and share…We’ve learned so much throughout this process. Thank you for guiding, teaching, and patience as we navigated a pandemic, staff changes, and funding concerns. The result is amazing.',
    sourceAuthor: 'Joan Mumert',
    sourceOrg: 'York History Center',
    template: 'dark'
}

export default function About() {
    return (
        <PageLayout {...pageLayoutParams}>
            <Banner bannerTextPlacement='bottom' bannerImage="/storybook-imgs/Moonshot2.jpg" bannerHeader="About Us" bannerSubheader={`We’re an employee-owned collective of all stripes: writers, artists, developers, dreamers and more.`} />
            <ResponsiveColumns {...responsiveColsData} />
            <Quote {...quoteArgs} />
            <TextWithImage
                header="Our Approach"
                subheader="Design First, Collaborative to the Core."
                text="We are led by the principles of design-thinking. It informs every facet of our approach, from UX to graphic design to storytelling and technology. In support of that guiding principle is good old-fashioned teamwork, internally across our disciplines and with clients and partners. We listen carefully, we respect diverse perspectives, and, above all, we have fun."
                image={featureImg}
                width={600}
                alt="Test image"
                imagePlacement="right"
                className={`my-2 mt-6 lg:my-8`}
            />

            <ColumnText {...eqColText} />

            <TextOnlyHero
                headerText="Let’s Connect!"
                mainText="Idea for a new project? Question about a new technology? Just want to chat? <strong>We would love to hear from you!</strong>"
                buttonText="Work With Us"
                buttonURL="#"
                className=""
            />

        </PageLayout>
    )
}
