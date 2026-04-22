import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { BankingPage } from "../../page-objects/BankingPage";
import { TransferFundsPage } from "../../page-objects/TransferFundsPage";

test.describe("Transfer Funds Test", () => {
  let homepage: HomePage;
  let loginPage: LoginPage;
  let bankingPage: BankingPage;
  let transferPage: TransferFundsPage;

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
    bankingPage = new BankingPage(page);
    transferPage = new TransferFundsPage(page);

    await homepage.open();
    await homepage.openLoginPage();
    await loginPage.login("username", "password");
    await homepage.page.waitForLoadState("networkidle");
    await homepage.open();
    await homepage.openBankingPage();
    await bankingPage.openTransferFunds();
  });

  test.only("Transfer Money Test", async ({ page }) => {
    transferPage.selectRandomFromAccount();
    transferPage.selectRandomToAccount();
    await transferPage.page.waitForTimeout(2000);
    await transferPage.amount.fill("100");
    await transferPage.descriptionField.fill("Test Transfer");
    await transferPage.continueButton.click();
    await transferPage.page.waitForTimeout(2000);
    await transferPage.page.getByRole("button", { name: "Submit" }).click();
    //await transferPage.page.waitForTimeout(2000);
    await expect(
      transferPage.page.getByText(
        "You successfully submitted your transaction.",
      ),
    ).toBeVisible();
  });
});
