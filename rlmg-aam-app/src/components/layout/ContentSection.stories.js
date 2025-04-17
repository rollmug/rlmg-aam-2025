import { ContentSection } from "./ContentSection";

export default {
    title: 'Layout/Content Section',
    component: ContentSection,
    //tags: ['!autodocs'],
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
}

export const Default = {
    args: {
        children: <div className="section-padded">
            <p>
                Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. 
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. 
                Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor.
            </p>
        </div>,
    }
}

export const WithBackground = {
    args: {
        standout: true,
        children: <div className="section-padded">
            <p>
                Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. 
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. 
                Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor.
            </p>
        </div>,
    }
}