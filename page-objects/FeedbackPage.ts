import { Page, Locator } from "@playwright/test";

export class FeedbackPage {
  //define selectors
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly subjectField: Locator;
  readonly questionsField: Locator;
  readonly clearButton: Locator;
  readonly sendButton: Locator;
  readonly successMessage: Locator;
  //init selectors in constructor
  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByRole("heading", { name: "Feedback" });
    this.nameField = page.getByRole("textbox", { name: "Your Name" });
    this.emailField = page.getByRole("textbox", {
      name: "Your email address",
    });
    this.subjectField = page.getByRole("textbox", { name: "Subject" });
    this.questionsField = page.getByRole("textbox", {
      name: "Type your questions here...",
    });
    this.clearButton = page.getByRole("button", { name: "Clear" });
    this.sendButton = page.getByRole("button", { name: "Send Message" });
    this.successMessage = page.locator(".offset3");
  }
  //declare methods
  async fillUpForm() {
    await this.nameField.fill("Username");
    await this.emailField.fill("myemail@mail.com");
    await this.subjectField.fill("Supercool feedback subject");
    await this.questionsField.fill("Very important question");
  }

  async clearForm() {
    await this.clearButton.click();
  }

  async sendFeedback() {
    await this.sendButton.click();
  }
}
