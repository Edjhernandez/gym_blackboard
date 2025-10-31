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
        primary: "#FFFF00",
        secondary: "#595959",
        background: {
          primary: "#0D0D0D",
          secondary: "#1A1A1A",
        },
        text: {
          primary: "#E7EBDA",
          secondary: "#D9D9D9",
        },
        status: {
          success: "#28a745",
          warning: "#ffc107",
          error: "#dc3545",
        },
      },
    },
  },
  plugins: [],
};
