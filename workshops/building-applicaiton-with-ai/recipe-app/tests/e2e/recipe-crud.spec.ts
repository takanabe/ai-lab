import { test, expect } from '@playwright/test';

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'testpassword';

test.describe('Recipe CRUD', () => {
  test('user can create, read, edit, and delete a recipe', async ({ page }) => {
    // Log in
    await page.goto('http://localhost:3000/login');
    await page.getByRole('textbox', { name: /email/i }).fill(TEST_EMAIL);
    await page.getByRole('textbox', { name: /password/i }).fill(TEST_PASSWORD);
    await page.getByRole('button', { name: /login/i }).click({ force: true });
    await page.waitForTimeout(1000);

    // --- CREATE ---
    await page.goto('http://localhost:3000/recipes/new');
    await expect(page.getByRole('heading', { name: /create new recipe/i })).toBeVisible();
    await page.getByRole('textbox', { name: /title/i }).fill('CRUD Test Recipe');
    await page.getByRole('textbox', { name: /description/i }).fill('CRUD description');
    await page.getByRole('textbox', { name: /ingredient 1/i }).fill('Eggs');
    await page.getByRole('button', { name: /add ingredient/i }).click();
    await expect(page.getByRole('textbox', { name: /ingredient 2/i })).toBeVisible();
    await page.getByRole('textbox', { name: /ingredient 2/i }).fill('Milk');
    await page.getByRole('textbox', { name: /step 1/i }).fill('Mix');
    await page.getByRole('button', { name: /add step/i }).click();
    await page.getByRole('textbox', { name: /step 2/i }).fill('Cook');
    await page.getByRole('textbox', { name: /image url/i }).fill('https://example.com/crud.jpg');
    await page.getByRole('button', { name: /create recipe/i }).click();
    await expect(page.getByText('Recipe created!')).toBeVisible();

    // --- READ ---
    await page.goto('http://localhost:3000/');
    const firstRecipe = page.locator('.MuiCard-root').first();
    await expect(firstRecipe).toBeVisible();
    await firstRecipe.click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /ingredients/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /steps/i })).toBeVisible();

    // --- EDIT ---
    await page.getByRole('button', { name: /edit/i }).click();
    await expect(page.getByRole('heading', { name: /edit recipe/i })).toBeVisible();
    await page.getByRole('textbox', { name: /title/i }).fill('CRUD Edited Recipe');
    await page.getByRole('textbox', { name: /description/i }).fill('Updated CRUD description');
    await page.getByRole('button', { name: /edit recipe/i }).click();
    await expect(page.getByText('Recipe updated!')).toBeVisible();
    await expect(page.getByRole('heading', { name: /crud edited recipe/i })).toBeVisible();
    await expect(page.getByText('Updated CRUD description')).toBeVisible();

    // --- DELETE ---
    await page.getByRole('button', { name: /delete/i }).click();
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByText('CRUD Edited Recipe')).not.toBeVisible();
  });
});
