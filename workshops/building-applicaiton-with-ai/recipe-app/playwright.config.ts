import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./playwright.setup.js'),
  testDir: './tests/e2e',
  timeout: 30000,
});
