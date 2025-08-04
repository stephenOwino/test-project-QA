// RegisterPage.ts

import { faker } from "@faker-js/faker";
import { expect, Locator, Page } from "@playwright/test";

import { RegisterPageLocators as locators } from "./RegisterPageLocators";

export class RegisterPage {
  readonly backToLoginButton: Locator;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly page: Page;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly registerHeader: Locator;
  readonly userAlreadyExistErrorMessage: Locator;
  readonly userNameInput: Locator;
  readonly weakPasswordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstnameInput = page.locator(locators.firstnameInput);
    this.lastnameInput = page.locator(locators.lastnameInput);
    this.userNameInput = page.locator(locators.userNameInput);
    this.passwordInput = page.locator(locators.passwordInput);
    this.registerButton = page.locator(locators.registerButton);
    this.userAlreadyExistErrorMessage = page.locator(locators.userAlreadyExistErrorMessage);
    this.registerHeader = page.locator(locators.registerHeader.selector, { hasText: locators.registerHeader.text });
    this.backToLoginButton = page.locator(locators.backToLoginButton);
    this.weakPasswordError = page.locator(locators.weakPasswordError);
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async fillFormWithRandomData(): Promise<{ password: string; username: string }> {
    const username = faker.internet.userName({ firstName: `Test` });
    const password = faker.internet.password({ length: 12, prefix: `P@ss` });

    await this.firstnameInput.fill(faker.person.firstName());
    await this.lastnameInput.fill(faker.person.lastName());
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);

    return { password, username };
  }

  async fillFormWithWeakPassword(): Promise<string> {
    const username = faker.internet.userName();
    const weakPassword = faker.string.alpha({ casing: `lower`, length: 5 });

    await this.firstnameInput.fill(faker.person.firstName());
    await this.lastnameInput.fill(faker.person.lastName());
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(weakPassword);

    return weakPassword;
  }

  getRegisterHeader(): Locator {
    return this.registerHeader;
  }

  async goTo(): Promise<void> {
    await this.page.goto(`/register`);
  }

  async isUsernameErrorVisible(): Promise<boolean> {
    return this.userAlreadyExistErrorMessage.isVisible();
  }

  async pauseForCaptcha(): Promise<void> {
    if (await this.page.locator(locators.captchaFrame).isVisible()) {
      console.log(`CAPTCHA detected. Pausing for manual solving...`);
      await this.page.pause();
    }
  }

  async submitAndHandleDialog(expectedMessage: string): Promise<void> {
    const dialogPromise = this.page.waitForEvent(`dialog`);
    await this.registerButton.click();
    const dialog = await dialogPromise;

    expect(dialog.message()).toBe(expectedMessage);
    await dialog.accept();
  }
}
