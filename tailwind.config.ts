import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0f0f0f',
        'brand-light': '#f5f5f5',
      },
    },
  },
  plugins: [],
}
export default config
