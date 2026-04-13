/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
      },
      colors: {
        'red-brand': 'var(--color-red-brand)',
        'red-brand-hover': 'var(--color-red-brand-hover)',
        'black-base': 'var(--color-black-base)',
        'black-soft': 'var(--color-black-soft)',
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'border-muted': 'var(--color-border-muted)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        brand: 'var(--shadow-brand)',
      },
    },
  },
  plugins: [],
}
