class CheckBoxPage {
  constructor(page) {
    this.page = page;
    this.home = page.getByRole('checkbox', { name: 'Select Home' });
    this.expandAll = page.locator('.rct-option-expand-all');
    this.output = page.locator('#result');
  }
  async open() { await this.page.goto('/checkbox'); }
}

class RadioButtonPage {
  constructor(page) {
    this.page = page;
    this.yes = page.getByRole('radio', { name: 'Yes' });
    this.impressive = page.getByRole('radio', { name: 'Impressive' });
    this.no = page.getByRole('radio', { name: 'No' });
    this.output = page.locator('.text-success');
  }
  async open() { await this.page.goto('/radio-button'); }
}

class WebTablesPage {
  constructor(page) {
    this.page = page;
    this.add = page.getByRole('button', { name: 'Add' });
    this.search = page.getByPlaceholder('Type to search');
    this.table = page.getByRole('table');
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.age = page.locator('#age');
    this.salary = page.locator('#salary');
    this.department = page.locator('#department');
    this.submit = page.locator('#submit');
  }
  async open() { await this.page.goto('/webtables'); }
  async addRecord(record) {
    await this.add.click();
    await this.firstName.fill(record.firstName);
    await this.lastName.fill(record.lastName);
    await this.email.fill(record.email);
    await this.age.fill(record.age);
    await this.salary.fill(record.salary);
    await this.department.fill(record.department);
    await this.submit.click();
  }
}

class ButtonsPage {
  constructor(page) {
    this.page = page;
    this.doubleClick = page.locator('#doubleClickBtn');
    this.rightClick = page.locator('#rightClickBtn');
    this.click = page.getByRole('button', { name: 'Click Me', exact: true });
  }
  async open() { await this.page.goto('/buttons'); }
}

class LinksPage {
  constructor(page) {
    this.page = page;
    this.simpleLink = page.locator('#simpleLink');
  }
  async open() { await this.page.goto('/links'); }
}

class BrokenPage {
  constructor(page) {
    this.page = page;
    this.validImage = page.locator('img').filter({ hasNot: page.locator('[src="/images/Toolsqa_1.jpg"]') }).first();
    this.brokenImage = page.locator('img[src="/images/Toolsqa_1.jpg"]');
  }
  async open() { await this.page.goto('/broken'); }
}

class UploadDownloadPage {
  constructor(page) {
    this.page = page;
    this.download = page.locator('#downloadButton');
    this.upload = page.locator('#uploadFile');
  }
  async open() { await this.page.goto('/upload-download'); }
}

class DynamicPropertiesPage {
  constructor(page) {
    this.page = page;
    this.enableAfter = page.locator('#enableAfter');
    this.colorChange = page.locator('#colorChange');
    this.visibleAfter = page.locator('#visibleAfter');
  }
  async open() { await this.page.goto('/dynamic-properties'); }
}

module.exports = {
  CheckBoxPage,
  RadioButtonPage,
  WebTablesPage,
  ButtonsPage,
  LinksPage,
  BrokenPage,
  UploadDownloadPage,
  DynamicPropertiesPage,
};
