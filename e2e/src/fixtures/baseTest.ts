import { test as baseTest, expect, Page } from "@playwright/test";

import { AlertsPage } from "../pages/AlertsPage/AlertsPage";
import { BrowserWindowsPage } from "../pages/BrowserWindowsPage/Browser-WindowsPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { UploadDownloadPage } from "../pages/UploadDownloadPage/UploadDownloadPage";
import { WebTablesPage } from "../pages/WebTablePage/WebTablePage";

type PageObjects = {
  alertsPage: AlertsPage;
  browserWindowsPage: BrowserWindowsPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  uploadDownloadPage: UploadDownloadPage;
  webTablesPage: WebTablesPage;
};

type AuthFixture = {
  authenticatedPage: Page;
};

export const test = baseTest.extend<AuthFixture & PageObjects>({
  alertsPage: async ({ page }, use) => {
    await use(new AlertsPage(page));
  },

  authenticatedPage: async ({ loginPage, page }, use) => {
    const username = process.env.VALID_USERNAME;
    const password = process.env.VALID_PASSWORD;

    if (!username || !password) {
      throw new Error(`VALID_USERNAME and VALID_PASSWORD environment variables must be set.`);
    }

    await loginPage.goTo();
    await loginPage.login(username, password);
    await loginPage.expectToBeLoggedIn();

    await use(page);
  },

  browserWindowsPage: async ({ page }, use) => {
    await use(new BrowserWindowsPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  uploadDownloadPage: async ({ page }, use) => {
    await use(new UploadDownloadPage(page));
  },

  webTablesPage: async ({ page }, use) => {
    await use(new WebTablesPage(page));
  },
});

export { expect };
