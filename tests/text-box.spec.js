const { test, expect } = require('@playwright/test');
const { TextBoxPage } = require('../pages/TextBoxPage');

test.describe('SCRUM-24 DemoQA Text Box', () => {
  test('SCRUM-25 - submits a valid text box form', async ({ page }) => {
    const textBox = new TextBoxPage(page);
    await textBox.open();

    await textBox.submitForm({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      currentAddress: '12 Analytical Engine Road',
      permanentAddress: 'London',
    });

    await expect(textBox.output).toContainText('Name:Ada Lovelace');
    await expect(textBox.output).toContainText('Email:ada@example.com');
    await expect(textBox.output).toContainText('12 Analytical Engine Road');
    await expect(textBox.output).toContainText('London');
  });

  test('SCRUM-26 - rejects an invalid email', async ({ page }) => {
    const textBox = new TextBoxPage(page);
    await textBox.open();

    await textBox.submitInvalidEmail('invalid-email');

    await expect(textBox.emailIsValid()).resolves.toBe(false);
  });
});
