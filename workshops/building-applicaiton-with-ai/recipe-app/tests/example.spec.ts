import { test, expect } from '@playwright/test';

test('homepage loads and displays Next.js starter', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('body')).toContainText('Get started by editing');
});
