/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "screen-gray": "#f5f5f5",
        },
        boxShadow: {
          inner: "inset 0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: [],
  };
