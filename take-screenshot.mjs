import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: {
      width: 1540,
      height: 1020,
      deviceScaleFactor: 2,
    },
  });

  const page = await browser.newPage();
  await page.goto('https://leave-management-dashboard-hr.vercel.app', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));

  await page.screenshot({
    path: path.resolve('cook/stills/r01/preview.png'),
  });
  console.log('Saved cook/stills/r01/preview.png from live deployment');

  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
