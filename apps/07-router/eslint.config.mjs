import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import baseConfig from "../../eslint.config.mjs";
import nx from "@nx/eslint-plugin";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});


export default [
    ...baseConfig,
    ...nx.configs["flat/angular"],
    ...compat.config({
        extends: [
            "plugin:@angular-eslint/template/process-inline-templates"
        ]
    }).map(config => ({
        ...config,
        files: [
            "**/*.ts"
        ],
        rules: {
            ...config.rules,
            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "sfeir",
                    style: "camelCase"
                }
            ],
            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "sfeir",
                    style: "kebab-case"
                }
            ],
            "@angular-eslint/prefer-standalone": "off"
        }
    })),
    ...nx.configs["flat/angular-template"],
    {
        files: ["**/*.html"],
        rules: {
            "@angular-eslint/template/click-events-have-key-events": "off",
            "@angular-eslint/template/interactive-supports-focus": "off"
        }
    },
    {
        ignores: [
            "**/vite.config.*.timestamp*",
            "**/vitest.config.*.timestamp*"
        ]
    }
];
