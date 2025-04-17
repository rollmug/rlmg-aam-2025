import { PageLayout } from "./PageLayout";
import RLMG from '../../stories/assets/rlmg-logo.png';
import { ContentSection } from "./ContentSection";

export default {
    title: 'Layout/PageLayout',
    component: PageLayout,
    tags: ['!autodocs'],
    args: {
        orgName: 'RLMG',
        logoImg: RLMG,
        navItems: [
            { text: "About Us", url: "/" },
            { text: "Our Work", url: "/" },
            { text: "Our Team", url: "/" },
            { text: "Careers", url: "/" },
            { text: "Contact", url: "/" },
        ],
        footerArgs: {
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
          },
        className: '',
    },
    parameters: {
        layout: 'fullscreen',
        paddings: {
            values: [
                { name: 'None', value: '0' }
            ],
            default: 'None',
        },
    },
}

export const Default = {
    args: {
        children: [
            <ContentSection className={'h-full'}>
                <div className="section-padded flex flex-col justify-center items-center py-4 min-h-72 h-full ">
                    <div className=" w-full text-center py-8 border border-dashed border-slate-300">(Content Here)</div>
                </div>
            </ContentSection>
        ]
    }
};