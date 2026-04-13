import { test, expect } from "@playwright/test";
test.describe("Payment Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");

    await page.click("#signin_button");
    await page.fill("#user_login", "username");
    await page.fill("#user_password", "password");
    await page.click("text=Sign in");
    //await page.waitForTimeout(500);
    await page.waitForLoadState("networkidle");
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#onlineBankingMenu");
    await page.click("#pay_bills_tab");
    await expect(page.locator(".board-header")).toContainText(
      "Make payments to your saved payees",
    );
  });

  test("Make a Payment Test", async ({ page }) => {
    await page.selectOption("#sp_payee", "Bank of America");
    await page.selectOption("#sp_account", "Credit Card");
    await page.fill("sp_amount", "300");
    await page.fill("sp_date", "2026-02-25");
    await page.fill("sp_description", "Custome Description");
    await expect(page.locator("#alert_content")).toContainText(
      "The payment was successfully submitted.",
    );
  });

  test("Empty Amount Field Test", async ({ page }) => {
    await page.selectOption("#sp_payee", "Bank of America");
    await page.selectOption("#sp_account", "Credit Card");
    //await page.fill("", "300");
    await page.fill("sp_date", "2026-02-25");
    await page.fill("sp_description", "Custome Description");
    await expect(page.locator("#alert_content")).not.toBeVisible();
  });
});
