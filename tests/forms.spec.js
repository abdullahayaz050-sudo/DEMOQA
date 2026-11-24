const fs = require('node:fs');
const path = require('node:path');
const { test, expect } = require('@playwright/test');
const { PracticeFormPage } = require('../pages/PracticeFormPage');

test.describe('SCRUM-28 DemoQA Practice Form', () => {
  test('empty required fields prevent submission modal', async ({ page }) => {
    const form = new PracticeFormPage(page);
    await form.open();
    await form.submit.evaluate((button) => button.click());
    await expect(form.modal).toHaveCount(0);
  });

  test('invalid email and 9-digit mobile fail browser validation', async ({ page }) => {
    const form = new PracticeFormPage(page);
    await form.open();
    await form.firstName.fill('Ada');
    await form.lastName.fill('Lovelace');
    await form.email.fill('invalid-email');
    await form.mobile.fill('123456789');
    await form.submit.evaluate((button) => button.click());
    await expect(form.modal).toHaveCount(0);
    expect(await form.email.evaluate((input) => input.checkValidity())).toBe(false);
  });

  test('valid end-to-end submission shows confirmation modal', async ({ page }, testInfo) => {
    const form = new PracticeFormPage(page);
    await form.open();
    await form.firstName.fill('Ada');
    await form.lastName.fill('Lovelace');
    await form.email.fill('ada@example.com');
    await page.locator('label[for="gender-radio-2"]').click();
    await form.mobile.fill('1234567890');
    await form.subjects.fill('Math');
    await page.keyboard.press('Enter');
    await page.locator('label[for="hobbies-checkbox-1"]').click();
    const filePath = path.join(testInfo.outputPath('profile.txt'));
    fs.writeFileSync(filePath, 'DemoQA practice form');
    await form.upload.setInputFiles(filePath);
    await form.address.fill('12 Analytical Engine Road');
    await form.state.click();
    await page.getByText('NCR', { exact: true }).click();
    await form.city.click();
    await page.getByText('Delhi', { exact: true }).click();
    await form.submit.evaluate((button) => button.click());
    await expect(form.modal).toBeVisible();
    await expect(form.modal).toContainText('Ada Lovelace');
    await expect(form.modal).toContainText('ada@example.com');
  });
});
