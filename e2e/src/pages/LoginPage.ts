import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator; 
  readonly invalidUsernameOrPasswordMessage: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.logoutButton = page.locator('#submit:has-text("Log out")');
    this.invalidUsernameOrPasswordMessage = page.locator('#name');
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
}
