const puppeteer = require('puppeteer');
const path = require('path')
const C = require('./constants');

const downloadPath = path.resolve('./download');
a = 0;

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto('https://sige.mineduc.cl/Sige/Login');
    
    await page.click('#usuario');
    await page.keyboard.type(C.username);
    await page.click('#dv');
    await page.keyboard.type(C.dv);
    await page.click('#clave');
    await page.keyboard.type(C.password);
    await page.click('#ingresar-res');

    await page.on('dialog', async (dialog) => {

        console.log(dialog.message())

        await page._client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: downloadPath 
        })

        if (a == 0) {
            await dialog.dismiss()
            await page.click('#ingresar-res')
            await page.waitForTimeout(2000)
            
            //await page.screenshot({ path: 'screenshot.png', fullPage: true })
            await page.evaluate(() => (enviar("","../Reportes/ExportarNomina")))

            await page.waitForTimeout(2000)

            await page.select('#cmbAno', '2021')
            a = 1;

            await page.waitForTimeout(2000)
            //await page.screenshot({ path: 'nomina.png', fullPage: true })
            
            await page.evaluate(() => (exportaNomina(3)))

            await page.waitForTimeout(2000)

        } else {

            await dialog.accept()

            console.log('Si')

            await page.waitForTimeout(2000)
        }

        await browser.close();
    });
})();
