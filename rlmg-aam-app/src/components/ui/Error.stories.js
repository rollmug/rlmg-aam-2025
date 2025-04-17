import { Error } from "./Error";

export default {
    title: 'UI Elements/Error',
    component: Error,
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

export const Error404 = {
    args: {
        headerText: "404: Page Not Found",
        mainText: "<p>Welcome to area code 404. This is no man’s land.</p><p>Let’s get you back to civilization: use the navigation at the top of the page, or click the button below.</p>",
        buttonText: "Go back",
        buttonURL: "/",
        className: "error-page",
    }
};

export const ServerError = {
    args: {
        headerText: "500 Error",
        mainText: "Something broke.",
        buttonText: "Abandon all hope",
        buttonURL: "/",
        className: "error-page",
    }
};