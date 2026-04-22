import { Page, Locator } from "@playwright/test";

export class TransferFundsPage {
  //define selectors
  readonly page: Page;
  readonly title: Locator;
  readonly fromAccount: Locator;
  readonly toAccount: Locator;
  readonly amount: Locator;
  readonly descriptionField: Locator;
  readonly disclaimer: Locator;
  readonly continueButton: Locator;
  readonly accounts: string[] = [
    "Savings(Avail. balance = $ 1000)",
    "Checking(Avail. balance = $ -500.2)",
    "Savings(Avail. balance = $ 1548)",
    "Loan(Avail. balance = $ 780)",
    "Credit Card(Avail. balance = $ -265)",
    "Brokerage(Avail. balance = $ 197)",
  ];

  //init selectors in constructor
  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", {
      name: "Transfer Money & Make Payments",
    });
    this.fromAccount = page.locator("#tf_fromAccountId");
    this.toAccount = page.locator("#tf_toAccountId");
    this.amount = page.getByRole("textbox", { name: "amount" });
    this.descriptionField = page.getByRole("textbox", { name: "description" });
    this.disclaimer = page.getByRole("heading", { name: /Descriptions/i });
    this.continueButton = page.getByRole("button", { name: "Continue" });
  }
  //declare methods
  async getRandomAccount() {
    const index = Math.floor(Math.random() * this.accounts.length);
    return this.accounts[index];
  }

  async selectRandomFromAccount() {
    const account = await this.getRandomAccount();
    console.log(`${account} has been selected`);
    await this.page.selectOption("#tf_fromAccountId", account);
  }

  async selectRandomToAccount() {
    const account = await this.getRandomAccount();
    console.log(`${account} has been selected`);
    await this.page.selectOption("#tf_toAccountId", account);
  }

  async getAccountBalance() {
    const accountData = await this.fromAccount.textContent();
    const availableBalance = accountData?.match(/-?\d+\.\d*/g);
    console.log(`Available Balance is ${availableBalance}`);
  }
}
