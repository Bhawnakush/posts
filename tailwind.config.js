/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Include all files in the `pages` directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include all files in the `components` directory
    "./layouts/**/*.{js,ts,jsx,tsx}", // Include all files in the `layouts` directory
  ],
  theme: {
    extend: {}, // Extend the default Tailwind theme here if needed
  },
  plugins: [], // Add Tailwind plugins here if you need additional functionality
};
