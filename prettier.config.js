/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  arrowParens: 'avoid',
  printWidth: 120,
  semi: false,
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
