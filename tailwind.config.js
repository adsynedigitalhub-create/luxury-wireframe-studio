/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        luxury: {
          bg: '#0c0d0e',
          canvas: '#121417',
          surface: '#181b20',
          border: '#2a2e37',
          gold: '#c5a059',
          goldLight: '#e4c88a',
          goldMuted: '#96793f',
          bronze: '#a87954',
          cream: '#f5f2eb',
          ecru: '#e8e2d5',
          noir: '#08080a',
          muted: '#8e95a5',
        }
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(197, 160, 89, 0.1)',
        'artboard': '0 30px 60px -12px rgba(0, 0, 0, 0.45), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
        'glow': '0 0 35px rgba(197, 160, 89, 0.25)',
      }
    },
  },
  plugins: [],
}
