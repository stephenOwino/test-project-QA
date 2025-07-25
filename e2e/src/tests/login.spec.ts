import { test, expect } from '../fixtures/loginPage.fixture'; 
import { faker } from '@faker-js/faker'; 
import { LoginPage } from '../pages/LoginPage';

test.describe('Login and Authentication Features', () => {

  test('should display user profile information after login', async ({ auth }) => {
    const { page, loginPage } = auth;


    await expect(loginPage.logoutButton).toBeVisible();

    const userNameValue = await page.locator('#userName-value').textContent();
    // const userPassword = await page.locator("#password").inputValue();
    expect(userNameValue?.trim()).toBe(process.env.VALID_USERNAME);
    // expect(userPassword?.trim()).toBe(process.env.VALID_PASSWORD); 

        await page.goto('/profile');

 

  });

  test('should display invalid login message on incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();

    const invalidUsername = faker.internet.username();
    const invalidPassword = faker.internet.password();

    await loginPage.login(invalidUsername, invalidPassword);

    await loginPage.expectInvalidUserOrPassMessage();
  });
});



