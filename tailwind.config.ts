import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        colorUg: "rgb(var(--color-UG))",
        colorHeader: "rgb(var(--color-header))",
        hoverUg: "rgb(var(--hover-UG))",
        granatUg: "rgb(var(--granat-UG))",
        lightBlue: "rgb(var(--light-white))",
        pureWhite: "rgb(var(--pure-white))",
        light: "rgb(var(--light))",
        colorSuccess: "rgb(var(--color-success))",
        colorWarning: "rgb(var(--color-warning))",
        colorError: "rgb(var(--color-error))",
      },
      boxShadow: {
        navShadow: "0 20px 50px -12px rgb(0 0 0 / 0.34)",
      },
      minWidth: {
        "form-md": "32rem",
        "form-sm": "24rem",
        "card-md": "20rem",
        "card-sm": "16rem",
      }
    },
  },
  plugins: [],
} satisfies Config;
