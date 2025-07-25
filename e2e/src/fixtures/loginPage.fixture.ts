
import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type AuthFixture = {
  loginPage: LoginPage;
  page: Page;
};

export const test = base.extend<{ auth: AuthFixture }>({

 
  auth: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    const username = process.env.VALID_USERNAME;
    const password = process.env.VALID_PASSWORD;

    if (!username || !password) {
      throw new Error('VALID_USERNAME and VALID_PASSWORD environment variables must be set.');
    }

    await loginPage.goTo();
    await loginPage.login(username, password);

    await loginPage.expectToBeLoggedIn();

    await use({ page, loginPage });


  },
});

export { expect };
