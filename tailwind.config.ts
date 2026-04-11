import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        primary: "#bdc2ff",
        "primary-container": "#818cf8",
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        headline: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
