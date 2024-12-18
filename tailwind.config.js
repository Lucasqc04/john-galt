/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'primary-light': '#ffffff',
        'primary-dark': '#1a202c',
      },
      colors: {
        'text-primary-light': '#000000',
        'text-primary-dark': '#ffffff',
        'orange-primary': '#F6911D',
        success: '#28A745',
      },
    },
  },
  plugins: [],
};
