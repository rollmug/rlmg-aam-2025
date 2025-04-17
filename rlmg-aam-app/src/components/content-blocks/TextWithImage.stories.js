import { TextWithImage } from "./TextWithImage";

export default {
    title: 'Content Blocks/Text With Image',
    component: TextWithImage,
    //tags: ['!autodocs'],
    args: {
        header: 'Who We Are',
        subheader: 'We Create Text. At Different Sizes.',
        text: `<p>We bring to life innovative and imaginative experiences that stir emotions. Shift perceptions. 
    Provoke joy, wonder, debate. We open doors and cast light on who we are as humans, where we’ve been, where we’re going. 
    We bring people together and explore what connects us. We create meaningful moments, and we do it with a sense of purpose every step of the way.</p>`,
        image: '/storybook-imgs/Biomuseo_Panorama_2_2014.jpg',
        width: 450,
        alt: 'test',
    },
    parameters: {
        layout: 'centered',
    },
    globals: {
        backgrounds: { value: 'light' },
    },
}

export const TextWithImageRight = {
    args: {
        header: 'Who We Are',
        subheader: 'We Create Text. At Different Sizes.',
        text: `<p>We bring to life innovative and imaginative experiences that stir emotions. Shift perceptions. 
    Provoke joy, wonder, debate. We open doors and cast light on who we are as humans, where we’ve been, where we’re going. 
    We bring people together and explore what connects us. We create meaningful moments, and we do it with a sense of purpose every step of the way.</p>`,
        image: 'https://rlmg-website-2025.vercel.app/storybook-imgs/Biomuseo_Panorama_2_2014.jpg',
        width: 450,
        alt: 'test',
        imagePlacement: 'right',
    }
}

export const TextWithImageLeft = {
    args: {
        header: 'Who We Are',
        subheader: 'We Create Text. At Different Sizes.',
        text: `<p>We bring to life innovative and imaginative experiences that stir emotions. Shift perceptions. 
    Provoke joy, wonder, debate. We open doors and cast light on who we are as humans, where we’ve been, where we’re going. 
    We bring people together and explore what connects us. We create meaningful moments, and we do it with a sense of purpose every step of the way.</p>`,
        image: 'https://rlmg-website-2025.vercel.app/storybook-imgs/Biomuseo_Panorama_2_2014.jpg',
        width: 450,
        alt: 'test',
        imagePlacement: 'left',
    }
}