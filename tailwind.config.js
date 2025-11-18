/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kbc-gold': {
          light: '#FFD700',
          DEFAULT: '#FFC000',
          dark: '#D4AF37',
        },
        'kbc-purple': {
          light: '#9D4EDD',
          DEFAULT: '#7B2CBF',
          dark: '#5A189A',
        },
      },
      backgroundImage: {
        'kbc-gradient': 'linear-gradient(135deg, #1a0f2e 0%, #2d1b69 50%, #1a0f2e 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F9D423 100%)',
      },
      fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif'],
        'display': ['"Rajdhani"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
