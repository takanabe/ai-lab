import { test, expect } from '@playwright/test';

test.describe('Protected routes', () => {
  test('redirects unauthenticated user from /recipes/new to /login', async ({ page }) => {
    await page.goto('http://localhost:3000/recipes/new');
    await expect(page).toHaveURL(/\/login/);
  });

  test('redirects unauthenticated user from /profile/[username] to /login', async ({ page }) => {
    await page.goto('http://localhost:3000/profile/testuser');
    await expect(page).toHaveURL(/\/login/);
  });
});
