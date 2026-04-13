import { Page, Locator } from "@playwright/test";

export class PayBillsPage {
  //define selectors
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly paySavedPayeeTab: Locator;
  readonly addNewPayeeTab: Locator;
  readonly purchaseCurrencyTab: Locator;
  readonly payButton: Locator;
  readonly firstTabName: string = "Pay Saved Payee";
  readonly secondTabName: string = "Add New Payee";
  readonly thirdTabName: string = "Purchase Foreign Currency";
  readonly firstTabTitle: string = "Make payments to your saved payees";
  readonly secondTabTitle: string = "Who are you paying?";
  readonly thirdTabTitle: string = "Purchase foreign currency cash";
  readonly payeeID: string = "#sp_payee";
  readonly payees: string[] = [
    "Sprint",
    "Bank of America",
    "Apple",
    "Wells Fargo",
  ];
  readonly accounts: string[] = [
    "Savings",
    "Checking",
    "Savings",
    "Loan",
    "Credit Card",
    "Brokerage",
  ];

  //init selectors in constructor
  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByRole("heading", {
      name: "Make payments to your saved payees",
    });
    this.paySavedPayeeTab = page.locator("#tabs>ul>li:first-child");
    this.addNewPayeeTab = page.locator("#tabs>ul>li:nth-child(2)");
    this.purchaseCurrencyTab = page.locator("#tabs>ul>li:nth-child(3)");
    this.payButton = page.getByRole("button", { name: "Pay" });
  }
  //declare methods
  async selectPayee(name: string) {
    switch (name) {
      case "Sprint":
        await this.page.selectOption("#sp_payee", "Sprint");
        break;
      case "Bank of America":
        await this.page.selectOption("#sp_payee", "Bank of America");
        break;
      case "Apple":
        await this.page.selectOption("#sp_payee", "Apple");
        break;
      case "Wells Fargo":
        await this.page.selectOption("#sp_payee", "Wells Fargo");
        break;
      default:
        console.log(`There is no ${name} payee in the list`);
    }
  }

  async getRandomPayee() {
    const index = Math.floor(Math.random() * this.payees.length);
    return this.payees[index];
  }

  async getRandomAccount() {
    return this.accounts[Math.floor(Math.random() * this.accounts.length)];
  }

  async selectRandomAccount() {
    const account = await this.getRandomAccount();
    console.log(`${account} has been selected`);
    await this.page.selectOption("#sp_account", account);
  }

  async setCurrentDate() {
    const currentDate = new Date();
    await this.page.fill("#sp_date", currentDate.toString());
    await this.page.keyboard.press("Escape");
  }

  async addDescription(data: string) {
    await this.page.fill("#sp_description", data);
  }
}
