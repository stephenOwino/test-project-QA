import dotenvx from "@dotenvx/dotenvx";
import { defineConfig, devices } from "@playwright/test";

dotenvx.config({
  path: `${__dirname}/.env`,
});

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [
    {
      name: "tests",
      testDir: "./src/tests",
      timeout: 60000,
      use: {
        baseURL: process.env.DEMOQA,
        ...devices["Desktop Chrome"],
      },
    },
  ],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: process.env.CI ? "never" : "on-failure" }]],
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 3,
  testDir: "./src/tests",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 5000,
    screenshot: {
      fullPage: true,
      mode: "only-on-failure",
    },
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});