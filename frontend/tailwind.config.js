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
        // Backwards-compatible alias for existing burgundy references mapped to Royal Emerald
        burgundy: {
          DEFAULT: '#0B2F24', // Royal Emerald
          dark: '#061D16',    // Deep Forest Obsidian
          light: '#164E3D',   // Luminous Emerald
          50: '#F2F8F6',
          100: '#E1EFEA',
        },
        gold: {
          DEFAULT: '#D4AF37', // Imperial Metallic Gold
          light: '#EAD38A',   // Champagne Glow
          dark: '#B08823',    // Rich Antique Gold
          soft: '#F9F5EA',
          50: '#FAF7EE',
          100: '#F4ECD4',
        },
        ivory: {
          DEFAULT: '#FBF9F5', // Alabaster Silk
          dark: '#F2EEE6',
          light: '#FFFFFF'
        },
        charcoal: {
          DEFAULT: '#1A1A1A', // Obsidian Charcoal
          light: '#333333',
          dark: '#0D0D0D',
          muted: '#666666'
        },
        borderLuxury: '#E8E2D5',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 12px 35px -8px rgba(11, 47, 36, 0.10)',
        'luxury-lg': '0 24px 50px -12px rgba(11, 47, 36, 0.16)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'emerald-glow': '0 0 25px rgba(11, 47, 36, 0.25)',
      }
    },
  },
  plugins: [],
}
