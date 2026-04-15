import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test.describe("Search Tests", () => {
  let whatToSearch = "Bank";
  test("Search For Bank", async ({ page }) => {
    let homepage: HomePage = new HomePage(page);
    await homepage.search(whatToSearch);

    const numberOfLinks = page.locator("li>a");
    await expect(numberOfLinks).toHaveCount(2);
  });
});
