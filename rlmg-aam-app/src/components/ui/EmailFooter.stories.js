import { EmailFooter } from "./EmailFooter";

export default {
  title: "UI Elements/Email Signature",
  component: EmailFooter,
  layout: "fullscreen",
  paddings: {
    values: [
      { name: "Small", value: "16px" },
      { name: "Medium", value: "32px" },
      { name: "Large", value: "64px" },
    ],
    default: "Small",
  },
  globals: {
    backgrounds: { value: "light" },
  },
  args: {
    name: "Dave Kobrenski",
    title: "Full Stack Developer",
    pronouns: "he/him",
    officeNum: "617.926.8300",
    mobileNum: "617.123.4567",
  },
  argTypes: {
    name: {
      control: "text",
      description: "Your full name",
    },
    title: {
      control: "text",
      description: "Your job title"
    },
    pronouns: {
      control: "text",
      description: "Optionally, set your pronouns",
    },
    officeNum: {
      control: "text",
      description: "An optional office number",
      table : {
        type: { summary: "string" },
        defaultValue: { summary: "617.926.8300" },
      },
    },
    mobileNum: {
      control: "text",
      description: "An optional mobile number",
    },
  },
};

export const FooterTemplate = {
  
};
