import { test, expect } from '@playwright/test';

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'testpassword';

test('user can delete a recipe', async ({ page }) => {
  // Log in
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: /email/i }).fill(TEST_EMAIL);
  await page.getByRole('textbox', { name: /password/i }).fill(TEST_PASSWORD);
  await page.getByRole('button', { name: /login/i }).click({ force: true });
  await page.waitForTimeout(1000);

  // Create a recipe first
  await page.goto('http://localhost:3000/recipes/new');
  await expect(page.getByRole('heading', { name: /create new recipe/i })).toBeVisible();
  await page.getByRole('textbox', { name: /title/i }).fill('Delete Test Recipe');
  await page.getByRole('textbox', { name: /description/i }).fill('To be deleted');
  await page.getByRole('textbox', { name: /ingredient 1/i }).fill('Ingredient');
  await page.getByRole('textbox', { name: /step 1/i }).fill('Step');
  await page.getByRole('button', { name: /create recipe/i }).click();
  await expect(page.getByText('Recipe created!')).toBeVisible();

  // Go to home page and click the first recipe card
  await page.goto('http://localhost:3000/');
  const firstRecipe = page.locator('.MuiCard-root').first();
  await expect(firstRecipe).toBeVisible();
  await firstRecipe.click();

  // Click Delete and confirm redirect to home
  await page.getByRole('button', { name: /delete/i }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  // Check that the deleted recipe is not in the list
  await expect(page.getByText('Delete Test Recipe')).not.toBeVisible();
});
