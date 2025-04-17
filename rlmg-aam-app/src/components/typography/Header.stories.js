import { Header } from "./Header";

export default {
    title: 'Typography/Headers',
    tags: ['autodocs'],
    component: Header,
    args: {
        children: 'Heading Text'
    },
    parameters: {
        layout: 'centered',
    },
    globals: {
        backgrounds: { value: 'light' },
    },
}

export const HeadingOne = {
    args: {
        element: "h1",
        children: 'Heading Text'
    },
    globals: {
        backgrounds: {
            value: 'neutral'
        }
    }
};

export const HeadingTwo = {
    args: {
        element: "h2",
        children: 'Heading Text'
    },
    globals: {
        backgrounds: {
            value: 'light'
        }
    }
};

export const HeadingThree = {
    args: {
        element: "h3",
        children: 'Heading Text'
    },
    globals: {
        backgrounds: {
            value: 'light'
        }
    }
};

export const HeadingFour = {
    args: {
        element: "h4",
        children: 'Heading Text'
    },
    globals: {
        backgrounds: {
            value: 'light'
        }
    }
};