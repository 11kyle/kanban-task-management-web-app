import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'main-purple': '#635FC7',
        'main-purple-hover': '#A8A4FF',
        'ver-dark-gray': '#20212C',
        'dark-gray': '#2B2C37',
        'lines-dark': '#3E3F4E',
        'medium-gray': '#828FA3',
        'lines-light': '#E4EBFA',
        'light-gray': '#F4F7FD',
        'main-red': '#EA5555',
        'main-red-hover': '#FF9898'
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
export default config
