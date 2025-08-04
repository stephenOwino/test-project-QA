
import { expect, Locator, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

import { UploadDownloadLocators as locators } from "./UploadDownloadLocators";

export class UploadDownloadPage {
  readonly downloadButton: Locator;
  readonly header: Locator;
  readonly page: Page;
  readonly selectFileLabel: Locator;
  readonly uploadedFilePath: Locator;
  readonly uploadInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator(locators.header);
    this.downloadButton = page.locator(locators.downloadButton);
    this.uploadInput = page.locator(locators.uploadFile);
    this.selectFileLabel = page.locator(locators.selectFileLabel);
    this.uploadedFilePath = page.locator(locators.uploadedFilePath);
  }

  async goTo(): Promise<void> {
    await this.page.goto(`/upload-download`, { waitUntil: "networkidle" });
  }

  async downloadFileAndVerify(
    buttonText: string,
    expectedFileName: string,
    savePath: string
  ): Promise<void> {
    await expect(this.downloadButton).toBeVisible();
    await expect(this.downloadButton).toHaveText(buttonText);

    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.downloadButton.click(),
    ]);

    const suggestedName = download.suggestedFilename();
    expect(suggestedName).toBe(expectedFileName);

    const dirPath = path.dirname(path.resolve(savePath));
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      await download.saveAs(savePath);
      console.log(`Downloaded file saved to: ${savePath}`);
    } catch (error) {
      console.error(`Failed to save downloaded file: ${error}`);
      throw error;
    }
  }

  async uploadFileAndVerify(absolutePath: string, expectedMessage: string): Promise<void> {
    await this.uploadInput.setInputFiles(absolutePath);
    await expect(this.uploadedFilePath).toBeVisible();
    await expect(this.uploadedFilePath).toHaveText(expectedMessage);
  }

  async verifyHeader(expectedText: string): Promise<void> {
    await expect(this.header).toBeVisible();
    await expect(this.header).toHaveText(expectedText);
  }
}

