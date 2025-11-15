/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // African-inspired color palette
        african: {
          gold: '#FFD700',
          copper: '#B87333',
          terracotta: '#E2725B',
          safari: '#D2691E',
          earth: '#8B4513',
          clay: '#CC7722',
          sunset: '#FF8C00',
          warmwhite: '#FFF8DC',
        },
        kente: {
          red: '#DC143C',
          gold: '#FFD700',
          green: '#228B22',
          blue: '#0000CD',
          black: '#000000',
          white: '#FFFFFF',
        },
        mudcloth: {
          brown: '#8B4513',
          beige: '#F5F5DC',
          cream: '#FFFDD0',
          dark: '#654321',
        },
        primary: {
          50: '#fff8f1',
          100: '#feecdc',
          200: '#fcd9bd',
          300: '#fdba8c',
          400: '#ff8a4c',
          500: '#ff5a1f',
          600: '#d03801',
          700: '#b43403',
          800: '#8a2c0d',
          900: '#73230d',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'african': ['Ubuntu', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'african-pattern': "url('/patterns/african-pattern.svg')",
        'kente-pattern': "url('/patterns/kente-pattern.svg')",
        'mudcloth-pattern': "url('/patterns/mudcloth-pattern.svg')",
        'hero-gradient': 'linear-gradient(135deg, #ff5a1f 0%, #ff8a4c  50%, #fcd9bd 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'african': '0 10px 25px -3px rgba(255, 90, 31, 0.1), 0 4px 6px -2px rgba(255, 90, 31, 0.05)',
        'warm': '0 10px 25px -3px rgba(139, 69, 19, 0.1), 0 4px 6px -2px rgba(139, 69, 19, 0.05)',
      }
    },
  },
  plugins: [],
}