// RegisterPage.ts

import { Locator, Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { RegisterPageLocators as locators } from "./RegisterPageLocators";

export class RegisterPage {
  readonly page: Page;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly userAlreadyExistErrorMessage: Locator;
  readonly backToLoginButton: Locator;
  readonly registerHeader: Locator;
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

  async goTo(): Promise<void> {
    await this.page.goto("/register");
  }

  async pauseForCaptcha(): Promise<void> {
    if (await this.page.locator(locators.captchaFrame).isVisible()) {
      console.log('CAPTCHA detected. Pausing for manual solving...');
      await this.page.pause();
    }
  }

  async fillFormWithRandomData(): Promise<{ username: string; password: string }> {
    const username = faker.internet.userName({ firstName: 'Test' });
    const password = faker.internet.password({ length: 12, prefix: 'P@ss' });

    await this.firstnameInput.fill(faker.person.firstName());
    await this.lastnameInput.fill(faker.person.lastName());
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);

    return { username, password };
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }

  async submitAndHandleDialog(expectedMessage: string): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.registerButton.click();
    const dialog = await dialogPromise;

    expect(dialog.message()).toBe(expectedMessage);
    await dialog.accept();
  }

  async isUsernameErrorVisible(): Promise<boolean> {
    return this.userAlreadyExistErrorMessage.isVisible();
  }

  getRegisterHeader(): Locator {
    return this.registerHeader;
  }

  async fillFormWithWeakPassword(): Promise<string> {
    const username = faker.internet.userName();
    const weakPassword = faker.string.alpha({ length: 5, casing: 'lower' });

    await this.firstnameInput.fill(faker.person.firstName());
    await this.lastnameInput.fill(faker.person.lastName());
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(weakPassword);

    return weakPassword;
  }
}
