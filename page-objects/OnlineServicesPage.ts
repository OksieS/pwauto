import { Page, Locator } from "@playwright/test";
import { Navbar } from "./components/Navbar";

export class OnlineServicesPage {
  //define selectors
  readonly page: Page;
  readonly onlineServices: string[] = [
    "Account Summary",
    "Account Activity",
    "Transfer Funds",
    "Pay Bills",
    "My Money Map",
    "Online Statements",
  ];
  readonly navbar: Navbar;

  //init selectors in constructor
  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
  }
}
