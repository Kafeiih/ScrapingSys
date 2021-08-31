const puppeteer = require('puppeteer');
const C = require('./constants');
const USERNAME_SELECTOR = '#usuario';
const DV_SELECTOR = '#dv';
const PASSWORD_SELECTOR = '#clave';
const CTA_SELECTOR = '#ingresar-res';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://sige.mineduc.cl/Sige/Login');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(C.username);
    await page.click(DV_SELECTOR);
    await page.keyboard.type(C.dv);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(C.password);
    await page.click(CTA_SELECTOR);
    await page.waitForRequest();
    await page.screenshot({ path: 'screenshot.png' });
    await browser.close();
})();