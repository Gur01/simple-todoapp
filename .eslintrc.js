module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:react/recommended",
    ],

    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",

        //prettier rules https://prettier.io/docs/en/integrating-with-linters.html
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
                semi: true,
                trailingComma: "all",
                singleQuote: false,
                printWidth: 120,
                tabWidth: 4,
            },
        ],
    },
    // ??
    settings: {
        react: {
            version: "detect",
        },
    },
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ["*.ts"],
            rules: {
                "@typescript-eslint/explicit-function-return-type": ["warn"],
            },
        },
    ],
};
