class AlbumsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Albums' });
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.albumCards = page.locator('[data-testid="album-card"]');
    this.albumTitles = page.locator('.AlbumTitle');
    this.noResultsMessage = page.locator('[data-testid="no-results-message"]');
  }

  async navigate() {
    await this.page.goto('http://localhost:3001/albums');
    await this.heading.waitFor({ state: 'visible' });
    await this.searchInput.waitFor({ state: 'visible' });
  }

  async searchForAlbum(searchTerm) {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(searchTerm);
    // Wait for search results to update
    await this.page.waitForTimeout(1000);
  }

  async getVisibleAlbumTitles() {
    return await this.albumTitles.allTextContents();
  }

  async getAlbumCount() {
    return await this.albumCards.count();
  }

  async hasNoResults() {
    return await this.noResultsMessage.isVisible();
  }
}

export default AlbumsPage;