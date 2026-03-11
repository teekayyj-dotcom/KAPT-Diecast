/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tailwind sẽ lấy màu từ biến --color-red-brand ở trên
        'red-brand': 'var(--color-red-brand)', 
      }
    },
  },
  plugins: [],
}