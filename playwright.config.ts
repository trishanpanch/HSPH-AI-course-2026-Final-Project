import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: "http://127.0.0.1:3000",
    httpCredentials: {
      username: "class",
      password: "local-class-check",
    },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    env: {
      CLASS_DEMO_USERNAME: "class",
      CLASS_DEMO_PASSWORD: "local-class-check",
      OPENROUTER_API_KEY: "fixed-fake-playwright-key",
      OPENROUTER_MODEL: "test/model",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
