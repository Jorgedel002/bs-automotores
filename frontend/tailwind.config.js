/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Unbounded"', 'cursive'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#b7d7ff',
          300: '#8abbff',
          400: '#5394ff',
          500: '#1c6dff',
          600: '#0d56db',
          700: '#0c45ad',
          800: '#0f3b88',
          900: '#112f69',
        },
        slate: {
          950: '#050a16',
        },
      },
      boxShadow: {
        card: '0 20px 60px -30px rgba(15, 59, 136, 0.45)',
      },
    },
  },
  plugins: [],
}

