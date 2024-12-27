/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,tsx,jsx}'],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-out": "fadeOut 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}

