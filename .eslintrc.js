module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwind/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'tailwind'],
  rules: {},
};
