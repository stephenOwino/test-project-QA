import { test, expect } from "../fixtures/baseTest";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/LoginPage/LoginPage";

test.describe("Login and Authentication Features", () => {
  test("should display correct profile info for logged-in user", async ({ authenticatedPage }) => {
    const loginPage = new LoginPage(authenticatedPage);
    const username = await loginPage.getLoggedInUsername();
    expect(username).toBe(process.env.VALID_USERNAME);

    await authenticatedPage.goto("/profile");
  });

  test("should display invalid login message on incorrect credentials", async ({ loginPage }) => {
    await loginPage.goTo();

    const invalidUsername = faker.internet.userName();
    const invalidPassword = faker.internet.password();

    await loginPage.login(invalidUsername, invalidPassword);
    await loginPage.expectInvalidUserOrPassMessage();
  });
});


