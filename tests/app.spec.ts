import { test, expect } from '@playwright/test';
import { NORMAL_TIMEOUT } from '../src/stores/staticData';

// We need to ensure we initialize the store properly 
// The page context in Playwright doesn't get the initialization from main.ts
test.beforeEach(async ({ page }) => {
  // Initialize the global store on each test page
  await page.addInitScript(() => {
    if (typeof window !== 'undefined') {
      // Flag to ensure we initialize just once
      window.__APP_STORE_INITIALIZED = false;
    }
  });
});

// Wait for the store to be initialized before test begins
async function waitForStoreInitialization(page) {
  await page.waitForFunction(() => {
    return window.__appStore && window.__appMethods;
  }, { timeout: 2000 });
}

// Basic test to verify the page loads correctly
test('homepage has title and basic components', async ({ page }) => {
  await page.goto('/');
  await waitForStoreInitialization(page);
  
  // Assert that the page title contains the project name
  await expect(page).toHaveTitle(/March of Mind/);
  
  // Assert that the main title is visible
  const mainTitle = page.locator('h1');
  await expect(mainTitle).toBeVisible({ timeout: NORMAL_TIMEOUT });
  await expect(mainTitle).toContainText('March of Mind');
  
  // Verify that footer exists and contains version
  const footer = page.locator('footer');
  await expect(footer).toBeVisible({ timeout: NORMAL_TIMEOUT });
  await expect(footer).toContainText('Version');
});
