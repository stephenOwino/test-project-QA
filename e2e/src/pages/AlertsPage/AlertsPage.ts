import { expect, Locator, Page } from "@playwright/test";

import { AlertsPageLocators as locators } from "./AlertsPageLocators";

export class AlertsPage {
  readonly alertsButton: Locator;
  readonly confirmBoxButton: Locator;
  readonly page: Page;
  readonly promptResultElement: Locator;
  readonly promtButton: Locator;
  readonly timerAlertsButton: Locator;
  readonly youSelectedCancelText: Locator;
  readonly youSelectedOkText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.alertsButton = page.locator(locators.alertsButton);
    this.timerAlertsButton = page.locator(locators.timerAlertsButton);
    this.confirmBoxButton = page.locator(locators.confirmBoxButton);
    this.youSelectedOkText = page.locator(locators.youSelectedOkText);
    this.youSelectedCancelText = page.locator(locators.youSelectedCancelText);
    this.promtButton = page.locator(locators.promtButton);
    this.promptResultElement = page.locator(locators.promptResultElement);
  }

  async alertButtonClicked(dialogMessage: string): Promise<void> {
    this.page.once(`dialog`, async (dialog) => {
      // verify the message
      expect(dialog.message()).toBe(dialogMessage);
      await dialog.accept();
    });

    await this.alertsButton.click();
  }

  async goTo(): Promise<void> {
    await this.page.goto(`/alerts`);
  }

  //handling both accept and dismiss for the confirm box
  async handleConfirmBox(action: `accept` | `dismiss`, dialogMessage: string): Promise<void> {
    this.page.once(`dialog`, async (dialog) => {
      expect(dialog.message()).toBe(dialogMessage);
      if (action === `accept`) {
        // Simulates clicking OK
        await dialog.accept();
      } else {
        // Simulates clicking Cancel
        await dialog.dismiss();
      }
    });
    // Trigger the confirm dialog
    await this.confirmBoxButton.click();
  }

  // Method for handling the prompt dialog
  async promptButtonClickedAndEnterText(name: string, dialogMessage: string): Promise<void> {
    this.page.once(`dialog`, async (dialog) => {
      expect(dialog.message()).toBe(dialogMessage);
      // Enter the provided name "stephen" into the prompt
      await dialog.accept(name);
      // await dialog.accept();
    });
    // Click the prompt button to trigger the dialog
    await this.promtButton.click();
  }
  async timerAlertButtonClickedAfter5Seconds(dialogMessage: string): Promise<void> {
    this.page.once(`dialog`, async (dialog) => {
      expect(dialog.message()).toBe(dialogMessage);
      await dialog.accept();
    });

    await this.timerAlertsButton.click();
  }
}
