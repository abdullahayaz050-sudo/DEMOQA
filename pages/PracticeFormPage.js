class PracticeFormPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.mobile = page.locator('#userNumber');
    this.dateOfBirth = page.locator('#dateOfBirthInput');
    this.subjects = page.locator('#subjectsInput');
    this.hobbies = {
      sports: page.locator('#hobbies-checkbox-1'),
      reading: page.locator('#hobbies-checkbox-2'),
      music: page.locator('#hobbies-checkbox-3'),
    };
    this.upload = page.locator('#uploadPicture');
    this.address = page.locator('#currentAddress');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.submit = page.locator('#submit');
    this.modal = page.locator('.modal-content');
  }

  async open() { await this.page.goto('/automation-practice-form'); }

  async submitForm(data = {}) {
    if (data.firstName) await this.firstName.fill(data.firstName);
    if (data.lastName) await this.lastName.fill(data.lastName);
    if (data.email) await this.email.fill(data.email);
    if (data.gender) await this.page.getByText(data.gender, { exact: true }).last().click();
    if (data.mobile) await this.mobile.fill(data.mobile);
    if (data.address) await this.address.fill(data.address);
    await this.submit.evaluate((button) => button.click());
  }
}

module.exports = { PracticeFormPage };
