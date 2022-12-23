// yarn add eslint-config-prettier -D 会禁用所有会和 prettier 起冲突的规则。
const { resolve } = require;

const OFF = 0;
const ERROR = 2;

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:eslint-comments/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:unicorn/recommended',
        'plugin:promise/recommended',
        'prettier',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                // import 模块时，不写后缀将尝试导入的后缀，出现频率高的文件类型放前面
                extensions: ['.tsx', '.ts', '.js', '.json'],
            },
            typescript: {
                directory: [resolve('./tsconfig.json')],
            },
        },
        'import/ignore': [ // 在导入tool/antdThemeJson下面两个json文件的时候eslint报错
            "node_modules",
            ".(json|css)$",
        ]
    },
    plugins: ['react', '@typescript-eslint', 'promise'],
    rules: {
        "react/display-name": "off",// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
        "promise/always-return": "off", // 关闭在promise的then回调中必须return一个值出去
        "promise/catch-or-return": "off",// 关闭promise的catch回调必须return一个值出去
        'eslint-comments/disable-enable-pair': [ERROR, { allowWholeFile: true }],
        '@typescript-eslint/no-var-requires': 0, // 解决了引入语句的问题 比如 const a=require('./a.js')会报错 import from语句也会报错
        // "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
        // 下面两行代码用来解决声明一个枚举值会报错的缘故 错误：already declared in the upper scope
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        'import/extensions': [
            ERROR,
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                json: 'never',
                js: 'never',
            },
        ],
        'unicorn/filename-case': OFF,
        "import/no-extraneous-dependencies": OFF,
        'unicorn/no-array-for-each': OFF,
        'unicorn/import-style': OFF,
        'unicorn/no-null': OFF,
        'unicorn/prevent-abbreviations': OFF,
        'unicorn/no-process-exit': OFF,
        "unicorn/prefer-module": OFF,
        "unicorn/consistent-function-scoping": OFF,
        'import/no-unresolved': OFF,
        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/no-use-before-define': ERROR,
        '@typescript-eslint/no-useless-constructor': ERROR,
        'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx'] }],
        'react/jsx-indent-props': [ERROR, 4],
        'react/jsx-indent': [ERROR, 4],
        'react/require-default-props': OFF,
        'react/prop-types': OFF,
        "camelcase": OFF,
        'func-names': OFF,
        'lines-between-class-members': OFF,
        'max-classes-per-file': OFF,
        'no-console': OFF,
        'no-empty': OFF,
        'no-param-reassign': OFF,
        'no-plusplus': OFF,
        'no-underscore-dangle': OFF,
        'no-unused-expressions': OFF,
        'no-use-before-define': OFF,
        'no-useless-constructor': OFF,
        'jsx-a11y/no-static-element-interactions': OFF,// div加onClick会要求加一个role属性
        'jsx-a11y/no-noninteractive-element-interactions': OFF,
        "react/jsx-props-no-spreading": OFF,
        "import/prefer-default-export": OFF,
        'jsx-a11y/click-events-have-key-events': OFF,// 看文档https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
        "react/no-children-prop": OFF,
        "react/function-component-definition": OFF,
    },
    overrides: [
        {
            files: ['**/*.d.ts'],
            rules: {
                'import/no-duplicates': OFF,
            },
        },
        {
            files: ['./config-overrides.js'],
            rules: {
                'import/no-extraneous-dependencies': OFF
            },
        },
    ],
};
