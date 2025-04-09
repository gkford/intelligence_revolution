import { test, expect } from '@playwright/test';
import { NORMAL_TIMEOUT } from '../src/stores/staticData';

test.describe('Pause and Resume Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Let the app initialize fully
    await page.waitForFunction(() => window.__timeStore?.isRunning === true);
  });
  
  test('Game phases should affect component rendering', async ({ page }) => {
    await page.goto('/');
    
    // Initial phase should be 'startup'
    const currentPhase = await page.evaluate(() => {
      return window.__phaseStore?.currentPhase;
    });
    
    expect(currentPhase).toBe('startup');
    
    // FounderPanel should be visible in startup phase
    await expect(page.locator('.founder-panel')).toBeVisible();
    
    // ResearchersPanel should not be visible in startup phase
    await expect(page.locator('.researchers-panel')).not.toBeVisible();
    
    // Manually set phase to 'lab'
    await page.evaluate(() => {
      if (window.__phaseStore) {
        window.__phaseStore.setPhase('lab');
      }
    });
    
    // Wait for DOM to update
    await page.waitForTimeout(NORMAL_TIMEOUT);
    
    // FounderPanel should not be visible in lab phase
    await expect(page.locator('.founder-panel')).not.toBeVisible();
    
    // ResearchersPanel should be visible in lab phase
    await expect(page.locator('.researchers-panel')).toBeVisible();
  });
});
