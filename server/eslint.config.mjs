import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      // '@typescript-eslint/interface-name-prefix': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { ignoreRestSiblings: true },
      ],
    },
  },
  {
    ignores: ['node_modules/', 'dist/'],
  },
  {
    settings: {
      prettier: {
        // * prettier settings if any
      },
    },
  },
  // * Uncomment and adjust these if needed:
  // {
  //   root: true,
  //   env: {
  //     node: true,
  //     jest: true,
  //   },
  //   ignorePatterns: ['.eslintrc.js'],
  // },
];
