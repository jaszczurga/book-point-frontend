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
        background: "rgb(var(--color-background))",
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        accent: "rgb(var(--color-accent))",
        textColor: "rgb(var(--color-text))",
        border: "rgb(var(--color-border))",
        success: "rgb(var(--color-success))",
        warning: "rgb(var(--color-warning))",
        error: "rgb(var(--color-error))",
        textOrange: "rgb(var(--color-text-orange))",
        bgOrange: "rgb(var(--color-bg-light-orange))",
        textDark: "rgb(var(--color-text-dark))",
      },
      boxShadow: {
        navShadow: "0 20px 50px -12px rgb(0 0 0 / 0.34)",
      }
    },
  },
  plugins: [],
} satisfies Config;
