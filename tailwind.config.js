/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": 'url("./images/galaxy.jpg")',
        "hero-image2": 'url("./images/galaxy2.jpg")',
      },
    },
  },
  plugins: [],
};
