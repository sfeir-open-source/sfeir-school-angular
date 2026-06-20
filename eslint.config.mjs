import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import nx from "@nx/eslint-plugin";
import eslintPluginPrettier from "eslint-plugin-prettier";
import stylisticEslintPlugin from "@stylistic/eslint-plugin";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});


export default [
    ...nx.configs["flat/base"],
    { plugins: {
            "prettier": eslintPluginPrettier,
            "@stylistic": stylisticEslintPlugin
        } },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.jsx"
        ],
        rules: {
            "prettier/prettier": "error",
            "@nx/enforce-module-boundaries": [
                "error",
                {
                    enforceBuildableLibDependency: true,
                    allow: [],
                    depConstraints: [
                        {
                            sourceTag: "*",
                            onlyDependOnLibsWithTags: [
                                "*"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    ...nx.configs["flat/typescript"],
    {
        files: [
            "**/*.ts",
            "**/*.tsx"
        ],
        rules: {
            "prettier/prettier": "error",
            "@stylistic/no-extra-semi": "error",
            "no-extra-semi": "off"
        }
    },
    ...nx.configs["flat/typescript"],
    ...nx.configs["flat/typescript"],
    {
        files: [
            "**/*.spec.ts",
            "**/*.tsx"
        ],
        rules: {
            "prettier/prettier": "error",
            "@typescript-eslint/no-explicit-any": "off",
            "@stylistic/no-extra-semi": "error",
            "no-extra-semi": "off"
        }
    },
    ...nx.configs["flat/javascript"],
    ...compat.config({
        extends: [
            "prettier"
        ]
    }).map(config => ({
        ...config,
        files: [
            "**/*.js",
            "**/*.jsx"
        ],
        rules: {
            ...config.rules,
            "prettier/prettier": "error",
            "@stylistic/no-extra-semi": "error",
            "no-extra-semi": "off"
        }
    }))
];
