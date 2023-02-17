/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                light_gray: "#808dad",
                light_red: "#eb4a4a",
                black_blue: "#0e1630",
                dark_blue: "#171f38",
            },
            fontFamily: {
                primary: '"Quicksand", sans-serif',
            }
        },
    },
    plugins: [],
};
