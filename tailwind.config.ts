import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dunggeunmo: ["DungGeunMo"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "80px": "80px",
        "160px": "160px",
        "240px": "240px",
        "320px": "320px",
        "500px": "500px",
        "640px": "640px",
        "700px": "700px",
        "800px": "800px",
        "1000px": "1000px",
      },
      height: {
        "80px": "80px",
        "160px": "160px",
        "240px": "240px",
        "320px": "320px",
        "800px": "800px",
      },
      scale: {
        "175": "1.75",
        "200": "2",
        "250": "2.5",
        "300": "3",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
