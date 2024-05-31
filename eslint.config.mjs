import esJs from "@eslint/js";
import globals from 'globals';
import esTs from "@typescript-eslint/eslint-plugin";
import typescriptParser from '@typescript-eslint/parser';
import imports from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import stylistic from '@stylistic/eslint-plugin'


export default [
    {
        files: ["**/*.ts", "**/*.js", "**/*.tsx"],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            parser: typescriptParser,
            globals: {
                ...globals.browser,
            },
        },
        linterOptions: {
            noInlineConfig: true,
            reportUnusedDisableDirectives: true,
        },

        plugins: {
            "@typescript-eslint": esTs,
            "react": react,
            "react-hooks": reactHooks,
            import: imports,
            '@stylistic': stylistic
        },
        rules: {
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            ...esJs.configs.recommended.rules,
            ...esTs.configs.recommended.rules,
            ...stylistic.configs["recommended-flat"].rules,
            "@stylistic/quotes": ["error", "single"],
            //'@stylistic/indent': ['error', 4],
            'import/order': [
                'error',
                {
                    pathGroups: [
                        {
                            pattern: "react",
                            group: "builtin"
                        },
                        {
                            pattern: "@raiz/**",
                            group: "external",
                            position: "before"
                        },
                        {
                            pattern: "*.scss",// https://github.com/import-js/eslint-plugin-import/issues/1639#issuecomment-580862011
                            group: "index",
                            patternOptions: { matchBase: true },
                            position: "after"
                        }
                    ],
                    pathGroupsExcludedImportTypes: ["builtin"], // @NK we neeed to unlock the ordering of "builtin" ... otherwise the above rules have no effect
                    groups: [
                        'builtin', // Built-in imports (come from NodeJS native) go first
                        'external', // <- External imports
                        'internal', // <- Absolute imports
                        ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
                        'index', // <- index imports
                        'unknown', // <- unknown
                    ],
                    // 'newlines-between': 'always',
                    alphabetize: {
                        /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
                        order: 'asc',
                        /* ignore case. Options: [true, false] */
                        caseInsensitive: true,
                    },
                },
            ],
            // 'no-extra-parens': 'off',
            // 'no-unused-vars': 'off',
            // 'no-extra-semi': 'off',
            // 'no-unused-vars': 'off',
            // 'no-empty-function': 'off',

            // 'react/prop-types': 'off',
            // 'react/react-in-jsx-scope': 'off',

            // '@typescript-eslint/no-extra-parens': 'off',
            // '@typescript-eslint/no-unused-vars': 'error',
            // '@typescript-eslint/adjacent-overload-signatures': 'error',
            // '@typescript-eslint/ban-ts-comment': 'error',
            // '@typescript-eslint/ban-types': 'error',
            // '@typescript-eslint/no-array-constructor': 'error',
            // '@typescript-eslint/no-empty-function': 'error',
            // '@typescript-eslint/no-empty-interface': 'error',
            // '@typescript-eslint/no-explicit-any': 'warn',
            // '@typescript-eslint/no-extra-non-null-assertion': 'error',
            // '@typescript-eslint/no-extra-semi': 'error',
            // '@typescript-eslint/no-inferrable-types': 'error',
            // '@typescript-eslint/no-loss-of-precision': 'error',
            // '@typescript-eslint/no-misused-new': 'error',
            // '@typescript-eslint/no-namespace': 'error',
            // '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
            // '@typescript-eslint/no-non-null-assertion': 'warn',
            // '@typescript-eslint/no-this-alias': 'error',
            // '@typescript-eslint/no-unnecessary-type-constraint': 'error',
            // '@typescript-eslint/no-unused-vars': 'warn',
            // '@typescript-eslint/no-var-requires': 'error',
            // '@typescript-eslint/prefer-as-const': 'error',
            // '@typescript-eslint/prefer-namespace-keyword': 'error',
            // '@typescript-eslint/triple-slash-reference': 'error',
        },
    }
]


