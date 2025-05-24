import { resolve } from 'node:path'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const project = resolve(process.cwd(), 'tsconfig.json')

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  // Base configuration
  js.configs.recommended,

  // Next.js configuration using FlatCompat
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),

  // Main configuration
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: prettier,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project,
        },
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 0,
      'react/prop-types': 0,
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'last',
          reservedFirst: true,
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-unused-vars': 0,
      'no-useless-escape': 'off',
      'no-redeclare': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-wrapper-object-types': 'warn',
      '@typescript-eslint/no-restricted-types': 'warn',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowRegExp: false,
          allowNever: false,
        },
      ],
      'eslint-disable-next-line eslint-comments/require-description': 'off',
      'unicorn/filename-case': 'off',
      'import/no-default-export': 'off',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
      'sort-imports': ['warn', { ignoreDeclarationSort: true }],
      'jsx-a11y/media-has-caption': 'warn',
    },
  },

  // Ignore patterns
  {
    ignores: ['node_modules/', 'dist/', '.next/', '*static/'],
  },
]
