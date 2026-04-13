import { test, expect } from "@playwright/test";
import { HomePage } from "../../../page-objects/HomePage";
import { LoginPage } from "../../../page-objects/LoginPage";
import { BankingPage } from "../../../page-objects/BankingPage";
import { PayBillsPage } from "../../../page-objects/PayBillsPage";

test.describe("Pay Bills Page Tests", () => {
  let homepage: HomePage;
  let loginPage: LoginPage;
  let bankingPage: BankingPage;
  let payBillsPage: PayBillsPage;

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
    bankingPage = new BankingPage(page);
    payBillsPage = new PayBillsPage(page);

    await homepage.openLoginPage();
    await loginPage.login("username", "password");
    await loginPage.page.waitForLoadState("networkidle");
    await homepage.open();
    await homepage.openBankingPage();
    await bankingPage.openPayBills();
    //await bankingPage.page.waitForTimeout(2000);
  });

  test("PayBillPage Tabs Test", async ({ page }) => {
    let tab1ActualName = await payBillsPage.paySavedPayeeTab.textContent();
    let tab2ActualName = await payBillsPage.addNewPayeeTab.textContent();
    let tab3ActualName = await payBillsPage.purchaseCurrencyTab.textContent();

    console.log(tab1ActualName);
    console.log(tab2ActualName);
    console.log(tab3ActualName);
    expect(tab1ActualName).toContain(payBillsPage.firstTabName);
    expect(tab2ActualName).toContain(payBillsPage.secondTabName);
    expect(tab3ActualName).toContain(payBillsPage.thirdTabName);
  });

  test("Switch Tabs Test", async ({ page }) => {
    let title;
    await test.step("Get the Second Tab Title", async () => {
      await payBillsPage.addNewPayeeTab.click();
      title = await page.locator("#ui-tabs-2>h2").textContent();
      expect(title).toContain(payBillsPage.secondTabTitle);
    });

    await test.step("Get the First Tab Title", async () => {
      await payBillsPage.paySavedPayeeTab.click();
      title = await page.locator("#ui-tabs-1>h2").textContent();
      expect(title).toContain(payBillsPage.firstTabTitle);
    });

    await test.step("Get the Third Tab Title", async () => {
      await payBillsPage.purchaseCurrencyTab.click();
      title = await page.locator("#ui-tabs-3>h2").textContent();
      expect(title).toContain(payBillsPage.thirdTabTitle);
    });
  });

  test.only("Make a Payment Test", async ({ page }) => {
    await test.step("Select Payee", async () => {
      const payee: string = await payBillsPage.getRandomPayee();
      await payBillsPage.selectPayee(payee);
      console.log(`${payee} has been selected`);
      //await page.waitForTimeout(2000);
    });

    await test.step("Select Random Account", async () => {
      await payBillsPage.selectRandomAccount();
      //await page.waitForTimeout(2000);
    });

    await test.step("Set Amount to Pay", async () => {
      await page.fill("#sp_amount", "999");
    });

    await test.step("Set the Payment Date", async () => {
      await payBillsPage.setCurrentDate();
    });

    await test.step("Add a Description", async () => {
      const description = "Payee Test Description";
      await payBillsPage.addDescription(description);
    });

    await test.step("Press the Pay button Test", async () => {
      await payBillsPage.payButton.click();
      //await page.waitForTimeout(3000);
    });

    await test.step("Verify Payment Submited", async () => {
      const expected = "The payment was successfully submitted.";
      await expect(payBillsPage.page.locator("#alert_content")).toContainText(
        expected,
      );
    });
  });
});
