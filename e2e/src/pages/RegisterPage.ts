import { Locator, Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

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
  readonly weakPasswordError :Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstnameInput = page.locator('#firstname');
    this.lastnameInput = page.locator('#lastname');
    this.userNameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.userAlreadyExistErrorMessage = page.locator('#name');
    this.registerHeader = page.locator('h4', { hasText: 'Register to Book Store' });
    this.backToLoginButton = page.getByRole('button', { name: 'Back to Login' });
    this.weakPasswordError = page.locator('p#name');
  }

  async goTo(): Promise<void> {
    await this.page.goto("/register");
  }

  async pauseForCaptcha(): Promise<void> {
    const captchaSelector = 'iframe[title="reCAPTCHA"]';
    if (await this.page.locator(captchaSelector).isVisible()) {
      console.log('CAPTCHA detected. Pausing for manual solving...');
      await this.page.pause();
    }
  }

  async fillFormWithRandomData(): Promise<{ username: string; password: string }> {
    const username = faker.internet.username({ firstName: 'Test' });
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
    const username = faker.internet.username();
    // Weak password:lowercase letters, 5 chars
    const weakPassword = faker.string.alpha({ length: 5, casing: 'lower' });

    await this.firstnameInput.fill(faker.person.firstName());
    await this.lastnameInput.fill(faker.person.lastName());
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(weakPassword);

    return weakPassword;
  }
}