class BrowserWindowsPage {
  constructor(page) {
    this.page = page;
    this.newTab = page.locator('#tabButton');
    this.newWindow = page.locator('#windowButton');
    this.messageWindow = page.locator('#messageWindowButton');
  }
  async open() { await this.page.goto('/browser-windows'); }
}

class AlertsPage {
  constructor(page) {
    this.page = page;
    this.alert = page.locator('#alertButton');
    this.timerAlert = page.locator('#timerAlertButton');
    this.confirm = page.locator('#confirmButton');
    this.prompt = page.locator('#promtButton');
  }
  async open() { await this.page.goto('/alerts'); }
}

class FramesPage {
  constructor(page) {
    this.page = page;
  }
  async open() { await this.page.goto('/frames'); }
  frame(id) { return this.page.frameLocator(`#${id}`); }
}

class NestedFramesPage {
  constructor(page) { this.page = page; }
  async open() { await this.page.goto('/nestedframes'); }
}

class ModalsPage {
  constructor(page) {
    this.page = page;
    this.small = page.locator('#showSmallModal');
    this.large = page.locator('#showLargeModal');
    this.closeSmall = page.locator('#closeSmallModal');
    this.closeLarge = page.locator('#closeLargeModal');
  }
  async open() { await this.page.goto('/modal-dialogs'); }
}

module.exports = { BrowserWindowsPage, AlertsPage, FramesPage, NestedFramesPage, ModalsPage };
