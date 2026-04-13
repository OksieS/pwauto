import { test, expect } from "@playwright/test";

test.describe("Currency Exchange Test Suite", () => {
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
    await page.click("#pay_bills_link");
    await page.click("#tabs>ul>li:nth-child(3)>a");
    await page.waitForTimeout(2000);
    await expect(page.locator("#ui-tabs-3>h2")).toContainText(
      "Purchase foreign currency cash",
    );
  });

  test("Excange Currency Test", async ({ page }) => {
    await page.locator("#pc_currency").selectOption({ value: "CAD" });
    (await page.waitForSelector("#sp_sell_rate")).isVisible();
    //await expect(page.locator("#sp_sell_rate")).toBeVisible();
    //await page.waitForTimeout(2000);
    //await page.pause();
    let currencyRate = await page.locator("#sp_sell_rate").textContent();
    console.log(currencyRate);
    const regex = /=\s\d\.\d{4}/;
    const match = currencyRate!.match(regex);
    console.log(`The Currency Rate is ${match}`);
    await page.fill("#pc_amount", "100");
    await page.click("#pc_inDollars_true");
    await page.click("#pc_calculate_costs");

    await page.waitForTimeout(2000);
  });
});
