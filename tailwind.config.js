/** @type {import('tailwindcss').Config} */
// Colours, spacing and radius come from src/theme/tokens.ts — the single source of truth.
// jiti (shipped with Tailwind) lets this JS config read the TypeScript tokens file.
const jiti = require('jiti')(__filename);
const { colors, radius, fonts } = jiti('./src/theme/tokens.ts');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      borderRadius: { sm: `${radius.sm}px`, md: `${radius.md}px`, lg: `${radius.lg}px` },
      fontFamily: {
        body: [fonts.body],
        semibold: [fonts.semibold],
        heavy: [fonts.heavy],
      },
    },
  },
  plugins: [],
};
