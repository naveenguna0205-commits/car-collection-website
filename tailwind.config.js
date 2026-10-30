/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#07080a',
          900: '#0c0e12',
          850: '#11141a',
          800: '#161a22',
          700: '#202632',
          600: '#2d3545',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-gold': '0 0 25px -4px rgba(245, 158, 11, 0.35)',
        'glow-red': '0 0 25px -4px rgba(225, 29, 72, 0.35)',
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.35)',
        'card-hover': '0 20px 35px -10px rgba(0, 0, 0, 0.8), 0 0 15px -3px rgba(245, 158, 11, 0.15)',
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'mega-wide': '0.35em',
      }
    },
  },
  plugins: [],
}
