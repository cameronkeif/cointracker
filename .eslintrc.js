module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript'],
  rules: {
    "react/jsx-props-no-spreading": 0,
    "max-len": 120
  }
};
