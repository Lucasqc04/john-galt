/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'primary-light': '#B9B8B8',
        'primary-dark': '#606060',
      },
      colors: {
        'text-primary-light': '#000000',
        'text-primary-dark': '#ffffff',
        'orange-primary': '#F39200',
        success: '#28A745',
      },
      fontFamily: {
        lexend: ['"Lexend Deca"', 'sans-serif'], // Fonte global
        pixelade: ['"Pixelade"', 'sans-serif'], // Fonte exclusiva do Navbar
      },
    },
  },
  plugins: [],
};
