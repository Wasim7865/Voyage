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
        navy: {
          50: '#f5f5f4',
          100: '#e7e5e4',
          200: '#d6d3d1',
          300: '#a8a29e',
          400: '#78716c',
          500: '#57534e',
          600: '#44403c',
          700: '#292524',
          800: '#1c1917',
          900: '#0f0d0b',
          950: '#0a0908'
        },
        voyage: {
          50: '#fdf5f3',
          100: '#fce8e3',
          200: '#f9d5cb',
          300: '#f3b8a7',
          400: '#eb9278',
          500: '#e07050',
          600: '#cc5535',
          700: '#ab4329',
          800: '#8d3a26',
          900: '#763426'
        },
        terracotta: {
          50: '#fdf5f3',
          100: '#fce8e3',
          200: '#f9d5cb',
          300: '#f3b8a7',
          400: '#eb9278',
          500: '#e07050',
          600: '#cc5535',
          700: '#ab4329',
          800: '#8d3a26',
          900: '#763426'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'sidebar': '4px 0 6px -1px rgb(0 0 0 / 0.1)',
        'glass': '0 8px 32px 0 rgb(0 0 0 / 0.37)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-voyage': 'linear-gradient(135deg, #e07050 0%, #cc5535 100%)',
        'gradient-voyage-dark': 'linear-gradient(135deg, #0f0d0b 0%, #1c1917 50%, #292524 100%)',
        'gradient-voyage-light': 'linear-gradient(135deg, #fdf5f3 0%, #fce8e3 50%, #f9d5cb 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
