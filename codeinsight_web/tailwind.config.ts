/** @type {import('tailwindcss').config} */
const config = {
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
    safelist: [
      "text-green-600", 
      "text-blue-600", 
      "text-red-600", 
      "text-orange-600",
      "text-gray-700"
    ],
};

export default config;