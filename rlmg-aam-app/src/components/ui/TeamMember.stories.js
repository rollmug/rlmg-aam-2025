import { TeamMember, sampleMember } from "./TeamMember";

export default {
    title: "UI Elements/Team Member",
    component: TeamMember,
    tags: ['!autodocs'],
    parameters: {
        layout: 'centered',
    },
    globals: {
        backgrounds: { value: 'light' },
    },
};

export const Member = {
    args: { ...sampleMember },
}