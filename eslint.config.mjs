import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import prettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	eslintConfigPrettier,
	tseslint.configs.recommended,
	globalIgnores(['.next/', 'out/', 'build/', 'next-env.d.ts']),
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		plugins: {
			prettier
		},
		languageOptions: {    // Чтобы @typescript-eslint точно понимал типы
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			...prettier.configs.recommended.rules,
			'no-var': 'error',
			'prefer-const': 'warn',
			'no-console': 'warn',
			eqeqeq: 'warn',
			curly: 'warn',
			'import/no-anonymous-default-export': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'react/jsx-props-no-spreading': 'warn'
		}
	}
]);

export default eslintConfig;
