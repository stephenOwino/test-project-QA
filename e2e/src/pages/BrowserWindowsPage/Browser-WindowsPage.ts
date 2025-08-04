import { expect, Locator, Page } from "@playwright/test";

import { BrowserWindowsLocators as locators } from "./Browser-WindowsLocators";

export class BrowserWindowsPage {
  readonly browserHeader: Locator;
  readonly newTabButton: Locator;
  readonly newWindowButton: Locator;
  readonly newWindowMessage: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.browserHeader = page.locator(locators.browserHeader);
    this.newTabButton = page.locator(locators.newTabButton);
    this.newWindowButton = page.locator(locators.newWindowButton);
    this.newWindowMessage = page.locator(locators.newWindowMessage);
  }

  async assertBrowserHeaderDisplayed(expectedText: string): Promise<void> {
    await expect(this.browserHeader).toBeVisible();
    await expect(this.browserHeader).toHaveText(expectedText);
  }

  async clickNewTabAndVerifyText(expectedText: string): Promise<void> {
    await this.page.pause();
    const [newPage] = await Promise.all([
      this.page.waitForEvent(`popup`),
      // Click the button
      this.newTabButton.click(),
    ]);

    await expect(newPage.locator(`body`)).toContainText(expectedText);
    await newPage.close();
  }
  async clickNewWindowAndVerifyText(expectedText: string): Promise<void> {
    const [newWindow] = await Promise.all([this.page.waitForEvent(`popup`), this.newWindowButton.click()]);

    await expect(newWindow.locator(`body`)).toContainText(expectedText);

    await newWindow.close();
  }
  async goTo(): Promise<void> {
    await this.page.goto(`/browser-windows`);
  }

  async newWindowMessageClickedAndVerifyText(expectedText: string): Promise<void> {
    const [newWindow] = await Promise.all([this.page.waitForEvent(`popup`), this.newWindowMessage.click()]);

    // This popup does not have a "body" tag. It is a very simple window.
    // We will locate the single element on the page and verify its text.
    await expect(newWindow.locator(`body`)).toHaveText(expectedText);

    await newWindow.close();
  }
}
