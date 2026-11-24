class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#userName');
    this.password = page.locator('#password');
    this.login = page.locator('#login');
    this.newUser = page.locator('#newUser');
    this.output = page.locator('#output');
  }
  async open() { await this.page.goto('/login'); }
}
class BooksPage {
  constructor(page) {
    this.page = page;
    this.search = page.locator('#searchBox');
  }
  async open() { await this.page.goto('/books'); }
}
class ProfilePage {
  constructor(page) { this.page = page; }
  async open() { await this.page.goto('/profile'); }
}
module.exports = { LoginPage, BooksPage, ProfilePage };
