class InteractionsPage {
  constructor(page) { this.page = page; }
  async openSelectable() { await this.page.goto('/selectable'); }
  async openResizable() { await this.page.goto('/resizable'); }
  async openDroppable() { await this.page.goto('/droppable'); }
  async openDragabble() { await this.page.goto('/dragabble'); }
}
module.exports = { InteractionsPage };
