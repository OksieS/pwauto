import { expect, Locator, Page } from "@playwright/test";
//import { LoginPage } from "./LoginPage";
import { AccountSummaryPage } from "./AccountSummaryPage";
import { AccountActivityPage } from "./AccountActivityPage";
import { PayBillsPage } from "./PayBillsPage";

export class BankingPage {
  //define selectors
  readonly page: Page;
  readonly accountSummary: Locator;
  readonly accountActivity: Locator;

  /*
  readonly transferFunds: Locator;
  */

  readonly payBills: Locator;
  /*
  readonly myMoneyMap: Locator;
  readonly onlineStatements: Locator; */

  //init selectors
  constructor(page: Page) {
    this.page = page;
    this.accountSummary = page.locator("#account_summary_link");

    this.accountActivity = page.locator("#account_activity_link");
    /*
    this.transferFunds = page.locator("#transfer_funds_link");
    */
    this.payBills = page.locator("#pay_bills_link");

    /*this.myMoneyMap = page.locator("#money_map_link");
    this.onlineStatements = page.locator("#online_statements_link"); */
  }

  async openAccountSummary() {
    await this.accountSummary.click();
    return new AccountSummaryPage(this.page);
  }

  async openAccountActivity() {
    await this.accountActivity.click();
    return new AccountActivityPage(this.page);
  }
  /* 
  async openTransferFunds() {
    await this.transferFunds.click();
    return new TransferFundsPage(this.page);
  }
*/
  async openPayBills() {
    await this.payBills.click();
    return new PayBillsPage(this.page);
  }
  /* 
  async openMyMoneyMap() {
    await this.myMoneyMap.click();
    return new MyMoneyMapPage(this.page);
  }

  async openOnlineStatements() {
    await this.onlineStatements.click();
    return new OnlineStatementsPage(this.page);
  } */
}
