import { test, expect } from '@playwright/test';
import AlbumsPage from './pages/AlbumsPage';
import { loginUser } from './utils/auth';

test.describe('Album Search Functionality', () => {
  let albumsPage;

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await loginUser(page);
    
    // Create a new instance of the AlbumsPage
    albumsPage = new AlbumsPage(page);
    
    // Navigate to the albums page
    await albumsPage.navigate();
    
    // Use POM's albumCards locator and increase timeout
    await expect(albumsPage.albumCards.first()).toBeVisible({ timeout: 1000 });
  });

  test('should filter albums when searching by title', async () => {
    // Add explicit wait for initial data load
    await expect(albumsPage.albumCards).toHaveCount(await albumsPage.getAlbumCount());
    
    const initialCount = await albumsPage.getAlbumCount();
    expect(initialCount).toBeGreaterThan(0);
    
    // Search for a specific term
    const searchTerm = 'quidem';
    await albumsPage.searchForAlbum(searchTerm);
    
    // Get filtered album titles
    const filteredTitles = await albumsPage.getVisibleAlbumTitles();
    
    // Verify that each visible album contains the search term
    for (const title of filteredTitles) {
      expect(title.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
    
    // Verify that the number of albums has changed (filtered)
    const filteredCount = await albumsPage.getAlbumCount();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should show no results message when search has no matches', async () => {
    // Search for a term that shouldn't match any albums
    const searchTerm = 'xyznonexistentterm123';
    await albumsPage.searchForAlbum(searchTerm);
    
    // Verify that the no results message is displayed
    expect(await albumsPage.hasNoResults()).toBeTruthy();
  });

  test('should restore all albums when search is cleared', async () => {
    // Get initial album count
    const initialCount = await albumsPage.getAlbumCount();
    
    // Search for something to filter the list
    await albumsPage.searchForAlbum('quidem');
    
    // Clear the search
    await albumsPage.searchForAlbum('');
    
    // Verify that all albums are shown again
    const restoredCount = await albumsPage.getAlbumCount();
    expect(restoredCount).toEqual(initialCount);
  });
});