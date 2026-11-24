const { test, expect } = require('@playwright/test');
const {
  BrowserWindowsPage,
  AlertsPage,
  FramesPage,
  NestedFramesPage,
  ModalsPage,
} = require('../pages/AlertsWindowsPage');

test.describe('SCRUM-29 DemoQA Alerts Frame and Windows', () => {
  test('browser window controls open a tab and window', async ({ page, context }) => {
    const windows = new BrowserWindowsPage(page);
    await windows.open();
    const tabPromise = context.waitForEvent('page');
    await windows.newTab.click();
    const tab = await tabPromise;
    await tab.waitForLoadState('domcontentloaded');
    await expect(tab).toHaveURL(/sample/);
    await tab.close();

    const windowPromise = context.waitForEvent('page');
    await windows.newWindow.click();
    const popup = await windowPromise;
    await popup.waitForLoadState('domcontentloaded');
    await expect(popup).toHaveURL(/sample/);
    await popup.close();
  });

  test('alerts support immediate, delayed, confirm, and prompt dialogs', async ({ page }) => {
    const alerts = new AlertsPage(page);
    await alerts.open();
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });
    await alerts.alert.click();
    await page.waitForTimeout(200);

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('alert');
      await dialog.accept();
    });
    await alerts.timerAlert.click();
    await page.waitForTimeout(5300);

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    await alerts.confirm.click();
    await expect(page.locator('#confirmResult')).toContainText('Ok');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('DemoQA');
    });
    await alerts.prompt.click();
    await expect(page.locator('#promptResult')).toContainText('DemoQA');
  });

  test('frames expose text through their frame contexts', async ({ page }) => {
    const frames = new FramesPage(page);
    await frames.open();
    await expect(frames.frame('frame1').locator('h1')).toHaveText('This is a sample page');
    await expect(frames.frame('frame2').locator('h1')).toHaveText('This is a sample page');
  });

  test('nested frames expose parent and child frame text', async ({ page }) => {
    const nested = new NestedFramesPage(page);
    await nested.open();
    const parent = page.frameLocator('#frame1');
    await expect(parent.locator('body')).toContainText('Parent frame');
    await expect(parent.frameLocator('iframe').locator('body')).toContainText('Child Iframe');
  });

  test('small and large modals open and close', async ({ page }) => {
    const modals = new ModalsPage(page);
    await modals.open();
    await modals.small.click();
    await expect(page.locator('.modal-content')).toBeVisible();
    await modals.closeSmall.click();
    await modals.large.click();
    await expect(page.locator('.modal-content')).toBeVisible();
    await modals.closeLarge.click();
  });
});
