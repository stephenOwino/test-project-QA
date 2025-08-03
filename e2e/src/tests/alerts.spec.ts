import { test, expect } from "../fixtures/baseTest";
import { testData } from "../config/testData"; 

test.describe("ALERTS", () => {
  //navigate to the alerts page before each test
  test.beforeEach(async ({ alertsPage }) => {
    await alertsPage.goTo();
  });

  test("alert button clicked", async ({ alertsPage }) => {
    await alertsPage.alertButtonClicked(testData.alerts.alertButtonMessage);
  });

  test("timer alert appears after 5 seconds", async ({ alertsPage }) => {

    await alertsPage.timerAlertButtonClickedAfter5Seconds(testData.alerts.timerAlertMessage);
  });

  test.describe("Confirm Box", () => {
    test("OK clicked", async ({ alertsPage }) => {
      await alertsPage.handleConfirmBox('accept', testData.alerts.confirmBoxMessage);
      await expect(alertsPage.youSelectedOkText).toHaveText(testData.alerts.confirmOkResult);
    });

    test("Cancel clicked", async ({ alertsPage }) => {
      await alertsPage.handleConfirmBox('dismiss', testData.alerts.confirmBoxMessage);
      await expect(alertsPage.youSelectedCancelText).toHaveText(testData.alerts.confirmCancelResult);
    });
  });

  test("prompt box - enter name and verify result", async ({ alertsPage }) => {
    const testName = testData.alerts.testName; 
    
    await alertsPage.promptButtonClickedAndEnterText(testName, testData.alerts.promptDialogMessage);

    const expectedResult = `${testData.alerts.promptResultPrefix}${testName}`;
    await expect(alertsPage.promptResultElement).toHaveText(expectedResult);
  });
});
