/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 0.5s infinite',
        opacity: {
          '10': '0.1',
          '25': '0.25',
          '40': '0.40',
          '60': '0.50',
          '70':'0.40',
          '80':'0.30',
          '90':'0.20',
          '100':'0.10',
        }, 
      }
    },
  },
  plugins: [],
}