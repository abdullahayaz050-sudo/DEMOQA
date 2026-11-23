class TextBoxPage {
  constructor(page) {
    this.page = page;
    this.fullName = page.locator('#userName');
    this.email = page.locator('#userEmail');
    this.currentAddress = page.locator('#currentAddress');
    this.permanentAddress = page.locator('#permanentAddress');
    this.submit = page.locator('#submit');
    this.output = page.locator('#output');
  }

  async open() {
    await this.page.goto('/text-box');
  }

  async submitForm({ fullName, email, currentAddress, permanentAddress }) {
    await this.fullName.fill(fullName);
    await this.email.fill(email);
    await this.currentAddress.fill(currentAddress);
    await this.permanentAddress.fill(permanentAddress);

    await this.submit.evaluate((button) => button.click());
  }

  async submitInvalidEmail(email) {
    await this.email.fill(email);
    await this.submit.evaluate((button) => button.click());
  }

  async emailIsValid() {
    return this.email.evaluate((input) => input.checkValidity());
  }
}

module.exports = { TextBoxPage };
