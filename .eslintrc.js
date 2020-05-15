module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:react/recommended",
  ],
  // globals: {
  //   Atomics: "readonly",
  //   SharedArrayBuffer: "readonly",
  // },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  // "plugins": [
  //     "react",
  //     "@typescript-eslint",
  // ],
  rules: {
    indent: ["error", 4],
    endOfline: "auto",
    "linebreak-style": 0,
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "@typescript-eslint/explicit-function-return-type": "off",
  },
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
