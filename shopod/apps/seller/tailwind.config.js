

const config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#FF5200", // Swiggy Orange
                    dark: "#E64A00",
                    light: "#FFF1EB",
                },
                secondary: {
                    DEFAULT: "#282C3F", // Swiggy Deep Blue
                    light: "#7E808C",
                },
                success: "#60B246",
                warning: "#DB7C38",
                error: "#ED4D4D",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
module.exports = config;
