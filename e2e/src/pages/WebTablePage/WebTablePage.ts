import { Locator,Page,expect } from "@playwright/test";
import { WebTableLocators as locators} from "./WebTableLocators";
import { faker } from "@faker-js/faker";

export class WebTablesPage {
    readonly page :Page;
    readonly tableHeader: Locator;
    readonly addNewRecordButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly ageInput: Locator;
    readonly salaryInput: Locator;
    readonly departmentInput: Locator;
    readonly submitButton: Locator;
    readonly rowLocator: Locator;

    readonly deleteIcon: Locator;

    constructor(page : Page){
        this.page = page;
        this.tableHeader = page.locator(locators.tableHeader);
        this.addNewRecordButton = page.locator(locators.addNewRecordButton);
        this.firstNameInput = page.locator(locators.firstNameInput);
        this.lastNameInput = page.locator(locators.lastNameInput);
        this.emailInput = page.locator(locators.emailInput);
        this.ageInput = page.locator(locators.ageInput);
        this.salaryInput = page.locator(locators.salaryInput);
        this.departmentInput = page.locator(locators.departmentInput);
        this.submitButton = page.locator(locators.submitButton);
        this.rowLocator = page.locator(locators.rowLocator);
        this.deleteIcon = page.locator(locators.deleteIcon);

    }

    async goTo(): Promise<void>{
        await this.page.goto("/webtables", { waitUntil: "networkidle" })
    }

    async assertWebTableHeaderDisplayed(expectedText: string): Promise<void>{
        await expect(this.tableHeader).toBeVisible();
        await expect(this.tableHeader).toHaveText(expectedText);


    }

    async clickAddNewRecordButton(): Promise<{firstName: string;lastName: string;email: string;age: string;salary: string;department: string; }> {
    await expect(this.addNewRecordButton).toBeVisible();
    await this.addNewRecordButton.click();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const age = faker.number.int({ min: 18, max: 65 }).toString();
    const salary = faker.number.int({ min: 30000, max: 120000 }).toString();
    const department = faker.commerce.department();

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.ageInput.fill(age);
    await this.salaryInput.fill(salary);
    await this.departmentInput.fill(department);
    await this.submitButton.click();

      return { firstName, lastName, email, age, salary, department };

}


async assertRecordExists(record: { firstName: string;lastName: string;email: string; age: string;salary: string;department: string;}): Promise<void> {
    const { firstName, lastName, email, age, salary, department } = record;

  const row = this.page.locator(`.rt-tr-group:has-text("${firstName}"):has-text("${lastName}"):has-text("${email}"):has-text("${age}"):has-text("${salary}"):has-text("${department}")`);

  await expect(row).toBeVisible();
}


async deleteRecord(record: { firstName: string;lastName: string;email: string;age: string;salary: string; department: string}): Promise<void> {
  const row = this.page.locator(
    `.rt-tr-group:has-text("${record.firstName}"):has-text("${record.lastName}"):has-text("${record.email}")`
  );

   const deleteButton = row.locator('[id^="delete-record"]');
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
}

async assertRecordNotExists(record: {firstName: string;lastName: string;email: string;}): Promise<void> {
  const row = this.page.locator(
    `.rt-tr-group:has-text("${record.firstName}"):has-text("${record.lastName}"):has-text("${record.email}")`
  );

  await expect(row).toHaveCount(0);
}
}

