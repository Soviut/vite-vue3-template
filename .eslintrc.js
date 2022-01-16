module.exports = {
  root: true,
  env: {
    // https://eslint.org/docs/rules/no-undef#nodejs
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
}
