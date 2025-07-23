import {test,expect} from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { faker, Faker } from "@faker-js/faker";

test ("Register user test ", async ({page}) =>{

    const MAX_RETRIES = 3;
    const password = faker.internet.password();
    const registerPage = new RegisterPage(page)

    for(let i = 0; i<= MAX_RETRIES; i++){
        let username= faker.internet.username()
        await registerPage.goTo()
        await registerPage.registerToBookStoreText()
        await registerPage.fillForm()
        await registerPage.fillCredentials(username,password)
        await registerPage.submitAndVerifyDialog("User Register Successfully.")
        await registerPage.isUsernameErrorVissible()
        await page.waitForLoadState('networkidle')

    }
//     registerPage.goTo();
    
//     await expect(page.locator('h4')).toContainText('Register to Book Store');
//     registerPage.fillForm();
//     await page.locator('#userName').fill('steve@12345');
//     await page.locator('#password').fill('Steve@123');
//     await page.locator('iframe[name="a-x4165od0wbg3"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
//     await page.locator('div').filter({ hasText: /^Register$/ }).click();
//     await expect(page.locator('#name')).toContainText('Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer.');
//     await page.getByRole('button', { name: 'Register' }).click();
 });
