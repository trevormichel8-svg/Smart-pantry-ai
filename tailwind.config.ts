import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#060606",
        panel: "#101114",
        panelSoft: "#17191d",
        gold: "#d7a928",
        mint: "#8df7b1",
        danger: "#ff6b6b",
        warn: "#ffd166",
      },
      boxShadow: {
        glow: "0 0 40px rgba(141, 247, 177, 0.12)",
        gold: "0 0 36px rgba(215, 169, 40, 0.18)",
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at top, rgba(141,247,177,0.08), transparent 30%), radial-gradient(circle at right, rgba(215,169,40,0.08), transparent 25%)",
      },
    },
  },
  plugins: [],
};

export default config;
