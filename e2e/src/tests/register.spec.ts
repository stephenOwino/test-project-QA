import {test,expect} from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";

test ("Register user test ", async ({page}) =>{
    const registerPage = new RegisterPage(page)
    registerPage.goTo()
    await expect(page.locator('h4')).toContainText('Register to Book Store');
    await page.locator('#firstname').fill('stephenotieno');
    await page.locator('#lastname').fill('owino');
    await page.locator('#userName').fill('steve@12345');
    await page.locator('#password').fill('Steve@123');
    await page.locator('iframe[name="a-x4165od0wbg3"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
    await page.locator('div').filter({ hasText: /^Register$/ }).click();
    await expect(page.locator('#name')).toContainText('Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer.');
    await page.getByRole('button', { name: 'Register' }).click();
});
