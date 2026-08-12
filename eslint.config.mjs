import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import stylisticEslintPlugin from '@stylistic/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const workspaceRoot = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: workspaceRoot,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...nx.configs['flat/base'],
  {
    plugins: {
      prettier: eslintPluginPrettier,
      '@stylistic': stylisticEslintPlugin,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: workspaceRoot,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      'prettier/prettier': 'error',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...nx.configs['flat/typescript'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@stylistic/no-extra-semi': 'error',
      'no-extra-semi': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/typescript'],
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@stylistic/no-extra-semi': 'error',
      'no-extra-semi': 'off',
    },
  },
  ...nx.configs['flat/javascript'],
  ...compat
    .config({
      extends: ['prettier'],
    })
    .map(config => ({
      ...config,
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        ...config.rules,
        '@stylistic/no-extra-semi': 'error',
        'no-extra-semi': 'off',
      },
    })),
];
