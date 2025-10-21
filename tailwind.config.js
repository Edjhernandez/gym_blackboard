/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this points to your source code
    "./app/**/*.{js,tsx,ts,jsx}",
    "./components/**/*.{js,tsx,ts,jsx}",
    // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: "#0F1417",
        light: "#ffffff",
        tabBarLetters: "#99ABBD",
        bgTabBar: "#1C2129",
        buttonColor: "#007AFF",
        yellow180: "#F2E30C",
      },
    },
  },
  plugins: [],
};
