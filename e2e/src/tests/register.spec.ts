import { test, expect } from "../fixtures/baseTest";
import { faker } from "@faker-js/faker";



test.describe('Register Page Scenarios', () => {
  test('should display the Register page header', async ({ registerPage }) => {
    await registerPage.goTo();
    await registerPage.pauseForCaptcha();

      await expect(registerPage.getRegisterHeader()).toBeVisible({ timeout: 5000 });
      await expect(registerPage.getRegisterHeader()).toHaveText('Register to Book Store');
  });

  test('should successfully register a new user (manual CAPTCHA)', async ({ registerPage }) => {
    await registerPage.goTo();
    await registerPage.pauseForCaptcha();

      await registerPage.fillFormWithRandomData();
      await registerPage.submitAndHandleDialog("User Register Successfully.");
  });

  test('should show an error when registering with an existing username', async ({ registerPage }) => {
    await registerPage.goTo();
    await registerPage.pauseForCaptcha();

    // Register a new user first
    const { username, password } = await registerPage.fillFormWithRandomData();
    await registerPage.submitAndHandleDialog("User Register Successfully.");

    // Attempt to re-register with the same credentials
    await registerPage.goTo();
    await registerPage.pauseForCaptcha();

      await registerPage.firstnameInput.fill(faker.person.firstName());
      await registerPage.lastnameInput.fill(faker.person.lastName());
      await registerPage.fillCredentials(username, password);
      await registerPage.clickRegister();
      await expect(registerPage.userAlreadyExistErrorMessage).toBeVisible({ timeout: 5000 });
      await expect(registerPage.userAlreadyExistErrorMessage).toHaveText('User exists!');
  });

 test('should show an error for a weak password', async ({ registerPage }) => {
    await registerPage.goTo();
    await registerPage.pauseForCaptcha();

    // Fill form with weak password using the page object method
    const weakPassword = await registerPage.fillFormWithWeakPassword();
    await registerPage.clickRegister();

    const passwordErrorMessage =
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.";

    await expect(registerPage.weakPasswordError).toBeVisible({ timeout: 5000 });
    await expect(registerPage.weakPasswordError).toHaveText(passwordErrorMessage);

    console.log("Used weak password:", weakPassword);
  });
});