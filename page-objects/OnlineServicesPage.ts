import { Page, Locator } from "@playwright/test";
import { Navbar } from "./components/Navbar";
import { AbstractPage } from "./AbstractPage";

export class OnlineServicesPage extends AbstractPage {
  //define selectors
  //readonly page: Page;
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
    super(page);
    this.navbar = new Navbar(page);
  }
}
