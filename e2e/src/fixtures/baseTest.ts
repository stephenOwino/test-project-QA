import { test as baseTest, Page, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { AlertsPage } from "../pages/AlertsPage/AlertsPage";
import { BrowserWindowsPage } from "../pages/BrowserWindowsPage/Browser-WindowsPage";

type PageObjects = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  alertsPage: AlertsPage;
  browserWindowsPage:BrowserWindowsPage;
};

type AuthFixture = {
  authenticatedPage: Page;
};

export const test = baseTest.extend<PageObjects & AuthFixture>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  alertsPage: async ({ page }, use) => {
    await use(new AlertsPage(page));
  },
  browserWindowsPage:async({page}, use) =>{
    await use(new BrowserWindowsPage(page));
  },

  authenticatedPage: async ({ page, loginPage }, use) => {
    const username = process.env.VALID_USERNAME;
    const password = process.env.VALID_PASSWORD;

    if (!username || !password) {
      throw new Error("VALID_USERNAME and VALID_PASSWORD environment variables must be set.");
    }
    
    await loginPage.goTo();
    await loginPage.login(username, password);
    await loginPage.expectToBeLoggedIn();

    await use(page);
  },
});

export { expect };