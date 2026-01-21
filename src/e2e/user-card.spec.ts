import { test, expect } from '@playwright/test';

test('should render the page title', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Frontend Testing Lab' })).toBeVisible();
})

test('should render the user card', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'User 1'}).click();

    await expect(page.getByText('Ramon Peres')).toBeVisible();
    await expect(page.getByText('ramon.peres@example.com')).toBeVisible();
    await expect(page.getByText('Developer')).toBeVisible();
})

test('should render the user card with other id', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'User 2' }).click();

    await expect(page.getByText('Lucas Nobre')).toBeVisible();
    await expect(page.getByText('lucas.nobre@example.com')).toBeVisible();
    await expect(page.getByText('Frontend Developer')).toBeVisible();
})

test('should switch user card when button is clicked', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'User 1' }).click();

    await expect(page.getByText('Ramon Peres')).toBeVisible();
    await expect(page.getByText('ramon.peres@example.com')).toBeVisible();
    await expect(page.getByText('Developer')).toBeVisible();

    await page.getByRole('button', { name: 'User 2' }).click();

    await expect(page.getByText('Lucas Nobre')).toBeVisible();
    await expect(page.getByText('lucas.nobre@example.com')).toBeVisible();
    await expect(page.getByText('Frontend Developer')).toBeVisible();
})

test('should allow to edit the user', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'User 1' }).click();

    await page.getByRole('button', { name: 'Editar' }).click();

    await expect(page.getByText('Editado usuário: 1')).toBeVisible();
})