module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-multi-spaces': 'off',
    'no-trailing-spaces': 'off',
    'quote-props': 'off',
    'indent': 'off',
    'key-spacing': 'off',
    'semi': 'off',
    'no-tabs': 'off',
  }
}
