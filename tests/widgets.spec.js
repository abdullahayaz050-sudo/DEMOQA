const { test, expect } = require('@playwright/test');
const {
  AccordianPage, AutoCompletePage, DatePickerPage, SliderProgressPage,
  TabsPage, ToolTipsPage, MenuPage, SelectMenuPage,
} = require('../pages/WidgetsPage');

test.describe('SCRUM-30 DemoQA Widgets', () => {
  test('accordion sections expand and show content', async ({ page }) => {
    const accordion = new AccordianPage(page);
    await accordion.open();
    const first = page.getByRole('button', { name: 'What is Lorem Ipsum?' });
    const firstInitial = await first.getAttribute('aria-expanded');
    await first.evaluate((button) => button.click());
    await expect(first).not.toHaveAttribute('aria-expanded', firstInitial);
    const second = page.getByRole('button', { name: 'Where does it come from?' });
    const secondInitial = await second.getAttribute('aria-expanded');
    await second.evaluate((button) => button.click());
    await expect(second).not.toHaveAttribute('aria-expanded', secondInitial);
  });

  test('autocomplete accepts multiple and single selections', async ({ page }) => {
    const autocomplete = new AutoCompletePage(page);
    await autocomplete.open();
    await autocomplete.multiple.fill('Red');
    await page.getByText('Red', { exact: true }).last().click();
    await expect(autocomplete.multiple).toHaveValue('');
    await autocomplete.single.fill('B');
    await page.keyboard.press('Enter');
  });

  test('date picker controls accept date input', async ({ page }) => {
    const picker = new DatePickerPage(page);
    await picker.open();
    await picker.selectDate.fill('11/24/2026');
    await picker.selectDate.press('Enter');
    await expect(picker.selectDate).not.toHaveValue('');
  });

  test('slider updates value and progress bar moves', async ({ page }) => {
    const sliderProgress = new SliderProgressPage(page);
    await sliderProgress.openSlider();
    await sliderProgress.slider.fill('75');
    await expect(page.locator('#sliderValue')).toHaveValue('75');

    await sliderProgress.openProgress();
    await sliderProgress.progressButton.click();
    await expect(sliderProgress.progress).not.toHaveText('0%', { timeout: 7000 });
  });

  test('tabs, tooltips, menu, and select menus respond', async ({ page }) => {
    const tabs = new TabsPage(page);
    await tabs.open();
    await page.getByRole('tab', { name: 'Origin' }).click();
    await expect(page.locator('#demo-tabpane-origin')).toBeVisible();

    const tooltips = new ToolTipsPage(page);
    await tooltips.open();
    await tooltips.button.hover();
    await expect(page.locator('.tooltip-inner')).toBeVisible();

    const menu = new MenuPage(page);
    await menu.open();
    await page.getByText('Main Item 2', { exact: true }).hover();
    await page.getByText('SUB SUB LIST', { exact: false }).hover();
    await expect(page.getByText('Sub Sub Item 1', { exact: true })).toBeVisible();

    const selects = new SelectMenuPage(page);
    await selects.open();
    await selects.oldSelect.selectOption('Blue');
    await expect(selects.oldSelect).toHaveValue('1');
    await selects.cars.selectOption(['volvo', 'audi']);
  });
});
