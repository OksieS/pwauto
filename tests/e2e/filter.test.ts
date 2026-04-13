import { test, expect } from "@playwright/test";

test.describe("Filter Transaction Test", () => {
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
    await page.click("#account_activity_link");
    await expect(page.locator(".board-header")).toContainText(
      "Show Transaction",
    );
  });

  test("View Account Data", async ({ page }) => {
    await page.selectOption("#aa_accountId", "4");
    const loanAccount = page.locator("#all_transactions_for_account tbody tr");
    await expect(loanAccount).toHaveCount(2);
  });
});
