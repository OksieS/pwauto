import { test, expect } from "@playwright/test";

test.describe("Transfer Money Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button");
    await page.fill("#user_login", "username");
    await page.fill("#user_password", "password");
    await page.click("text=Sign in");
    //await page.waitForTimeout(500);
    await page.waitForLoadState("networkidle");
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#transfer_funds_link");
    await page.waitForTimeout(500);
  });

  test("Make Payment Test", async ({ page }) => {
    await page.selectOption("#tf_fromAccountId", "3");
    await page.selectOption("#tf_toAccountId", "5");
    await page.fill("#tf_amount", "300");
    await page.fill("#tf_description", "Credit Card Payout");
    await page.click("#btn_submit");
    await page.click("#btn_submit");
    await expect(page.locator(".alert")).toContainText(
      "You successfully submitted your transaction.",
    );
    await page.waitForTimeout(2000);
  });
});
