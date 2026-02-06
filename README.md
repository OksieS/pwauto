Project - pwauto
Setting up the project

1. run 'npm init' command in Terminal to start pw project
2. run 'npm install prettier' to install prettier (optional)
3. create file '.prettierrc' in the root
4. run 'npm install playwright/test' to install playwright package
5. run 'npx playwright install' to install all PW browsers

---

Commands

1. to run a simple test (no config file) 'npx playwright test --headed'
2. to run a test in FF browser 'npx playwright test -- headed --browser=firefox'
3. to run in all browser 'npx playwright test -- headed --browser=all'
4. to specify a path to a test 'npx playwright test tests/example.test.ts'

---

Annotations

1. test.skip()
2. test.only()
3. test.describe("Test Suit", () => {}) - it is SYNC function
