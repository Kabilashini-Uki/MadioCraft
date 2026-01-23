// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef6f7',
          100: '#fdeef0',
          200: '#fbdde2',
          300: '#f8c2ca',
          400: '#f3a1ad',
          500: '#ea7e8f', // Slightly darker pink
          600: '#dc5a6f', // Medium pink
          700: '#EAB4BC', // Main theme color (blush pink)
          800: '#a83b50',
          900: '#8c3345',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      backgroundColor: {
        'primary-main': '#EAB4BC',
        'primary-light': '#fef6f7',
      },
      textColor: {
        'primary-main': '#EAB4BC',
        'primary-dark': '#a83b50',
      },
      borderColor: {
        'primary-main': '#EAB4BC',
      },
      ringColor: {
        'primary-main': '#EAB4BC',
      },
    },
  },
  plugins: [],
}