import { Locator,Page,expect } from "@playwright/test";
import faker from "@faker-js/faker"

export class RegisterPage{
    readonly page: Page;
    readonly firstname: Locator;
    readonly lastname:Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly registerButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstname = page.locator('#firstname');
        this.lastname = page.locator('#lastname');
        this.userName = page.locator('#userName');
        this.password = page.locator('#password');
        this.registerButton = page.getByRole('button', { name: 'Register' });

    }

    async goTo() {
        await this.page.goto("/register")
    }

 
}