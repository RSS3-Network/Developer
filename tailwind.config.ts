import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "Noto Sans", "sans-serif"],
        "ocr-b-std": ["var(--font-ocr-b-std)", "monospace"],
      },
      colors: {
        "digital-yellow": "#F6F617",
        "rss3-blue": "#1477FB",
        "rss3-grey": "#F3F7FA",
        "index-charcoal": "#1F1F1F",
        "index-grey": "#ECEAE6",
        "index-mid-grey": "#767C83",
        "index-light-grey": "#929292",
      },
    },
  },
  plugins: [],
};
export default config;
