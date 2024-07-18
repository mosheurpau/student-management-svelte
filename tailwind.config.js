/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      keyframes: {
        "rotate-lr-3": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "16.66%": { transform: "rotate(-15deg)" },
          "33.33%": { transform: "rotate(15deg)" },
          "50%": { transform: "rotate(-15deg)" },
          "66.66%": { transform: "rotate(15deg)" },
          "83.33%": { transform: "rotate(-15deg)" },
        },
      },
      animation: {
        "rotate-lr-3": "rotate-lr-3 1s ease-in-out",
      },
    },
  },
  variants: {
    extend: {
      translate: ["responsive", "hover", "focus"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // Enable light and dark themes
  },
};
