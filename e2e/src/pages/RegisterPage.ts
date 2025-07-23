import { Locator,Page,expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class RegisterPage{
    readonly page: Page;
    readonly firstname: Locator;
    readonly lastname:Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly registerButton: Locator;
    readonly userAlreadyExistError: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstname = page.locator('#firstname');
        this.lastname = page.locator('#lastname');
        this.userName = page.locator('#userName');
        this.password = page.locator('#password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.userAlreadyExistError = page.locator('p#name.mb-1')

    }

    async goTo() {
        await this.page.goto("/register")
    }

    async registerToBookStoreText(){
        const headerText = await this.page.locator('h4').textContent()

        if(headerText){
          expect(headerText.includes('Register to Book Store')).toBe(true);
        }
    }

    async fillForm(){
        await this.firstname.fill(faker.person.firstName());
        await this.lastname.fill(faker.person.lastName())
    }
    async fillCredentials(username: string, password: string){
        await this.userName.fill(username);
        await this.password.fill(password)
    
    }
   
/**
 * Clicks the register button, waits for the confirmation dialog to appear,
 * avoids race conditions by handling the action and its resulting event together.
 */
async submitAndVerifyDialog(expectedMessage: string) {
  const [dialog] = await Promise.all([
    this.page.waitForEvent('dialog'),
    this.registerButton.click(),
  ]);

  expect(dialog.message()).toBe(expectedMessage);

  await dialog.accept();
}
  

async isUsernameErrorVissible(){
    return await this.userAlreadyExistError.isVisible()
}
} 
