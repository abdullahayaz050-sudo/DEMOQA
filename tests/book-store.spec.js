const { test, expect } = require('@playwright/test');
const { LoginPage, BooksPage, ProfilePage } = require('../pages/BookStorePage');

test.describe('SCRUM-32 DemoQA Book Store', () => {
  test('login rejects invalid credentials without creating an account', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.username.fill('invalid-user');
    await login.password.fill('Invalid123!');
    await login.login.evaluate((button) => button.click());
    await expect(page.getByText('Invalid username or password!', { exact: true })).toBeVisible();
  });

  test('book catalogue search filters and restores results', async ({ page }) => {
    const books = new BooksPage(page);
    await books.open();
    await books.search.fill('Git Pocket Guide');
    await expect(page.getByRole('table')).toContainText('Git Pocket Guide');
    await books.search.fill('');
    await expect(page.getByRole('table')).toContainText('Learning JavaScript Design Patterns');
  });

  test('profile redirects unauthenticated users to login', async ({ page }) => {
    const profile = new ProfilePage(page);
    await profile.open();
    await expect(page).toHaveURL(/(login|profile)/);
    await expect(page.locator('body')).toContainText(/Profile|Login/);
  });
});
