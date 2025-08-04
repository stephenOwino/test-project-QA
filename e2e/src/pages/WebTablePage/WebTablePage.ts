import { faker } from "@faker-js/faker";
import { expect, Locator, Page } from "@playwright/test";

import { WebTableLocators as locators } from "./WebTableLocators";

export class WebTablesPage {
  readonly addNewRecordButton: Locator;
  readonly ageInput: Locator;
  readonly deleteIcon: Locator;
  readonly departmentInput: Locator;
  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly page: Page;
  readonly rowLocator: Locator;
  readonly salaryInput: Locator;
  readonly submitButton: Locator;
  readonly tableHeader: Locator;

  constructor(page: Page) {
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

  async assertRecordExists(record: {
    age: string;
    department: string;
    email: string;
    firstName: string;
    lastName: string;
    salary: string;
  }): Promise<void> {
    const { age, department, email, firstName, lastName, salary } = record;

    const row = this.page.locator(
      `.rt-tr-group:has-text("${firstName}"):has-text("${lastName}"):has-text("${email}"):has-text("${age}"):has-text("${salary}"):has-text("${department}")`,
    );

    await expect(row).toBeVisible();
  }

  async assertRecordNotExists(record: { email: string; firstName: string; lastName: string }): Promise<void> {
    const row = this.page.locator(
      `.rt-tr-group:has-text("${record.firstName}"):has-text("${record.lastName}"):has-text("${record.email}")`,
    );

    await expect(row).toHaveCount(0);
  }

  async assertWebTableHeaderDisplayed(expectedText: string): Promise<void> {
    await expect(this.tableHeader).toBeVisible();
    await expect(this.tableHeader).toHaveText(expectedText);
  }

  async clickAddNewRecordButton(): Promise<{
    age: string;
    department: string;
    email: string;
    firstName: string;
    lastName: string;
    salary: string;
  }> {
    await expect(this.addNewRecordButton).toBeVisible();
    await this.addNewRecordButton.click();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const age = faker.number.int({ max: 65, min: 18 }).toString();
    const salary = faker.number.int({ max: 120000, min: 30000 }).toString();
    const department = faker.commerce.department();

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.ageInput.fill(age);
    await this.salaryInput.fill(salary);
    await this.departmentInput.fill(department);
    await this.submitButton.click();

    return { age, department, email, firstName, lastName, salary };
  }

  async deleteRecord(record: {
    age: string;
    department: string;
    email: string;
    firstName: string;
    lastName: string;
    salary: string;
  }): Promise<void> {
    const row = this.page.locator(
      `.rt-tr-group:has-text("${record.firstName}"):has-text("${record.lastName}"):has-text("${record.email}")`,
    );

    const deleteButton = row.locator(`[id^="delete-record"]`);
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
  }

  async goTo(): Promise<void> {
    await this.page.goto(`/webtables`, { waitUntil: `networkidle` });
  }
}
