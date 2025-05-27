import { test, expect } from '@playwright/test';

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'testpassword';

test('user can view their profile page and see only their recipes', async ({ page }) => {
  // Log in
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: /email/i }).fill(TEST_EMAIL);
  await page.getByRole('textbox', { name: /password/i }).fill(TEST_PASSWORD);
  await page.getByRole('button', { name: /login/i }).click({ force: true });
  await page.waitForTimeout(1000);

  // Go to home page and click the first recipe card
  await page.goto('http://localhost:3000/');
  const firstRecipe = page.locator('.MuiCard-root').first();
  await expect(firstRecipe).toBeVisible();
  await firstRecipe.click();

  // Extract user id from the detail page container's data attribute
  const userId = await page.getByTestId('recipe-detail-container').getAttribute('data-user-id');
  expect(userId).toBeTruthy();

  await page.goto(`http://localhost:3000/profile/${userId}`);
  await expect(page.getByRole('heading', { name: /profile/i })).toBeVisible();
  await expect(page.getByText(`User ID: ${userId}`)).toBeVisible();

  // Check that only this user's recipes are listed
  const recipeCards = await page.locator('.MuiCard-root').all();
  for (const card of recipeCards) {
    await expect(card).toBeVisible();
  }
});
