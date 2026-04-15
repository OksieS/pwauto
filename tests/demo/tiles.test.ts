import { test, expect } from "@playwright/test";

test.describe("SK-Data Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://fortnite.com/item-shop");
    //await page.waitForLoadState("networkidle");
  });

  test.skip("Tile Names Test", async ({ page }) => {
    const tileNames = await page
      .locator("div[data-testid=item-title]")
      .allTextContents();

    tileNames.forEach(async (name) => {
      console.table(name);
    });
  });

  test.skip("Get All Bundles Test", async ({ page }) => {
    const bundles = page.getByText("Bundle").all();
    console.log((await bundles).length);
  });

  test("Get Into Bundle Test", async ({ page }) => {
    let offersQuantity;
    const homepageOffers = await page
      .locator("div[data-testid=item-title]")
      .all();
    let firstLocator = homepageOffers[1];
    let text = await firstLocator.textContent();
    console.log(text);
  });
});

//
