import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Tests', () => {

    // Navigate before each test run
    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    test('Page loads with correct title and header', async ({ page }) => {
        await expect(page).toHaveTitle(/OrangeHRM/i);
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });

    test('Successful login with valid credentials', async ({ page }) => {
        // Locate and fill login details
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');

        // Click login button
        await page.getByRole('button', { name: 'Login' }).click();

        // Assert successful redirect to dashboard
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    test('Failed login shows error alert', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('InvalidUser');
        await page.getByPlaceholder('Password').fill('WrongPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        // Assert invalid credentials alert is displayed
        const alert = page.getByRole('alert');
        await expect(alert).toBeVisible();
        await expect(alert).toContainText('Invalid credentials');
    });

    test('Required validation triggers on empty submission', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click();

        // Assert validation messages under empty inputs
        const requiredMessages = page.getByText('Required');
        await expect(requiredMessages).toHaveCount(2);
    });
});