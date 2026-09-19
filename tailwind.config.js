/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sky/royal blue brand palette (formerly a mint/teal green scale).
        // Kept the `mint` token name so no component classes need renaming.
        mint: {
          50: '#EFF6FF',
          100: '#DCEDFF',
          200: '#B9DBFF',
          300: '#8AC4FF',
          400: '#5AA9F8',
          500: '#3B92F5',
          600: '#1D74E0',
          700: '#0B58BE',
          800: '#0A4494',
          900: '#0A3570',
        },
        surface: {
          light: '#FFFFFF',
          soft: '#F6F9FF',
          mintSubtle: '#EFF4FF',
          dark: '#071311',
          darkSurface: '#0D1C19',
          darkCard: '#112521',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
