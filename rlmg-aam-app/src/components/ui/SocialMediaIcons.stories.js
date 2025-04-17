import { SocialMediaIcons } from "./SocialMediaIcons";

export default {
    title: "UI Elements/Social Media Icons",
    component: SocialMediaIcons,

}

export const IconsGroup = {
    args: {
        size: 'medium',
        links: [
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
            },
            {
                platform: 'youtube',
                displayText: 'YouTube',
                url: 'https://www.youtube.com/@rlmgmedia',
            },
        ]
    }
}