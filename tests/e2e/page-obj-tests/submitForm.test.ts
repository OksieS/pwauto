import { test, expect } from "@playwright/test";
import { HomePage } from "../../../page-objects/HomePage";
import { FeedbackPage } from "../../../page-objects/FeedbackPage";

test.describe("Submit Form Tests", () => {
  //const baseURL = "http://zero.webappsecurity.com/index.html";
  let homepage: HomePage;
  let feedbackPage: FeedbackPage;
  const expectedMessage = "Thank you for your comments";

  test.beforeEach(async ({ page }) => {
    //await page.goto(baseURL);
    //await page.click("#feedback");
    homepage = new HomePage(page);
    await homepage.open();
    feedbackPage = await homepage.openFeedbackPage();
  });

  test("Clear the Form Test", async ({ page }) => {
    await feedbackPage.fillUpForm();
    await feedbackPage.page.waitForTimeout(1000);
    await feedbackPage.clearButton.click();
    await expect(feedbackPage.nameField).toBeEmpty();
  });

  test("Send the Feedback Form", async ({ page }) => {
    await feedbackPage.fillUpForm();
    await feedbackPage.page.waitForTimeout(1000);
    await feedbackPage.sendButton.click();
    let messageText = await feedbackPage.successMessage.textContent();
    await feedbackPage.page.waitForTimeout(1000);
    expect(messageText).toContain(expectedMessage);
  });

  test.skip("Clear The Form Test", async ({ page }) => {
    await page.fill("#name", "Username");
    await page.fill("#email", "useremail@emial.com");
    await page.fill("#subject", "Feedback Subject");
    await page.fill("#comment", "Add comments and notes here.");
    //await page.waitForTimeout(2000);
    await page.click("input[name='clear']");
    await expect(page.locator("#name")).toBeEmpty();
    await expect(page.locator("#email")).toBeEmpty();
    await expect(page.locator("#subject")).toBeEmpty();
    await expect(page.locator("#comment")).toBeEmpty();
    //await page.waitForTimeout(2000);
  });

  test.skip("Submit the Form Test", async ({ page }) => {
    await page.fill("#name", "Username");
    await page.fill("#email", "useremail@emial.com");
    await page.fill("#subject", "Feedback Subject");
    await page.fill("#comment", "Add comments and notes here.");
    await page.click("input[type='submit']");
    await page.waitForTimeout(2000);
    await page.waitForSelector("#feedback-title");
    await expect(page.locator("#feedback-title")).toContainText("Feedback");
    await page.waitForTimeout(2000);
  });
});
