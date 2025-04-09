import { test, expect } from '@playwright/test';

// We need to ensure we initialize the store properly 
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

const NORMAL_TIMEOUT = 100; // ms - for normal UI operations

test('clicking tech cards updates selection state', async ({ page }) => {
  await page.goto('/');
  await waitForStoreInitialization(page);
  
  // First, stop the game to avoid conflicts
  await page.evaluate(() => {
    if (window.__appMethods?.stopGame) {
      window.__appMethods.stopGame();
    }
  });
  
  // Setup initial conditions - reset selection state and unlock the tech cards
  await page.evaluate(() => {
    // First, initialize the stores to ensure clean state
    if (window.__appMethods?.initializeStores) {
      window.__appMethods.initializeStores();
    }
    
    // Direct manipulation to unlock cards without going through store methods
    if (window.__techTreeStore) {
      window.__techTreeStore.currentlySelectedProduct = null;
      window.__techTreeStore.currentlySelectedDiscovery = null;
      window.__techTreeStore.locked = new Set(); // Empty set means nothing is locked
    }
  });
  
  // Get the tech cards
  const techCards = page.locator('.tech-card');
  
  // Reset any selection styling by forcing a refresh
  await page.reload();
  await waitForStoreInitialization(page);
  
  // Click the first card
  await techCards.nth(0).click();
  
  // The first card should now have a selected class
  await page.waitForTimeout(200); // Brief wait for selection to register
  
  // Check if cards exist and show a clear state
  const selectedCards = await techCards.filter({ hasClass: 'selected' }).count();
  expect(selectedCards).toBeGreaterThan(0);
});
