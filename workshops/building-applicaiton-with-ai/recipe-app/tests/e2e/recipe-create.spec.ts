import { test, expect } from '@playwright/test';

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'testpassword';

test('user can create a new recipe', async ({ page }) => {
  // Go to login page and log in
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: /email/i }).fill(TEST_EMAIL);
  await page.getByRole('textbox', { name: /password/i }).fill(TEST_PASSWORD);
  await page.getByRole('button', { name: /login/i }).click();

  // Wait for login form to disappear (login success) or for a redirect
  await page.waitForTimeout(1000); // Give time for login to process
  const stillOnLogin = await page.url().includes('/login');
  const loginFormVisible = await page.getByRole('button', { name: /login/i }).isVisible().catch(() => false);

  if (stillOnLogin && loginFormVisible) {
    const loginErrorMsg = await page.locator('[role="alert"]').textContent().catch(() => '');
    console.log('Login failed. Error message:', loginErrorMsg);
    console.log('Login failed. Page content:', await page.content());
    throw new Error('Login did not succeed. Please check test user credentials and confirmation.');
  }

  // Go to new recipe page after login
  await page.goto('http://localhost:3000/recipes/new');
  console.log('After navigating to /recipes/new, URL:', await page.url());
  // console.log('Page content after navigating to /recipes/new:', await page.content());
  await expect(page.getByRole('heading', { name: /create new recipe/i })).toBeVisible();

  // Fill out the form
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

  // Submit the form
  await page.getByRole('button', { name: /create recipe/i }).click();

  // Check for success message
  await expect(page.getByText('Recipe created!')).toBeVisible();
});
