/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#f8f6ff',
          100: '#f1ecff',
          200: '#e4d9ff',
          300: '#d1b8ff',
          400: '#b78dff',
          500: '#9c5eff',
          600: '#8b3bff',
          700: '#7c2aff',
          800: '#6b22d4',
          900: '#581dad',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
};