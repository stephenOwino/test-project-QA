import { test, expect } from "../fixtures/baseTest";
import { faker } from "@faker-js/faker";
import { testData } from "../config/testData"; 

test.describe('Register Page Scenarios', () => {
  test('should display the Register page header', async ({ registerPage }) => {
    await registerPage.goTo();
    await registerPage.pauseForCaptcha();

    // Using testData.defaultWait
    await expect(registerPage.getRegisterHeader()).toBeVisible({ timeout: testData.defaultWait });
    await expect(registerPage.getRegisterHeader()).toHaveText('Register to Book Store');
  });

  test('should successfully register a new user (manual CAPTCHA)', async ({ registerPage }) => {
    await registerPage.goTo();
    await registerPage.pauseForCaptcha();

    await registerPage.fillFormWithRandomData();
    // Using testData.expectedMessages.registrationSuccess
    await registerPage.submitAndHandleDialog(testData.expectedMessages.registrationSuccess);
  });

  test('should show an error when registering with an existing username', async ({ registerPage }) => {
    await registerPage.goTo();
    await registerPage.pauseForCaptcha();

    // Register a new user first
    const { username, password } = await registerPage.fillFormWithRandomData();
    await registerPage.submitAndHandleDialog(testData.expectedMessages.registrationSuccess);

    // Attempt to re-register with the same credentials
    await registerPage.goTo();
    await registerPage.pauseForCaptcha();

    // The key is to reuse the username and password from the first registration.
    await registerPage.firstnameInput.fill(faker.person.firstName());
    await registerPage.lastnameInput.fill(faker.person.lastName());
    await registerPage.fillCredentials(username, password);
    await registerPage.clickRegister();

    // Using testData.defaultWait and testData.expectedMessages.userExists
    await expect(registerPage.userAlreadyExistErrorMessage).toBeVisible({ timeout: testData.defaultWait });
    await expect(registerPage.userAlreadyExistErrorMessage).toHaveText(testData.expectedMessages.userExists);
  });

  test('should show an error for a weak password', async ({ registerPage }) => {
    await registerPage.goTo();
    await registerPage.pauseForCaptcha();

    // Fill form with weak password using the page object method
    const weakPassword = await registerPage.fillFormWithWeakPassword();
    await registerPage.clickRegister();

    // Using testData.expectedMessages.weakPassword
    await expect(registerPage.weakPasswordError).toBeVisible({ timeout: testData.defaultWait });
    await expect(registerPage.weakPasswordError).toHaveText(testData.expectedMessages.weakPassword);

    console.log("Used weak password:", weakPassword);
  });
});