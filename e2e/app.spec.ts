import { test, expect } from '@playwright/test'

test.describe('Mini-app', () => {
  test('navigates to dashboard and creates service', async ({ page }) => {
    await page.goto('./#/app')
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

    await page.goto('./#/app/servicos')
    await page.getByRole('button', { name: '+ Novo serviço' }).click()
    await page.getByLabel('Nome *').fill('E2E Mapa Teste')
    await page.getByLabel('Preço (R$)').fill('200')
    await page.getByRole('button', { name: 'Salvar' }).click()

    await expect(page.getByText('E2E Mapa Teste')).toBeVisible()
  })

  test('creates client and report', async ({ page }) => {
    await page.goto('./#/app/clientes')
    await page.getByRole('button', { name: '+ Novo cliente' }).click()
    await page.getByLabel('Nome *').fill('E2E Cliente Numerologia')
    await page.getByLabel('Data de nascimento *').fill('1990-05-15')
    await page.getByRole('button', { name: 'Salvar' }).click()

    await expect(page.getByRole('heading', { name: 'E2E Cliente Numerologia' })).toBeVisible()

    await page.getByRole('button', { name: '+ Novo relatório' }).click()
    await page.getByLabel('Serviço *').selectOption({ index: 1 })
    await page.getByLabel('Data e hora *').fill('2030-06-15T10:00')
    await page.getByRole('button', { name: 'Salvar' }).click()

    await expect(page.getByText('Agendado')).toBeVisible()
  })

  test('settings page toggles theme', async ({ page }) => {
    await page.goto('./#/app/configuracoes')
    await page.getByRole('button', { name: 'Escuro' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })
})
