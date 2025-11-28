import { Page } from '@playwright/test';

// TODO: Mover estas credenciales a variables de entorno (.env)
const LOGIN_URL = process.env.LOGIN_URL || 'https://aymara.itraffic.com.ar/iTraffic_Aymara';
const LOGIN_USERNAME = process.env.LOGIN_USERNAME || 'PRUEBA';
const PASSWORD = process.env.PASSWORD || 'Aymara735';


export async function ensureLogin(page: Page) {
    await page.goto(LOGIN_URL);

    // Escuchar alertas ANTES de interactuar
    page.on('dialog', async dialog => {
        console.log(`Alerta detectada: ${dialog.message()}`);
        await dialog.accept();
        throw new Error(`Error de login: ${dialog.message()}`);
    });

    // Si ya está logueado, no hace falta nada
    if (await page.locator('#Softur_Serene_Membership_LoginPanel0_LoginButton').count() === 0) {
        return;
    }

    await page.fill('#Softur_Serene_Membership_LoginPanel0_Username', LOGIN_USERNAME);
    await page.fill('#Softur_Serene_Membership_LoginPanel0_Password', PASSWORD);
    await page.click('#Softur_Serene_Membership_LoginPanel0_LoginButton');

    /* await page.waitForTimeout(3000); */

    try {
        await page.waitForSelector('#Softur_Serene_Membership_LoginPanel0_LoginButton', {
            state: 'hidden',
            timeout: 5000
        });
    } catch {
        throw new Error('El login falló: el botón sigue visible');
    }

    /*     await page.waitForLoadState('networkidle'); */

    await page.context().storageState({ path: 'auth.json' });
}
