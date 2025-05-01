/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3490dc",
          dark: "#2c5282",
          light: "#63b3ed",
        },
        accent: {
          DEFAULT: "#fbbf24",
          dark: "#d97706",
          light: "#fcd34d",
        },
        dark: {
          DEFAULT: "#111827",
          lighter: "#1f2937",
          lightest: "#374151",
        },
        light: {
          DEFAULT: "#f3f4f6",
          darker: "#e5e7eb",
          darkest: "#d1d5db",
        },
        secondary: {
          DEFAULT: '#2c5282',
          dark: '#2a4365',
          light: '#4299e1',
        },
        'accent-alt': {
          DEFAULT: '#34d399',
          dark: '#059669',
          light: '#6ee7b7',
        },
      },
      textColor: theme => ({
        ...theme('colors'),
        primary: theme('colors.primary.DEFAULT'),
        secondary: theme('colors.secondary.DEFAULT'),
        accent: theme('colors.accent.DEFAULT'),
        dark: theme('colors.dark.DEFAULT'),
        light: theme('colors.light.DEFAULT'),
      }),
      backgroundColor: theme => ({
        ...theme('colors'),
        primary: theme('colors.primary.DEFAULT'),
        secondary: theme('colors.secondary.DEFAULT'),
        accent: theme('colors.accent.DEFAULT'),
        dark: theme('colors.dark.DEFAULT'),
        light: theme('colors.light.DEFAULT'),
      }),
      ringColor: {
        accent: '#fbbf24',
        primary: '#3490dc',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        arabic: ['"Cairo"', 'sans-serif'],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideDown: "slideDown 0.3s ease-in-out",
        slideUp: "slideUp 0.3s ease-in-out",
        scaleIn: "scaleIn 0.3s ease-in-out",
        bounceIn: "bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: 0 },
          '50%': { transform: 'scale(1.05)', opacity: 0.8 },
          '70%': { transform: 'scale(0.9)', opacity: 0.9 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      width: {
        'progress': 'var(--progress-width)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}