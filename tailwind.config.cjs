/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // safelist:[
  //   {
  //     pattern: /bg-(teal|yellow|pink)-(700)/,
  //     variants: ['lg', 'hover', 'focus', 'lg:hover'],
  //   }
  // ],
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [
    require("daisyui"),
    // @ts-ignore
    require("tailwindcss-radix")(),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
  daisyui: {
    themes: [],
  },
};

module.exports = config;
