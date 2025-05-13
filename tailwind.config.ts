import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // 🧠 ეს მოიცავს ყველა ფაილს სადაც იყენებ Tailwind-ის კლასებს
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
