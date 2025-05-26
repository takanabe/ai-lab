import { test, expect } from '@playwright/test';

test('login page renders and toggles between login and sign up forms', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  // Login form is shown by default
  await expect(page.getByRole('heading', { name: /login/i, level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible();

  // Switch to sign up form
  await page.getByRole('button', { name: /sign up/i }).click();
  await expect(page.getByRole('heading', { name: /sign up/i, level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();

  // Switch back to login form
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByRole('heading', { name: /login/i, level: 1 })).toBeVisible();
});
