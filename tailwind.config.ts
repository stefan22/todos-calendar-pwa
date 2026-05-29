import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172018",
        field: "#f6f7f1",
        pine: "#24554a",
        coral: "#d76f4e",
        marigold: "#e5ad36"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 32, 24, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
