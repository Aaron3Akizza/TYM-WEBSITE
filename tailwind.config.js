/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tym-bg': '#F8F9FA',
        'tym-slate': '#1E293B',
        'tym-crimson': '#DC2626',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
