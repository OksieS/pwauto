import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { Navbar } from "../../page-objects/components/Navbar";
import { OnlineServicesPage } from "../../page-objects/OnlineServicesPage";

test.describe.only("Navigation Bar Test", () => {
  let homepage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let onlineServicesPage: OnlineServicesPage;

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    onlineServicesPage = new OnlineServicesPage(page);
    await homepage.open();
    await homepage.openLoginPage();
    await loginPage.login("username", "password");
    await homepage.page.waitForLoadState("networkidle");
    await homepage.open();
    await homepage.page.waitForLoadState("networkidle");
  });

  test("Open Online Services Page", async ({ page }) => {
    await homepage.OnlineServicesPage();
    await expect(
      page.getByRole("heading", { name: "Cash Accounts" }),
    ).toBeVisible();
  });

  test("Select Random Tab", async ({ page }) => {
    await homepage.OnlineServicesPage();
    let tabname =
      onlineServicesPage.onlineServices[
        Math.floor(Math.random() * onlineServicesPage.onlineServices.length)
      ];
    console.log(`${tabname} has been selected`);
    navbar.selectTab(tabname);
    await page.waitForTimeout(2000);
  });

  test("Select Each Tab", async ({ page }) => {
    await homepage.OnlineServicesPage();
    const tabs = onlineServicesPage.onlineServices;
    for (const tab of tabs) {
      navbar.selectTab(tab);
      console.log(`${tab} has been selected`);
      await page.waitForTimeout(2000);
    }
  });
});
