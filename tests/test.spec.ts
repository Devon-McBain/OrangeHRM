import {test, expect} from '@playwright/test';

test.describe('OrangeHRM Login Tests',() => {

    test.beforeEach('Go to webpage', async ({page}) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await expect(page).toHaveTitle(/OrangeHRM/)
    });

    test('Enter login details', async ({page}) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByText('username').click();
        await expect(page.getByText('username')).toBeVisible();
    });
});