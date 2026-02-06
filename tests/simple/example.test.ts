import { test, expect } from "@playwright/test";

test("Simple test", async ({ page }) => {
  await page.goto("https://www.example.com");
  const pageTitle = page.locator("h1");
  await expect(pageTitle).toContainText("Example Domain");
  await page.waitForTimeout(1000);
});

test("Sign In Test", async ({ page }) => {
  await page.goto("http://zero.webappsecurity.com/index.html");
  await page.click("#signin_button");
  await page.waitForTimeout(2000);
  await page.click("text=Sign in");
  await page.waitForTimeout(2000);
  const errorMsg = page.locator(".alert-error");
  await expect(errorMsg).toContainText("Login and/or password are wrong.");
});

test("Working with inputs", async ({ page }) => {
  await page.goto("http://zero.webappsecurity.com/index.html");
  await page.click("#signin_button");
  await page.fill("#user_login", "someUsername");
  await page.fill("#user_password", "somePassword");
  await page.click("text=Sign In");
  const errorMsg = page.locator(".alert-error");
  await expect(errorMsg).toContainText("Login and/or password are wrong.");
});

test("Assertions Test", async ({ page }) => {
  await page.goto("https://www.example.com");
  await expect(page).toHaveURL("https://www.example.com");
  await expect(page).toHaveTitle("Example Domain");
  const element = page.locator("h1");
  await expect(element).toBeVisible();
  await expect(element).toHaveText("Example Domain");
  await expect(element).toHaveCount(1);
  const ghostElement = page.locator("h5");
  await expect(ghostElement).not.toBeVisible();
});

test.describe("Test Suit", () => {
  test("Test One @Regression", async ({ page }) => {
    await page.goto("https://www.example.com");
    console.log("Test One Executed...");
    await expect(page).toHaveURL("https://www.example.com");
  });

  test("Test Two @Smoke", async ({ page }) => {
    await page.goto("https://www.example.com");
    console.log("Test Two Executed...");
    await expect(page).toHaveURL("https://www.example.com");
  });

  test("Test Three @Regression", async ({ page }) => {
    await page.goto("https://www.example.com");
    console.log("Test Three Executed...");
    await expect(page).toHaveURL("https://www.example.com");
  });

  test("Test Four @Smoke", async ({ page }) => {
    await page.goto("https://www.example.com");
    console.log("Test Four Executed...");
    await expect(page).toHaveURL("https://www.example.com");
  });

  test("Test Five @Regression", async ({ page }) => {
    await page.goto("https://www.example.com");
    console.log("Test Five Executed...");
    await expect(page).toHaveURL("https://www.example.com");
  });

  test("Test Six @Smoke", async ({ page }) => {
    await page.goto("https://www.example.com");
    console.log("Test Six Executed...");
    await expect(page).toHaveURL("https://www.example.com");
  });
});
