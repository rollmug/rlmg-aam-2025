import { TeamMembers, sampleTeamMembers } from "./TeamMembers";

export default {
    title: "UI Elements/Team Members",
    component: TeamMembers,
    tags: ['!autodocs'],
    parameters: {
        layout: 'fullscreen',
        paddings: {
            values: [
                { name: 'None', value: '0px' },
                { name: 'Small', value: '16px' },
                { name: 'Medium', value: '32px' },
                { name: 'Large', value: '64px' },
            ],
            default: 'None',
        },
    },
    globals: {
        backgrounds: { value: 'light' },
    },
};

export const Members = {
    args: { headerText: "Meet the Team", teamMembers: sampleTeamMembers },
}