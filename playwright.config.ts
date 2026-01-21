import { defineConfig, devices } from '@playwright/test';

/**
 * Documentação: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Pasta onde ficam os testes E2E
  testDir: './src/e2e',

  // Timeout por teste (30 segundos)
  timeout: 30 * 1000,

  // Tenta novamente até 2x se falhar (evita flakiness)
  retries: process.env.CI ? 2 : 0,

  // Quantos testes rodam em paralelo
  workers: process.env.CI ? 1 : undefined,

  // Reporter (como exibir resultados)
  reporter: [
    ['html'], // Relatório HTML bonito
    ['list']  // Lista no terminal
  ],

  // Configurações globais para todos os testes
  use: {
    // URL base para usar page.goto('/')
    baseURL: 'http://localhost:5173',

    // Captura screenshot apenas quando falhar
    screenshot: 'only-on-failure',

    // Grava vídeo apenas quando falhar
    video: 'retain-on-failure',

    // Salva trace para debug (incrível!)
    trace: 'on-first-retry',
  },

  // Projetos = diferentes browsers/devices
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // Testes mobile (opcional)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Servidor local (Playwright inicia automaticamente)
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});