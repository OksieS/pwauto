import { Page } from "@playwright/test";

export async function loadHomePage(page: Page) {
  await page.goto("https://www.example.com");
}

export async function assertTitle(page: Page) {
  await page.waitForSelector("h1");
  console.log("H1 tag is on the page");
}

export async function login(page: Page, username: string, password: string) {
  const signInButton = page.locator("button#signin_button");
  const signInButton2 = page.locator("input[name=submit]");

  await signInButton.click();
  await page.fill("#user_login", username);
  await page.fill("#user_password", password);
  await signInButton2.click();
}
