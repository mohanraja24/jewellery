/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#5A1825',
          dark: '#42111B',
          light: '#7A2233',
          50: '#FDF7F8',
          100: '#FBECEE',
        },
        gold: {
          DEFAULT: '#C6A15B',
          light: '#DFBF7C',
          dark: '#A6843E',
          soft: '#F4ECE1',
          50: '#FAF6EF',
          100: '#F4ECD8',
        },
        ivory: {
          DEFAULT: '#FAF7F0',
          dark: '#F0EBE1',
          light: '#FFFDF9'
        },
        charcoal: {
          DEFAULT: '#252525',
          light: '#3D3D3D',
          dark: '#141414',
          muted: '#666666'
        },
        borderLuxury: '#E8E1D7',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(90, 24, 37, 0.08)',
        'luxury-lg': '0 20px 40px -15px rgba(90, 24, 37, 0.12)',
        'gold-glow': '0 0 20px rgba(198, 161, 91, 0.25)',
      }
    },
  },
  plugins: [],
}
