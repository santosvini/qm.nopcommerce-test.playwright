// @ts-nocheck
const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
const { register } = require("../faker.js");

let browser;
let page;

Given("I'm on the registration page", async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 768 });

  page.goto("https://demo.nopcommerce.com/register");
  page
    .locator("xpath=//title[contains(.,'nopCommerce demo store. Register')]")
    .isVisible();
});

When("I fill in the registration form", async () => {
  await page.locator("xpath=//label[@for='gender']").isVisible();
  await page.locator("xpath=//input[@value='M']", { exact: true }).check();

  await page.locator("xpath=//label[@for='FirstName']");
  await page.fill("xpath=//input[@id='FirstName']", register.name);

  await page.locator("xpath=//label[@for='LastName']");
  await page.fill("xpath=//input[@id='LastName']", register.lastname);

  await page
    .locator("xpath=//select[@name='DateOfBirthDay']")
    .selectOption("2");
  await page
    .locator("xpath=//select[@name='DateOfBirthMonth']")
    .selectOption("11");
  await page
    .locator("xpath=//select[@name='DateOfBirthYear']")
    .selectOption("1992");

  await page.locator("xpath=//label[@for='Email']");
  await page.fill("xpath=//input[@id='Email']", register.email);

  await page.locator("xpath=////label[@for='Company']");
  await page.fill("xpath=//input[@id='Company']", register.company);

  const text = await page.locator(
    "xpath=//strong[contains(.,'Your Password')]"
  );
  await text.scrollIntoViewIfNeeded();

  await page.locator("xpath=//label[@for='Password']");
  await page.fill("xpath=//input[@id='Password']", register.pass);

  await page.locator("xpath=//label[@for='ConfirmPassword']");
  await page.fill("xpath=//input[@id='ConfirmPassword']", register.pass);
});

When('I click the register button', async () => {
  await page.locator("xpath=//button[@id='register-button']").click()
})

Then("I should see an error message indicating required fields", async () => {
  await page.locator("xpath=//label[@for='FirstName']");
  await page.locator("xpath=//span[@id='FirstName-error']");

  await page.locator("xpath=//label[@for='LastName']");
  await page.locator("xpath=//span[@id='LastName-error']");

  await page.locator("xpath=//label[@for='Email']");
  await page.locator("xpath=//span[@id='Email-error']");

  const text = await page.locator(
    "xpath=//strong[contains(.,'Your Password')]"
  );
  await text.scrollIntoViewIfNeeded();

  await page.locator("xpath=//label[@for='Password']");
  await page.locator("xpath=//span[@id='Password-error']");

  await page.locator("xpath=//label[@for='ConfirmPassword']");
  await page.locator("xpath=//span[@id='ConfirmPassword-error']");
});

Then('I receive the message from your registration completed', async () => {
  await page.locator("xpath=//h1[contains(.,'Register')]").isVisible();
  await page.locator("xpath=//div[@class='result']").isVisible()
}) 
