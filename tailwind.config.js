/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dashboard': 'var(--bg-dashboard)',
        'bg-card': 'var(--bg-card)',
        'bg-header': 'var(--bg-header)',
        'bg-sidebar': 'var(--bg-sidebar)',
        'border-color': 'var(--border-color)',
        'border-color-active': 'var(--border-color-active)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-inverse': 'var(--text-inverse)',
        'accent-color': 'var(--accent-color)',
        'accent-color-hover': 'var(--accent-color-hover)',
        'color-up': 'var(--color-up)',
        'color-down': 'var(--color-down)',
        'color-warning': 'var(--color-warning)',
        'color-info': 'var(--color-info)',
      }
    },
  },
  plugins: [],
}
