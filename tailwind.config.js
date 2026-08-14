/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#DBEAFE',
          dark: '#1D4ED8',
        },
        success: '#22C55E',
        danger: '#DC2626',
        warning: '#F59E0B',
        gray: {
          text: '#374151',
          light: '#F3F4F6',
        },
      },
    },
  },
  plugins: [],
}