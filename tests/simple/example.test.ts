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
