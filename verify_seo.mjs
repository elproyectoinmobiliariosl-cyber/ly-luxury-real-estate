import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
await page.goto('http://localhost:8123/fr.html');
await page.waitForTimeout(500);
const lang = await page.evaluate(() => document.documentElement.lang);
console.log('html lang after hydration:', lang);
await page.screenshot({ path: '/tmp/home-fr.png' });
await browser.close();
