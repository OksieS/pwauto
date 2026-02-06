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

---

Tags

1. to run tests with a Tag > npx playwright test --grep @myTag
2. to NOT run use > npx playwright test --grep-invert @myTag

---

PW Config File

1. timeout: 30000 > global timeout to all tests to finish
2. retries: 0 > how many times PW rerun failed test
3. use: { > for Browser specific options
   headless: true,
   viewport: {width: 1280, height: 720},
   actionTimout: 7000, > timeout for all the functions before error
   ignoreHTTPSErrors: true,
   video: "off",
   screenshot: "off"
   }
4. projects:[{browsers}]
   To run tests from Config file run > npx playwright test --config=playwright.config.ts --project=chromium

---

Reporter

1. To have a report run
   npx playwright test --config=playwright.config.ts --project=chromium --reporter=html

---

Hooks

1. test.beforeEach(({page})=> {})
