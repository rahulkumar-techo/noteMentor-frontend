/**
 * ⚡ ESLint Config (MJS) for Next.js + TypeScript
 * - Clean + ESM compatible
 * - Allows any
 * - Disables noisy React Compiler rules
 * - Custom global ignores
 */

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  // Next.js base configs
  ...nextVitals,
  ...nextTs,

  // Custom ignored paths
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // Custom rules
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",

      // Disable strict React Compiler warnings
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/purity": "off",

      "@next/next/no-img-element": "off",
    },
  },
]);
