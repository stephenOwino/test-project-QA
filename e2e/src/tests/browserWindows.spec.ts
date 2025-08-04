import { testData } from "../config/testData";
import { test } from "../fixtures/baseTest";

test.describe(`Browser Windows Functionality`, () => {
  test.beforeEach(async ({ browserWindowsPage }) => {
    await browserWindowsPage.goTo();
  });

  test(`should display the Browser Windows page header`, async ({ browserWindowsPage }) => {
    await browserWindowsPage.assertBrowserHeaderDisplayed(testData.browserWindow.browserHeader);
  });

  test(`should open a new tab and display expected text`, async ({ browserWindowsPage }) => {
    await browserWindowsPage.clickNewTabAndVerifyText(testData.browserWindow.samplePageMessage);
  });

  test(`should open a new window and display expected text`, async ({ browserWindowsPage }) => {
    await browserWindowsPage.clickNewWindowAndVerifyText(testData.browserWindow.samplePageMessage);
  });
  test(`should open a message window and display specific text`, async ({ browserWindowsPage }) => {
    await browserWindowsPage.newWindowMessageClickedAndVerifyText(testData.browserWindow.newWindowMessageText);
  });
});
