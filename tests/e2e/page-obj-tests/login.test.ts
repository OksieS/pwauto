import { test, expect, Locator } from "@playwright/test";
import { LoginPage } from "../../../page-objects/LoginPage";
//import { login } from "../../helpers";
import { HomePage } from "../../../page-objects/HomePage";
import { BankingPage } from "../../../page-objects/BankingPage";
import { AccountSummaryPage } from "../../../page-objects/AccountSummaryPage";

test.describe("Log in & Log out flow", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let bankingPage: BankingPage;
  let accountSummaryPage: AccountSummaryPage;

  const username: string = "username";
  const password: string = "password";
  const invalidUsername: string = "wrongUsername";
  const invalidPassword: string = "wrongPassword";
  const errorText = "Login and/or password are wrong.";

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = await homePage.openLoginPage();
  });

  test.skip("Invalid Username Test", async ({ page }) => {
    await loginPage.login(invalidUsername, password);
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.errorMSG).toContainText(errorText);
  });

  test.skip("Invalid Password Test", async ({ page }) => {
    await loginPage.login(username, invalidPassword);
    await expect(loginPage.errorMSG).toContainText(errorText);
  });

  test.skip("Log in Test", async ({ page }) => {
    await loginPage.login("username", "password");
    await homePage.open();
    await expect(
      loginPage.page.locator("#settingsBox>ul>li:nth-child(3)>a"),
    ).toContainText(username);
  });

  test.skip("Log out Test", async ({ page }) => {
    await loginPage.login(username, password);
    await homePage.open();
    await expect(
      loginPage.page.locator("#settingsBox>ul>li:nth-child(3)>a"),
    ).toContainText(username);
    await loginPage.logout();
  });

  test("Open Banking Page Test", async ({ page }) => {
    await loginPage.login(username, password);
    await homePage.open();
    bankingPage = await homePage.openBankingPage();
    accountSummaryPage = await bankingPage.openAccountSummary();
    await accountSummaryPage.printHeader();
  });
});
