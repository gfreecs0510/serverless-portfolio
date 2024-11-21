module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended', // Basic ESLint rules
    'plugin:react/recommended', // React-specific linting rules
    'plugin:react-hooks/recommended', // React Hooks linting rules
    'plugin:@typescript-eslint/recommended', // TypeScript-specific linting rules
    'prettier', // Disable ESLint rules that might conflict with Prettier
    'plugin:prettier/recommended', // Enables Prettier plugin
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows the use of modern ECMAScript features
    sourceType: 'module', // Allows the use of imports
    ecmaFeatures: {
      jsx: true, // Enables linting for JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  rules: {
    'react/prop-types': 'off', // Turn off prop-types checking (we're using TypeScript)
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Optional, allows functions without type annotations for return type
    'react/react-in-jsx-scope': 'off', // React is automatically in scope with React 17 JSX transform
    'prettier/prettier': ['error', { singleQuote: true, semi: false }], // Use Prettier's formatting rules
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
}
