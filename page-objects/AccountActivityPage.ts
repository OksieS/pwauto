import { Page, Locator } from "@playwright/test";

export class AccountActivityPage {
  //define selectors
  readonly page: Page;
  readonly showTransactinTab: Locator;
  readonly showTabTitle: Locator;
  readonly findTransactionTab: Locator;
  //readonly findTabTitle: Locator;
  readonly accountLabel: Locator;
  readonly descriptionField: Locator;
  readonly dateFromField: Locator;
  readonly dateToField: Locator;
  readonly amountFrom: Locator;
  readonly amountTo: Locator;
  // readonly accountType: Locator;
  readonly findButton: Locator;

  //init selectors in constructor
  constructor(page: Page) {
    this.page = page;
    this.showTransactinTab = page.getByRole("link", {
      name: "Show Transactions",
    });
    this.findTransactionTab = page.getByRole("link", {
      name: "Find Transactions",
    });
    this.showTabTitle = page.getByRole("heading", {
      name: "Show Transactions",
    });
    this.accountLabel = page.locator(
      "#show_transactions_form>fieldset>div>label",
    );
    this.descriptionField = page.getByRole("textbox", {
      name: "description",
    });
    this.dateFromField = page.getByRole("textbox", { name: "fromDate" });
    this.dateToField = page.getByRole("textbox", { name: "toDate" });
    this.findButton = page.getByRole("button", { name: "Find" });
    this.amountFrom = page.locator("#aa_fromAmount");
    this.amountTo = page.locator("#aa_toAmount");
  }

  //declare methods
  async getElementText(locator: Locator) {
    return await locator.textContent();
  }
}
