/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Game colors
        'cream': '#F5F0E6',
        'cream-dark': '#E8E0D0',
        'nature': '#27AE60',
        'survival': '#F39C12',
        'power': '#3498DB',
        'extraction': '#E67E22',
        'processing': '#E74C3C',
        'civilization': '#9B59B6',
        'utility': '#95A5A6',
      },
    },
  },
  plugins: [],
}
