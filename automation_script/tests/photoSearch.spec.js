import { test, expect } from '@playwright/test';
import PhotosPage from './pages/PhotosPage';
import { loginUser } from './utils/auth';

test.describe('Photo Search Functionality', () => {
  let photosPage;

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await loginUser(page);
    
    // Create a new instance of the PhotosPage
    photosPage = new PhotosPage(page);
    
    // Navigate to the photos page
    await photosPage.navigate();
    
    // Wait for initial photos to load
    await expect(photosPage.photoCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should filter photos when searching by title', async () => {
    // Get initial photo count
    const initialCount = await photosPage.getPhotoCount();
    expect(initialCount).toBeGreaterThan(0);
    
    // Search for a specific term
    const searchTerm = 'natus nisi';
    await photosPage.searchForPhoto(searchTerm);
    
    // Get filtered photo titles
    const filteredTitles = await photosPage.getVisiblePhotoTitles();
    
    // Verify that each visible photo contains the search term
    for (const title of filteredTitles) {
      expect(title.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
    
    // Verify that the number of photos has changed (filtered)
    const filteredCount = await photosPage.getPhotoCount();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should show no results message when search has no matches', async () => {
    // Search for a term that shouldn't match any photos
    const searchTerm = 'xyznonexistentterm123';
    await photosPage.searchForPhoto(searchTerm);
    
    // Verify that the no results message is displayed
    expect(await photosPage.hasNoResults()).toBeTruthy();
  });

  test('should navigate to photo details when clicking on a photo', async ({ page }) => {
    // Search for a specific photo
    await photosPage.searchForPhoto('natus nisi');
    
    // Click on a specific photo
    await photosPage.clickPhotoByTitle('natus nisi omnis corporis');
    
    // Verify we're on the photo details page
    await expect(page.url()).toContain('/photos/');
    await expect(page.getByRole('heading')).toBeVisible();
  });
});