import { Page, Locator } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class AccountSummaryPage extends AbstractPage {
  //define selectors
  //readonly page: Page;
  readonly cashAccountsHeader: Locator;
  readonly investmentAccountsHeader: Locator;
  readonly creditAccountsHeader: Locator;

  //init selectors in constructor
  constructor(page: Page) {
    super(page);
    this.cashAccountsHeader = page.getByRole("heading", {
      name: "Cash Accounts",
    });
    this.investmentAccountsHeader = page.getByRole("heading", {
      name: "Investment Accounts",
    });
    this.creditAccountsHeader = page.getByRole("heading", {
      name: "Credit Accounts",
    });
  }
  //declare methods
  async printHeader() {
    console.log(await this.cashAccountsHeader.textContent());
    console.log(await this.creditAccountsHeader.textContent());
    console.log(await this.investmentAccountsHeader.textContent());
  }
}
