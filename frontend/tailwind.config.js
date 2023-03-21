/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5.5rem',
        '3xl': '6.5rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#3E8FFB',
        darkGrey: '#626772',
        darkBlue: '#1D2437',
      },
    },
  },
  plugins: [],
};
