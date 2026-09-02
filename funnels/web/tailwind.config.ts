import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nimbus: {
          orange: "#F47B20",
          orangeDark: "#D95F00",
          ink: "#1F252B",
          muted: "#66717D",
          line: "#E8EAED",
          soft: "#F7F7F5",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(31, 37, 43, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
