import { Logo } from "./Logo";

import RLMG from '../../stories/assets/rlmg-logo.png';

export default {
    title: 'UI Elements/Logo',
    component: Logo,
    //tags: ['!autodocs'],
    parameters: {
        layout: 'centered',
    },
    globals: {
        backgrounds: { value: 'light' },
    },
}

export const Default = {
    args: {
        img: RLMG,
        alt: 'RLMG Logo',
    }
}