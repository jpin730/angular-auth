/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'gray-dark': '#111827',
        'gray-light-hover': '#4b5563',
        'gray-light': '#6b7280',
        'indigo-hover': '#6366f1',
        'red-hover': '#ef4444',
        'white-hover': '#f9fafb',
        green: '#10b981',
        indigo: '#4f46e5',
        red: '#dc2626',
      },
    },
  },
  plugins: [],
}
