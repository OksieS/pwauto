import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { FeedbackPage } from "./FeedbackPage";
import { BankingPage } from "./BankingPage";
import { OnlineServicesPage } from "./OnlineServicesPage";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage {
  //define selectors
  //readonly page: Page;
  readonly signInButton: Locator;
  readonly onlineBankingTab: Locator;
  readonly feedbackTab: Locator;
  readonly searchField: Locator;
  readonly baseURL: string;

  //init selectors
  constructor(page: Page) {
    //this.page = page;
    super(page);
    this.signInButton = page.locator("button#signin_button");
    this.onlineBankingTab = page.locator("#onlineBankingMenu");
    this.feedbackTab = page.locator("#feedback");
    this.searchField = page.locator("#searchTerm");
    this.baseURL = "http://zero.webappsecurity.com/index.html";
  }

  async open() {
    await this.page.goto(this.baseURL);
  }

  async openLoginPage() {
    await this.open();
    await this.signInButton.click();
    return new LoginPage(this.page);
  }

  async openBankingPage() {
    await this.onlineBankingTab.click();
    return new BankingPage(this.page);
  }

  async search(whatToSearch: string) {
    await this.searchField.fill(whatToSearch);
    await this.page.keyboard.press("Enter");
  }

  async openFeedbackPage() {
    await this.feedbackTab.click();
    return new FeedbackPage(this.page);
  }

  async OnlineServicesPage() {
    await this.page.goto(
      "http://zero.webappsecurity.com/bank/account-summary.html",
    );
    return new OnlineServicesPage(this.page);
  }
}
