const { test, expect } = require('@playwright/test');
const { TextBoxPage } = require('../pages/TextBoxPage');

test.describe('SCRUM-24 DemoQA Text Box', () => {
  test('SCRUM-25 @SCRUM-25 [DQA-ELEM-001] - submits a valid text box form', async ({ page }) => {
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

  test('SCRUM-26 @SCRUM-26 [DQA-ELEM-002] - rejects an invalid email', async ({ page }) => {
    const textBox = new TextBoxPage(page);
    await textBox.open();

    await textBox.submitInvalidEmail('invalid-email');

    await expect(textBox.emailIsValid()).resolves.toBe(false);
  });

  test('@SCRUM-24 [DQA-ELEM-003] - submits a name with optional fields empty', async ({ page }) => {
    const textBox = new TextBoxPage(page);
    await textBox.open();
    await textBox.submitForm({
      fullName: 'Ada Lovelace',
      email: '',
      currentAddress: '',
      permanentAddress: '',
    });
    await expect(textBox.output).toContainText('Name:Ada Lovelace');
  });

  test('@SCRUM-24 [DQA-ELEM-004] - submits no field values and produces no output', async ({ page }) => {
    const textBox = new TextBoxPage(page);
    await textBox.open();
    await textBox.submitForm({
      fullName: '',
      email: '',
      currentAddress: '',
      permanentAddress: '',
    });
    await expect(textBox.output).toBeEmpty();
  });

  test('@SCRUM-24 [DQA-ELEM-005] - preserves multiline addresses', async ({ page }) => {
    const textBox = new TextBoxPage(page);
    await textBox.open();
    await textBox.submitForm({
      fullName: 'Grace Hopper',
      email: 'grace.hopper@example.com',
      currentAddress: 'Line 1\nLine 2',
      permanentAddress: 'Building 3\nFloor 5',
    });
    await expect(textBox.output).toContainText('Grace Hopper');
    await expect(textBox.output).toContainText('Line 1');
    await expect(textBox.output).toContainText('Line 2');
    await expect(textBox.output).toContainText('Building 3');
    await expect(textBox.output).toContainText('Floor 5');
  });

  test('@SCRUM-24 [DQA-ELEM-006] - rejects malformed email variants', async ({ page }) => {
    const textBox = new TextBoxPage(page);
    await textBox.open();
    for (const email of ['plainaddress', 'ada@', '@example.com', 'ada example@example.com']) {
      await textBox.open();
      await textBox.submitInvalidEmail(email);
      await expect(textBox.emailIsValid()).resolves.toBe(false);
    }
  });

  test('@SCRUM-24 [DQA-ELEM-007] - accepts a 64-character local-part email boundary', async ({ page }) => {
    const textBox = new TextBoxPage(page);
    await textBox.open();
    const email = `${'a'.repeat(64)}@example.com`;
    await textBox.submitForm({
      fullName: 'Boundary User',
      email,
      currentAddress: 'Boundary Address',
      permanentAddress: 'Boundary Permanent Address',
    });
    await expect(textBox.output).toContainText(`Email:${email}`);
  });
});
