import { test, expect } from "../fixtures/baseTest";

test.describe("ALERTS", () => {
  //navigate to the alerts page before each test
  test.beforeEach(async ({ alertsPage }) => {
    await alertsPage.goTo();
  });

  test("alert button clicked", async ({ alertsPage }) => {
    await alertsPage.alertButtonClicked("You clicked a button");
  });

  test("timer alert appears after 5 seconds", async ({ alertsPage }) => {
    await alertsPage.timerAlertButtonClickedAfter5Seconds("This alert appeared after 5 seconds");
  });


  test.describe("Confirm Box", () => {
    test("OK clicked", async ({ alertsPage }) => {
      await alertsPage.handleConfirmBox('accept', "Do you confirm action?");
      await expect(alertsPage.youSelectedOkText).toHaveText("You selected Ok");
    });

    test("Cancel clicked", async ({ alertsPage }) => {
      await alertsPage.handleConfirmBox('dismiss', "Do you confirm action?");
      await expect(alertsPage.youSelectedCancelText).toHaveText("You selected Cancel");
    });
  });
});
