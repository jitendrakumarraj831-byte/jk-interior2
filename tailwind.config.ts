import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-inter)", "Geist", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
