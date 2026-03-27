import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  // ✅ 기본 룰 (전체)
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // flat config에서는 보통 spread가 안전
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      indent: ["error", 2],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },

  // 🔒 "컴포넌트 배럴" 보호: export *는 OK, export type만 금지
  {
    files: [
      "src/screens/components/**/index.ts",
      "src/screens/components/**/index.tsx",
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: 'ExportNamedDeclaration[exportKind="type"]',
          message:
            "components 배럴(index.ts)에서는 export type 금지. 타입은 types.ts로 분리하세요.",
        },
      ],
    },
  },

  {
    files: [
      '**/index.ts',
      '**/index.tsx',
      '**/*.index.ts',
      '**/*.index.tsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
]);