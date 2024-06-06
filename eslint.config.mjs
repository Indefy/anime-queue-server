// eslint.config.js

import js from "@eslint/js";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
	{
		files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			react,
			"@typescript-eslint": typescriptEslint,
		},
		rules: {
			"no-console": "warn",
			"no-unused-vars": "warn",
			"react/prop-types": "off",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
];
