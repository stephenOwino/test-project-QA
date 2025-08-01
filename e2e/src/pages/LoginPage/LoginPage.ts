import { Locator, Page, expect } from "@playwright/test";
import { LoginPageLocators as locators } from "./LoginPageLocators";

export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly invalidUsernameOrPasswordMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator(locators.userNameInput);
    this.passwordInput = page.locator(locators.passwordInput);
    this.loginButton = page.locator(locators.loginButton);
    this.logoutButton = page.locator(locators.logoutButton);
    this.invalidUsernameOrPasswordMessage = page.locator(locators.invalidUsernameOrPasswordMessage);
  }

  async goTo(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(username: string, password: string): Promise<void> {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectToBeLoggedIn(): Promise<void> {
    await expect(this.logoutButton).toBeVisible();
    await expect(this.page).not.toHaveURL('/login');
  }

  async expectInvalidUserOrPassMessage(): Promise<void> {
    await expect(this.invalidUsernameOrPasswordMessage).toBeVisible();
    await expect(this.invalidUsernameOrPasswordMessage).toHaveText('Invalid username or password!');
  }

  async getLoggedInUsername(): Promise<string | null> {
    const usernameElement = this.page.locator(locators.loggedInUsernameDisplay);
    return usernameElement.textContent();
  }
}