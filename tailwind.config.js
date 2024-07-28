// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      fontFamily: {
          "mulish" : ["Mulish"]
      },
    extend: {
      colors: {
        white: '#FFFFFF',
        gray: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          600: '#4B5563',
          800: '#1F2937',
          900: '#111827',
        },
        blue: {
          100: '#DBEAFE',
          500: '#3B82F6',
        },
        green: {
          500: '#10B981',
          600: '#059669',
        },
      },
      fontSize: {
        '2xl': '1.5rem',   // Default font size for 2xl
        '3xl': '1.875rem', // Default font size for 3xl
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',  // Large shadow
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',  // Medium shadow
      },
    },
  },
  plugins: [],
};
