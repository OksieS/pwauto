import { test, expect, Locator } from "@playwright/test";

test.describe("Log in & Log out flow", () => {
  const baseURL: string = "http://zero.webappsecurity.com/index.html";
  const username: string = "username";
  const invalidUsername: string = "wrongUsername";
  const password: string = "password";
  const invalidPassword: string = "wrongPassword";
  const errorMsg = "Login and/or password are wrong.";
  const successMsg = "";

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test("Invalid Username Test", async ({ page }) => {
    await page.click("#signin_button");
    await page.fill("#user_login", invalidUsername);
    await page.fill("#user_password", password);
    await page.click("text=Sign in");
    await expect(page.locator("#login_form>div:first-child")).toContainText(
      errorMsg,
    );
  });

  test("Invalid Password Test", async ({ page }) => {
    await page.click("#signin_button");
    await page.fill("#user_login", username);
    await page.fill("#user_password", invalidPassword);
    await page.click("text=Sign in");
    await expect(page.locator(".alert-error")).toContainText(errorMsg);
  });

  test.only("Login Test", async ({ page }) => {
    await page.click("#signin_button");
    await page.fill("#user_login", username);
    await page.fill("#user_password", password);
    await page.click("text=Sign in");
    //await page.waitForTimeout(500);
    await page.waitForLoadState("networkidle");
    await page.goto(baseURL);
    await expect(
      page.locator("#settingsBox>ul>li:nth-child(3)>a"),
    ).toContainText(username);
  });
});
