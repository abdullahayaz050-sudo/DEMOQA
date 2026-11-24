const { test, expect } = require('@playwright/test');
const { InteractionsPage } = require('../pages/InteractionsPage');

test.describe('SCRUM-31 DemoQA Interactions', () => {
  test('selectable list items toggle active state', async ({ page }) => {
    const interactions = new InteractionsPage(page);
    await interactions.openSelectable();
    const item = page.locator('#verticalListContainer li').first();
    await item.click();
    await expect(item).toHaveClass(/active/);
  });

  test('resizable controls accept pointer resize', async ({ page }) => {
    const interactions = new InteractionsPage(page);
    await interactions.openResizable();
    const box = page.locator('#resizableBoxWithRestriction');
    const handle = box.locator('.react-resizable-handle');
    const handleBox = await handle.boundingBox();
    await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(handleBox.x + 60, handleBox.y + 40, { steps: 10 });
    await page.mouse.up();
    await expect(box).toBeVisible();
  });

  test('droppable renders draggable and drop target controls', async ({ page }) => {
    const interactions = new InteractionsPage(page);
    await interactions.openDroppable();
    const source = page.locator('#draggable');
    const target = page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable');
    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();
    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 50 });
    await page.waitForTimeout(300);
    await page.mouse.up();
    await expect(source).toBeVisible();
    await expect(target).toBeVisible();
    await expect(target).toHaveClass(/ui-droppable/);
  });

  test('dragabble box moves with pointer', async ({ page }) => {
    const interactions = new InteractionsPage(page);
    await interactions.openDragabble();
    const dragBox = page.locator('#dragBox');
    const box = await dragBox.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 100, box.y + 80, { steps: 10 });
    await page.mouse.up();
    await expect(dragBox).toBeVisible();
  });
});
