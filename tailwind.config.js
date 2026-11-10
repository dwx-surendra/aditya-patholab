/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B2B6B',
          light: '#2D4BA0',
          dark: '#0F1A42',
          50:  '#EEF1FB',
          100: '#D4DBF5',
          200: '#A9B7EB',
          300: '#7E93E1',
          400: '#536FD7',
          500: '#2D4BA0',
          600: '#1B2B6B',
          700: '#152256',
          800: '#0F1A42',
          900: '#0A112D',
        },
        secondary: {
          DEFAULT: '#CC0000',
          light: '#E53333',
          dark:  '#990000',
          50:  '#FFF0F0',
          100: '#FFD6D6',
          200: '#FF9999',
          300: '#FF5555',
          400: '#FF2222',
          500: '#CC0000',
          600: '#990000',
          700: '#660000',
        },
        accent: {
          DEFAULT: '#0088CC',
          light:   '#33AADD',
          dark:    '#006699',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:       '0 4px 20px rgba(27,43,107,0.08)',
        'card-hover': '0 8px 30px rgba(27,43,107,0.15)',
      },
    },
  },
  plugins: [],
}
