import typescriptEslint from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/craco.config.js"],
}, ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "react-hooks": fixupPluginRules(reactHooks),
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
                modules: true,
            },
        },
    },

    rules: {
        semi: ["error", "always"],
        quotes: ["error", "single"],
        "no-console": "warn",

        "@typescript-eslint/no-unused-vars": ["warn", {
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
        }],
        "@typescript-eslint/no-unused-expressions": ["error", {
            "allowShortCircuit": true,
            "allowTernary": true
        }],

        "no-case-declarations": "off",
        "react-hooks/exhaustive-deps": "off",
        "import/first": "off",
        "no-mixed-operators": "off",
        "@typescript-eslint/no-require-imports": "off",
        "no-debugger": "warn",

        "comma-spacing": ["error", {
            before: false,
            after: true,
        }],

        curly: "error",
        eqeqeq: "error",
        "no-multi-spaces": "error",
        "brace-style": "error",
        "jsx-quotes": ["warn", "prefer-double"],

        indent: ["error", 4, {
            SwitchCase: 1,
        }],

        "max-len": ["warn", {
            code: 160,
            tabWidth: 4,
        }],

        "key-spacing": ["error", {
            beforeColon: false,
            afterColon: true,
        }],

        "object-curly-spacing": ["error", "always"],
        "prefer-const": "error",
        "react/prop-types": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-duplicate-enum-values": "off",
        "no-prototype-builtins": "off",
        "@typescript-eslint/no-namespace": "off",
        "no-unsafe-optional-chaining": "off",
        "react-hooks/rules-of-hooks": "error",
        "react/display-name": "off",
    },
}];