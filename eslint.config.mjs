
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Custom global ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  {
    rules: {
      // allow any
      "@typescript-eslint/no-explicit-any": "off",

      // warn unused vars
      "@typescript-eslint/no-unused-vars": "warn",

      // disable strict react compiler rules
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/purity": "off",

      // allow <img>
      "@next/next/no-img-element": "off",
    },
  },
]);
