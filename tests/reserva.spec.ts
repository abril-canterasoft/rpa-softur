import { test } from '@playwright/test';
import { ensureLogin } from '../helpers/auth';

test('cargar dashboard', async ({ page }) => {
  await ensureLogin(page);

  const goToNewReservationBtn = page.locator('a[href="/iTraffic_Aymara/E_Ventas/Reserva"]', { hasText: 'New reservation' });
  // Espera que esté visible y haga click
  await goToNewReservationBtn.waitFor({ state: 'visible' });
  await goToNewReservationBtn.click();

  const newReservationBtnModal = page.locator('div.tool-button.add-button', { hasText: 'New Reserva' });
  await newReservationBtnModal.waitFor({ state: 'visible' });
  await newReservationBtnModal.click();


  // Agregar pasajero
  const tabPassengers = page.locator('#ui-id-2');
  await tabPassengers.waitFor({ state: 'visible' });
  await tabPassengers.click();

  const newPassengersBtnModal = page.locator('div.tool-button.add-button', { hasText: 'New Pasajero' });
  await newPassengersBtnModal.waitFor({ state: 'visible' });
  await newPassengersBtnModal.click();

  // 1️⃣ Click en el select para abrir el dropdown
  const selectPassengers = page.locator('div.s-Pasajero span.select2-chosen', { hasText: '--select--' });
  await selectPassengers.click();

  // 2️⃣ Seleccionar el dropdown **visible** que acaba de abrir este select
  const visibleDropdown = page.locator('div.select2-drop:visible');

  // 3️⃣ Buscar el input de búsqueda dentro de ese dropdown
  const searchInput = visibleDropdown.locator('input.select2-input');

  //CAMPO DINAMICO
  // 4️⃣ Llenar el valor que querés buscar
  await searchInput.fill('AILEN MARIANA PRADO');

  // 5️⃣ Seleccionar el resultado dentro del mismo dropdown
  await visibleDropdown.locator('li.select2-results-dept-0', { hasText: 'AILEN MARIANA PRADO' }).click();
  await page.waitForTimeout(1000);


  // Guardar pasajero
  // Selecciona el modal por su título "Nuevo Pasajero"
  const modal = page.locator('.ui-dialog:has(.ui-dialog-title:text("New Pasajero"))');

  // Click en el botón "Guardar" dentro del modal
  await modal.locator('.tool-button.save-and-close-button >> text=Guardar').click();
  //CAMPO DINAMICO
  const tabResevation = page.locator('#ui-id-1');
  await tabResevation.waitFor({ state: 'visible' });
  await tabResevation.click();

  const selectTypeReservation = page.locator('#select2-chosen-5');
  await selectTypeReservation.waitFor({ state: 'visible' });
  await selectTypeReservation.click();
  await page.locator('li.select2-results-dept-0', { hasText: 'AGENCIAS [COAG]' }).click();
  await page.waitForTimeout(1000);

  //CAMPO DINAMICO
  const selectStatus = page.locator('#select2-chosen-6');
  await selectStatus.waitFor({ state: 'visible' });
  await selectStatus.click();
  await page.locator('li.select2-results-dept-0', { hasText: 'PENDIENTE DE CONFIRMACION [PC]' }).click();
  await page.waitForTimeout(1000);

  const selectTravelDate = page.locator('#Softur_Serene_E_Ventas_ReservaDialog22_Fec_sal');
  await selectTravelDate.waitFor({ state: 'visible' });
  await selectTravelDate.click();

  //CAMPO DINAMICO
  await page.locator('#Softur_Serene_E_Ventas_ReservaDialog22_Fec_sal').fill('2025-12-29');
  await page.locator('#Softur_Serene_E_Ventas_ReservaDialog22_Fec_sal').press('Tab');
  await page.waitForTimeout(1000);

  const selectSeller = page.locator('#s2id_Softur_Serene_E_Ventas_ReservaDialog22_Cod_vdor');
  await selectSeller.waitFor({ state: 'visible' });
  await selectSeller.click();
  await page.locator('li.select2-results-dept-0', { hasText: 'TEST TEST' }).click();
  await page.waitForTimeout(1000);

  const selectCustomer = page.locator('#select2-chosen-8');
  await selectCustomer.waitFor({ state: 'visible' });
  await selectCustomer.click();
  await page.locator('li.select2-results-dept-0', { hasText: 'DESPEGAR - ' }).click();
  await page.waitForTimeout(1000);

  await page
    .locator('.s-Toolbar .tool-button.save-and-close-button', { hasText: 'Guardar y Salir' })
    .first()
    .click();

  // Guardar reserva
  await page.waitForTimeout(3000);
  console.log("Dashboard cargado y botón clickeado");
});
