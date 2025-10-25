    /** @type {import('tailwindcss').Config} */
    module.exports = {
      // Configure content paths to scan all files in app/, components/, and lib/
      content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      // Enable class-based dark mode for use with Chakra UI's theme toggling
      darkMode: "class", 
      theme: {
        extend: {},
      },
      plugins: [],
    };