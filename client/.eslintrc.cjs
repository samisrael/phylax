module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'react-app',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react-refresh/only-export-components': 'off',
  },
}
