module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // Indentation
    indent: ['error', 2],
    // Semicolons
    semi: ['error', 'always'],
    // Function parentheses spacing
    'space-before-function-paren': ['error', 'always'],
    // Unused variables
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // Object curly braces spacing
    'object-curly-spacing': ['error', 'always'],
    // Arrow function parentheses spacing
    'arrow-parens': ['error', 'always'],
    // Disable the rule that enforces file extensions
    'import/extensions': 'off',
  },
  globals: {
    process: 'readonly',
  },
};
