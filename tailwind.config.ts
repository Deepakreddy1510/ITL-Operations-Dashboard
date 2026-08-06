import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { boxShadow: { card: "0 8px 30px rgba(15,23,42,.08)" } } },
  plugins: []
} satisfies Config;
