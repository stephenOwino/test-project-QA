import { test, expect } from "../fixtures/baseTest";


test.describe("ALERTS", () => {
test("alert button clicked", async ({ alertsPage }) => {
  await alertsPage.goTo();

  await alertsPage.alertButtonClicked("You clicked a button");
});

test("timer alert appears after 5 seconds", async ({ alertsPage }) => {
  await alertsPage.goTo();

  await alertsPage.timerAlertButtonClickedAfter5Seconds("This alert appeared after 5 seconds");
});
});

