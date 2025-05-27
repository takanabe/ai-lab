import { test, expect } from '@playwright/test';

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'testpassword';

test('user can edit a recipe', async ({ page }) => {
  // Log in
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: /email/i }).fill(TEST_EMAIL);
  await page.getByRole('textbox', { name: /password/i }).fill(TEST_PASSWORD);
  await page.getByRole('button', { name: /login/i }).click({ force: true });
  await page.waitForTimeout(1000);

  // Create a recipe first
  await page.goto('http://localhost:3000/recipes/new');
  await expect(page.getByRole('heading', { name: /create new recipe/i })).toBeVisible();
  await page.getByRole('textbox', { name: /title/i }).fill('Edit Test Recipe');
  await page.getByRole('textbox', { name: /description/i }).fill('Original description');
  await page.getByRole('textbox', { name: /ingredient 1/i }).fill('Eggs');
  await page.getByRole('button', { name: /add ingredient/i }).click();
  await expect(page.getByRole('textbox', { name: /ingredient 2/i })).toBeVisible();
  await page.getByRole('textbox', { name: /ingredient 2/i }).fill('Milk');
  await page.getByRole('textbox', { name: /step 1/i }).fill('Mix');
  await page.getByRole('button', { name: /add step/i }).click();
  await page.getByRole('textbox', { name: /step 2/i }).fill('Cook');
  await page.getByRole('textbox', { name: /image url/i }).fill('https://example.com/edit.jpg');
  await page.getByRole('button', { name: /create recipe/i }).click();
  await expect(page.getByText('Recipe created!')).toBeVisible();

  // Go to home page and click the first recipe card
  await page.goto('http://localhost:3000/');
  const firstRecipe = page.locator('.MuiCard-root').first();
  await expect(firstRecipe).toBeVisible();
  await firstRecipe.click();

  // Click Edit, update fields, and submit
  await page.getByRole('button', { name: /edit/i }).click();
  await expect(page.getByRole('heading', { name: /edit recipe/i })).toBeVisible();
  await page.getByRole('textbox', { name: /title/i }).fill('Edited Recipe');
  await page.getByRole('textbox', { name: /description/i }).fill('Updated description');
  await page.getByRole('button', { name: /edit recipe/i }).click();
  await expect(page.getByText('Recipe updated!')).toBeVisible();

  // Check that the updated values are shown
  await expect(page.getByRole('heading', { name: /edited recipe/i })).toBeVisible();
  await expect(page.getByText('Updated description')).toBeVisible();
});
