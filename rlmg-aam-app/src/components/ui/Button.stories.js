import { Button } from "./Button";

export default {
    title: 'UI Elements/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    globals: {
        backgrounds: { value: 'light' },
    },
}

export const Normal = {

};

export const FilterBtn = {
    args: {
        type: "filter",
    },
    globals: {
        backgrounds: {
            value: 'neutral'
        }
    }
};

export const FilterBtnActive = {
    args: {
        type: "filter",
        active: true,
    },
    globals: {
        backgrounds: {
            value: 'neutral'
        }
    }
};