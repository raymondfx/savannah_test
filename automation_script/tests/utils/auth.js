export async function loginUser(page) {
    // Navigate to login page
    await page.goto('http://localhost:3001/login');
    
    // Fill in login credentials
    await page.fill('input[type="email"]', 'user@admin.com');
    await page.fill('input[type="password"]', 'admin2025');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Wait for navigation to complete
    await page.waitForURL('http://localhost:3001/home');
  }