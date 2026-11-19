/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Emerald & Imperial Gold Palette
        emeraldTheme: {
          DEFAULT: '#0B2F24',
          dark: '#061D16',
          deep: '#041510',
          light: '#134737',
          soft: '#EAF3F0',
          50: '#F2F8F6',
          100: '#E1EFEA',
        },
        burgundy: {
          DEFAULT: '#0B2F24', // Royal Emerald
          dark: '#061D16',    // Deep Forest Obsidian
          light: '#164E3D',   // Luminous Emerald
          50: '#F2F8F6',
          100: '#E1EFEA',
        },
        gold: {
          DEFAULT: '#C59A27', // Rich Visible Gold
          light: '#ECC968',   // Luminous Champagne
          dark: '#9A7412',    // Antique Deep Gold
          soft: '#F9F5EA',
          50: '#FAF6ED',
          100: '#F4ECD4',
        },
        ivory: {
          DEFAULT: '#FBF9F5', // Alabaster Silk
          dark: '#F2EEE6',
          light: '#FFFFFF'
        },
        charcoal: {
          DEFAULT: '#111827', // High-contrast crisp dark (Slate 900)
          light: '#1F2937',   // Slate 800
          dark: '#030712',    // Slate 950
          muted: '#4B5563'    // Gray 600 (Highly visible and readable)
        },
        borderLuxury: '#E5DED2',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Marcellus"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 12px 35px -8px rgba(11, 47, 36, 0.12)',
        'luxury-lg': '0 24px 50px -12px rgba(11, 47, 36, 0.18)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.40)',
        'emerald-glow': '0 0 25px rgba(11, 47, 36, 0.25)',
      }
    },
  },
  plugins: [],
}
