// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // enable dark mode via class
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // curated psychological thriller palette
        primary: 'hsl(210, 30%, 15%)', // deep midnight blue
        secondary: 'hsl(180, 20%, 20%)', // muted teal
        accent: 'hsl(340, 40%, 55%)', // subtle scarlet
        highlight: 'hsl(45, 70%, 55%)', // warm amber for UI highlights
        overlay: 'hsla(0, 0%, 0%, 0.45)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Roboto Slab"', 'serif'],
      },
      // glassmorphism utilities
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
