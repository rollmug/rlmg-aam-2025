/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        'video': '16 / 9',
        'square': '1 / 1',
      },
      fontFamily: {
        'nunito': ['var(--font-nunito)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        xs: ['0.7rem', '1.4rem'], // 14px
        sm: ['0.8rem', '1.4rem'], // 16px for buttons
        "sm2": ['0.9rem', '1.5rem'], // 16px for buttons
        base: ['1rem', '1.8rem'], // 20px for body text
        lg: ['1.2rem', '1.8rem'], // 24px for h3
        lgr: ['1.4rem', '1.8rem'], // 30px for h3
        xl: ['1.7rem', '2.0rem'], // 34px
        "2xl": ['2.0rem', '2.5rem'], // 40px
        "2.5xl": ['2.5rem', '3.25rem'], // 40px
        "3xl": ['3.0rem', '3.5rem'], // 60px
        "4xl": ['3.4rem', '3.75rem'], // 68px
        "5xl": ['4.5rem', '5.25rem'], // 90px
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#019FF9", // for buttons
          "primary-content": "#ffffff", // button text color
          secondary: "#019FF9", //blue - for headers
          "base-100": "#ffffff", // main background
          "base-200": "#F3F4F7", // slightly darker background on some content blocks
          "base-300": "#C6C8C8", // darker background
          "base-content": "#2A303E", // main text color
          neutral: "#2A303E", // for dark bg on quote blocks and other content blocks
          "neutral-content": "#ffffff", // text on dark bg
          accent: "#FFD95C", // for links on dark background, and for play btn color
          warning: "#FFD95C",
          info: "#015A8D",

          "--rounded-btn": "4px",
        }
      }
    ]
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
    function ({ addBase }) {
      addBase({
        'html': { fontSize: "18px" },
      })
    }
  ],
};
