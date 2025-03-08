class PhotosPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Photos' });
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.photoCards = page.locator('[data-testid="photo-card"]');
    this.photoTitles = page.locator('.PhotoTitle');
    this.noResultsMessage = page.locator('[data-testid="no-results-message"]');
  }

  async navigate() {
    await this.page.goto('http://localhost:3001/photos');
    await this.heading.waitFor({ state: 'visible' });
    await this.searchInput.waitFor({ state: 'visible' });
  }

  async searchForPhoto(searchTerm) {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(searchTerm);
    // Wait for search results to update
    await this.page.waitForTimeout(1000);
  }

  async getVisiblePhotoTitles() {
    return await this.photoTitles.allTextContents();
  }

  async getPhotoCount() {
    return await this.photoCards.count();
  }

  async hasNoResults() {
    return await this.noResultsMessage.isVisible();
  }
  
  async clickPhotoByTitle(title) {
    await this.page.getByRole('link', { name: title }).click();
  }
}

export default PhotosPage;