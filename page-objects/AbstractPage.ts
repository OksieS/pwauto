import { Page } from "@playwright/test";

export class AbstractPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async wait(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async getTitle() {
    const title = await this.page.title();
    console.log(`Page title: ${title}`);
    return title;
  }

  async getURL() {
    return this.page.url();
  }
}
