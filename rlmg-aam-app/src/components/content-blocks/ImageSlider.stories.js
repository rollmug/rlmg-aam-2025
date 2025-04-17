import { ImageSlider, sampleSliderImages } from "./ImageSlider";

export default {
    component: ImageSlider,
    title: 'Content Blocks/Image Slider',
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
};

export const Default = {
    args: {
        images: sampleSliderImages,
        galleryTitle: 'Gallery Title',
        galleryDescription: 'Over 600 sf of the gallery are dedicated to a scale model of a Martian colony that evolves as visitors interact with it. Visitors vote on societal issues along an interactive rail that gives a window into the colony’s culture, concerns, and structure. Based on visitor input, new buildings are added to the model over time. Monitors embedded in cliffsides and surface dwellings augment the colony’s interior life with beautifully-detailed, updatable animations. A custom CMS allows the museum to update visitor experience as the colony progresses, reflecting the ever-evolving future of humans and Mars.',
    }
};