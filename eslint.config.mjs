import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "next-env.d.ts",
    "next.config.mjs",
    // vitepress generated files (local docs server — see docs/.vitepress/)
    "docs/.vitepress/cache/**",
    "docs/.vitepress/dist/**",
  ]),
]);
