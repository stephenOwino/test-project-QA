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

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,

  projects: [
    {
      name: `tests`,
      testDir: `./src/tests`,
      timeout: 60000,
      use: {
        baseURL: process.env.DEMOQA,
        ...devices[`Desktop Chrome`],
      },
    },
  ],

  reporter: [
    [`html`, { open: process.env.CI ? `never` : `on-failure` }],
    ['./reporters/dist/custom-reporter.js'],
  ],


  retries: process.env.CI ? 2 : 2,
  testDir: `./src/tests`,

  use: {
    actionTimeout: 5000,
    ignoreHTTPSErrors: true,
    screenshot: {
      fullPage: true,
      mode: `only-on-failure`,
    },
    trace: `retain-on-failure`,
    video: `retain-on-failure`,
  },

  workers: process.env.CI ? 1 : undefined,
});
