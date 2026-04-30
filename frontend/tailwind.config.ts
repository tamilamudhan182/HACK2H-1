import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09111f",
        mist: "#eef6ff",
        coral: "#ff6f61",
        gold: "#f9c74f",
        cyan: "#59d5e0"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(7, 14, 24, 0.28)"
      },
      backgroundImage: {
        "hero-mesh": "radial-gradient(circle at top left, rgba(89, 213, 224, 0.35), transparent 32%), radial-gradient(circle at top right, rgba(249, 199, 79, 0.22), transparent 24%), linear-gradient(145deg, #07111f 0%, #10253e 42%, #0a1325 100%)"
      }
    }
  },
  plugins: []
};

export default config;

