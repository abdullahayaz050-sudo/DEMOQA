const fs = require('node:fs');
const path = require('node:path');
const { test, expect } = require('@playwright/test');
const {
  CheckBoxPage,
  RadioButtonPage,
  WebTablesPage,
  ButtonsPage,
  LinksPage,
  BrokenPage,
  UploadDownloadPage,
  DynamicPropertiesPage,
} = require('../pages/ElementsPage');

test.describe('SCRUM-27 DemoQA Elements', () => {
  test('checkbox expands and selects the Home branch', async ({ page }) => {
    const checkbox = new CheckBoxPage(page);
    await checkbox.open();
    await checkbox.home.check();
    await expect(checkbox.output).toContainText('You have selected');
  });

  test('radio group accepts Yes and disables No', async ({ page }) => {
    const radios = new RadioButtonPage(page);
    await radios.open();
    await expect(radios.no).toBeDisabled();
    await radios.yes.check();
    await expect(radios.output).toHaveText('Yes');
  });

  test('web table adds, searches, edits, and deletes a record', async ({ page }) => {
    const tables = new WebTablesPage(page);
    await tables.open();
    await tables.addRecord({
      firstName: 'QA',
      lastName: 'Automation',
      email: 'qa@example.com',
      age: '30',
      salary: '50000',
      department: 'Engineering',
    });
    await tables.search.fill('QA');
    await expect(tables.table).toContainText('QA');

    const row = tables.table.locator('tbody tr').filter({ hasText: 'QA' });
    await row.locator('[title="Edit"]').click();
    await tables.department.fill('Quality Engineering');
    await tables.submit.click();
    await expect(tables.table).toContainText('Quality Engineering');

    await row.locator('[title="Delete"]').click();
    await tables.search.fill('');
    await expect(tables.table).not.toContainText('qa@example.com');
  });

  test('buttons trigger double, right, and normal clicks', async ({ page }) => {
    const buttons = new ButtonsPage(page);
    await buttons.open();
    await buttons.doubleClick.dblclick();
    await buttons.rightClick.click({ button: 'right' });
    await buttons.click.click();
    await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');
    await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click');
    await expect(page.locator('#dynamicClickMessage')).toHaveText('You have done a dynamic click');
  });

  test('simple link opens DemoQA in a new page', async ({ page, context }) => {
    const links = new LinksPage(page);
    await links.open();
    const popupPromise = context.waitForEvent('page');
    await links.simpleLink.click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');
    await expect(popup).toHaveURL(/demoqa\.com/);
    await popup.close();
  });

  test('broken page exposes a loaded valid image and a broken image', async ({ page }) => {
    const broken = new BrokenPage(page);
    await broken.open();
    await expect(broken.validImage).toBeVisible();
    await expect(broken.brokenImage).toBeVisible();
    expect(await broken.validImage.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
    expect(await broken.brokenImage.evaluate((img) => img.naturalWidth)).toBe(0);
  });

  test('upload and download work', async ({ page }, testInfo) => {
    const uploadDownload = new UploadDownloadPage(page);
    await uploadDownload.open();
    const downloadPromise = page.waitForEvent('download');
    await uploadDownload.download.click();
    const download = await downloadPromise;
    await download.saveAs(path.join(testInfo.outputPath('sampleFile.jpeg')));
    expect(await download.failure()).toBeNull();

    const filePath = path.join(testInfo.outputPath('upload.txt'));
    fs.writeFileSync(filePath, 'DemoQA upload smoke');
    await uploadDownload.upload.setInputFiles(filePath);
    await expect(page.locator('#uploadedFilePath')).toContainText('upload.txt');
  });

  test('dynamic properties appear and enable asynchronously', async ({ page }) => {
    const dynamic = new DynamicPropertiesPage(page);
    await dynamic.open();
    await expect(dynamic.enableAfter).toBeDisabled();
    await expect(dynamic.enableAfter).toBeEnabled({ timeout: 7000 });
    await expect(dynamic.visibleAfter).toBeVisible({ timeout: 7000 });
  });
});
