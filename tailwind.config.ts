import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        roxo: "#342a54",
        dourado: {
          100: "#dac9a3 ",
          500: "#bfa15f",
          900: " #5b4924",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
