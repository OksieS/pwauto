import { test, expect } from "@playwright/test";
import { HomePage } from "../../../page-objects/HomePage";
import { LoginPage } from "../../../page-objects/LoginPage";
import { BankingPage } from "../../../page-objects/BankingPage";
import { AccountActivityPage } from "../../../page-objects/AccountActivityPage";

test.describe("Account Activity Tab Tests", () => {
  let homepage: HomePage;
  let loginPage: LoginPage;
  let bankingPage: BankingPage;
  let accountActivity: AccountActivityPage;

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
    bankingPage = new BankingPage(page);
    accountActivity = new AccountActivityPage(page);
    await homepage.open();
    await homepage.openLoginPage();
    await loginPage.login("username", "password");
    await page.waitForTimeout(1000);
    await homepage.open();
    await homepage.openBankingPage();
    await bankingPage.openAccountActivity();
    await page.waitForTimeout(1000);
  });

  test("Account Activity Page Tabs are visible", async ({ page }) => {
    await expect(accountActivity.showTransactinTab).toBeVisible();
    await expect(accountActivity.findTransactionTab).toBeVisible();
  });

  test("Show Transaction is a Default Tab", async ({ page }) => {
    await expect(accountActivity.showTabTitle).toBeVisible();
    await expect(accountActivity.accountLabel).toBeVisible();
  });

  test("Show Checking account transactions", async ({ page }) => {
    await accountActivity.page.selectOption("#aa_accountId", "Checking");
    await accountActivity.page.waitForTimeout(2000);
  });

  test("Find Transaction by Description", async ({ page }) => {
    await accountActivity.findTransactionTab.click();
    await accountActivity.descriptionField.fill(
      "Find Transaction by Description",
    );
    await accountActivity.findButton.click();
    await accountActivity.page.waitForTimeout(2000);
  });

  test("Find Transaction by Dates", async ({ page }) => {
    await accountActivity.findTransactionTab.click();
    await accountActivity.dateFromField.fill("2012-09-01");
    await accountActivity.dateToField.fill("2012-09-06");
    await accountActivity.findButton.click();
    await accountActivity.page.waitForTimeout(2000);
  });

  test("Find Transaction by Amount", async ({ page }) => {
    await accountActivity.findTransactionTab.click();
    await accountActivity.page.waitForTimeout(2000);
    await accountActivity.amountFrom.fill("900");
    await accountActivity.amountTo.fill("990");
    await accountActivity.findButton.click();
    await accountActivity.page.waitForTimeout(2000);
  });
});
