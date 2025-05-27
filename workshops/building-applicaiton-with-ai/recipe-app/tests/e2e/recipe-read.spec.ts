import { test, expect } from '@playwright/test';

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'testpassword';

test('user can view a recipe detail page', async ({ page }) => {
  // Log in
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: /email/i }).fill(TEST_EMAIL);
  await page.getByRole('textbox', { name: /password/i }).fill(TEST_PASSWORD);
  await page.getByRole('button', { name: /login/i }).click({ force: true });
  await page.waitForTimeout(1000);

  // Create a recipe first
  await page.goto('http://localhost:3000/recipes/new');
  await expect(page.getByRole('heading', { name: /create new recipe/i })).toBeVisible();
  await page.getByRole('textbox', { name: /title/i }).fill('Test Recipe');
  await page.getByRole('textbox', { name: /description/i }).fill('A delicious test recipe');
  await page.getByRole('textbox', { name: /ingredient 1/i }).fill('Flour');
  await page.getByRole('button', { name: /add ingredient/i }).click();
  await expect(page.getByRole('textbox', { name: /ingredient 2/i })).toBeVisible();
  await page.getByRole('textbox', { name: /ingredient 2/i }).fill('Sugar');
  await page.getByRole('textbox', { name: /step 1/i }).fill('Mix ingredients');
  await page.getByRole('button', { name: /add step/i }).click();
  await page.getByRole('textbox', { name: /step 2/i }).fill('Bake for 30 minutes');
  await page.getByRole('textbox', { name: /image url/i }).fill('https://example.com/image.jpg');
  await page.getByRole('button', { name: /create recipe/i }).click();
  await expect(page.getByText('Recipe created!')).toBeVisible();

  // Go to home page and click the first recipe card
  await page.goto('http://localhost:3000/');
  const firstRecipe = page.locator('.MuiCard-root').first();
  await expect(firstRecipe).toBeVisible();
  await firstRecipe.click();

  // Debug: log page content after clicking the recipe card
  // console.log('Page content after clicking recipe card:', await page.content());

  // Check that the detail page is displayed
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: /ingredients/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /steps/i })).toBeVisible();
});
