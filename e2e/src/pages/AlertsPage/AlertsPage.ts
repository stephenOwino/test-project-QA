
import { Page, Locator, expect } from "@playwright/test";
import { AlertsPageLocators as locators } from "./AlertsPageLocators";

export class AlertsPage {
  readonly page: Page;
  readonly alertsButton: Locator;
  readonly timerAlertsButton: Locator;
  readonly youSelectedOkText: Locator;
  readonly youSelectedCancelText: Locator;
  readonly promtButton: Locator;
  readonly promptResultElement: Locator;

  constructor(page: Page) {
    this.page = page;

    this.alertsButton = page.locator(locators.alertsButton);
    this.timerAlertsButton = page.locator(locators.timerAlertsButton);
    this.youSelectedOkText = page.locator(locators.youSelectedOkText);
    this.youSelectedCancelText = page.locator(locators.youSelectedCancelText);
    this.promtButton = page.locator(locators.promtButton);
    this.promptResultElement = page.locator(locators.promptResultElement);
  }

  async goTo(): Promise<void> {
    await this.page.goto("/alerts");
  }

  async alertButtonClicked(dialogMessage: string): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      // Optionally verify the message
      expect(dialog.message()).toBe(dialogMessage);
      await dialog.accept();
    });

    await this.alertsButton.click();
  }

  async timerAlertButtonClickedAfter5Seconds(dialogMessage: string): Promise<void> {
  this.page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe(dialogMessage);
    await dialog.accept();
  });

  await this.timerAlertsButton.click();
}

}

