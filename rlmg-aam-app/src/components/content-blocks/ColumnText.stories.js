import { ColumnText } from "./ColumnText";

export default {
    title: "Content Blocks/Equal Column Text",
    component: ColumnText,
    tags: ['!autodocs'],
    parameters: {
        layout: 'fullscreen',
        paddings: {
            values: [
                { name: 'None', value: '0px' },
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
        standout: true,
        headerText: 'Our Clients',
        columnSize: 3,
        columnText: [
            { content: '<p>Dwight D. Eisenhower Presidential Library</p><p>Museum of Science and Curiosity</p><p>Moonshot Museum</p><p>Carnegie Science Center</p><p>The Sailing Museum</p><p>ComEd Visitor Center</p><p>Hurd Center, Baylor University</p><p>Idaho State Museum</p><p>Agua Caliente Cultural Museum</p><p>York County History Center</p><p>USGA Golf House and World Golf Hall of Fame</p><p>Montana Heritage Center</p><p>The Watershed</p><p>Rocky Mountain Elk Foundation Visitor Center</p><p>Museum of Utah</p>' },
            { content: '<p>Museum of Science and Curiosity</p><p>Dwight D. Eisenhower Presidential Library</p><p>Moonshot Museum</p><p>Carnegie Science Center</p><p>The Sailing Museum</p><p>ComEd Visitor Center</p><p>Hurd Center, Baylor University</p><p>Idaho State Museum</p><p>Agua Caliente Cultural Museum</p><p>York County History Center</p><p>USGA Golf House and World Golf Hall of Fame</p><p>Montana Heritage Center</p><p>Rocky Mountain Elk Foundation Visitor Center</p><p>Museum of Utah</p><p>The Watershed</p>' },
            { content: '<p>Carnegie Science Center</p><p>Museum of Science and Curiosity</p><p>Dwight D. Eisenhower Presidential Library</p><p>Moonshot Museum</p><p>The Sailing Museum</p><p>ComEd Visitor Center</p><p>Hurd Center, Baylor University</p><p>Idaho State Museum</p><p>Agua Caliente Cultural Museum</p><p>York County History Center</p>' },
        ]
    }
}