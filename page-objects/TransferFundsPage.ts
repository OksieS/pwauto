import { Page, Locator } from "@playwright/test";

export class TransferFundsPage {
  //define selectors
  readonly page: Page;
  readonly title: Locator;
  readonly fromAccount: Locator;
  readonly toAccount: Locator;
  readonly amount: Locator;
  readonly description: Locator;
  readonly disclaimer: Locator;
  readonly continueButton: Locator;

  //init selectors in constructor
  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", {
      name: "Transfer Money & Make Payments",
    });
    this.fromAccount = page.locator("#tf_fromAccountId");
    this.toAccount = page.locator("#tf_toAccountId");
    this.amount = page.getByRole("textbox", { name: "amount" });
    this.description = page.getByRole("textbox", { name: "description" });
    this.disclaimer = page.getByRole("heading", { name: /Descriptions/i });
    this.continueButton = page.getByRole("button", { name: "Continue" });
  }
  //declare methods
}
