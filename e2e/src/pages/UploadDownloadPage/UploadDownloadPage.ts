// src/pages/UploadDownloadPage/UploadDownloadPage.ts

import { Locator, Page, expect } from "@playwright/test";
import { UploadDownloadLocators as locators } from "./UploadDownloadLocators";
import * as fs from 'fs';
import * as path from 'path';

export class UploadDownloadPage {
  readonly page: Page;
  readonly header: Locator;
  readonly downloadButton: Locator;
  readonly uploadInput: Locator;
  readonly selectFileLabel: Locator;
  readonly uploadedFilePath: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator(locators.header);
    this.downloadButton = page.locator(locators.downloadButton);
    this.uploadInput = page.locator(locators.uploadFile);
    this.selectFileLabel = page.locator(locators.selectFileLabel);
    this.uploadedFilePath = page.locator(locators.uploadedFilePath);
  }

  async goTo(): Promise<void> {
    await this.page.goto("/upload-download");
  }

  async verifyHeader(expectedText: string): Promise<void> {
    await expect(this.header).toBeVisible();
    await expect(this.header).toHaveText(expectedText);
  }

  async downloadFileAndVerify(buttonText: string, expectedFileName: string, savePath: string): Promise<void> {
    await expect(this.downloadButton).toBeVisible();
    await expect(this.downloadButton).toHaveText(buttonText);

    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.downloadButton.click()
    ]);

    const suggestedName = download.suggestedFilename();
    expect(suggestedName).toBe(expectedFileName);

    
    fs.mkdirSync(path.dirname(savePath), { recursive: true });

    await download.saveAs(savePath);
    console.log(`Downloaded file saved to: ${savePath}`);
  }

  async uploadFileAndVerify(absolutePath: string, expectedMessage: string): Promise<void> {
    await this.uploadInput.setInputFiles(absolutePath);
    await expect(this.uploadedFilePath).toBeVisible();
    await expect(this.uploadedFilePath).toHaveText(expectedMessage);
  }
}
