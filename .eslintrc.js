// @ts-check

/** @type { import('eslint').Linter.Config } */
const config = {
    root: true,
    plugins: ['@typescript-eslint', 'eslint-comments', 'import', 'jest', 'react', 'react-hooks', 'react-native'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
    },
    settings: { react: { version: 'detect' } },
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    rules: {
        // typescript-eslint
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-type-assertions': ['error'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            { accessibility: 'no-public', overrides: { parameterProperties: 'off' } },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-parameter-properties': [
            'error',
            { allows: ['private', 'protected', 'public', 'private readonly', 'protected readonly', 'public readonly'] },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { args: 'none', ignoreRestSiblings: true, varsIgnorePattern: '^_+$' },
        ],
        '@typescript-eslint/no-use-before-define': 'off',

        // eslint-comments
        'eslint-comments/no-duplicate-disable': ['error'],
        'eslint-comments/no-unlimited-disable': ['error'],
        'eslint-comments/no-unused-enable': ['error'],

        // import
        'import/first': ['error'],
        'import/newline-after-import': ['error'],
        'import/no-duplicates': ['error'],
        'import/order': [
            'error',
            {
                'alphabetize': { order: 'asc', caseInsensitive: true },
                'groups': [['builtin', 'external', 'internal'], 'parent', 'sibling', 'index'],
                'newlines-between': 'never',
            },
        ],
        'import/prefer-default-export': 'off',
        'import/no-anonymous-default-export': [
            'error',
            {
                allowArray: false,
                allowArrowFunction: false,
                allowAnonymousClass: false,
                allowAnonymousFunction: false,
                allowCallExpression: true,
                allowLiteral: false,
                allowObject: true,
            },
        ],

        // eslint
        'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
        'no-duplicate-imports': 'off', // Use plugin-import
        'no-useless-computed-key': ['error'],
        'no-useless-rename': ['error'],
        'no-var': ['error'],
        'no-unused-vars': 'off',
        'object-shorthand': ['error'],
        'prefer-const': ['error'],

        // react - Make sure they do not conflict with 'prettier/react'
        'react/display-name': 'off', // Too many false positives
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }],
        'react/jsx-fragments': ['error', 'element'],
        'react/jsx-key': ['error'],
        'react/jsx-no-comment-textnodes': ['error'],
        'react/jsx-no-duplicate-props': ['error'],
        'react/jsx-no-target-blank': ['error'],
        'react/jsx-no-undef': ['error'],
        'react/jsx-no-useless-fragment': ['error'],
        'react/jsx-uses-react': ['error'],
        'react/jsx-uses-vars': ['error'],
        'react/no-children-prop': ['error'],
        'react/no-danger-with-children': ['error'],
        // Disabled because of undesirable warnings, ref: https://github.com/facebook/create-react-app/issues/5204
        // 'react/no-deprecated': ['error'],
        'react/no-direct-mutation-state': ['error'],
        'react/no-find-dom-node': ['error'],
        'react/no-is-mounted': ['error'],
        'react/no-render-return-value': ['error'],
        'react/no-string-refs': ['error'],
        'react/no-typos': ['error'],
        'react/no-unescaped-entities': 'off', // Too opiniated
        'react/no-unknown-property': 'off', // Use TS for type-checking
        'react/prop-types': 'off', // Use TS for type-checking
        'react/react-in-jsx-scope': ['error'],
        'react/require-render-return': ['error'],
        'react/self-closing-comp': ['error', { component: true, html: true }],

        // react-hooks
        'react-hooks/exhaustive-deps': ['error'],
        'react-hooks/rules-of-hooks': ['error'],

        // react-native
        'react-native/no-unused-styles': ['error'],
        'react-native/no-inline-styles': ['error'],
    },
    overrides: [
        {
            files: ['**/*.{spec,test}.{js,jsx,ts,tsx}', '**/__{mocks,tests}__/**/*.{js,jsx,ts,tsx}'],
            env: {
                'jest': true,
                'jest/globals': true,
            },
            rules: {
                // jest - stylistic
                'jest/consistent-test-it': ['warn', { fn: 'test', withinDescribe: 'test' }],
                'jest/no-alias-methods': ['warn'],
                'jest/no-deprecated-functions': ['warn'],
                'jest/no-test-prefixes': ['warn'],
                'jest/prefer-expect-assertions': ['warn'],
                'jest/prefer-spy-on': ['warn'],
                'jest/prefer-to-be-null': ['warn'],
                'jest/prefer-to-be-undefined': ['warn'],
                'jest/prefer-to-contain': ['warn'],
                'jest/prefer-to-have-length': ['warn'],
                'jest/prefer-todo': ['warn'],
                'jest/require-top-level-describe': ['warn'],

                // jest - functional
                'jest/expect-expect': ['warn'],
                'jest/no-disabled-tests': ['warn'],
                'jest/no-export': ['warn'],
                'jest/no-focused-tests': ['warn'],
                'jest/no-identical-title': ['warn'],
                'jest/no-jasmine-globals': ['warn'],
                'jest/no-mocks-import': ['warn'],
                'jest/valid-describe': ['warn'],
                'jest/valid-expect': ['warn'],
                'jest/valid-expect-in-promise': ['warn'],

                // react-native
                'react-native/no-inline-styles': 'off',
            },
        },
        {
            files: ['*.config.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
};

module.exports = config;
