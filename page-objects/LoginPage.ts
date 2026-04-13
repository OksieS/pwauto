import { expect, Locator, Page } from "@playwright/test";
import { login } from "../helpers";
import { HomePage } from "./HomePage";

export class LoginPage {
  //define selectors
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly username: Locator;
  readonly logoutButton: Locator;
  readonly errorMSG: Locator;

  //init selectors using constractor
  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator("#user_login");
    this.passwordField = page.locator("#user_password");
    this.signInButton = page.locator("input[name=submit]");
    this.errorMSG = page.locator("#login_form>div:first-child");
    this.logoutButton = page.locator("#logout_link");
    this.username = page.locator("#settingsBox>ul>li:nth-child(3)>a");
  }

  //define methods
  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
    //await this.page.goto("http://zero.webappsecurity.com/index.html");
  }

  async logout() {
    await this.username.click();
    await this.logoutButton.click();
  }
}
