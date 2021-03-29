module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript'],
  rules: {
    // Fix typescript error around "'React' was used before it was defined".
    // See https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined/64024916#64024916
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-props-no-spreading": 0,
    "react/jsx-fragments": "off",
    "max-len": ["error", { "code": 120 }],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.test.*", "src/setupTests.ts"]}]
  }
};
