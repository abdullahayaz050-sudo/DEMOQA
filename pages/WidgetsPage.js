class AccordianPage {
  constructor(page) { this.page = page; }
  async open() { await this.page.goto('/accordian'); }
}
class AutoCompletePage {
  constructor(page) {
    this.page = page;
    this.multiple = page.locator('#autoCompleteMultipleInput');
    this.single = page.locator('#autoCompleteSingleInput');
  }
  async open() { await this.page.goto('/auto-complete'); }
}
class DatePickerPage {
  constructor(page) {
    this.page = page;
    this.selectDate = page.locator('#datePickerMonthYearInput');
    this.dateAndTime = page.locator('#dateAndTimePickerInput');
  }
  async open() { await this.page.goto('/date-picker'); }
}
class SliderProgressPage {
  constructor(page) {
    this.page = page;
    this.slider = page.locator('.range-slider');
    this.progress = page.locator('#progressBar');
    this.progressButton = page.locator('#startStopButton');
  }
  async openSlider() { await this.page.goto('/slider'); }
  async openProgress() { await this.page.goto('/progress-bar'); }
}
class TabsPage {
  constructor(page) { this.page = page; }
  async open() { await this.page.goto('/tabs'); }
}
class ToolTipsPage {
  constructor(page) {
    this.page = page;
    this.button = page.locator('#toolTipButton');
    this.textField = page.locator('#toolTipTextField');
  }
  async open() { await this.page.goto('/tool-tips'); }
}
class MenuPage {
  constructor(page) { this.page = page; }
  async open() { await this.page.goto('/menu'); }
}
class SelectMenuPage {
  constructor(page) {
    this.page = page;
    this.oldSelect = page.locator('#oldSelectMenu');
    this.cars = page.locator('#cars');
  }
  async open() { await this.page.goto('/select-menu'); }
}
module.exports = {
  AccordianPage, AutoCompletePage, DatePickerPage, SliderProgressPage,
  TabsPage, ToolTipsPage, MenuPage, SelectMenuPage,
};
