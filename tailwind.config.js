/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#CEC8C2',
          DEFAULT: '#C4BDB7',
        },
        watermark: '#B5AEA8',
        accent: {
          DEFAULT: '#F85E10',
          hover: '#e04f06',
        },
        ink: {
          primary: '#181615',
          secondary: '#4A4643',
          muted: '#3A3633',
        },
        console: {
          cream: '#F5EFE6',
          orange: '#F85E10',
          dark: '#1E1E1E',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', '"Michroma"', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
