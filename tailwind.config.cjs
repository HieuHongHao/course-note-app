/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require("daisyui"), require("tailwindcss-radix")(),require('@tailwindcss/typography')],
  daisyui: {
    themes: [],
  },
};

module.exports = config;
