module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/eslint-recommended",
        // "prettier/react"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "plugins": [
        "react",
        "@typescript-eslint",
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": 0,
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
    },
    "overrides": [
        {
          // enable the rule specifically for TypeScript files
          "files": ["*.ts"],
          "rules": {
            "@typescript-eslint/explicit-function-return-type": ["warn"]
          }
        }
    ]

};