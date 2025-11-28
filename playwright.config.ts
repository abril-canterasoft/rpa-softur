import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { existsSync } from 'fs';

// Cargar variables de entorno
dotenv.config();

export default defineConfig({
  testDir: './tests',

  use: {
    headless: false, //Esto seria true para que no se vea la ejecución en la pantalla y seria false para que se vea la ejecución en la pantalla
    viewport: { width: 1280, height: 720 },
    // Solo usar storageState si el archivo existe
    ...(existsSync('auth.json') && { storageState: 'auth.json' }),
  },

  fullyParallel: false,
  reporter: [['html', { open: 'never' }]],
});