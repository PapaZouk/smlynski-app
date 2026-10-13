import { defineConfig, devices } from "@playwright/test";

/**
 * Local smoke-test suite — NEVER runs on Vercel (the deploy gate is
 * `npm run build`). See docs/adr/0014-testing-and-telemetry.md.
 *
 * Requires a one-time `npx playwright install chromium` and a fresh build
 * (`npm run test:e2e` builds first). To iterate without rebuilding:
 *   npm run build && npx playwright test
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["list"]],
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Static preview of the export in out/ — the same artifact Vercel ships.
    command: "npx serve out -l 4173 --no-clipboard",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
