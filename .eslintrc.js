module.exports = {
  root: true,
  env: {
    // https://eslint.org/docs/rules/no-undef#nodejs
    node: true,
    // ignore defineProps, defineEmits, etc.
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  // https://github.com/vuejs/vue-eslint-parser#parseroptionsparser
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
}
